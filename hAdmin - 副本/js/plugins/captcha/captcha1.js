/*
 * captcha - v1.0.0
 * Made by icy
 */
;
(function($, window, document, undefined) {

	var pluginName = "captcha",
		defaults = {
			captchaInput: '',
			captchaVal:''
		};

	function Plugin(element, options) {
		this.element = $(element);
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function() {
			var self = this;
			var $element = this.element[0];
			self.drawPic($element);
			this.element.on('click',function(e) {
				e.preventDefault();
				//document.getElementById("captcha").focus();
				this.drawPic($element);
			}.bind(this));
		},
		/**生成一个随机数**/
		randomNum: function(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},

		/**生成一个随机色**/
		randomColor: function(min, max) {
				var r = this.randomNum(min, max);
				var g = this.randomNum(min, max);
				var b = this.randomNum(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
		},
			/**绘制验证码图片**/
		drawPic: function($element) {
			var canvas = $element;
			var width = canvas.width;
			var height = canvas.height;
			var ctx = canvas.getContext('2d');
			ctx.textBaseline = 'bottom';

			/**绘制背景色**/
			ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
			ctx.fillRect(0, 0, width, height);
			/**绘制文字**/
			var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
			var arr = [];
			for(var i = 0; i < 4; i++) {
				var txt = str[this.randomNum(0, str.length)];
				arr.push(txt);
				ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
				ctx.font = this.randomNum(16, 40) + 'px SimHei'; //随机生成字体大小
				var x = 10 + i * 25;
				var y = this.randomNum(25, 45);
				var deg = this.randomNum(-45, 45);
				//修改坐标原点和旋转角度
				ctx.translate(x, y);
				ctx.rotate(deg * Math.PI / 180);
				ctx.fillText(txt, 0, 0);
				//恢复坐标原点和旋转角度
				ctx.rotate(-deg * Math.PI / 180);
				ctx.translate(-x, -y);
			}
			
			defaults.captchaVal = arr.join('');
			/**绘制干扰线**/
			for(var i = 0; i < 8; i++) {
				ctx.strokeStyle = this.randomColor(40, 180);
				ctx.beginPath();
				ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
				ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
				ctx.stroke();
			}
			/**绘制干扰点**/
			for(var i = 0; i < 100; i++) {
				ctx.fillStyle = this.randomColor(0, 255);
				ctx.beginPath();
				ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
				ctx.fill();
			}
		},
		remove: function() {
			this.element.off("." + pluginName);
			this.element.removeData(pluginName);
		}
	};
	Plugin.prototype.getCaptchaVal = function(){
			return defaults.captchaVal;
	};

	
	$.fn[pluginName] = function(options) {
		var args = Array.prototype.slice.call(arguments, 1);
		return  this.each(function() {
			var el = $(this);
			if(el.data(pluginName)) {
				el.data(pluginName).remove();
				
			}
			el.data(pluginName, new Plugin(this, options));
			/*else{
				// Manual operatsions. show, hide, remove, e.g.
				if (typeof el.data(pluginName)[options] === 'function') {
					el.data(pluginName)[options].apply(el.data(pluginName), args);
				}
			}
			*/
		});
		//return this;
	};

})(jQuery, window, document);