;(function($, IQ, window, document, undefined) {
  
    //var IQ = IQ || {};
    //declare social module of namespace
    extend(IQ, "bcom");
    extend(IQ, "bcom.bag");
    var defaults = {
      api: "http://iq.batteryinteractive.com/"
    }, settings = {};
    IQ.bcom.init = function(options) {
      settings = $.extend( {}, this.defaults, options );
    }
    IQ.bcom.getProducts = function(id, callback) {
      if(typeof id === "obj") id = id.toString();
       odataRequest("(" + id + ")", callback);
    }
    IQ.bcom.collection = function(callback, query) {
      return odataRequest(proccesOData(query), callback);
    }
    function proccesOData(odata) {
      if(!odata) return "";
      var str = "$";
      $.each(odata, function( key, val ) {
        if(str != "$") {
          str += "&";
        }
        if(typeof val === "object") {
          val = val.join(" and ");
        }
        if(key === "filter") {
          val = cleanExp(val);
        }
        str += key + "=" + val;
      });
      return "?" + str;
    }
    function cleanExp(str) {
      var lib = {
        ">==": " ge ",
        "<==": " le ",
        "<=": " le ",
        ">=": " ge ",
        "!==": " ne ",
        "!=": " ne ",
        "<": " lt ",
        ">": " gt ",
        "===": " eq ",
        "==": " eq ",
        "=": " eq "
      };
      $.each(lib, function(key, val) {
        str = str.replace(key, val);
      });
      str = str.replace(/  /g,"%20");
      str = str.replace(/ /g,"%20");
      return str;
    }
    function odataRequest(query, callback) {
      var url = defaults.api + "odata/products" + query;
      IQ.log("OData Request: " + url);
      var req = $.ajax(url);
      req.done(function(data) {
        if(typeof callback === "function") {
          callback.call(req, data);
        }
      });
      req.fail(function(data) {
        if(typeof callback === "function") {
          callback.call(req, data);
        }
      });
      return req;
    }
    IQ.bcom.bag.add = function(list, callback) {
      /*[ { upc: "22222", quantity: 2 },
        { upc: "22222", quantity: 2 }, 
        { upc: "22222", quantity: 2 } ]*/
      //callback (resp: 0 or 1, message: "");
    }
    IQ.bcom.screenshot = function(list, callback) {

    }
    IQ.bcom.closeModal = function() {
    }
})(jQuery, window.IQ = window.IQ || {}, this, this.document);