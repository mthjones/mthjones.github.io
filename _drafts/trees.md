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

As simple as the concept is, there are many, many ways to represent it, each with their pros and cons and situational uses.

## Binary Search Trees
Binary search trees are the simplest tree representation. A node can have up to two children, those being the left or right child. Think of a family tree in reverse, in which instead of having two parents to a child one would have two children to a parent. Binary search trees also have a constraint that their contents must be ordered such that for any node, all items on the left subtree are less than, and all items on the right subtree are greater than.

The operations on a binary search tree are like most collections: inserting an item, removing an item, searching for an item, and traversing the whole of the tree.

So, what does the interface for a tree look like?

{% highlight java %}
public abstract class Tree<T> {
    public void insert(T item);
    public void remove(T item);
    public boolean contains(T item);
    public void traverse(???);
}
{% endhighlight %}

Note that traverse is missing a parameter. We want to pass something in to the traversal method that actually does something when we traverse the nodes, since the binary tree doesn't actually know in advance what we want to do. We'll assume there is some interface for a Visitor class that handles this task.

We also use a private inner class to represent a node in the binary search tree as well.

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

Insertion is completed in O(lg(n)) time, as we split the tree in two each time, so we only ever need to traverse at most lg(n) items.

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

Much like insertion, searching is done by checking the current node and then either the left or right subtree if necessary. Because of this, searching can also be completed in O(lg(n)) time.

#### Deletion
Things start to get tricky when we start trying to delete nodes from a binary search tree. There are a few cases to consider what should happen when we try to delete a node that:

1. doesn't exist
2. has no children
3. has one child
4. has two children

Luckily, the first two cases are trivial to implement, and the third only requires a bit of work. The fourth on the other hand can be a bit more challenging.

## Red-Black Trees

## Tries


