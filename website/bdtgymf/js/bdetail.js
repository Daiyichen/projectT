$(function(){
	//首页

	//所有弹框
	$.each($(".all-dialog-btn"),function(key,value){
		var typeid = $(value).data("type");
		Pupup.clickFunc(value, htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[typeid-1].title+"</span><span>"+LEAVEMG_TYPE[typeid-1].desc+"</span>" + htmlCommonObj.right,(typeid-1));	

	});



	//楼盘详情页面
	//免费通话-10
	Pupup.clickFunc(".input-box0 span","", 10);
	//立即订阅
	clickFunc1("a.btn-subscribe", htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[5].title+"</span><span>"+LEAVEMG_TYPE[5].desc+"</span>" + htmlCommonObj.right);
});

//立即订阅
//点击立即报名
var type1=[];
function clickFunc1(domElement, html) {
	$(domElement).on("click", function(e) {
		e.preventDefault();
		if($(".sub-list input[type='checkbox']:checked").length == 0){
			type1 = [];//如果没有选中的，清空数组
		}
		$.each($("ul.sub-list li"), function() {
			if ($(this).find("input[type='checkbox']").prop("checked")) {
				type1.push($(this).find("input[type='checkbox']").val());
			}
		});
		if (type1.length!=0) {
			//把5代表立即订阅，实际发送的id以实际获取的为准
			Mylayer1.prompt(html, "", "LAY_layuiform",5 , checkForm1);
		} else{
			Mylayer.prompt("请选择至少一项进行订阅哦！");
		}
	});
}
//立即订阅校验表单方法
function checkForm1() {
	$("input[type='button'].regist-submit").unbind("click").on("click", function(e) {
		e.preventDefault();
		var form = document.submitForm;
		var userName = $("#name").val(),
			tel = $("#sphone").val(),
			bid=build_res.id,
			type=type1.join(',');//立即订阅
			Pupup.postFun(bid,userName,tel,type,form);

	});
}
//免费通话校验表单方法
function checkForm2(typeId) {
	    var form = document.submitForm;
		var tel = $("#tel").val(),
			bid=build_res.id,
			type=LEAVEMG_TYPE[typeId].id;//免费通话
			if(commonFunc.checkForm("userName", tel, "error1")) {
				$.ajax({
					type:"get",
					url:"/leavemsg/ajaxCheckin",
					dataType:"json",
				    data:{"bid":bid,"name":"userName","phone":tel,"type":type},
					success:function(res){
					  if("success" == res.status){
					       commonFunc.clearForm(form);//清空表单
						   Mylayer.prompt("提交成功,顾问一定会第一时间与您取得联系！");
					   }
					},error:function(xhr){
						console.log(xhr);
					}
				});
		}else{
			return false;
		}
}