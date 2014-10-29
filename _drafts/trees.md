---
layout: post
title: Trees
category: back-to-basics
---

# Back to Basics:

# {{ page.title }}
***

Trees are one of my favorite data structures. They are conceptually very simple but in use, they can be very powerful. Their usage applications are wide and include things like modelling an HTML page structure (like the one you're reading now!) and autocomplete suggestion systems.

Trees are often used to model hierarchical relationships. Due to this hierarchical nature, recursion is an extremely useful tool to use when working with trees and we'll use it in our implementations here.

There are many variations on trees, including binary trees and binary search trees, heaps, tries, and self-balancing trees (AVL trees, red-black trees, splay trees). We'll try to cover most – if not all – of these.

So, what makes a tree a tree?

{% include flickrimg.html img='https://farm3.staticflickr.com/2835/10446867315_39de6e054a_b.jpg' title='Early one October morning by Nick Kenrick, on Flickr' source='zedzap/10446867315' cc='by-nc-sa' %}

Turns out the brilliant minds actually named them trees for a reason: trees branch! In your average, everyday green (or – depending on when this is being read – orange, red or...empty) tree, there are branches that split. We can think of this as there being a parent branch that has some amount of child branches. This is essentially what the tree data structure is: a hierarchical collection of parent and child nodes.

Trees are a collection of items, much like an array or linked list. As a result, they share many operations with other collections – namely inserting an item, removing an item, searching for an item, and traversing the collection.

So, what does the interface for a tree look like?

{% highlight java %}
public interface Tree<T> {
    public void insert(T item);
    public void remove(T item);
    public boolean contains(T item);
    public void traverse(???);
}
{% endhighlight %}

Note that traverse is missing a parameter. We want to pass something in to the traversal method that actually does something when we traverse the nodes, since the tree doesn't actually know in advance what we want to do at each node. We'll assume there is some `Visitor` class that handles this task.

As simple as the concept of a tree is, there are many ways to represent it, each with their pros and cons and situational uses.

## Binary Search Trees
Binary search trees are the simplest tree representation. A node can have up to two children, those being the left or right child. Think of a family tree in reverse, in which instead of having two parents to a child one would have two children to a parent. Binary search trees also have a constraint that their contents must be ordered such that for any node, all items on the left subtree are less than, and all items on the right subtree are greater than.

We use a private inner class to represent a node in the binary search tree that keeps track of its own left and right subtrees.

{% highlight java %}
private class BinaryTreeNode<U extends Comparable<? super U>> {
    public U value;
    public BinarySearchTree<U> left = new BinarySearchTree<>();
    public BinarySearchTree<U> right = new BinarySearchTree<>();
    public BinaryTreeNode(U val) {
        this.value = val;
    }
}
{% endhighlight %}

### Implementation

#### Insertion
Inserting is as simple as checking whether it should go in the current tree (if there is no root) or it should go in the left or right subtree.

{% highlight java %}
public void insert(T item) {
    if (root == null) this.root = new BinaryTreeNode<>(item);
    else if (item.compareTo(this.root.value) < 0) this.root.left.insert(item);
    else if (item.compareTo(this.root.value) > 0) this.root.right.insert(item);
}
{% endhighlight %}

In the case of the inserted item matching an existing value, we just ignore the insertion. There are alternative approaches to inserting duplicates such as always placing them in the left or right subtree, or storing a list of the items at the node, or if the items are guaranteed to be the same, storing a counter at the node. All of these approaches introduce additional complexity that we'll avoid for now.

Insertion is ideally completed in O(lg(n)) time, as we can halve the amount of the tree we need to work with on each iteration. However, since a binary search tree does not need to be balanced, we could end up with what is essentially a linked list of nodes, giving us a worst case of O(n) time. We'll cover how to get around this with self-balancing trees later.

#### Searching
Searching is also very simple in a binary *search* tree – go figure!

{% highlight java %}
public boolean contains(T item) {
    if (root == null) return false;
    else if (item.compareTo(this.root.value) < 0) return root.left.contains(item);
    else if (item.compareTo(this.root.value) > 0) return root.right.contains(item);
    else return true;
}
{% endhighlight %}

Much like insertion, searching is done by checking the current node and then either the left or right subtree if necessary. Because of this, searching has the same time complexity and issues as insertion does, meaning we have an ideal O(lg(n)) time, but a worst-case O(n) time.

#### Deletion
Things start to get tricky when we start trying to delete nodes from a binary search tree. There are a few cases to consider what should happen when we try to delete a node that:

1. doesn't exist
2. has no children
3. has one child
4. has two children

Luckily, the first two cases are trivial to implement, and the third only requires a bit of work. The fourth on the other hand can be a bit more challenging.

To solve the challenge of replacing the node with two children, we'll introduce two private helper methods: one to remove an item from a given node and one to find the minimum of a given tree.

{% highlight java %}
public void remove(T item) {
    this.root = removeFromNode(this.root, item);
}

private BinaryTreeNode<T> removeFromNode(BinaryTreeNode<T> node, T item) {
    if (node == null) return null; // (1)
    if (item.compareTo(node.value) < 0) {
        node.left.root = removeFromNode(node.left.root, item);
    } else if (item.compareTo(node.value) > 0) {
        node.right.root = removeFromNode(node.right.root, item);
    } else {
        // (2, 3)
        if (node.left.root == null) return node.right.root;
        if (node.right.root == null) return node.left.root;
        // (4)
        BinaryTreeNode<T> successor = node.right.findMin();
        node.value = successor.value;
        node.right.root = removeFromNode(node.right.root, successor.value);
    }
    return node;
}

private BinaryTreeNode<T> findMin() {
    if (this.root == null) return null;
    if (this.root.left.root != null) return this.root.left.findMin();
    return this.root;
}
{% endhighlight %}

So, a bit more complicated. However, the time complexity is no different than that of insertion and searching. Since we have to consider the worst case that the tree is essentially a linked list, the worst case takes O(n) time, but on average we can split the work to be done on each step so we end up with an O(lg(n)) average case complexity.

#### Traversal
There are a few ways to traverse a tree, depending on which order the nodes should be visited in. Three traversal methods (in-order, pre-order and post-order) traverse the tree depth-first. Trees can also be traversed in a breadth-first manner (i.e. in levels).

The three depth-first traversal methods are very simple:

##### In-order
Traverses the left-most node to the right-most node such that the visited order should be sorted according to the comparison method used for the tree.

<figure>
    <img src="http://upload.wikimedia.org/wikipedia/commons/7/77/Sorted_binary_tree_inorder.svg" alt="Sorted binary tree inorder">
    <figcaption>Traversal order: A B C D E F G H I<br>– <a href="http://commons.wikimedia.org/wiki/File:Sorted_binary_tree_inorder.svg" target="_blank">Sorted Binary Tree Inorder</a></figcaption>
</figure>

{% highlight java %}
public void traverse(Visitor<T> visitor) {
    if (root == null) return;
    if (root.left != null) root.left.traverse(visitor);
    visitor.visit(root.value);
    if (root.right != null) root.right.traverse(visitor);
}
{% endhighlight %}

##### Pre-order
Traverses the tree from the top down, in a left-to-right manner. The root will be visited first, then the left subtree will be traversed in pre-order manner, then the right subtree.

<figure>
    <img src="http://upload.wikimedia.org/wikipedia/commons/d/d4/Sorted_binary_tree_preorder.svg" alt="Sorted binary tree preorder">
    <figcaption>Traversal order: F B A D C E G I H<br>– <a href="http://commons.wikimedia.org/wiki/File:Sorted_binary_tree_preorder.svg" target="_blank">Sorted Binary Tree Preorder</a></figcaption>
</figure>

{% highlight java %}
public void traverse(Visitor<T> visitor) {
    if (root == null) return;
    visitor.visit(root.value);
    if (root.left != null) root.left.traverse(visitor);
    if (root.right != null) root.right.traverse(visitor);
}
{% endhighlight %}

##### Post-order
Traverses the tree in essentially the opposite manner of pre-order. Like pre-order, it traverses the tree from the top down, in a left-to-right manner. However, it traverses the left subtree in a post-order manner, then the right subtree, then finally visits the root node.

<figure>
    <img src="http://upload.wikimedia.org/wikipedia/commons/9/9d/Sorted_binary_tree_postorder.svg" alt="Sorted binary tree postorder">
    <figcaption>Traversal order: A C E D B H I G F<br>– <a href="http://commons.wikimedia.org/wiki/File:Sorted_binary_tree_postorder.svg" target="_blank">Sorted Binary Tree Postorder</a></figcaption>
</figure>

{% highlight java %}
public void traverse(Visitor<T> visitor) {
    if (root == null) return;
    if (root.left != null) root.left.traverse(visitor);
    if (root.right != null) root.right.traverse(visitor);
    visitor.visit(root.value);
}
{% endhighlight %}

### Full Implementation
{% highlight java %}
public class BinarySearchTree<T extends Comparable<? super T>> implements Tree<T> {
    public void insert(T item) {
        if (root == null) this.root = new BinaryTreeNode<>(item);
        else if (item.compareTo(this.root.value) < 0) this.root.left.insert(item);
        else if (item.compareTo(this.root.value) > 0) this.root.right.insert(item);
    }

    public void remove(T item) {
        this.root = removeFromNode(this.root, item);
    }

    private BinaryTreeNode<T> removeFromNode(BinaryTreeNode<T> node, T item) {
        if (node == null) return null; // (1)
        if (item.compareTo(node.value) < 0) {
            node.left.root = removeFromNode(node.left.root, item);
        } else if (item.compareTo(node.value) > 0) {
            node.right.root = removeFromNode(node.right.root, item);
        } else {
            // (2, 3)
            if (node.left.root == null) return node.right.root;
            if (node.right.root == null) return node.left.root;
            // (4)
            BinaryTreeNode<T> successor = node.right.findMin();
            node.value = successor.value;
            node.right.root = removeFromNode(node.right.root, successor.value);
        }
        return node;
    }

    private BinaryTreeNode<T> findMin() {
        if (this.root == null) return null;
        if (this.root.left.root != null) return this.root.left.findMin();
        return this.root;
    }

    public boolean contains(T item) {
        if (root == null) return false;
        else if (item.compareTo(this.root.value) < 0) return root.left.contains(item);
        else if (item.compareTo(this.root.value) > 0) return root.right.contains(item);
        else return true;
    }

    public void traverse(Visitor<T> visitor) {
        if (root == null) return;
        if (root.left != null) root.left.traverse(visitor);
        visitor.visit(root.value);
        if (root.right != null) root.right.traverse(visitor);
    }

    public String toString() {
        final StringBuilder builder = new StringBuilder();
        traverse(new Visitor<T>() {
            @Override
            public void visit(T item) {
                builder.append("(").append(item).append(")");
            }
        });
        return builder.toString();
    }

    private class BinaryTreeNode<U extends Comparable<? super U>> {
        public U value;
        public BinarySearchTree<U> left = new BinarySearchTree<>();
        public BinarySearchTree<U> right = new BinarySearchTree<>();
        public BinaryTreeNode(U val) {
            this.value = val;
        }
    }

    private BinaryTreeNode<T> root;
}
{% endhighlight %}

## Red-Black Trees
Red-Black trees are a more complex variation on the basic binary tree that self-balances itself. This grants it the ability to have worst-case time complexity of O(lg(n)) for all operations, because we can no longer end up in the linked-list as a tree scenario. To change a binary search tree into a red-black tree, we need only change the operations that modify the tree: insertion and removal.

## Tries

