Moo Swipe
=========

This project was built as a mootools element event that functions to gather swipe events on mobile devices.

#### Creating an Event

You can add a swipe event like this:

    $('foo').addEvent('swipe', bar);

Where *foo* is the id of an element and *bar* is a function reference.

##### Important
Please note that in order for this to work on Android, touchmove's default functionality had to be prevented.
This means that any object you add a swipe event to will no longer have use of such basic functionalities, like
scrolling, so please apply it only to areas you need a swipe event. 

While the same rule does not apply for iOS, we have implemented the prevention of functionality in order to maintain
the same effects between iOS and Android use cases.

#### Event Object

The function (in this case _bar_) is given a single argument containing, at this point, two variables.

The object looks as such:

    {
      axis: 0,
      dir: 1
    }

Where axis can be either 0 or 1, where 0 indicates the x axis and 1 indicates the y axis. Currently, 
there is no support for diagonal swipes (this may be added later).

Dir refers to the direction. -1 indicates travel from higher numbered points to lower and 1 indicates lower
numbered points to higher.

#### Contact

If you have any questions about this module, please feel free to contact me at deathbyjer@gmail.com
