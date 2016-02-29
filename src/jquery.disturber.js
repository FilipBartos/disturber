;( function( $, window, document, undefined ) {
  "use strict";
    // defaults
    var codename = "disturber",
      defaults = {
        scenes: [],
        offset: -300,
        classHolder: 'out-of-view',
        mobile: true
      };
    // constructor
    function Plugin ( element, options ) {
      this.element = element;
      this.settings = $.extend( {}, defaults, options );
      this._defaults = defaults;
      this._name = codename;
      //custom variables
      this.elements = [];
      this.view = {};
      this.scrollTimer;
      this.scrollDelay = 500;
      //init
      this.init();
    }
    $.extend( Plugin.prototype, {
      // logic
      init: function() {
        if(this.isDeviceCompatible()) {
          this.mapScenes();
          this.attachEvents();
          this.handleChange();
        }
      },
      mapScenes: function() {
        var that = this;
        this.settings.scenes.forEach(function(scene) {
          that.identifyScene(that, scene);
        });
      },
      identifyScene: function(that, scene) {
        $(scene.selector).each(function(index) {
          var item = {selector: scene.selector,
                      index: index,
                      action: scene.action,
                      position: $(this).offset(),
                      height: $(this).height()};
          that.elements.push(item);
        });
      },
      // event handlers
      attachEvents: function() {
        var that = this;
        $(window).scroll(function(){
          if (that.scrollTimer) { return; }
          that.scrollTimer = setTimeout(function() {that.handleChange()}, that.scrollDelay);   // set new timer
        });
        $(window).resize(function(){
          that.handleChange();
        });
      },
      detachEvents: function() {
        this.scrollTimer = null;
        $(window).unbind('scroll');
        $(window).unbind('resize');
      },
      // handlers
      isDeviceCompatible: function() {
        var that = this;
        if((!this.settings.mobile) && this.isMobile()) {
          jQuery('body .'+that.settings.classHolder).each(function(){
            jQuery(this).removeClass(that.settings.classHolder);
          });
          return false;
        }
        return true;
      },
      handleChange: function() {
        this.scrollTimer = null;
        this.updateView();
        this.getVisibleScenes();
        this.handleStateChange();
      },
      handleStateChange: function() {
        var allScenesVisible = true;
        this.elements.forEach(function(item, index) {
          if(item.visible === undefined) {
            allScenesVisible = false;
            return false;
          }
        });
        if(allScenesVisible) {
          this.detachEvents();
        }
      },
      // getters
      getVisibleScenes: function() {
        var that = this;
        this.elements.forEach(function(item, index) {
          if((item.height + that.view.boundaries.bottom >= that.view.document.height) 
             || (item.position.top < (that.view.boundaries.bottom + that.settings.offset))) {
            if(item.visible === undefined) {
              item.visible = true;
              that.updateScene(item);
            }
          }
        });
      },
      // setters
      updateScene: function(item) {
        $(item.selector).eq(item.index).removeClass(this.settings.classHolder);
        if(item.action.css != undefined) {
          $(item.selector).eq(item.index).addClass(item.action.css);
        }
        if(item.action.js != undefined) {
          item.action['js']();
        }
      },
      updateView: function() {
        this.view.document = {height: $(document).height()}
        this.view.boundaries = {top: $(document).scrollTop(),
                                bottom: $(document).scrollTop() + $(window).height()};                            
      },
      // helpers 
      isMobile: function() {
            return /Android|iPad|iPod|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
      }
    });
    $.fn[codename] = function( options ) {
      return this.each( function() {
        if (!$.data(this,"plugin_" + codename)) {
          $.data(this,"plugin_" +
            codename, new Plugin(this, options));
        }
      });
    };
})(jQuery, window, document);