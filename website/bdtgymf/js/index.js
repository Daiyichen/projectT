$(function(){

	var mySwiper = new Swiper('.swiper-container',{
		    loop: true,
			autoplay: 2000,
			speed:500,
			pagination : '.pagination',
        	paginationClickable :true,
        	autoplayDisableOnInteraction:false
	});
	$('.swiper-button-prev').click(function(){
		mySwiper.swipePrev(); 
	});
	$('.swiper-button-next').click(function(){
		mySwiper.swipeNext(); 
	});
	$(".swiper-container").hover(function(){
		$(".swiper-button-prev,.swiper-button-next").show();
	},function(){
		$(".swiper-button-prev,.swiper-button-next").hide();}
	);
	
})