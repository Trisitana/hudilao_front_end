<!-- 显示在管理员主界面Main区域的；经营数据报表界面 -->
<!-- 
  1.点击查看经营报表
  2.可选择是日报表还是周报表
  3.查看经营报表折线图(营业额随时间变化曲线)

  仪表盘：经营多少天了，现在在职员工多少（多少服务员，多少后厨，要是某个职位人数紧张，标红），现在入座率多少（圆形）

  营业额：当日营业额/月营业额/周营业额（折线图）done
  菜品售卖情况：选择菜品种类，显示每种菜品本月月销前五（柱状图），哪些菜品库存告急
  顾客星级统计：五种星级各占多少 halfdone 具体数据没显示，饼图没有标题，图的单位没有
  顾客小心愿汇总（心愿内容、一定要汇总、by谁、时间（一月内）、达成按钮）：
  最新公告：
  当月注册人数和上月注册人数对比 done
 -->
<!-- 当echarts的图表与边界太靠近时，element的按钮，选择框可能失效 -->

<template>
  <div>
    <!-- 卡片：本月/上月新注册会员统计 -->
    <el-card id="card-会员统计" shadow="hover">
      <template #header>
        <div id="card-header">
          <span v-if="variate.isThisMonth" id="card-header-text"
            >本月新注册会员统计</span
          >
          <span v-else id="card-header-text">上月新注册会员统计</span>
          <el-button
            id="button"
            text
            bg
            type="primary"
            size="small"
            @click="switchMonth"
            >切换</el-button
          >
        </div>
      </template>
      <div id="main1" style="width: 18vw; height: 45vh">
        <!-- 为Echarts准备的DOM必须添加高和宽，不然显示不出来 -->
      </div>
      <div id="main2" style="width: 22vw; height: 40vh"></div>
    </el-card>

    <!-- 卡片： 菜品售卖情况-->
    <el-card id="card-菜品售卖情况" shadow="hover">
      <template #header>
        <div id="card-header">
          <span id="card-header-text">本周菜品热度Top5</span>
          <el-select
            v-model="variate.select"
            placeholder="菜品类别"
            style="width: 100px"
            size="small"
          >
            <el-option @click="selectFoodType" label="锅底" value="1" />
            <el-option @click="selectFoodType" label="特色菜" value="2" />
            <el-option @click="selectFoodType" label="牛羊肉" value="3" />
            <el-option @click="selectFoodType" label="海鲜" value="4" />
            <el-option @click="selectFoodType" label="丸滑" value="5" />
            <el-option @click="selectFoodType" label="其他荤菜" value="6" />
            <el-option @click="selectFoodType" label="豆面制品" value="7" />
            <el-option @click="selectFoodType" label="菌菇" value="8" />
            <el-option @click="selectFoodType" label="蔬菜" value="9" />
            <el-option @click="selectFoodType" label="饮料酒水" value="10" />
            <el-option @click="selectFoodType" label="甜品" value="11" />
            <el-option @click="selectFoodType" label="主食" value="12" />
            <el-option @click="selectFoodType" label="自选类" value="13" />
          </el-select>
        </div>
      </template>
      <div id="main3" style="width: 35vw; height: 25vh"></div>
    </el-card>

    <!-- 卡片： 周月年营业额-->
    <el-card id="card-周月年营业额" shadow="hover">
      <template #header>
        <div id="card-header">
          <span id="card-header-text">营业额数据报表</span>
          <el-select
            v-model="variate.selectDate"
            placeholder="选择"
            style="width: 100px"
            size="small"
          >
            <el-option @click="selectDateHandler" label="本周" value="1" />
            <el-option @click="selectDateHandler" label="月度" value="2" />
            <el-option @click="selectDateHandler" label="年度" value="3" />
          </el-select>
        </div>
      </template>
      <div id="main4" style="width: 36vw; height: 28vh"></div>
    </el-card>

    <!-- 卡片：紧缺菜品 -->
    <el-card id="card-紧缺菜品" shadow="hover">
      <template #header>
        <div id="card-header">
          <span id="card-header-text">紧缺菜品</span>
          <el-select
            v-model="variate.selectType"
            placeholder="菜品类别"
            style="width: 100px"
            size="small"
          >
            <el-option label="全部类别" value="0" />
            <el-option label="锅底" value="1" />
            <el-option label="特色菜" value="2" />
            <el-option label="牛羊肉" value="3" />
            <el-option label="海鲜" value="4" />
            <el-option label="丸滑" value="5" />
            <el-option label="其他荤菜" value="6" />
            <el-option label="豆面制品" value="7" />
            <el-option label="菌菇" value="8" />
            <el-option label="蔬菜" value="9" />
            <el-option label="饮料酒水" value="10" />
            <el-option label="甜品" value="11" />
            <el-option label="主食" value="12" />
            <el-option label="自选类" value="13" />
          </el-select>
        </div>
        <el-table :data="displayTable" height="200" style="width: 100%">
          <el-table-column prop="name" label="菜品名" width="70" />
          <el-table-column prop="foodtype" label="类别" width="75" />
          <el-table-column prop="repository" label="库存" >
            <template #default="scope">
              <el-tag type="danger">
                {{ scope.row.repository }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

    <!-- 卡片：最新公告 -->
    <!-- <el-card id="card-最新公告" shadow="hover">
      <template #header>
        <div id="card-header">
          <span id="card-header-text">最新公告</span>
        </div>
      </template>
    </el-card> -->

    <!-- 卡片：时段热力图 -->
    <el-card id="card-时段热力图" shadow="hover">
      <template #header>
        <div id="card-header">
          <span id="card-header-text">一周各时段订单量热力图</span>
        </div>
      </template>
      <div id="main5" style="width: 50vw; height: 40vh"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, watch, reactive, ref, computed } from "vue";
import { adminGetHotDish, adminGetHotPot, adminGetLackDish, adminGetMonth, adminGetVip, adminGetWeek, adminGetYear } from "../../api/adminapi";
//紧缺菜品
interface Urgent{
  name:String;
  foodtype:Number;
  repository:Number;
}
let tableData = ref<Urgent[]>([])
//图标的选择状态判断
const variate = reactive({
  isThisMonth: true,
  select: "",
  selectDate: "1",
  selectType: "0",
});
//切换上月和这月的会员注册统计
const switchMonth = () => {
  console.log(variate.isThisMonth);
  if (!variate.isThisMonth) {
    data.value = dataThisMonth.value;
    variate.isThisMonth = true;
    drawBar();
  } else {
    data.value = dataLastMonth.value;
    variate.isThisMonth = false;
    drawBar();
  }
};
//选择周月年
const selectDateHandler = () => {
  console.log(variate.selectDate);
  if (variate.selectDate == "1") {
    drawLine1();
  }
  if (variate.selectDate == "2") {
    drawLine2();
  }
  if (variate.selectDate == "3") {
    drawLine3();
  }
};
//选择紧缺菜品中的对应菜品类别部分
let displayTable = computed(() => {
  const filteredTable = tableData.value.filter((alert) => {
    if (variate.selectType === "0") {
      return true;
    } else {
      if (alert.foodtype.toString()==variate.selectType) {
        return alert.foodtype.toString()==variate.selectType;
      }
    }
  });
  return filteredTable;
});

// const chooseFoodType = () => {
//   console.log(variate.selectType);
// };
//热销菜品的类别选择
const selectFoodType = () => {
  if (variate.select == "1") {
    // dataAxis.value = dataAxis1;
    foodData.value = dataType1.value;
    drawBar2();
  }
  if (variate.select == "2") {
    // dataAxis.value = dataAxis2;
    foodData.value = dataType2.value;
    drawBar2();
  }
  if (variate.select == "3") {
    // dataAxis.value = dataAxis3;
    foodData.value = dataType3.value;
    drawBar2();
  }
  if (variate.select == "4") {
    // dataAxis.value = dataAxis4;
    foodData.value = dataType4.value;
    drawBar2();
  }
  if (variate.select == "5") {
    // dataAxis.value = dataAxis5;
    foodData.value = dataType5.value;
    drawBar2();
  }
  if (variate.select == "6") {
    // dataAxis.value = dataAxis6;
    foodData.value = dataType6.value;
    drawBar2();
  }
  if (variate.select == "7") {
    // dataAxis.value = dataAxis7;
    foodData.value = dataType7.value;
    drawBar2();
  }
  if (variate.select == "8") {
    // dataAxis.value = dataAxis8;
    foodData.value = dataType8.value;
    drawBar2();
  }
  if (variate.select == "9") {
    // dataAxis.value = dataAxis9;
    foodData.value = dataType9.value;
    drawBar2();
  }
  if (variate.select == "10") {
    // dataAxis.value = dataAxis10;
    foodData.value = dataType10.value;
    drawBar2();
  }
  if (variate.select == "11") {
    // dataAxis.value = dataAxis11;
    foodData.value = dataType11.value;
    drawBar2();
  }
  if (variate.select == "12") {
    // dataAxis.value = dataAxis12;
    foodData.value = dataType12.value;
    drawBar2();
  }
  if (variate.select == "13") {
    // dataAxis.value = dataAxis13;
    foodData.value = dataType13.value;
    drawBar2();
  }
};

// 卡片：本月/上月新注册会员统计
//数据模型
interface VipList{
  rank:Number;
  countPerRank:Number;
}
let dataThisMonth = ref<VipList[]>([]);
let dataLastMonth = ref<VipList[]>([]);
let data = ref<VipList[]>([]);
//会员新注册柱形图渲染
const drawBar = () => {
  console.log(data.value)
  const myBarChart1 = echarts.init(document.getElementById("main1")); // 获取DOM元素并且进行初始化
  const option1 = {
    // color: ["#03045E", "#03045E", "#00B4D8", "#90E0EF", "#CAF0F8"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      data: ["一星级", "二星级", "三星级", "四星级", "五星级"],
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      // type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: "#999",
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "会员数",
        data: data.value.map((item)=>item.countPerRank),
        type: "bar",
        showBackground: true,
        itemStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(55, 102, 255)",
            },
          ]),
        },
      },
    ],
  };
  myBarChart1.setOption(option1);
};

// 卡片：会员统计饼图
const drawPie = () => {
  console.log(dataTotalVip.value.map((item)=>item.countPerRank)[0])
  const myPieChart = echarts.init(document.getElementById("main2"));
  const option2 = {
    // legend: {
    //   top: "bottom",
    // },
    title: {
      text: "全部会员分布",
      x: "right",
      y: "top",
      textAlign: "center",
    },
    tooltip: {
      trigger: "item",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        // restore: { show: true },
        // saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "会员分布",
        type: "pie",
        radius: [20, 120],
        center: ["50%", "50%"],
        label: {
          normal: {
            color: "#FFFFFF",
            show: true,
            position: "inner", // 数值显示在内部
            formatter: "{d}%", // 格式化数值百分比输出
          },
        },
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          {
            value: dataTotalVip.value.map((item)=>item.countPerRank)[0],
            name: "一星级",
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
          },
          {
            value: dataTotalVip.value.map((item)=>item.countPerRank)[1],
            name: "二星级",
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
          },
          {
            value: dataTotalVip.value.map((item)=>item.countPerRank)[2],
            name: "三星级",
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
          },
          {
            value: dataTotalVip.value.map((item)=>item.countPerRank)[3],
            name: "四星级",
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
          },
          {
            value: dataTotalVip.value.map((item)=>item.countPerRank)[4],
            name: "五星级",
            itemStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
          },
        ],
      },
    ],
  };
  myPieChart.setOption(option2);
};

//卡片：本周菜品热度Top5
// 一共13种菜品，每种菜品评出Top5，

//数据模型
interface HotFood{
  foodtype:Number;
  name:String;
  monthsale:Number;
}
//13种菜品类别分别排行的存储
let dataType1 = ref<HotFood[]>([])
let dataType2 = ref<HotFood[]>([])
let dataType3 = ref<HotFood[]>([])
let dataType4 = ref<HotFood[]>([])
let dataType5 = ref<HotFood[]>([])
let dataType6 = ref<HotFood[]>([])
let dataType7 = ref<HotFood[]>([])
let dataType8 = ref<HotFood[]>([])
let dataType9 = ref<HotFood[]>([])
let dataType10 = ref<HotFood[]>([])
let dataType11 = ref<HotFood[]>([])
let dataType12 = ref<HotFood[]>([])
let dataType13 = ref<HotFood[]>([])
let foodData = ref<HotFood[]>([]);
//热度top5的渲染
const drawBar2 = () => {
  const myBarChart2 = echarts.init(document.getElementById("main3"));
  const option3 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      data: [foodData.value.map((item)=>item.name)[0],foodData.value.map((item)=>item.name)[1],foodData.value.map((item)=>item.name)[2],foodData.value.map((item)=>item.name)[3],foodData.value.map((item)=>item.name)[4]],
      axisLabel: {
        inside: true,
        color: 'white',
        verticalAlign: 'bottom',
        
        formatter:function(value)  
		          {  
		              var ret = "";//拼接加\n返回的类目项  
		              var maxLength = 5;//每项显示文字个数  
		              var valLength = value.length;//X轴类目项的文字个数  
		              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
		              if (rowN > 1)//如果类目项的文字大于5,  
		              {  
		                  for (var i = 0; i < rowN; i++) {  
		                      var temp = "";//每次截取的字符串  
		                      var start = i * maxLength;//开始截取的位置  
		                      var end = start + maxLength;//结束截取的位置  
		                 //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧 
                     if(i==rowN-1){
                          temp = value.substring(start, end);  
		                      ret += temp; //凭借最终的字符串  
                     } else{
		                      temp = value.substring(start, end) + "\n";  
		                      ret += temp; //凭借最终的字符串
                     }  
		                  }  
		                  return ret;  
		              }  
		              else {  
		                         return value;  
		              }  
		          }
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: true,
        
      },
      axisLabel: {
        color: "#999",
      },
      splitLine: {
        show: false,
        
      },
    },
    series: {
      name: "周销售量",
      data: foodData.value.map((item)=>item.monthsale),
      type: "bar",
      showBackground: true,
      datasetIndex: 1,
      itemStyle: {
        opacity: 1,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(0, 221, 255)",
          },
          {
            offset: 1,
            color: "rgb(55, 102, 255)",
          },
        ]),
      },
    },
  };
  myBarChart2.setOption(option3);
};

//卡片：周营业额
const drawLine1 = () => {
  const myLineChart1 = echarts.init(document.getElementById("main4"));
  const option = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      // text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["当日营业额"],
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {},
      // },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        //分周一到周日
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "当日营业额",
        type: "line",
        symbol: "circle",
        symbolSize: 15,
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        //取出营业额统计
        data: weeksale.value.map((item)=>item.totalMoney),
      },
    ],
  };
  myLineChart1.setOption(option);
};

//卡片：月度营业额
const drawLine2 = () => {
  const myLineChart2 = echarts.init(document.getElementById("main4"));
  const option = {
    color: ["#00DDFF", "#80FFA5", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      // text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["当周营业额"],
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {}
      // }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["一周", "二周", "三周", "四周"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "当周营业额",
        type: "line",
        symbol: "circle",
        symbolSize: 15,
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(116, 21, 219)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: monthsale.value.map((item)=>item.totalMoney),
      },
    ],
  };
  myLineChart2.setOption(option);
};

//卡片：年度营业额
const drawLine3 = () => {
  const myLineChart3 = echarts.init(document.getElementById("main4"));
  const option = {
    color: ["#00DDFF", "#80FFA5", "#37A2FF", "#FF0087", "#FFBF00"],
    title: {
      // text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["当月营业额"],
    },
    toolbox: {
      // feature: {
      //   saveAsImage: {}
      // }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: yearsale.value.map((item)=>item.monthNumber+"月"),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "当月营业额",
        type: "line",
        symbol: "circle",
        symbolSize: 15,
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.7,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "rgb(224, 62, 76)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: yearsale.value.map((item)=>item.totalMoney),
      },
    ],
  };
  myLineChart3.setOption(option);
};

// 卡片：一周各时段订单量热力图
const drawHot = () => {
  const myDrawHot = echarts.init(document.getElementById("main5"));
  //按一天24小时设定与传参
  const hours = [
    "0点",
    "1点",
    "2点",
    "3点",
    "4点",
    "5点",
    "6点",
    "7点",
    "8点",
    "9点",
    "10点",
    "11点",
    "12点",
    "13点",
    "14点",
    "15点",
    "16点",
    "17点",
    "18点",
    "19点",
    "20点",
    "21点",
    "22点",
    "23点",
  ];
  const days = [ "周日","周一", "周二", "周三", "周四", "周五", "周六"];
  const hotData = HotPotData.value.map((item)=>TripleHotTransfer(item))
  // 模拟数据
  // [
  //   
  //   [0, 0, 5],
  //   [0, 3, 7],
  //   [0, 10, 2],
  //   [0, 11, 10],
  //   [0, 12, 4],
  //   [0, 13, 8],
  //   [0, 14, 2],
  //   [0, 15, 5],
  //   [0, 17, 6],
  //   [0, 18, 9],
  //   [0, 19, 3],
  //   [0, 20, 7],
  //   [0, 21, 3],
  //   [1, 0, 5],
  //   [1, 3, 1],
  //   [1, 10, 3],
  //   [1, 11, 8],
  //   [1, 12, 5],
  //   [1, 13, 2],
  //   [1, 14, 10],
  //   [1, 15, 3],
  //   [1, 17, 8],
  //   [1, 18, 10],
  //   [1, 19, 9],
  //   [1, 20, 1],
  //   [1, 21, 7],
  //   [2, 0, 8],
  //   [2, 3, 5],
  //   [2, 10, 4],
  //   [2, 11, 6],
  //   [2, 12, 7],
  //   [2, 13, 1],
  //   [2, 14, 6],
  //   [2, 15, 8],
  //   [2, 17, 3],
  //   [2, 18, 9],
  //   [2, 19, 2],
  //   [2, 20, 8],
  //   [2, 21, 7],
  //   [3, 0, 7],
  //   [3, 3, 3],
  //   [3, 10, 0],
  //   [3, 11, 6],
  //   [3, 12, 7],
  //   [3, 13, 8],
  //   [3, 14, 5],
  //   [3, 15, 4],
  //   [3, 17, 1],
  //   [3, 18, 9],
  //   [3, 19, 0],
  //   [3, 20, 7],
  //   [3, 21, 3],
  //   [4, 0, 8],
  //   [4, 3, 2],
  //   [4, 10, 1],
  //   [4, 11, 7],
  //   [4, 12, 3],
  //   [4, 13, 5],
  //   [4, 14, 0],
  //   [4, 15, 7],
  //   [4, 17, 8],
  //   [4, 18, 6],
  //   [4, 19, 5],
  //   [4, 20, 0],
  //   [4, 21, 7],
  //   [5, 0, 3],
  //   [5, 3, 8],
  //   [5, 10, 9],
  //   [5, 11, 9],
  //   [5, 12, 5],
  //   [5, 13, 1],
  //   [5, 14, 9],
  //   [5, 15, 0],
  //   [5, 17, 5],
  //   [5, 18, 8],
  //   [5, 19, 4],
  //   [5, 20, 4],
  //   [5, 21, 1],
  //   [6, 0, 9],
  //   [6, 3, 10],
  //   [6, 10, 1],
  //   [6, 11, 3],
  //   [6, 12, 9],
  //   [6, 13, 5],
  //   [6, 14, 0],
  //   [6, 15, 5],
  //   [6, 17, 2],
  //   [6, 18, 7],
  //   [6, 19, 6],
  //   [6, 20, 0],
  //   [6, 21, 7],
  // ];
  const title: echarts.TitleComponentOption[] = [];
  const singleAxis: echarts.SingleAxisComponentOption[] = [];
  const series: echarts.ScatterSeriesOption[] = [];
  days.forEach(function (day, idx) {
    title.push({
      textBaseline: "middle",
      top: ((idx + 0.5) * 100) / 7 + "%",
      text: day,
    });
    singleAxis.push({
      left: 150,
      type: "category",
      boundaryGap: false,
      data: hours,
      top: (idx * 100) / 7 + 5 + "%",
      height: 100 / 7 - 10 + "%",
      axisLabel: {
        interval: 2,
      },
    });
    series.push({
      singleAxisIndex: idx,
      coordinateSystem: "singleAxis",
      type: "scatter",
      data: [],
      symbolSize: function (dataItem) {
        return dataItem[1] * 4;
      },
      tooltip: {
        formatter: function (params) {
          // 自定义提示框内容
          return `${params.data[0]}点 热度：${params.data[1]} `;
        },
      },
    });
  });
  hotData.forEach(function (dataItem) {
    (series as any)[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
  });

  const option = {
    tooltip: {
      position: "top",
    },
    title: title,
    singleAxis: singleAxis,
    series: series,
  };
  myDrawHot.setOption(option);
};
//将接收的json数据转化为热力图所需的三元组
function TripleHotTransfer(item){
  let result=Array(3)
  result[0]=item.dayOfWeek
  result[1]=item.orderHour
  result[2]=item.orderCount*2
  return result
}
interface WeekSale{
  dayOfWeek:String;
  totalMoney:Number;
}
interface MonthSale{
  weekNumber:Number;
  totalMoney:Number;
}
interface YearSale{
  monthNumber:Number;
  totalMoney:Number;
}
let weeksale=ref<WeekSale[]>([])
let monthsale=ref<MonthSale[]>([])
let yearsale=ref<YearSale[]>([])
const test=ref([
  {rank:1,value:100},
  {rank:2,value:200},
  {rank:3,value:300},
  {rank:4,value:400},
  {rank:5,value:500},

])
//总会员数数据模型
let dataTotalVip=ref<VipList[]>([])
interface HotPot{
  dayOfWeek:Number;
  orderHour:Number;
  orderCount:Number;
}
let HotPotData=ref([])
//页面初始化
onMounted(() => {
  //获取周营业额
  adminGetWeek().then((result)=>{
    weeksale.value=result.data.data
    drawLine1(); //页面初始默认显示周营业额
    //console.log(weeksale.value)
  })
  //获取月营业额
  adminGetMonth().then((result)=>{
    monthsale.value=result.data.data
  })
  //获取年营业额
  adminGetYear().then((result)=>{
    yearsale.value=result.data.data
  })
  //获取会员信息
  adminGetVip().then((result)=>{
    //本月、上月新注册以及总共信息
    dataThisMonth.value=result.data.data.list1
    dataLastMonth.value=result.data.data.list2
    dataTotalVip.value=result.data.data.list3
    console.log(dataTotalVip.value.map((item)=>item.countPerRank)[0])
    data.value=dataThisMonth.value
    drawBar();
    drawPie();
  })
  //获取热销菜品数据
  adminGetHotDish().then((result)=>{
    dataType1.value=result.data.data.filter((item)=>{
      if(item.foodtype==1)return true;
    })
    dataType2.value=result.data.data.filter((item)=>{
      if(item.foodtype==2)return true;
    })
    dataType3.value=result.data.data.filter((item)=>{
      if(item.foodtype==3)return true;
    })
    dataType4.value=result.data.data.filter((item)=>{
      if(item.foodtype==4)return true;
    })
    dataType5.value=result.data.data.filter((item)=>{
      if(item.foodtype==5)return true;
    })
    dataType6.value=result.data.data.filter((item)=>{
      if(item.foodtype==6)return true;
    })
    dataType7.value=result.data.data.filter((item)=>{
      if(item.foodtype==7)return true;
    })
    dataType8.value=result.data.data.filter((item)=>{
      if(item.foodtype==8)return true;
    })
    dataType9.value=result.data.data.filter((item)=>{
      if(item.foodtype==9)return true;
    })
    dataType10.value=result.data.data.filter((item)=>{
      if(item.foodtype==10)return true;
    })
    dataType11.value=result.data.data.filter((item)=>{
      if(item.foodtype==11)return true;
    })
    dataType12.value=result.data.data.filter((item)=>{
      if(item.foodtype==12)return true;
    })
    dataType13.value=result.data.data.filter((item)=>{
      if(item.foodtype==13)return true;
    })
    foodData.value=dataType1.value
    drawBar2();
  })
  //获取紧缺菜品
  adminGetLackDish().then((result)=>{
    tableData.value=result.data.data
  })
  //获得热点图数据
  adminGetHotPot().then((result)=>{
    HotPotData.value=result.data.data
    console.log(result.data.data)
    drawHot();
  })
  // drawLine2();
  
});
</script>

<style lang="scss" scoped>
//卡片标题
#card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
//卡片标题文本
#card-header-text {
  font-size: larger;
  font-weight: 1000;
}
//新增会员容器
#main1 {
  position: relative;
  top: -40px;
  left: -20px;
}
//会员饼图容器
#main2 {
  position: relative;
  top: -320px;
  left: 220px;
}
//热度top容器
#main3 {
  position: relative;
  top: -50px;
  left: -20px;
}
//营业额容器
#main4 {
  position: relative;
  top: -43px;
  left: -34px;
}
//热点图容器
#main5 {
  position: relative;
  top: -5px;
  left: 0px;
}

#card-会员统计 {
  position: absolute;
  border-radius: 18px;
  width: 35vw;
  height: 52vh;
  top: 36vh;
  left: 1vw;
}
#card-菜品售卖情况 {
  position: absolute;
  border-radius: 18px;
  width: 35vw;
  height: 33vh;
  left: 37vw;
  top: 1.5vh;
}
#card-周月年营业额 {
  position: absolute;
  border-radius: 18px;
  width: 35vw;
  height: 33vh;
  top: 1.5vh;
  left: 1vw;
}
#card-紧缺菜品 {
  position: absolute;
  border-radius: 18px;
  width: 16vw;
  height: 33vh;
  left: 72.8vw;
  top: 1.5vh;
}
// #card-最新公告 {
//   position: absolute;
//   border-radius: 18px;
//   width: 16vw;
//   height: 33vh;
//   left: 72.8vw;
//   top: 54.5vh;
// }
#card-时段热力图 {
  position: absolute;
  border-radius: 18px;
  width: 52vw;
  height: 52vh;
  left: 37vw;
  top: 36vh;
}

</style>
