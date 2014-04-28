$(function(){
  $(document).foundation();


  IQ.log("test");
  
  //init the coremetrics module
  IQ.cm.init({
    alerts: false
  });
  
  //init the hash module
  IQ.hash.init({
    target: ".page",
    loader: "#spinner",
    views: [
      { url: "home", view: "home.html", cm: "home"},
      { url: "lips", view: "lips.html", cm: "lips"},
      { url: "eyes", view: "eyes.html", cm: "eyes"},
      { url: "cheeks", view: "cheeks.html", cm: "cheeks"},
      { url: "skin", view: "skin.html", cm: "skin"},
      { url: "scent", view: "scent.html", cm: "scent"},
      { url: "secret-weapons", view: "secret-weapons.html", cm: "secret-weapons"},
      { url: "express-your-selfie", view: "express-your-selfie-comps2.html", cm: "selfie"}
    ],
    onInit: function(obj) {
      IQ.log(JSON.stringify(obj));
      setArrow(obj.index - 1);
      window.pageInit(IQ, "spring14_beauty", obj.params);
    },
    onChange: function(obj) {
      //alert(obj.hash + " " + obj.section);

      //alert($('.top-bar-section ul').css("left"));
     // GetLeftPos('.top-bar-section ul');
    }
  });
  var arrowPos = [182, 237, 303, 371, 429, 540, 770];
  var nav_cm = ["lips", "eyes", "cheeks", "skin", "scent", "secret-weapons", "selfie"];
    function setArrow(id) {
    if(id >= 0 && id <= 6) {
      var leftPos = parseInt($('.navbtn' + id).css("left").replace("px", "")) + ($('.navbtn' + id).width() / 2) - ($('.navArrow').width()/2);
      $(".navArrow").animate({ left: leftPos }, 300, "easeInOutExpo");
    }
  }
  $('.name').on("click", function() {
    $(".navArrow").animate({ left: -1000 }, 300, "easeInOutExpo")
  });
  $('ul.right li').on("click", function(e) {
    var id = $(this).index();
    IQ.cm.element("top_nav-" + nav_cm[id], "spring14_beauty");
  });
  $('ul.title-area h1 a').on("click", function(e) {
    IQ.cm.element("top_nav-strike_a_pose", "spring14_beauty");
  });
  if( "MozAppearance" in document.documentElement.style ) {
      $('.logo img').addClass('image-scale-hack');
  }
  
})

jQuery(document).ready(function () {
  if (jQuery("HTML").hasClass("ie8-custom")) {
    for (var c = 1; c <= 12; c++) {
        jQuery('.small-' + c + '[class*="medium"]').removeClass("small-" + c);
        //Perform any other column-specific adjustments your design may require here
    }
    jQuery('.show-for-small').remove();
    jQuery('.hide-for-small').removeClass('hide-for-small');
    jQuery('.top-bar-section UL').css({ width: "inherit" });
    jQuery('.top-bar-section UL LI').css({ float: "left" });
    jQuery('.top-bar').css({ height: "inherit" });
  }
});
