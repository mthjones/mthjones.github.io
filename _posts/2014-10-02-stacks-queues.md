---
layout: post
title: "Stacks & Queues"
category: back-to-basics
---

# Back to Basics:

# {{ page.title }}
***

## Stacks

Stacks are one of the simplest data structures out there. They are, as their name suggests, simply a stack of items.

{% include flickrimg.html img='https://farm5.staticflickr.com/4152/5092814379_dc34f1aaf5_b.jpg' source='caterina83/5092814379' title='Pancake by Caterina Guidoni, on Flickr' %}

 There are only a few necessary operations on stacks: put something on the top, take something off the top, or look at what's on the top. You can also check to see whether a stack is empty or not.

 Some non-essential but sometimes useful operations include determining the size of the stack or determining whether an item exists in the stack. These won't be covered as they aren't something unique to or necessary for stacks and are more properties of their underlying implementations.

Stacks can be implemented in a few different ways, typically using either an array or a linked list (articles on these data structures are on the agenda). Since stacks are so simple, I'll show how both can be implemented.

Since the underlying implementation has no influence on the public interface, we'll look at the interface before jumping into the implementations.

{% highlight java %}
public interface Stack<T> {
    public T pop();
    public void push(T value);
    public T top();
    public boolean isEmpty();
}
{% endhighlight %}

That's it! Pretty simple, right? Lets dive into the implementations.

### Linked List Implementation

Let's begin with the simpler of the two implementations. We could of course "cheat" by using Java's [standard library LinkedList](http://docs.oracle.com/javase/7/docs/api/java/util/LinkedList.html), but that wouldn't really explain how it works.

{% highlight java %}
public class LinkedListStack<T> implements Stack<T> {
    private class LinkedListNode<U> {
        public LinkedListNode<U> next;
        public U value;
        public LinkedListNode(U value) {
            this.value = value;
        }
    }

    private LinkedListNode<T> stack = null;

    public T pop() {
        if (isEmpty()) throw new NoSuchElementException();
        T value = stack.value;
        stack = stack.next;
        return value;
    }

    public void push(T value) {
        LinkedListNode<T> node = new LinkedListNode<>(value);
        node.next = stack;
        stack = node;
    }

    public T top() {
        if (isEmpty()) return null;
        return stack.value;
    }

    public boolean isEmpty() {
        return stack == null;
    }
}
{% endhighlight %}

Not much explanation necessary here. We define a LinkedListNode class which we use to create a very simple singly-linked list and then we define a private member to hold the head of the linked list which is the top of the stack. Popping a value just removes the head of the linked list and returns it. Pushing a value creates a new linked list node with the value, then makes it the top of the stack. Checking the top of the stack just returns the value of the head. Determining if the stack is empty is as simple as checking if the top of the stack is null.

The asymptotic running times of each of these is quite good. Constant time, in fact. Since the stack never needs to be traversed because the top is always a single member access away, all operations run in O(1).

### Array Implementation

The array backed implementation is very similar to the linked list backed implementation, but it does come with the drawback of having a maximum size (although it doesn't need to).

{% highlight java %}
public class ArrayStack<T> implements Stack<T> {
    private static int MAX_SIZE = 128;
    private T[] stack = (T[])new Object[MAX_SIZE];
    private int top = -1;

    public T pop() {
        if (isEmpty()) throw new NoSuchElementException();
        top--;
        return stack[top+1];
    }

    public void push(T value) {
        if (top == MAX_SIZE-1) throw new StackOverflowError();
        top++;
        stack[top] = value;
    }

    public T top() {
        if (isEmpty()) return null;
        return stack[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }
}
{% endhighlight %}

In fact, this implementation breaks the interface provided above, as it can throw a StackOverflowError in the push method that the interface does not specify. Fixing the implementation to allow for a non-fixed array size is left as an exercise to the reader.

All operations in this implementation also run in O(1). The tradeoff is in memory size. The linked list must allocate a new object for each item in the stack, which can grow to a large amount of memory use in cases where the stack is very large.

### Use Cases

Stacks have many potential applications. Any time you want to only access items in a collection in the reverse order that they were placed, or want to rollback to a previous state is a good time to think about using a stack. Here are some potential uses:

* Reversing something, perhaps a string
* Tracking undo/redo operations
* Creating a language interpreter
* Doing a depth-first search

***

## Queues

Queues are another fairly simple data structure that have a lot in common with stacks. The primary difference is that while stacks can only access the item that was most recently added, queues can only access the item that was least recently added (the oldest).

{% include flickrimg.html img='https://farm3.staticflickr.com/2793/4393393907_e9db81abec_b.jpg' source='oldpatterns/4393393907' title='Queuing for Space Mountain by Peter Lee, on Flickr' %}

Queues have only a small number of necessary operations as well. You can take the item from the front, push an item to the back, look at the front item or check if the queue is empty. Let's look at the interface:

{% highlight java %}
public interface Queue<T> {
    public void enqueue(T value);
    public T dequeue();
    public T peek();
    public boolean isEmpty();
}
{% endhighlight %}

Queues, much like stacks, can be implemented using both arrays and linked lists. I'm only going to focus on the linked list implementation, as it is the simpler of the two.

### Implementation

Let's just jump right into it!

{% highlight java %}
public class LinkedListQueue<T> implements Queue<T> {
    private class LinkedListNode<U> {
        public LinkedListNode<U> next;
        public U value;
        public LinkedListNode(U value) {
            this.value = value;
        }
    }

    private LinkedListNode<T> queueFront;
    private LinkedListNode<T> queueEnd;

    public void enqueue(T value) {
        LinkedListNode<T> node = new LinkedListNode<>(value);
        if (isEmpty()) {
            queueFront = queueEnd = node;
        } else {
            queueEnd.next = node;
            queueEnd = node;
        }
    }

    public T dequeue() {
        if (isEmpty()) throw new NoSuchElementException();
        T front = queueFront.value;
        queueFront = queueFront.next;
        return front;
    }

    public T peek() {
        if (isEmpty()) return null;
        return queueFront.value;
    }

    public boolean isEmpty() {
        return queueFront == null;
    }
}
{% endhighlight %}

This implementation is a bit more difficult than the stack implementation, but that's due to wanting to reduce the running time of the operations on the queue. We use a doubly linked list for the queue which affords us constant time access to both the front and back of the queue, meaning that all operations have O(1) time complexity.

### Use cases

Queues also have many potential applications, especially when using a more advanced type, such as a double-ended queue or a priority queue, which we'll cover later.

Generally, a basic queue is a good choice when you want to access items in the same order they were added.

* Job processing
* Asynchronous data transfer
* Doing a breadth-first search
