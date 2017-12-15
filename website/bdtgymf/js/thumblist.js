$(function(){
				try{
				//模板渲染
				var html = template('layer-teplate-photo', albums);
				document.getElementById('thubmlist_wrapper').innerHTML = html;

				    layer.config({
				        //如果是独立版的layer，则将myskin存放在./skin目录下
				        //如果是layui中使用layer，则将myskin存放在./css/modules/layer目录下
				        extend: 'photoskin/photolayer.css',
				        skin: 'lay-ext-photoskin'
				    });
				    
				   
					//初始化
					initPage();

					function initPage() {
						new Layer().photosPage({
							html: $("#layer-photo-right").html(),
							id: 100, //相册id，可选
							parent: '#layer-photos-demo',
							data: albums.photos
						});
					}
				}catch(e){
					console.log(e);
				}

});

 function Layer() {};
Layer.prototype.photosPage = function(options) {
					var log = {};
					log.run = function(index) {
						var datalist = options.data;
						var layerphotoData = null;
						$.each(datalist, function(key, value) {
							//console.log(key + "-" + value);
							if(value.type == index) {
								layerphotoData = value;
								return false;
							}
						});
						layer.photos({
							photos: layerphotoData,
							anim: 5, //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
							area: ['1050px', '600px'],
							html: $("#layer-photo-right").html(),
							successCallback: function(layero, index) {
								$(".layui-layer-photos .layer-photo-right").show();
							
								//监听关闭按钮
								$(".icon-p-close").unbind('click').click(function() {
									$(".layui-layer-photos .layer-photo-right").hide();
									layer.close(index);

								})
								//修改切换按钮位置
								var leftV = (($(window).innerWidth() - 1050) / 2) / 2;
								$(".layui-layer-imgprev").css("left", -leftV);
								$(".layui-layer-imgnext").css("right", -leftV - 250);

								$.each($(".layui-layer-photos .all-dialog-btn"),function(key,value){
									var typeid = $(value).data("type");
									Pupup.clickFunc(value, htmlCommonObj.left + "<span>"+LEAVEMG_TYPE[typeid-1].title+"</span><span>"+LEAVEMG_TYPE[typeid-1].desc+"</span>" + htmlCommonObj.right,(typeid-1));	

								});
							}
						});
					};
					options = options || {};
					$(options.parent).find('img').each(function(index) {
						$(this).on('click', function() {
							var pid = $(this).data("pid");
							log.run(pid);
						});
					});
}
