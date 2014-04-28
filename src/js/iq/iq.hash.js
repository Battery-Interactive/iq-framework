;(function($, IQ, window, document, undefined) {
  
    extend(IQ, "hash");
    var _section = "";
    var _params = [];
    var _index;
    
    //defaults
    var defaults = {
      target: "body",
      onChange: function() { },
      onInit: function() { },
      views: {},
      loader: {}
    }
    
    IQ.hash.init = function(options) {
      IQ.hash.settings = $.extend( {}, defaults, options );
      initHashListener();
    }
    IQ.hash.section = function(section) {
      if(section) {
        location.hash = section;
        return section;
      }
      return _section;
    }
    function initHashListener() {
      if(location.hash === "") {
        processLink("home", []);
      }
      else {
        processLink(getSection(), getParams());
      }
      $(window).hashchange( function(){
        if(_section !== getSection()) {
          IQ.hash.settings.onChange.call("change", { hash: getSection(), params: getParams(), section: _section, index: _index } );
          _section = getSection();
          _params = getParams();
          processLink(_section, _params);
        }
      });
    }
    function getSection() {
      return location.hash.replace("#", "").split("/")[0];
    }
    function getParams() {
      var s = location.hash.replace("#", "").split("/");
      var p = [];
      if(s.length > 0) {
        for(var i = 0; i < s.length; i += 1) {
          if(i > 0 ) {
            p.push(s[i]);
          } 
        }
      }
      return p;
    }
    function processLink(section, params) {
      var index = getIndex(section);
      _index = index;
      if(index >= 0) {
        loadView(IQ.hash.settings.views[index]["view"], params);
      }
    }
    function getIndex(section) {
      var id;
      $.each(IQ.hash.settings.views, function(key, val) {
        console.log(key + " " + val["url"]);
        if(section === val["url"]) {
          id = key;
        }
      });
      return id;
    }
    function loadView(view, deep) {
      $(IQ.hash.settings.loader).show();
      $(IQ.hash.settings.target).html("").hide().load(view, function(e) {
        $(IQ.hash.settings.target).delay(2000).fadeIn(300, function(e) {
          IQ.hash.settings.onInit.call("init", { hash: getSection(), section: _section, index: _index, params: deep } );
          $(IQ.hash.settings.loader).hide();
        })
      });
    }

})(jQuery, window.IQ = window.IQ || {}, this, this.document);