/*
 * 日志插件
 */

$.extend({
	log:function(message){
		var now = new Date();
		var y = now.getFullYear(),
			m = now.getMonth() +1,//月份从0开始的
			d = now.getDate(),
			h = now.getHours(),
			min = now.getMinutes(),
			s = now.getSeconds(),
			time = y +"-"+m+"-"+d+ ' ' + h + ':' + min + ':' + s;
		 console.log(time + ' My App: ' + message);
	}

});

//调用
//$.log('initializing...'); 