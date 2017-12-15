


var hx_owl = null;
var l_owl ;
var url=window.location.href;
var bednum=utils.getUrlParamsByKey(url,"bednum");
var jsonData=json;
var len=jsonData.length;
var renderData={
	    room:{
	    	allType:0,
			type1:0,
			type2:0,
			type3:0,
			type4:0,
			type5:0,
			typeOther:0,
	    },
		data:{
			allTypeArea:[],
			sameTypeArea1:[],
			sameTypeArea2:[],
			sameTypeArea3:[],
			sameTypeArea4:[],
			sameTypeArea5:[],
			sameTypeAreaOther:[],
		},
		details:{
				pic:"https://pic2.ajkimg.com/display/xinfang/dbee519ca9eea61c9dbf4c1f790214b8/500x600n.jpg",
				name:"龙湖唐宁ONEA1户型图",
				bedroom:"",
				area:"95.00㎡",
				direction:"南北通透",
				single_price:"4900元/平米",
				price:"41万元 近期报价总汇",
				differ_price:"30元",
				loan:"首付三成/30年/月供2038.30元房",
				household:"1梯2户",
				decoration:"毛坯",
				youhui:"万科四季花城 L型户型 85平 9折优惠"
			}
};
$(function(){
	var allTypeArea=[],sameTypeArea1=[],sameTypeArea2=[],sameTypeArea3=[],sameTypeArea4=[],sameTypeArea5=[],sameTypeAreaOther=[];
	renderData.room.allType=len;
	for (var i=0;i<len;i++) {
		for (var item in jsonData[i]) {
			//计算各个户型的数量
			if (item=="bednum") {
				switch (jsonData[i][item]){
					case 1: renderData.room.type1+=1;
					        sameTypeArea1.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
						break;
					case 2: renderData.room.type2+=1;
					        sameTypeArea2.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
						break;
					case 3: renderData.room.type3+=1;
					        sameTypeArea3.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
						break;
					case 4: renderData.room.type4+=1;
					        sameTypeArea4.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
						break;
					case 5: renderData.room.type5+=1;
					        sameTypeArea5.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
						break;
					default:renderData.room.typeOther+=1;
					        sameTypeAreaOther.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
						break;
				}
			}
		}
		//处理总户型和
		allTypeArea.push({type:jsonData[i].bedroom,area:jsonData[i].area,hid:jsonData[i].hid});
	}
	handleTypeData("sameTypeArea1",sameTypeArea1);
	handleTypeData("sameTypeArea2",sameTypeArea2);
	handleTypeData("sameTypeArea3",sameTypeArea3);
	handleTypeData("sameTypeArea4",sameTypeArea4);
	handleTypeData("sameTypeArea5",sameTypeArea5);
	handleTypeData("sameTypeAreaOther",sameTypeAreaOther);
	handleTypeData("allTypeArea",allTypeArea);
	if (bednum) {
		bednum=parseInt(bednum);
		   if (bednum==1||bednum==2||bednum==3||bednum==4||bednum==5) {
		   	//初始化将bednum户型的数据复制给currentTypeArea
		   	renderData.data.currentTypeArea=renderData.data["sameTypeArea"+bednum];
		   } else{
		   	bednum=6;
		   	//初始化将bednum户型的数据复制给currentTypeArea
		   	renderData.data.currentTypeArea=renderData.data["sameTypeAreaOther"];
		   }
		
		//渲染模板
		referFn($(".room-box"), "tpl", renderData.room);
		$("ul.huxing-type-list li a[id='"+bednum+"']").addClass("current");
		$("ul.huxing-type-list li a[id='"+bednum+"']").parent().siblings().find("a").removeClass("current");
		
		//通过hid获取当前居室的详情
		var hid=renderData.data.currentTypeArea[0][0].hid;
		getDetails(jsonData,len,hid);
		
	} else{
		renderData.details.pic=jsonData[0].pic;
		renderData.details.name=jsonData[0].name;
		renderData.details.bedroom=jsonData[0].bedroom;
		renderData.details.area=jsonData[0].area;
		renderData.details.direction=jsonData[0].direction;
		renderData.details.single_price=jsonData[0].single_price;
		renderData.details.price=jsonData[0].price;
		renderData.details.differ_price=jsonData[0].differ_price;
		renderData.details.loan=jsonData[0].loan;
		renderData.details.household=jsonData[0].household;
		renderData.details.decoration=jsonData[0].decoration;
		renderData.details.youhui=jsonData[0].youhui;
		console.log(renderData);
		//初始化将全部户型的数据复制给currentTypeArea
		renderData.data.currentTypeArea=renderData.data.allTypeArea;
		//渲染模板
		referFn($(".room-box"), "tpl", renderData.room);
		$("ul.huxing-type-list li").eq(0).find("a").addClass("current");
	}
	
	referFn($(".type-box"), "tpl0", renderData.data);
	load_Carousel();
    add_currenthx();
    //渲染模板
	referFn($(".details-box"), "tpl1", renderData.details);
	//有楼盘优惠通知我proup-box
	Pupup.clickFunc(".sign-btn", htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[1].title+"</span><span>"+LEAVEMG_TYPE[1].desc+"</span>" + htmlCommonObj.right,1);
	//click切换不同居室
	$("ul.huxing-type-list li").unbind("click").on("click",function(){
		$(this).find("a").addClass("current");
		$(this).siblings().find("a").removeClass("current");
		var key=$(this).find("a").data("key");
		if (key==0) {
			renderData.data.currentTypeArea=renderData.data["allTypeArea"];
		}else{
			renderData.data.currentTypeArea=renderData.data["sameTypeArea"+key];
		}
		//渲染模板
		referFn($(".type-box"), "tpl0", renderData.data);
		load_Carousel();
	    add_currenthx();
		//通过hid获取当前居室的详情
		var hid=renderData.data.currentTypeArea[0][0].hid;
		getDetails(jsonData,len,hid);
	    //渲染模板
		referFn($(".details-box"), "tpl1", renderData.details);
		//有楼盘优惠通知我proup-box
		Pupup.clickFunc(".sign-btn", htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[1].title+"</span><span>"+LEAVEMG_TYPE[1].desc+"</span>" + htmlCommonObj.right,1);
	});
	
	
});
//切换详情
function changeDetail($this){
	//click相同居室不同area的详情
		$($this).addClass("currenthx");
		$($this).parent().siblings().find("a").removeClass("currenthx");
		var hid=$($this).data("hid");
		getDetails(jsonData,len,hid);
		//渲染模板
		referFn($(".details-box"), "tpl1", renderData.details);
		//有楼盘优惠通知我proup-box
	Pupup.clickFunc(".sign-btn", htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[1].title+"</span><span>"+LEAVEMG_TYPE[1].desc+"</span>" + htmlCommonObj.right,1);
}
//通过hid获取详情
function getDetails(obj,len,hid){
		for (var j=0;j<len;j++ ) {
			if (obj[j]["hid"]==hid) {
				renderData.details.pic=obj[j].pic;
				renderData.details.name=obj[j].name;
				renderData.details.bedroom=obj[j].bedroom;
				renderData.details.area=obj[j].area;
				renderData.details.direction=obj[j].direction;
				renderData.details.single_price=obj[j].single_price;
				renderData.details.price=obj[j].price;
				renderData.details.differ_price=obj[j].differ_price;
				renderData.details.loan=obj[j].loan;
				renderData.details.household=obj[j].household;
				renderData.details.decoration=obj[j].decoration;
				renderData.details.youhui=obj[j].youhui;
				break;
			}
		}
}
//处理户型数据
function handleTypeData(param1,param2){
	var k=0;
	renderData.data[param1].length=Math.ceil(param2.length/6);
	for (var j=0;j<param2.length;j++) {
		if(j%6==0){
			if (j!=0) {
				k++;
			}
			renderData.data[param1][k]=[];
		}
		renderData.data[param1][k].push({type:param2[j].type,area:param2[j].area,hid:param2[j].hid});
		
	}
}
function load_Carousel() {
        /*
         *  户型轮播切换的相关处理 --start
         */
   hx_owl = $("#hx_carousel");
   var key=$(".huxing-type-list li a.current").data("type"); //获取当前居室
   var bFlag1 = false;
   var l_owl = $(".owl-carousel").data('owlCarousel');
   hx_owl.owlCarousel({
   	    items: 1,
        navigation: true,    
        autoPlay: false,
        stopOnHover: true,
        slideSpeed:500,
        rewindNav : false,
        addClassActive: true,
        beforeMove:function(e){
        bFlag1 = true;
        }
    });
   $(".hu-info-list .owl-prev").click(function(e){
   		if($(this).hasClass("disabled") && !bFlag1){
   		
   			alert("【"+key+"居室户型/全部户型】已经到头儿啦!");
   		}
   		bFlag1 = false;
   });
   $(".hu-info-list .owl-next").click(function(e){
   		if($(this).hasClass("disabled") && !bFlag1){
   		
   			alert("【"+key+"居室户型/全部户型】已经到底儿啦!");
   		}
   		bFlag1 = false;
   });
   	//判断户型轮播是否显示左右切换按钮
   	if(!showHxCarouselControls()){ 
   		$(".hu-info-list .owl-theme .owl-controls .owl-buttons div").addClass("disabled");
   		$(".hu-info-list .owl-prev,.hu-info-list .owl-next").unbind("click");
   	} 
}
//判断是否能显示户型的轮播的左右切换按钮，超过7个菜显示
function showHxCarouselControls(){
    var length = $("#hx_carousel div.owl-item").length;
        if(length > 1){
                return true;
        }else{
                return false;
        }

}
function add_currenthx(){
        var detail_id=$("#detail_id").val();
        $("a[hx_id]").removeClass("currenthx");        //清空激活状态
        $("a[hx_id="+detail_id+"]").addClass("currenthx");//选取激活状态
        var currentIndex = $("a[hx_id="+detail_id+"]").parent().index();
//		hx_owl.trigger('jumpTo('+currentIndex+')');
        var owl = $(hx_owl).data('owlCarousel');
        owl.goTo(currentIndex) ; // Go to x slide
        console.log(currentIndex);
}
//渲染函数
function referFn(box, tpl, data){
	var html = template(tpl, data);
	box.html(html);
}