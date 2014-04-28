(function(i, s, o, g, r, a, m){
  i['GoogleAnalyticsObject'] = r; // Acts as a pointer to support renaming.

  // Creates an initial ga() function.  The queued commands will be executed once analytics.js loads.
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  },

  // Sets the time (as an integer) this tag was executed.  Used for timing hits.
  i[r].l = 1 * new Date();

  // Insert the script tag asynchronously.  Inserts above current tag to prevent blocking in
  // addition to using the async attribute.
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

;(function($, IQ, window, document, undefined) {

  extend(IQ, "ga");
  
  var configObjDefaults = {
    cookieDomain: 'auto',
    name: 'IQ_Tracker',
    sampleRate: 100,
    siteSpeedSampleRate: 1,
    allowAnchor: true,
    cookieName: '_ga',
    cookieExpires: 63072000
  };
  var fieldObjectDefaults = {
    hitCallback: function () { }
  };
  var _gaLibraryLoaded = false;
  ga(function() {
    _gaLibraryLoaded = true;
  });
  IQ.ga.ready = function() {
    return _gaLibraryLoaded;
  }
  IQ.ga.init = function(trackingId, configObj, callback) {
    var s = $.extend( {}, configObjDefaults, configObj );
    if( trackingId != undefined && typeof trackingId === "string") {
      ga('create', trackingId, s);
      callback.trigger("init");
    }
    else {
      IQ.log("Error: trackingID is not valid: " + trackingId);
    }
  }
  IQ.ga.send = function(hitType, fieldObject) {
    var s = $.extend( {}, fieldObjectDefaults, fieldObject );
    ga('send', hitType, s);
  }
  IQ.ga.set = function(fieldObject) {
    if(typeof fieldObject === "object") {
      ga('set', fieldObject);
    }
    else {
      IQ.log("Error: expected an object as an argument and recieved: " + typeof fieldObject);
    }
  }
  IQ.ga.get = function(fieldName) {
    return tracker.get(fieldName);
  }
  
})(jQuery, window.IQ = window.IQ || {}, this, this.document);
