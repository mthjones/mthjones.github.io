---
layout: post
title: Trees
category: back-to-basics
---

# Back to Basics:

# {{ page.title }}
***

Trees are one of my favorite data structures. They are conceptually very simple but in use, they can be very powerful. They are often used to model hierarchical relationships. Recursion is an extremely useful tool to use when working with trees and we'll use it in our implementations here. There are many variations on trees, including binary trees and binary search trees, heaps, tries, and self-balancing trees (AVL trees, red-black trees, splay trees). We'll try to cover most – if not all – of these.

{% include flickrimg.html img='https://farm3.staticflickr.com/2835/10446867315_39de6e054a_b.jpg' title='Early one October morning by Nick Kenrick, on Flickr' source='zedzap/10446867315' %}

So, what makes a tree a tree? Turns out they actually named them trees for a reason! Trees branch. In your average, everyday green (or – depending on when this is being read – orange, red or...empty) tree, there are branches that split. We can think of this as there being a parent branch that has some amount of child branches. This is essentially what the tree data structure is: a hierarchical mapping of parent and child nodes.

