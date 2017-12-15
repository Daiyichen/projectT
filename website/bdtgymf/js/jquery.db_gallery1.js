(function($){
$.fn.db_gallery=function(options){
	var opt={
		thumWidth:110,              //缩略图的宽度
		thumGap:8,                  //缩略图的间距
		thumMoveStep:5,             //每次移动几个缩略图
		moveSpeed:300,              //移动的速度
		fadeSpeed:300,              //大图显示的速度
		end:''
	}
	$.extend(opt,options);
	return this.each(function(){
		var $this=$(this);
		var $imgSet=$this.find('.db_imgSet');
		var $imgWin=$imgSet.find('.db_imgWin');
		var $page=$this.find('.db_page');
		var $pageCurrent=$page.find('.db_current');
		var $pageTotal=$page.find('.db_total');
		var $thumSet=$this.find('.db_thumSet');
		var $thumMove=$thumSet.find('.db_thumMove');
		var $thumList=$thumMove.find('li');
		var $thumLine=$this.find('.db_thumLine');
		var $nextBtn=$this.find('.db_nextBtn');   //大图的下一张
		var $prevBtn=$this.find('.db_prevBtn');
		var $nextPageBtn=$this.find('.db_nextPageBtn'); //缩略图的下一组
		var $prevPageBtn=$this.find('.db_prevPageBtn');
		var objNum=$thumList.length;
		var currentObj = opt.currentPage || 0;
		var fixObj=0;
		var currentPage=Math.ceil((currentObj + 1)/opt.thumMoveStep) - 1;
		if (currentPage < 0) {
			currentPage = 0;
		}
		var totalPage=Math.ceil(objNum/opt.thumMoveStep);
		var oldImg;
		oldImg = $thumList.eq(currentObj).find('a').attr('href');
		init();

		function init(){
			setInit();
			setMouseEvent();
			changeImg();
			$imgWin.find("a").attr("data-btype",1);
			if (currentObj != 0) {
			    moveThum(true);	
			}
			//var $thum=$thumList.eq(currentObj);
			//$thumLine.css({'left':$thum.position().left})
		}
		
		function update () {
		}

		function setInit(){
			//芥匙老 扼牢 困摹函版
			$thumMove.append($thumLine.get())
		}

		//监听鼠标事件
		function setMouseEvent(){
			$thumList.bind('click',function(e){
				e.preventDefault();
				currentObj=$(this).index();
				changeImg();
				
			});
			$nextBtn.bind('click',function(){
				currentObj++;
				changeImg();
				currentPage=Math.floor(currentObj/opt.thumMoveStep);
				moveThum();

			});
			$prevBtn.bind('click',function(){
				currentObj--;
				changeImg();
				currentPage=Math.floor(currentObj/opt.thumMoveStep);
				moveThum();
			});
			$nextPageBtn.bind('click',function(){
				currentPage++;
				moveThum();
			});
			$prevPageBtn.bind('click',function(){
				currentPage--;
				moveThum();
			});
		
		}
		
		//移动缩略图
		function moveThum(flag){
			var pos=((opt.thumWidth+opt.thumGap)*opt.thumMoveStep)*currentPage;
			if (flag) {
			    $thumMove.css({'left':-pos});
			}else{
			    $thumMove.animate({'left':-pos},opt.moveSpeed);
			}
			setVisibleBtn();
		}

		//设置上一页、下一页的按钮
		function setVisibleBtn(){
			$prevPageBtn.show();
			$nextPageBtn.show();
			$prevBtn.show();
			$nextBtn.show();
			if(currentPage==0)$prevPageBtn.hide();
			if(currentPage==totalPage-1)$nextPageBtn.hide();
			if(currentObj==0)$prevBtn.hide();
			if(currentObj==objNum-1)$nextBtn.hide();
		}

		//切换大图
		function changeImg(){
			if(oldImg!=null){
				//何靛矾款 傈券阑 困秦 硅版俊 扁粮捞固瘤甫 硅摹
				$imgWin.css('background','url('+oldImg+') no-repeat');
			}
			//获取大图的src
			var $thum=$thumList.eq(currentObj)
			var _src=$thum.find('a').attr('href');
			if (oldImg != _src) {
			    $imgWin.find('img').hide().attr('src',_src).fadeIn(opt.fadeSpeed);
			    oldImg = _src;
			}
			
			try{
				//移动选中的缩略图边框
				$thumLine.css({'left':$thum.position().left});
			}catch(e){}

			//其捞瘤函版
			$pageCurrent.text(currentObj+1);
			$pageTotal.text(objNum);
			
			setVisibleBtn();
		}
	})
}
})(jQuery)