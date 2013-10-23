var SwipeEvent = new Class({
  f: function() { },
  swipeTimelimit: 1000,
  minSpeed: 100,
  minDistance: 50,
  percentage: .2,
  angle: 30,

  initialize: function(el, f) {
    this.element = el;
    this.f = f;
      
    this.boundStart = this.startTouch.bind(this);
    this.boundMove = this.moveTouch.bind(this);
    this.boundEnd = this.endTouch.bind(this);
  
    this.addTheEvents();
    
    this.slope = Math.tan(this.angle * Math.PI / 180);
  },
  addTheEvents: function() {
    this.element.addEvent('touchstart', this.boundStart);
    this.element.addEvent('touchmove', this.boundMove);
    this.element.addEvent('touchend', this.boundEnd);
  },
  
  removeTheEvents: function() {
    this.element.removeEvent('touchstart', this.boundStart);
    this.element.removeEvent('touchmove', this.boundMove);
    this.element.removeEvent('touchend', this.boundEnd);
  },
  
  destroy: function() {
    this.removeTheEvents();
    
    delete this.boundStart;
    delete this.boundMove;
    delete this.boundEnd;
  },
  
  startPosition: false,
  startTouch: function(evt) {    
    if (!evt.touches || evt.touches.length == 0)
      return;
    
    this.startTime = (new Date()).getTime();
    this.startPosition = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
    this.lastPosition = false;
    
  //  this.removePosition.delay(this.swipeTimelimit, this);
  },
  
  removePosition: function() {
    this.startPosition = false;
  },
  
  moveTouch: function(evt) {
    
    // We could make it so that we only preventDefault on Android, where it is required,
    //  but that would have different use cases for Android and iOS
    evt.preventDefault();
      
    if (!evt.touches || evt.touches.length == 0)
      return;
    
    var touch = evt.touches[evt.touches.length - 1];
    this.lastPosition = { x: touch.clientX, y: touch.clientY };
  },
  
  endTouch: function(evt) {
    var start = this.startPosition, end = this.lastPosition, endTime = (new Date()).getTime();
    
    if (!start || !end) 
      return;
    
    var deltax = Math.abs(end.x - start.x), deltay = Math.abs(end.y - start.y);
    
    var distance = Math.sqrt( deltax*deltax + deltay*deltay ),
        xslope = (deltax < 1) ? 0 : deltay / deltax,
        yslope = (deltay < 1) ? 0 : deltax / deltay;
    
    
    out = { axis: false, dir: false };
    if (xslope < this.slope) {
      out.axis = 0;
      out.dir = (end.x - start.x) / deltax;
    } else if (yslope < this.slope) {
      out.axis = 1;
      out.dir = (end.y - start.y) / deltay;
    } else
      return;
    
    var deltaTime = (endTime - this.startTime) / 1000;
    var min_distance = Math.max(this.minDistance, this.element.getSize()[ out.axis == 0 ? 'x' : 'y'] * this.percentage);
    if (distance > min_distance && distance / deltaTime > this.minSpeed)
      this.f(out);
  }
});

Element.Events.swipe = {
  onAdd: function(f) {
    this.store('__swiping_event', new SwipeEvent(this, f));
  },
  
  onRemove: function() {
    this.retreive('__swiping_event').destroy();
    this.eliminate('__swiping_event');
  }
};