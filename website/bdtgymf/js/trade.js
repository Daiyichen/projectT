$(function(){
		$(window).on("load resize",function(){
			var h=$(window).height(),
			    h1=$("header").height(),
			    h2=$("footer").height(),
			    h3=$(".main-wrapper").height();
			if (h>=h1+h2+h3) {
				$(".main-wrapper").height(h-h1-h2-30);
			}
		});
		//有楼盘优惠通知我proup-box
		Pupup.clickFunc("a.btn", htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[6].title+"</span><span>"+LEAVEMG_TYPE[6].desc+"</span>"+ htmlCommonObj.right,6);
});
