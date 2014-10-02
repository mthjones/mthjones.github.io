---
layout: post
title: "Back to Basics: Data Structures: Stacks & Queues"
---

# {{ page.title }}
***

## Stacks

Stacks are one of the simplest data structures out there. They are, as their name suggests, simply a stack of items.

<figure>
<img src="https://farm5.staticflickr.com/4152/5092814379_dc34f1aaf5_b.jpg" alt="Pancake by Caterina Guidoni, on Flickr">
<figcaption><a href="https://www.flickr.com/photos/caterina83/5092814379">Pancake by Caterina Guidoni, on Flickr</a></figcaption>
</figure>

 You can do only a few operations on stacks: put something on the top, take something off the top, or look at what's on the top. You can also check to see whether a stack is empty or not.

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

***

## What is this?
Now that I've graduated university, I need to prepare for my upcoming interviews. I've decided to go back and review data structures and algorithms as well as some other important concepts (such as parallelization/concurrency). The intent is to both refresh my memory on some that I may not have touched for a few years, as well as create a reference that I or other interested people can look back on.

Code samples may be provided in a number of different languages. Since I'm using this to prepare for interviews, I will focus on traditional languages such as Java, Javascript, Python and C++, but don't be too surprised to see a Scala, Dart or Haskell example sneak in here or there.

I also hope to include actual use cases of the topic being reviewed. Whether that's a simple demonstration I develop or just a reference to someone else's demonstration, or even a link to an open-source project that actually uses it remains to be seen.

Finally, I may (and probably will!) make mistakes. Please feel free to send your feedback to [me](mailto:me@mthjones.com)! I will do my best to keep everything correct, but remember that I'm human!
