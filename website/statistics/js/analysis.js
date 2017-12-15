/**
 * Created by Admin on 2016-7-20.
 */
$(function () {
    
    var main_part1= document.getElementById('main_part1');
    var main_part2= document.getElementById('main_part2');
    var main_part3= document.getElementById('main_part3');
    var url1 = "data/analysis-data.json"; //平台费用url
    var url2 = "data/analysis-data2.json";//平台曝光接口url
    var url3="data/analysis-data3.json";//平台点击接口url

    var myChart1 = null;
    var myChart2 = null;
    var myChart3 = null;

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
     // 指定图表的配置项和数据
    var option = {
        title : {
            text: '',
            subtext:'_______\n\n',
            x:'center',
            y:0,
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
                name:'',
                type:'pie',
               /* radius : ['45%', '60%'], /!*内外半径*!/*/
                radius : ['38%', '48%'], /*内外半径*/
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
                    {value:"", name:'',itemStyle : labelOne},
                    {value:"", name:'',itemStyle : labelTwo},
                    {value:"", name:'',itemStyle : labelThree}
                ]
            }
        ]
    };
    //初始化数据
    drawEChart(null, main_part1, myChart1, url1);
    drawEChart(null, main_part2, myChart2, url2);
    drawEChart(null, main_part3, myChart3, url3);

    /*
    * 动态加载数据
    * @param: dateParam:时间是今天还是昨天，
    *         today: 今天
    *         yestoday:昨天
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
                    //给图标标题赋值
                    option.title.text = jsonobj.title;

                    //驱动图表生成的数据内容，
                    option.series[0].name = jsonobj.series[0].name;

                    option.series[0].data = [];//先清空
                    var styleArr = [labelOne, labelTwo, labelThree];
                    for(var i=0;i< jsonobj.series[0].data.length;i++){
                        option.series[0].data[i] = jsonobj.series[0].data[i];
                        option.series[0].data[i].itemStyle = styleArr[i];

                    }

                    //过渡控制，隐藏loading（读取中）
                    myChart.hideLoading();
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);

                }else{
                    myChart.hideLoading();
                }
            },error:function (err) {
                console.log(err);
                myChart.hideLoading();
            }
        });

    }

})
