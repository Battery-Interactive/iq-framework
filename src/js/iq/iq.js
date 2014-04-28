var IQ = IQ || {};

IQ.log = function(message) {
  console.log(message);
}
IQ.print = function(data) {
  if(typeof data === "object") {
    try {
      return JSON.stringify(data);
    }
    catch(err) {
      return {};
    }
  }
  if(typeof data === "array") {
    return data.toString();
  }
  return "";
}
/*$(function() {
  function asyncEvent() {
    var df = new $.Deferred();
    $.getJSON("js/testData.json", function(data) {
      alert(data);
      df.resolve(data);
    });
    return df.promise();
  }
  asyncEvent().done(function(data) {
    alert(data);
  })
});
*/
function extend( ns, ns_string ) {
  var parts = ns_string.split('.'),
      parent = ns,
      pl, i;
  if (parts[0] == "IQ") {
      parts = parts.slice(1);
  }
  pl = parts.length;
  for (i = 0; i < pl; i++) {
      //create a property if it doesnt exist
      if (typeof parent[parts[i]] == 'undefined') {
          parent[parts[i]] = {};
      }
      parent = parent[parts[i]];
  }
  return parent;
}
