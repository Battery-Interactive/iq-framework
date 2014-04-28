;(function($, IQ, window, document, undefined) {
  //defaults
  var defaults = {
    alerts: false,
    cat: "",
    log: true,
    htmlAttributes: true
  };

  extend(IQ, "cm");
  
  IQ.cm.init = function(options) {
    //force production
    IQ.cm.setProduction(function() {
      IQ.cm.settings = $.extend( {}, defaults, options );
    });
  }
  IQ.cm.cat = function(cat) {
    if(cat) {
      var obj = {
        cat: cat,
      };
      IQ.cm.settings = $.extend( {}, defaults, obj );
    }
    if(this.settings) {
      return this.settings.cat;
    }
    return defaults.cat; 
  }
  IQ.cm.clientID = function() {
    try {
      return cm_ClientID;
    }
    catch(err) {
      IQ.log("Error reading cm_ClientID: " + err);
    }
  }
  //set production
  IQ.cm.setProduction = function(cb) {
    try{
      cm_HOST = cm_Production_HOST + "/cm?";
      cm_ClientID = "90067797";
      if(typeof cb === "function") {
        cb.trigger(cb, "complete", IQ.cm.clientID);
      }
    }
    catch(err) {
      report("Error calling setProduction().");
    }
  }
  // public function to send pageview tag
  IQ.cm.page = function(tag, cat, cb){
	  createTag("cmCreatePageviewTag", tag, cat, cb);
  }
  // public function to send element tag
  IQ.cm.element = function(tag, cat, cb){
	  createTag("cmCreatePageElementTag", tag, cat, cb);
  }
  // private function that makes calls to coremetrics
  function createTag(type, tag, cat, cb) {
    if(type === undefined) {
      report("Error. No specific coremetrics call set.");
    }
    else if(tag === undefined) {
      report("Error. No tag specified.");
    }
    else if(cat === undefined) {
      report("Error. No category specified.");
    }
    else {
      try {
        window[type](tag, cat);
        report(type + " => Tag: " + escape(tag) + " Cat: " + escape(cat), cb);
      }
      catch(err) {
        report("Error making coremetrics call. " + err);
      }
    }
  }
  function report(msg, cb) {
    if(IQ.cm.settings.alerts && msg) {
      alert(msg);
    }
    if(IQ.cm.settings.log && msg) {
      IQ.log(msg);
    }
    if(cb) {
      cb.call(cb, "complete");
    }
  }
  })(jQuery, window.IQ = window.IQ || {}, this, this.document);