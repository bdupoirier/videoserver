

/* Utilisation JQuery pour fonctionnement Carousel Youtube et Dailymotion sur mobile */
$(document).ready(function () {
   
   $(".carousel-item").each(function(value, index){
      console.log($(this));
      if(index == 0){
         $(this).addClass("active");
      }
   })
   $("#carouselExampleIndicators:first-child").addClass('active');
   $(".carousel").on("touchstart", function (event) {
     var xClick = event.originalEvent.touches[0].pageX;
     $(this).one("touchmove", function (event) {
       var xMove = event.originalEvent.touches[0].pageX;
       if (Math.floor(xClick - xMove) > 5) {
         $(this).stop().carousel('next');
       }
       else if (Math.floor(xClick - xMove) < -5) {
         $(this).stop().carousel('prev');
       }
     });
     $(this).on("touchend", function () {
       $(this).off("touchmove");
     });
   });
 });