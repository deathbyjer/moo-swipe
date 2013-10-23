Moo Swipe
=========

This project was built as a mootools element event that functions to gather swipe events on mobile devices.

#### Creating an Event

You can add a swipe event like this:

  $('foo').addEvent('swipe', bar);

Where *foo* is the id of an element and *bar* is a function reference.


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
