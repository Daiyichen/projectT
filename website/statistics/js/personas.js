/**
 * Created by Admin on 2016-7-20.
 */
$(function () {
    //
    var main_part1= document.getElementById('main_part1'); //用户年龄-曝光 pie
    var main_part2= document.getElementById('main_part2'); //用户年龄-点击 pie
    var main_part3= document.getElementById('main_part3'); //用户地域-曝光 pie
    var main_part4= document.getElementById('main_part4');//用户地域-点击 pie
    var main_part5= document.getElementById('main_part5'); //时间-line图

    var urlsex = "data/personal-sex-data.json";//用户性别比例
    var url1 = "data/person-age-baoguang-data.json"; //用户年龄-曝光
    var url2 = "data/person-age-click-data.json";//用户年龄-点击
    var url3="data/person-place-baoguang-data.json";//用户地域-曝光
    var url4 = "data/person-place-click-data.json";//用户地域-点击
    var url5="data/person-time-data.json";//时间接口

    var myChart1_pie = null;
    var myChart2_pie = null;
    var myChart3_pie = null;
    var myChart4_pie = null;
    var myChart5_line = null;

    var labelOne={
        normal:{
            color:'#00f0ff',
            label:{
                textStyle:{
                    fontSize:'14',
                    /*color:'#fff',*/
                },
                formatter:function (params) {
                    return params.name ;
                    /*  return (params.percent - 0).toFixed(0) + '%'*/

                }
            }
        }
    };

    var labelTwo={
        normal:{
            color:'#95ff7c'
        }
    };
    var  labelThree={
        normal:{
            color:'#ffdd56'
        }
    };
    var option_pie = {
        title : {
            text: '曝光',
            subtext:'_____',
            x:'center',
            textStyle:{
                color:'#fff',
                fontWeight:'normal'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show : false,
        },
        toolbox: {
            show : false,
        },
        calculable : true,
        series : [
            {
                name:'用户年龄',
                type:'pie',
                radius : ['42%', '52%'], /*内外半径*/
                itemStyle : {
                    normal : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                   /* {value:"", name:'',itemStyle : labelOne},
                    {value:"", name:'',itemStyle : labelTwo},
                    {value:"", name:'',itemStyle : labelThree}*/
                ]
            }
        ]
    };
    var option_line =  {
        title : {
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x:'left',
            y:'bottom',
            data:[
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
                }
            ]
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
                axisLabel: {
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
               /* data:[11, 11, 15, 13, 12, 13, 10, 18, 4, 6, 12, 22, 38, 5,6,16,13,15,12,18,17,9,8,18],
               */ itemStyle:{
                    normal:{
                        /*线条颜色、粗细*/
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
               /* data:[15, 10, 11, 19, 8, 3, 8, 13, 9, 6, 17, 12, 30, 15,16,6,23,25,18,10,13,19,18,18],
                */markPoint : {

                },
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
            }
        ]
    };
    initUserSexInfo(urlsex);
    initUserAge();
    initPlace();
    initTime();

    /*
    初始化用户性别比例
    *@param: url： 请求的url
     *  */
    function initUserSexInfo(url) {
        $.ajax({
            type : "get",
            url : url,
            data:{
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

                    if(jsonobj && jsonobj.data ){
                        jsonobj = jsonobj.data;
                        //初始化用户性别-曝光
                        $("#type1_name").text(jsonobj[0].typeName);
                        $("#percent_man_1").text("(" +Math.floor(jsonobj[0].typeValue.man* 100) + "%)");
                        $("#percent_woman_1").text("(" + +Math.floor(jsonobj[0].typeValue.woman*100) + "%)");
                        //初始化图像比例
                        $("#type1 .man .img-box-layer").css({"opacity":0.8, "width":Math.floor((1- jsonobj[0].typeValue.man)*100)+"%"});
                        $("#type1 .woman .img-box-layer").css({"opacity":0.8, "width":Math.floor((1- jsonobj[0].typeValue.woman)*100)+"%"});

                        //初始化用户性别 -点击
                        $("#type2_name").text(jsonobj[1].typeName);
                        $("#percent_man_2").text("(" +Math.floor(jsonobj[1].typeValue.man* 100) + "%)");
                        $("#percent_woman_2").text("(" + +Math.floor(jsonobj[1].typeValue.woman* 100) + "%)");
                        //初始化图像比例
                        $("#type2 .man .img-box-layer").css({"opacity":0.8, "width":Math.floor((1- jsonobj[1].typeValue.man)*100)+"%"});
                        $("#type2 .woman .img-box-layer").css({"opacity":0.8, "width":Math.floor((1- jsonobj[1].typeValue.woman)*100)+"%"});
                    }

                }else{

                }
            },error:function (err) {
                console.log(err);

            }
        });
    }

    //初始化用用户年龄
    function initUserAge() {
        drawEChart(null, main_part1, myChart1_pie, url1);
        drawEChart(null, main_part2, myChart2_pie, url2);
    }

    //初始化用户地域
    function  initPlace() {
        drawEChart(null, main_part3, myChart3_pie, url3);
        drawEChart(null, main_part4, myChart4_pie, url4);
    }

    //初始化时间
    function  initTime() {
        drawLineEChart(url5);
    }

    /*
     * 动态加载echarts-pie数据
     * @param: dateParam
     *         main_part: dom节点的ID
     *         myChart:echart
     *         url:请求数据的url
     * */
    function  drawEChart(dateParam, main_part, myChart, url) {
            dataParam = dateParam || "";
            myChart = echarts.init(main_part);
            myChart.showLoading({
                text : "图表数据正在努力加载...",
                effect :'spin',
                textStyle : {
                    fontSize : 20
                }
            });
            $.ajax({
                type : "get",
                url : url,
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
                        option_pie.series[0].data = [];
                        //给图标标题赋值
                        option_pie.title.text = jsonobj.title;

                        //驱动图表生成的数据内容，
                        option_pie.series[0].name = jsonobj.series[0].name;
                        var styleArr = [labelOne, labelTwo, labelThree];
                        for(var i=0;i< jsonobj.series[0].data.length;i++){
                            option_pie.series[0].data[i] = jsonobj.series[0].data[i];
                            option_pie.series[0].data[i].itemStyle = styleArr[i];
                        }

                        //过渡控制，隐藏loading（读取中）
                        myChart.hideLoading();
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option_pie);

                    }else{
                        myChart.hideLoading();
                    }
                },error:function (err) {
                    console.log(err);
                    myChart.hideLoading();
                }
            });

     }


    /*
     * 动态加载echarts-Line数据
     * @param: url:请求数据的url
     *
     * */
    function  drawLineEChart(url) {
        myChart5_line = echarts.init(main_part5);
        myChart5_line.showLoading({
            text : "图表数据正在努力加载...",
            effect :'spin',
            textStyle : {
                fontSize : 20
            }
        });
        $.ajax({
            type : "get",
            url : url,
            data:{
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
                    option_line.legend.data = jsonobj.legend;
                    //读取横坐标值
                    option_line.xAxis[0].data = jsonobj.xAxisData;
                    var series_arr = jsonobj.series;
                    //驱动图表生成的数据内容，数组中每一项代表一个系列的特殊选项及数据
                    for (var i = 0; i < series_arr.length; i++) {
                        option_line.series[i].name = series_arr[i].name;
                        option_line.series[i].data = series_arr[i].data;
                    }
                    //过渡控制，隐藏loading（读取中）
                    myChart5_line.hideLoading();
                    // 使用刚指定的配置项和数据显示图表。
                    myChart5_line.setOption(option_line);
                }else{
                    myChart5_line.hideLoading();
                }
            },error:function (err) {
                console.log(err);
                myChart5_line.hideLoading();
            }
        });
    }

});
