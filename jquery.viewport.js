/**!
 * jQuery Viewport Plugin
 *
 * Copyright (c) 2011-2014 Koen Punt - http://koen.pt
 *
 * Available for use under the MIT License
 */

;(function( $ ){
  $.fn.extend({

    inViewport: function(options){
      var visibleElements = this.filter(function(){
        return $.inViewport(this, options);
      });
      return this.pushStack(visibleElements);
    },

    mostVisible: function(){
      var visibleElements = this.inViewport()
        , max = 0, visibility, mostVisible;

      visibleElements.each(function(i, el){
        visibility = $(el).data('vpVisibility');
        if(visibility > max){
          max = visibility;
          mostVisible = el;
        }
      });
      return $(mostVisible);
    }
  });

  var defaults = {offsetTop: 0, offsetBottom: 0};

  $.inViewport = function(element, options){
    var element = $(element)
      , opts = $.extend({}, defaults, options || {})
      , scrollTop = $(window).scrollTop() + opts.offsetTop
      , windowHeight = $(window).height() - opts.offsetTop - opts.offsetBottom
      , offset = element.offset()
      , elementBottom = offset.top + element.height() - scrollTop
      , elementTop = offset.top - scrollTop
      , a, b;

    if(elementTop - (windowHeight - element.height()) > element.height()){
      a = element.height();
    }else{
      a = elementTop - (windowHeight - element.height());
    }
    a = a > 0 ? a : 0;

    if(elementBottom > element.height()){
      b = element.height();
    }else{
      b = elementBottom;
    }
    b = b > 0 ? b : 0;

    vpVisibility = (b-a) / element.height();
    element.data('vpVisibility', vpVisibility);
    return vpVisibility;
  };

})( jQuery );