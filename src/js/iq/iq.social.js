;(function($, IQ, window, document, undefined) {

    extend(IQ, "social");
    
    //defaults
    var defaults = {
      facebook: {
        app_id: '',
        title: '',
        text: '',
        url: '',
        image: '',
        redirect: '',
        window: {
          target: "facebook",
          features: "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        }
      },
      twitter: {
        text: '',
        url: '',
        window: {
          target: "twitter",
          features: "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        }
      },
      pinterest: {
        text: '',
        url: '',
        image: '',
        window: {
          target: "pinterest",
          features: "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        }
      },
      google: {
        url: '',
        window: {
          target: "social",
          features: "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
        }
      }
    };
    var mod = this;
    // exposed function used to share content
    IQ.social.share = function(options, callback) {
      $.each(options, function( key, value ) {
          IQ.social[key](value, callback);
      });
    }
    IQ.social.pinterest = function(options, callback) {
      var opt = $.extend( {}, defaults.pinterest, options );
      var url = "http://pinterest.com/pin/create/button/?" +
        "url=" + encodeURIComponent(opt.url) +
        "&media=" + encodeURIComponent(opt.image) +
        "&description=" + encodeURIComponent(opt.text);
      triggerSetup(url, opt.window, callback);
    }
    IQ.social.twitter = function(options, callback) {
      var opt = $.extend( {}, defaults.twitter, options );
      var url = "https://twitter.com/intent/tweet?" + 
        "url=" + encodeURIComponent(opt.url) + 
        "&text=" + encodeURIComponent(opt.text);
      triggerSetup(url, opt.window, callback);
    }
    IQ.social.google = function(options, callback) {
      var opt = $.extend( {}, defaults.google, options );
      var url = "https://twitter.com/intent/tweet?" + 
        "url=" + encodeURIComponent(opt.url);
      triggerSetup(url, opt.window, callback);
    }
    IQ.social.facebook = function(options, callback) {
      var opt = $.extend( {}, defaults.facebook, options );
      var url = "https://www.facebook.com/dialog/feed?" +
        "link=" + encodeURIComponent(opt.url);
      if(typeof opt.app_id === "string") {
        url = url + "&app_id=" + encodeURIComponent(opt.app_id);
      }
      if(typeof opt.image === "string") {
        url = url + "&picture=" + encodeURIComponent(opt.image);
      }
      if(typeof opt.title === "string") {
        url = url + "&name=" + encodeURIComponent(opt.title);
      }
      if(typeof opt.text === "string") {
        url = url + "&description=" + encodeURIComponent(opt.text);
      }
      if(typeof opt.redirect === "string") {
        url = url + "&redirect_uri=" + encodeURIComponent(opt.redirect);
      }
      triggerSetup(url, opt.window, callback);
    }
    function triggerSetup(url, window, callback) {
      if(typeof callback != "function") {
        callback = function() {};
      }
      try {
        launchSocialModal(url, window);
        callback.call({}, 1, options);
      }
      catch(err) {
        // error
        callback.call({}, 0, err);
      }
    }
    function launchSocialModal(url, w) {
      if(w.target === "_self") {
        window.location = url;
      }
      else {
        var windowName = w.target;
        if(windowName === "_blank") {
          windowName = "social";
        }
        window.open(url, windowName, w.features);
      }
    }

    
})(jQuery, window.IQ = window.IQ || {}, this, this.document);