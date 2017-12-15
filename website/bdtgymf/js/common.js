/**
 * Created by daib on 2016/9/21.
 */
var commonFunc = {
    regTel: /(86)?1[3|5|7|8|][0-9]{9}$/, //手机
    regUser: /^[a-zA-Z\s\u4e00-\u9fa5]+$/ ,    //只允许输入中文和英文和空格
    regNumber:/^[1-9]\d*$/,//只能是正整数
	/*
	 校验电话号码
	 * */
	checkTel:function(tel){
		return commonFunc.regTel.test(tel);
	},
	checkNumber:function(number){
		return commonFunc.regNumber.test(number);
	},
	
	/*
	 * 校验姓名：中英文 
	 * */
	checkUser:function(name){		
	   return commonFunc.regUser.test(name);
	},
	
	/*
	 *校验表单
	 */
    checkForm:function(username, tel, errorId){  		
		var $err = $("#"+errorId);
		if("" == username){
			$err.html("姓名不能为空");
			return false;
		}
		else if("" == tel){
			$err.html("手机号码不能为空");
			return false;
		}
		else if(!commonFunc.checkUser(username)){
			$err.html("姓名不合法");
			return false;
		}
		else if(!commonFunc.checkTel(tel)){
			$err.html("电话不合法");
			return false;
		}
		else{
			$err.html("");
			return true;
		}   		
   	},
	//清空表单
	clearForm:function(){
	  	for (i = 0; i < arguments.length; i++) {
	  		if(undefined != arguments[i] && "undefined" != typeof(arguments[i])){
	  			arguments[i].reset();       
	  		}	
   		}		
	}

};

//获取url的参数列表，以数组的形式返回
commonFunc.getUrlParams = function(string) {
    var obj = new Array();
    if (string.indexOf("?") != -1) {
        var string = string.substr(string.indexOf("?") + 1);
        var strs = string.split("&");
        for (var i = 0; i < strs.length; i++) {
            var tempArr = strs[i].split("=");
            obj[i] = tempArr[1];
        }
    }
    return obj;
}


/* 返回指定某个key对应的参数值

* string 目标url 
* key 需要查找的参数名称 
* return key对应的value值
*/
commonFunc.getUrlParamsByKey = function(string, key) {
    if (string.indexOf("?") != -1) {
        var string = string.substr(string.indexOf("?") + 1);
        var strs = string.split("&");
        for (var i = 0; i < strs.length; i++) {
            var tempArr = strs[i].split("=");
            if (key == tempArr[0]) {
                return decodeURI(tempArr[1]);
            }
        }
    }
    return null;
}

/* 
 * 替换url某个参数对应的值
 * 
 * url 目标url 
 * arg 需要替换的参数名称 
 * arg_val 替换后的参数的值 
 * return url 参数替换后的url 
 */
commonFunc.changeURLArg = function(url, arg, arg_val){
	var patterntmp = (arg + '=([^&]*)');
	var replaceText = arg + '=' + arg_val;
	if (url.match(patterntmp)) {
	    var tmp = '/(' + arg + '=)([^&]*)/gi';
	    tmp = url.replace(eval(tmp), replaceText);
	    return tmp;
	} else {
	    if (url.match('[\?]')) {
	        return url + '&' + replaceText;
	    } else {
	        return url + '?' + replaceText;
	    }
	}
	return url + '\n' + arg + '\n' + arg_val;
	}
/*
*	删除url里对应得参数的值
*
 */
commonFunc.deleteArg = function(url, ref) {
    var str = "";

    if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
    else
        return url;
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == ref)
            return url.substr(0, url.indexOf('?'));
        else
            return url;
    }
}


/*//处理图片加载失败
$('img').error(function(){
	    $(this).attr('src', '/web/img/defaultlogo.png');
	     $(this).parent().addClass('defaultImg');
});*/

//弹出层
var Mylayer = {
	//提交成功的提示
	prompt: function(msg, callback) {
		//layui.use('layer', function() {
		//	var layer = layui.layer;
			//配置皮肤
			layer.config({
				extend: 'dialogskin/style.css' //加载您的扩展样式
				//skin: 'layer-ext-yourskin'
			});
			//
			layer.open({
				type: 1,
				skin: 'layer-ext-myskin',
				time: 3000,
				title: false, //不显示标题栏
				closeBtn: false,
				offset: '30%',
				area: ['500px', '40px'],//默认最大宽度是360，这里要替换
				shade: 0.3,				
				shadeClose: true,
				// scrollbar: false,
				id: 'LAY_layuipro', //设定一个id，防止重复弹出		        
				content: '<div class="info">'+msg+'</div>',
				success: function(layero) {
					
				},end:function(index, layero){
					if(callback && typeof callback == "function"){
						callback();
					}				    				  
				}    
			});
		//});
	}

}

//弹出层方法1
var Mylayer1 = {
	index:null, //保存弹出层的index
	//提交成功的提示
	prompt: function(content,hei,id,typeId, successFun,callback) {
		//layui.use('layer', function() {
		//	var layer = layui.layer;
			//配置皮肤
			layer.config({
				extend: 'dialogskin/style.css' //加载您的扩展样式
				//skin: 'layer-ext-yourskin'
			});
			//
			index=layer.open({
				type: 1,
				skin: 'layer-ext-myskin1',
				title: false, //不显示标题栏
				closeBtn: true,
				area: ['383px', hei],//默认最大宽度是360，这里要替换
				shade: 0.5,
				offset: '30%',
				shadeClose: false,
				scrollbar: false,
				id: id, //设定一个id，防止重复弹出		        
				content: content,
				success: function(layero) {
					if(successFun && typeof successFun == "function"){
						successFun(typeId);
					}	
				},end:function(index, layero){
					if(callback && typeof callback == "function"){
						callback();
					}				    				  
				}    
			});
			
		//});
	},
	close:function(){
		//layui.use('layer', function() {
			//var layer = layui.layer;
			layer.close(index);
		//});
	}

}

//弹出层html
htmlCommonObj = {
	left: '<div class="send-mess black-box3">'+
        '<p class="regist-title">',
	right: '</p>'+
         '<div class="regist-form">'+
         	'<form name="submitForm" id="submitForm">'+
         		'<div class="input-box">'+
		           '<input type="text" id="name" placeholder="输入您的姓名(必填)" class="regist-input3">'+
	           '</div>'+
	           '<div class="input-box">'+
	          '<input type="text" id="sphone" placeholder="输入您的手机号(必填)" class="regist-input3">'+
	           '<p class="regist-text1" id="error"></p>'+
	           '</div>'+
	           '<input type="button" value="提交" class="regist-submit" id="btnZtbm">'+
         	'</form>'+
         '</div></div>'
}


var Pupup ={

	/* 
	弹框的绑定事件
	params:
	  domElement:目标对象的id或class
	  html:弹框内容
	  typeId:弹框的类型，详见LEAVEMG_TYPE
	*/
	clickFunc:function(domElement, html, typeId){
		$(domElement).off("click").on("click", function(e) {
			e.preventDefault();
			if (typeId==10) {
				checkForm2(typeId);
			} else{
				Mylayer1.prompt(html, "", "LAY_layuiform",typeId, Pupup.checkForm);
			}
		});
	},

	//校验表单方法
	checkForm:function(typeId){
		$("input[type='button'].regist-submit").unbind("click").on("click", function(e) {
			e.preventDefault();
			var form = document.submitForm;
			var userName = $("#name").val(),
				tel = $("#sphone").val(),
				bid=build_res.id,
				type=LEAVEMG_TYPE[typeId].id;//免费通话
				Pupup.postFun(bid,userName,tel,type,form);

		});
	},

	//ajax调用提交表单
    postFun:function(bid,userName,tel,type,form){
		if(commonFunc.checkForm(userName, tel, "error")) {
			$.ajax({
				type:"get",
				url:"/leavemsg/ajaxCheckin",
				dataType:"json",
			    data:{"bid":bid,"name":userName,"phone":tel,"type":type},
				success:function(res){
				  if("success" == res.status){
				       commonFunc.clearForm(form);//清空表单
					   Mylayer1.close();
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

}



//通知类型及描述
var LEAVEMG_TYPE =[
{"id":1,"type":"变价通知","title":"变价通知我","desc":" 留下您的手机号码,有最新价格变动消息,我们会通过手机号码第一时间通知您！"},
{"id":2,"type":"优惠通知","title":"优惠通知我","desc":"留下您的手机号码,楼盘优惠信息第一时间通知您！"},
{"id":3,"type":"开盘通知","title":"开盘通知我","desc":"留下您的手机号码,开盘信息第一时间通知您！"},
{"id":4,"type":"交房通知","title":"交房通知我","desc":"留下您的手机号码,交房信息第一时间通知您！"},
{"id":5,"type":"最新动态","title":"一键订阅","desc":"我们将为您保密个人信息！请填写您接收订阅的手机号码"},
{"id":6,"type":"看房团","title":"一键订阅","desc":"我们将为您保密个人信息！请填写您接收订阅的手机号码"},
{"id":7,"type":"看底价","title":"查看底价","desc":"请输入手机号码,您可以查看该房源的底价"},
{"id":8,"type":"经理预约","title":"预约房产顾问","desc":"请输入手机号码,房产顾问将为您提供看房服务"},
{"id":9,"type":"预约看房","title":"免费看房","desc":"请输入手机号码,我们将快速为您提供看房服务"},
{"id":10,"type":"在线咨询","title":"预约房产顾问","desc":"请输入手机号码,房产顾问将为您提供看房服务"},
{"id":11,"type":"免费通话","title":"","desc":"房产顾问尽快给您回电！"},
{"id":12,"type":"免费咨询","title":"免费咨询","desc":"为方便您咨询优惠信息,请输入手机号码"},
{"id":13,"type":"免费看房","title":"免费看房","desc":"请输入手机号码,我们将快速为您提供看房服务"},
{"id":14,"type":"查看户型价格","title":"查看户型价格","desc":"请输入手机号码,您可以查看该户型价格"},
{"id":15,"type":"获取优惠","title":"获取优惠","desc":"优惠信息将通过短信的方式发送到您填写的手机号码上"}
]