
var utils = {
	//判断是否是函数
	isFunction:function(obj){
	  return typeof obj === 'function';
	},
	
	/*返回指定某个key对应的参数值
	 *@param : string 目标url, 
	 * 		   key 需要查找的参数名称 
	 *@return :key对应的value值
	 */
	getUrlParamsByKey:function(string, key) {
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
	},
	/*
	 *存储sessionStorage
	 * */
	setLocalStorage:function(key, value){
		if(window.sessionStorage){
			window.sessionStorage.setItem(key, value);   
		}else{
			alert("不支持本地存储");
		}
	},
	/*
	 *通过key获取sessionStorage的值
	 * */
	getLocalStorage:function(key){
		if(window.sessionStorage){
			return window.sessionStorage.getItem(key);   
		}else{
			alert("不支持本地存储");
		}
	},
	/*
	 * 获取手机设备类型
	 * */
	getAppType:function(){
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		    return 'iphone';
		} else if (/(Android)/i.test(navigator.userAgent)) {
		   return 'android';
		} else{
			return 'pc';
		}
	},
	/*
	 * 渲染函数
	 * */
	referFn:function(box, tpl, data){
		var html = template(tpl, data);
		box.html(html);
	},
	/*
	 * 获取浏览器终端
	 * */
	getNavigatorVersion:function(){
		try{
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=='micromessenger') { 
			return true; //微信端
			} else {
			return false; //非微信端
			}
		}catch(e){
			console.log(e);
		}
	}
}