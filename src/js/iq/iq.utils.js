;(function($, IQ, window, document, undefined) {
  
    //var IQ = IQ || {};
    //declare social module of namespace
    extend(IQ, "utils");
    
    var _chars = '0123456789abcdef'.split('');
    
    IQ.utils.times = function(n, callback, thisObj){
      var i = -1;
      while (++i < n) {
        if ( callback.call(thisObj, i) === false ) {
          break;
        }
      }
    }
    IQ.utils.randHex = function(size){
      size = size && size > 0? size : 6;
      var str = '';
      while (size--) {
          str += choice(_chars);
      }
      return str;
    }
    function now(){
        // yes, we defer the work to another function to allow mocking it
        // during the tests
        return now.get();
    }

    now.get = (typeof Date.now === 'function')? Date.now : function(){
        return +(new Date());
    };

    IQ.utils.throttle = function(fn, delay){
        var context, timeout, result, args,
            diff, prevCall = 0;
        function delayed(){
            prevCall = now();
            timeout = null;
            result = fn.apply(context, args);
        }
        function throttled(){
            context = this;
            args = arguments;
            diff = delay - (now() - prevCall);
            if (diff <= 0) {
                clearTimeout(timeout);
                delayed();
            } else if (! timeout) {
                timeout = setTimeout(delayed, diff);
            }
            return result;
        }
        throttled.cancel = function(){
            clearTimeout(timeout);
        };
        return throttled;
    }
    IQ.utils.debounce = function(fn, threshold, isAsap){
        var timeout, result;
        function debounced(){
            var args = arguments, context = this;
            function delayed(){
                if (! isAsap) {
                    result = fn.apply(context, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            } else if (isAsap) {
                result = fn.apply(context, args);
            }
            timeout = setTimeout(delayed, threshold);
            return result;
        }
        debounced.cancel = function(){
            clearTimeout(timeout);
        };
        return debounced;
    }
    IQ.utils.monetize = function(val, nDecimalDigits, decimalSeparator, thousandsSeparator) {
        val = toNumber(val);
        nDecimalDigits = nDecimalDigits == null? 2 : nDecimalDigits;
        decimalSeparator = decimalSeparator == null? '.' : decimalSeparator;
        thousandsSeparator = thousandsSeparator == null? ',' : thousandsSeparator;

        //can't use enforce precision since it returns a number and we are
        //doing a RegExp over the string
        var fixed = val.toFixed(nDecimalDigits),
            //separate begin [$1], middle [$2] and decimal digits [$4]
            parts = new RegExp('^(-?\\d{1,3})((?:\\d{3})+)(\\.(\\d{'+ nDecimalDigits +'}))?$').exec( fixed );

        if(parts){ //val >= 1000 || val <= -1000
            return parts[1] + parts[2].replace(/\d{3}/g, thousandsSeparator + '$&') + (parts[4] ? decimalSeparator + parts[4] : '');
        }else{
            return fixed.replace('.', decimalSeparator);
        }
    }
})(jQuery, window.IQ = window.IQ || {}, this, this.document);