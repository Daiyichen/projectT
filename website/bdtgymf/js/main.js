$(function() {
	//gallery 图集
	$('#db_gallery').db_gallery({
		thumWidth: 145,
		thumGap: 4,
		thumMoveStep: 4,
		moveSpeed: 300,
		fadeSpeed: 500
	});
	//底部优惠条显示隐藏
	$(".icon-close1").click(function(){
		var w = $(window).innerWidth();
		$(this).parent().animate({left:-w+"px"}, 300, 'linear', function(){
			$(".small-discount-slide").animate({left:0}, 300);
		})
	})
	
	$(".small-discount-slide").click(function(){
		$(this).animate({left:"-220px"}, 300, 'linear', function(){
			$(".layer-discount").animate({left:0}, 300);
		})
	})
	//顶部弹框关闭按钮
	$(".icon-d-close").click(function(e){
		$(this).parent().fadeOut();
	})
});