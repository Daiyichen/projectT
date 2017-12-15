/**
 * Created by Admin on 2016-7-20.
 */
$(function () {
    var myChart = null;
    initLineBoxHeight();
     // 指定图表的配置项和数据
    var option = {
        title : {
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x:'left',
            y:'bottom',
           /* data:[
                {
                    name: '曝光量',
                    textStyle:{
                        color:'#06d2e1'
                    }
                },
                {
                    name: '点击量',
                    textStyle:{
                        color:'#ffdd56'
                    }
                },
                {
                    name:'留电量',
                    textStyle:{
                        color:'#57ffb6'
                    }
                }
            ]*/
        },
        toolbox: {
            show : false,
        },
        grid:{
            /*x轴方向不留边距*/
            x:0,
            x2:0
        },
        dataZoom : {//数据区域缩放（滚动条）
            show: true,
            realtime: true,
            start: 30,//从30%开始展现
            end: 60,//在60%的数据处截止
            //witdh:5,
            height: 15
        },
        calculable : true,

        xAxis : [
            {
                type : 'category',
                position:'top',
                boundaryGap : false,
             /*   data : ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
             */   axisLabel: {
                    textStyle:{
                        color:'#66666e',
                        fontSize:'14',
                    }

                },
                splitLine:{
                    /*分割线*/
                    lineStyle:{
                        width:1,
                        color:['#66666e']
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    show:false
                },
                splitLine:{
                    show:false,
                    /*不显示横向分割线*/

                },
                splitArea:{
                    show:false, /*分隔区域*/
                }
            }
        ],
        series : [
            {
                name:'曝光量',
                type:'line',
                symbol:'emptyCircle',
                smooth: true,
                symbolSize: 10,
               /* data:[11, 11, 15, 13, 12, 13, 10, 18, 4, 6, 12, 22, 38, 5,6,16,13,15,12,18,17,9,8,18],*/
                itemStyle:{
                    normal:{
                        lineStyle:{
                            color:'#19bcff',
                            width:6
                        }
                    }
                }
            },
            {
                name:'点击量',
                type:'line',
                smooth: true,
              /*  data:[15, 10, 11, 19, 8, 3, 8, 13, 9, 6, 17, 12, 30, 15,16,6,23,25,18,10,13,19,18,18],*/
                itemStyle:{
                    symbol:'emptyCircle',
                    symbolSize:8,
                    borderWidth: '8px',
                    normal:{
                        lineStyle:{
                            color:'#ffcb54',
                            width:6
                        }
                    }
                }
            },
            {
                name:'留电量',
                type:'line',
                smooth: true,
                /*data:[3, 20, 14, 10, 18, 13, 18, 33, 19, 16, 5, 22, 31, 25,26,16,13,15,12,19,10,11,17,18],*/
                itemStyle:{
                    symbol:'emptyCircle',
                    symbolSize:8,
                    borderWidth: '8px',
                    normal:{
                        lineStyle:{
                            color:'#b3ff5f',
                            width:6
                        }
                    }
                }
            }
        ]
    };
    //初始化数据
    drawEChart("today");

    /*
    * 动态加载数据
    * @param: dateParam:时间是今天还是昨天，
    *         today: 今天
    *         yestoday:昨天
    * */
    function  drawEChart(dateParam) {
        dataParam = dateParam || "today";
         myChart = echarts.init(document.getElementById('main'));
         myChart.showLoading({
             text : "图表数据正在努力加载...",
             effect :'spin',
             textStyle : {
                 fontSize : 20
             }
         });
        $.ajax({
            type : "get",
            url : "data/detail-data.json",
            data:{
              "date":dataParam
            },
            //dataType : "jsonp",
            success : function(data) {
                if("success" == data.status) {
                    var jsonobj = null;
                    if ("string" == typeof data) {
                        //将从后台接收的json字符串转换成json对象
                        jsonobj = eval(data);
                    }else{
                        jsonobj = data;
                    }
                    //给图标标题赋值
                    option.legend.data = jsonobj.legend;
                    //读取横坐标值
                    option.xAxis[0].data = jsonobj.xAxisData;
                    var series_arr = jsonobj.series;
                    //驱动图表生成的数据内容，数组中每一项代表一个系列的特殊选项及数据
                    for (var i = 0; i < series_arr.length; i++) {
                        option.series[i].name = series_arr[i].name;
                        option.series[i].data = series_arr[i].data;
                    }
                    //过渡控制，隐藏loading（读取中）
                    myChart.hideLoading();
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    initTypeNumber(jsonobj.typeNumer);
                    initecpc(jsonobj.detail);
                }else{
                    myChart.hideLoading();
                }
            },error:function (err) {
                console.log(err);
                myChart.hideLoading();
            }
        });

    }
    
    function  initTypeNumber(typeNumer) {
        var typeEnum = ['hasSee', 'hasClick', 'hasTel' ]; //预定义好的class式样
        var innerhtml = "";
        if(typeNumer ) {
            for (var i = 0; i < typeNumer.length; i++) {
                innerhtml+= '<li class="item"><span>'+typeNumer[i].name+'</span>' +
                    '<p class="'+typeEnum[i]+'">'+typeNumer[i].value+'</p></li>'
            }

            innerhtml += '<div class="clearfix"></div>';
        }
        $("#type_number").html(innerhtml)
    }

    //初始化ecpc 和ecpm数据
    function initecpc(detail) {
        $("#ecpc").text("ecpc:"+ detail.ecpc);
        $("#ecpm").text("ecpm:"+ detail.ecpm);
    }


    //动态设置line部分的高度
    function  initLineBoxHeight() {
        var wh = document.documentElement.clientHeight;
        var topH = $(".top").outerHeight() + $(".top").offset().top;
        var bottom = $(".footer").outerHeight() + parseInt($(".footer").css("bottom").split("px")[0]) ;
        var middleH = wh - topH  - bottom -5;
        $(".content-box").height(middleH);
    }

    window.onresize = function () {
        initLineBoxHeight();
        myChart.resize();
    }
})
