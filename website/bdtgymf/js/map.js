$(function() {
	var mapOption = [["地铁站","公交车站","轻轨站"], ["幼儿园","小学","中学","大学"], ["医院","诊所","药房"], ["银行","自动提款机"], ["超级市场","便民商店"], ["餐饮"]];
	var placeSearch = null;
	// var longitude = '<?php echo $longitude;?>';
	// var latitude = '<?php echo $latitude;?>';
	var longitude = $("#longitude").val();
	var latitude = $("#latitude").val();
	var isFlag=false;
	//初始化地图对象，加载地图
	var map = new AMap.Map("container", {
		resizeEnable: true,
		center: [longitude, latitude], //地图中心点
		zoom: 17 //地图显示的缩放级别
	});
	//  map1=map;
    $.each(mapOption[0], function(index,value) {
			changeSearchfPlace(value);
		});
    
	//添加点标记，并使用自己的icon
	new AMap.Marker({
		map: map,
		position: [longitude, latitude],
		icon: new AMap.Icon({
			size: new AMap.Size(40, 60), //图标大小
			image: "img/markpoint.png",
			imageOffset: new AMap.Pixel(0, 0)
		})
	});

	//切换搜索条件
	$("#mapSearchList div").unbind("click").on("click", function() {
		isFlag=false;
		var c = $(this).attr("data-id");
		$(this).addClass("active").removeClass("gray").siblings().addClass("gray").removeClass("active");
		$(".nearby-box p").empty();
		$.each(mapOption[$(this).index()], function(index,value) {
			changeSearchfPlace(value);
		});
	});

	//初始化默认的搜索地点
	function initSearchPlace(type) {
		AMap.service(["AMap.PlaceSearch"], function() {
			placeSearch = new AMap.PlaceSearch({ //构造地点查询类
				pageSize: 40,
				type: type,
				pageIndex: 1,
				// map: map
			});

			var cpoint = [longitude, latitude]; //中心点坐标
			placeSearch.searchNearBy('', cpoint, 2000, function(status, result) {
				//初始化地图对象，加载地图
				//var map = new AMap.Map("container", {resizeEnable: true}); //重复加载
				var infoWindow = new AMap.InfoWindow({
					offset: new AMap.Pixel(0, -30)
				});
				$('.map-list').empty();
				ui("img/icon-jt.png",result.poiList.pois,"jt1",type);
				 $(".nearby-box p").empty();
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
			});

		});
	}
	
	//切换搜索结果
	function changeSearchfPlace(type) {
		//placeSearch.clear(); //清空搜索结果，这里不能用map.clearMap();， 它会把当前位置的标点也给清空掉
		map.clearMap();
		AMap.service(["AMap.PlaceSearch"], function() {
			placeSearch = new AMap.PlaceSearch({ //构造地点查询类
				pageSize: 40,
				type: type,
				pageIndex: 1,
				// map: map

			});

			var cpoint = [longitude, latitude]; //中心点坐标
			$('.map-list').empty();
			$(".nearby-box p").empty();
			placeSearch.searchNearBy('', cpoint, 2000, function(status, result) {
				if (status=="complete") {
				if(type == "地铁站"||type == "公交车站"||type == "轻轨站") {
					if (!isFlag) {
						ui("img/icon-jt.png",result.poiList.pois.slice(0,5),"jt1",type);
					} else{
						ui("img/icon-jt.png",result.poiList.pois,"jt1",type);
					}
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
				    return false;
				} else if(type == "幼儿园"||type == "小学"||type == "中学"||type == "大学") {
					if (!isFlag) {
						ui("img/icon-jy.png",result.poiList.pois.slice(0,5),"jy1",type);
					} else{
						ui("img/icon-jy.png",result.poiList.pois,"jy1",type);
					}
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
				    return false;
				} else if(type == "医院"||type == "诊所"||type == "药房") {
						if (!isFlag) {
						ui("img/icon-yl.png",result.poiList.pois.slice(0,5),"yl1",type);
					} else{
						ui("img/icon-yl.png",result.poiList.pois,"yl1",type);
					}
					
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
				    return false;
				} else if(type == "银行"||type == "自动提款机") {
					if (!isFlag) {
						ui("img/icon-yinhang.png",result.poiList.pois.slice(0,5),"yh1",type);
					} else{
						ui("img/icon-yinhang.png",result.poiList.pois,"yh1",type);
					}
					
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
				    return false;
				} else if(type == "超级市场"||type == "便民商店") {
					if (!isFlag) {
						ui("img/icon-cs.png",result.poiList.pois.slice(0,5),"cs1",type);
					} else{
						ui("img/icon-cs.png",result.poiList.pois,"cs1",type);
					}
					
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
				    return false;
				} else if(type == "餐饮") {
					if (!isFlag) {
						ui("img/icon-cy.png",result.poiList.pois.slice(0,5),"cy1",type);
					} else{
						ui("img/icon-cy.png",result.poiList.pois,"cy1",type);
					}
                var span=document.createElement("span");
				    span.innerHTML=type+result.poiList.pois.length+"个";
				    $(".nearby-box p").append(span);
				    return false;
				}
			}

			});
		});
		var marker = new AMap.Marker({
			map: map,
			position: [longitude, latitude],
			icon: new AMap.Icon({
				size: new AMap.Size(40, 60), //图标大小
				image: "img/markpoint.png",
				imageOffset: new AMap.Pixel(0, 0)
			})
		});
		
	}
	//判断数据条数
//function listLen(data,imgUrl,className,type){
//		if (data.length>8) {
//					ui(imgUrl, data.slice(0,8), className,type);
//					
//				} else{
//				}
//				ui(imgUrl, data, className,type);
//}
	//UI控件  
	
	function ui(url, dataItem, className,type) {
		AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
			function(MarkerList, SimpleMarker, SimpleInfoWindow) {
				//即jQuery/Zepto
				var $ = MarkerList.utils.$;

				var defaultIconStyle = url, //默认的图标样式
					hoverIconStyle = url, //鼠标hover时的样式
					selectedIconStyle = url //选中时的图标样式
				;
				var markerList = new MarkerList({
					map: map,
					//ListElement对应的父节点或者ID
					listContainer: "myList", //document.getElementById("myList"),
					//选中后显示

					//从数据中读取位置, 返回lngLat
					getPosition: function(dataItem) {
						return dataItem.location;
					},
					//数据ID，如果不提供，默认使用数组索引，即index
					getDataId: function(dataItem, index) {

						return dataItem.id;
					},
					getInfoWindow: function(data, context, recycledInfoWindow) {
						if(recycledInfoWindow) {
							recycledInfoWindow.setInfoTitle(data.name);
							recycledInfoWindow.setInfoBody(data.address);
							return recycledInfoWindow;
						}

						return new SimpleInfoWindow({
							infoTitle: data.name,
							infoBody: data.address,
							offset: new AMap.Pixel(0, -37)
						});
					},
					//构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
					getMarker: function(data, context, recycledMarker) {
						var label = (context.index + 1);

						if(recycledMarker) {
							recycledMarker.setIconLabel(label);
							return;
						}

						return new SimpleMarker({
							containerClassNames: 'my-marker',
							iconStyle: url,
	//                      iconLabel: label
						});
					},
					//构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
					getListElement: function(data, context, recycledListElement) {
						var label = context.index;
						var innerHTML = MarkerList.utils.template('<div data-id="' + className + '" class="' + className + ' mapitem1"><p class="map-name"><span>' + (label + 1) + '</span><%- dataItem.name %></p><p class="map-at"><%- dataItem.distance %>米</p></div>', {
							dataItem: data,
							dataIndex: label
						});
						if(recycledListElement) {
							recycledListElement.innerHTML = innerHTML;
							return recycledListElement;
						}
						if (label==0) {
							   
							    return "<span class='list-title'>"+type+"</span>"+innerHTML;
						}
						if (!isFlag) {
							if(label==4){
							return innerHTML+"<p class='more-btn' data-type='"+type+"'>展开 ></p>";}
						}else{
							if (label==dataItem.length-1) {
								return innerHTML+"<p class='more-btn toggle' data-type='"+type+"'>收起 ></p>";
							}
						}
						return innerHTML;
						
						
						
						
					},
					//列表节点上监听的事件
					listElementEvents: ['click', 'mouseenter', 'mouseleave'],
					//marker上监听的事件
					markerEvents: ['click', 'mouseover', 'mouseout'],
					//makeSelectedEvents:false,
					selectedClassNames: 'selected',
					autoSetFitView: true
				});

				window.markerList = markerList;
				markerList.on('selectedChanged', function(event, info) {
					if(info.selected) {
                        
						if(info.selected.marker) {
							//更新为选中样式
							info.selected.marker.setIconStyle(selectedIconStyle);
						}

						//选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
						if(!info.sourceEventInfo.isListElementEvent) {

							if(info.selected.listElement) {
								scrollListElementIntoView($(info.selected.listElement));
							}
						}
					}

					if(info.unSelected && info.unSelected.marker) {
						//更新为默认样式
						info.unSelected.marker.setIconStyle(defaultIconStyle);
					}
				});

				markerList.on('listElementMouseenter markerMouseover', function(event, record) {

					if(record && record.marker) {
						//add 2017/07/03  鼠标滑过模拟执行click效果
						if(record &&　record.listElement){
							$(record.listElement).trigger("click");
						}
						
						forcusMarker(record.marker);

						//this.openInfoWindowOnRecord(record);

						//非选中的id
						if(!this.isSelectedDataId(record.id)) {
							//设置为hover样式
							record.marker.setIconStyle(hoverIconStyle);
							//this.closeInfoWindow();
						}
					}
				});

				markerList.on('listElementMouseleave markerMouseout', function(event, record) {

					if(record && record.marker) {

						if(!this.isSelectedDataId(record.id)) {
							//恢复默认样式
							record.marker.setIconStyle(defaultIconStyle);
						}
					}
				});
                
				//构建一个数据项数组，数据项本身没有格式要求，但需要支持getDataId和getPosition
				
				//加载数据
				var data=dataItem;
				markerList.render(data);
				$(".more-btn").unbind("click").on("click",function(){
					var type=$(this).data("type");
					if (!$(this).hasClass("toggle")) {
						isFlag=true;
					    changeSearchfPlace(type);
					} else{
						isFlag=false;
						switch (true){
							case type=="地铁站"||type=="公交车站"||type=="轻轨站":
							   $.each(mapOption[0], function(index,value) {
									changeSearchfPlace(value);
								});
								break;
							case type=="幼儿园"||type=="小学"||type=="中学"||type=="大学":
							   $.each(mapOption[1], function(index,value) {
									changeSearchfPlace(value);
								});
								break;
							case type=="医院"||type=="诊所"||type=="药房":
							   $.each(mapOption[2], function(index,value) {
									changeSearchfPlace(value);
								});
								break;
							case type=="银行"||type=="自动提款机":
							   $.each(mapOption[3], function(index,value) {
									changeSearchfPlace(value);
								});
								break;
							case type=="超级市场"||type=="便民商店":
							   $.each(mapOption[4], function(index,value) {
									changeSearchfPlace(value);
								});
								break;
							default:
								$.each(mapOption[5], function(index,value) {
										changeSearchfPlace(value);
								});
								break;
						}
					}
					
				});
				
				function forcusMarker(marker) {
					marker.setTop(true);
					//不在地图视野内
					if(!(map.getBounds().contains(marker.getPosition()))) {

						//移动到中心
						map.setCenter(marker.getPosition());
					}
				}

				function isElementInViewport(el) {
					var rect = el.getBoundingClientRect();

					return(
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <= ($(".right-map").innerHeight() ) && /*or $(window).height() */
						rect.right <= ($(".right-map").innerWidth()) /*or $(window).width() */
					);
				}

				function scrollListElementIntoView($listEle) {

					if(!isElementInViewport($listEle.get(0))) {
						$('.right-map').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
					}
					//闪动一下
					$listEle.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
							function(e) {
								$(this).removeClass('flash animated');
							}).addClass('flash animated');
				}

			});
	}
	
});
