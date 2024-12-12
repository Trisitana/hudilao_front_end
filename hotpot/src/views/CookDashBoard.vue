<template>
  <!-- <div>
    <h1>CookDashBoard</h1>
    登录后的这个token很重要——“明明明明歌” 
    {{ cookLoginStore }}
  </div> -->

  <div class="background">
    <!-- 页面顶部菜单 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :ellipsis="false"
    >
    <!-- 用户头像 -->
      <li class="user-icon">
        <el-avatar size="large" :src="cookicon" fit="fill" />
      </li>
      <!-- <el-menu-item index="0" disabled>
      
    </el-menu-item> -->
    <!-- 欢迎 -->
      <li class="welcome-label">
        {{ getWelcomeText() }}
      </li>
      <!-- 选项 -->
      <!-- 提示新公告的徽章 -->
      <el-badge :value="notificationCount" :max="99" class="item">
        <el-menu-item index="1"
          ><i class="icon icon-notification"></i> 通知公告</el-menu-item
        >
      </el-badge>
      <el-menu-item index="2"
        ><i class="icon icon-order"></i> 工作空间</el-menu-item
      >
      <el-menu-item index="3"
        ><i class="icon icon-schedule"></i> 排班表</el-menu-item
      >

      <div class="flex-grow" />

      <div class="time">
        <el-button>
          <span>{{ nowTime }}</span>
        </el-button>
      </div>
      <!-- 退出 -->
      <el-menu-item index="4" @click="backToLogin">
        <i class="icon exit-icon" />
        退出
      </el-menu-item>
    </el-menu>
    <!-- 当选择通知公告时 -->
    <div v-show="activeIndex == 1">
      <!-- <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="Message" label="Message" width="100" />
    </el-table> -->
      <div class="alerts-view">
        <el-form class="search-form">
          <!-- 标题查询 -->
          <el-form-item label="查询标题">
            <el-input placeholder="请输入标题查询" v-model="searchTitle">
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 通知显示 -->
        <el-scrollbar max-height="630px" class="alert-block">
          <div v-for="(alert, index) in displayedAlerts" :key="index">
            <el-alert v-if="alert.emergency==0"
              :title="alert.title"
              :type="typeTransfer(alert.emergency)"
              :description="alert.content"
              class="custom-alert"
              :closable="false"
              effect="dark"
            >
            <!-- 通知的内容（标题、内容、时间） -->
              <div class="alert-header">
                <div class="alert-title">{{ alert.title }}</div>
                <div class="alert-time">{{ timeTransfer(alert.time) }}</div>
              </div>
              <div class="alert-content">{{ alert.content }}</div>
            </el-alert>
            <el-alert v-if="alert.emergency==1"
              :title="alert.title"
              :type="typeTransfer(alert.emergency)"
              :description="alert.content"
              class="custom-alert-emergency"
              :closable="false"
              effect="dark"
            >
              <div class="alert-header">
                <div class="alert-title">{{ alert.title }}</div>
                <div class="alert-time">{{ timeTransfer(alert.time) }}</div>
              </div>
              <div class="alert-content">{{ alert.content }}</div>
            </el-alert>
          </div>
        </el-scrollbar>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalAlerts"
          layout="total, prev, pager, next"
          background
        ></el-pagination>
      </div>
    </div>
    <!-- 工作空间 -->
    <div v-show="activeIndex == 2">
      <div class="order_tatal">
        <el-icon><Tickets /></el-icon>共有
        <span  class="order_tatal_span">{{ lengthTransfer() }}</span> 个订单待制作
      </div>
      <!-- 新列表 -->
      <div class="list_box">
        <!-- 普通订单 -->
        <div class="left_list">
          <template v-if="displayedOrders.length > 0">
            <OrderItem
              :order="order"
              v-for="(order, index) in displayedOrders"
              :key="index"
              @serveDish="serveDish(order.orderid)"
            />
          </template>
          <!-- 缺省 -->
          <div class="empty_div" v-else>
            <el-empty description="暂无订单" />
          </div>
        </div>
        
        <!-- 紧急订单 -->
        <div class="right_list">
          <el-scrollbar height="710px" v-if="emergencyOrders.length > 0">
            <OrderItem
              :order="order"
              v-for="(order, index) in emergencyOrders"
              :key="index"
              @serveDish="serveDish(order.orderid)"
            />
          </el-scrollbar>
          <!-- 缺省 -->
          <el-empty v-else description="无紧急订单" />
        </div>
      </div>
      <div class="page_box">
        <!-- 分页 -->
        <el-pagination
          @current-change="orderHandleCurrentChange"
          :current-page="orderCurrentPage"
          :page-size="orderPageSize"
          :total="totalOrders-emergencyOrders.length"
          layout="prev, pager, next"
          class="pagination-container"
          background
        ></el-pagination>
      </div>
    </div>
    <!-- 排班表 -->
    <div v-show="activeIndex == 3">
      <el-row :gutter="0">
        <el-col :span="18">
          <div class="timetable-table">
            <div class="week">
              <span>{{ nowWeek }}</span>
            </div>
            <!-- 排班日历 -->
            <el-calendar :first-day-of-week="1">
              <!-- 取出每天日期 -->
              <template #dateCell="{ data }">
                <!-- 点击事件，显示有排班当天 -->
                <div @click="clickDay(data)">
                  {{ data.day.split("-").slice(2).join("-") }}
                  <!-- 显示哪天有班 -->
                  <p
                    v-if="
                      schedule.find(
                        (item) =>
                          item.month === data.date.getMonth() + 1 &&
                          item.date === data.date.getDate()
                      )
                    "
                    class="班"
                  >
                    班
                  </p>
                </div>
              </template>
            </el-calendar>
          </div>
        </el-col>
        <el-col :span="5">
          <!-- 后三天排班信息表单 -->
          <el-scrollbar height="630px" max-height="630px">
            <div v-for="(oneSchedule, index) in findFilteredArr" :key="index">
              <el-alert
                title="近期排班信息"
                type="success"
                :closable="false"
                class="schedule-form-alert"
              >
              </el-alert>
              <el-form :model="form" label-width="100px" class="schedule-form">
                <el-form-item label="日期：">
                  {{ oneSchedule.month + "月" + oneSchedule.date + "日" }}
                </el-form-item>
                <el-form-item label="工号：">
                  {{ userNumber }}
                </el-form-item>
                <el-form-item label="时段：">
                  {{ scheduleTransfer(oneSchedule) + "班" }}
                </el-form-item>
              </el-form>
            </div>
          </el-scrollbar>
        </el-col>
        <el-col :span="1"> </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { CookLoginStore } from "../stores/CookLoginStore";
import cookicon from "../assets/preview.jpg";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus";
import { Tickets } from "@element-plus/icons-vue";
import {
  cookGetOrder,
  cookGetAlerts,
  cookGetSchedule,
  cookHandOrder,
} from "../api/cookapi";
import OrderItem from "./OrderItem.vue";
//未读通知响应所需计数
const notificationCount = ref("");
//用户名
let userNumber = "";
const cookLoginStore = CookLoginStore();
//当前选择的页面（默认为工作空间）
const activeIndex = ref(2);


//页面跳转
const router = useRouter();
const route = useRoute();
//当前时间与星期
const nowTime = ref("");
const nowWeek = ref("");
const timeTableValue = new Date();
//websocket所需
const socket = ref(null);
//时间相关
//显示当前时间 xx年xx月xx日 xx:xx:xx
const complement = function (value) {
  return value < 10 ? `0${value}` : value;
};
const formateDate = (date) => {
  const time = new Date(date);
  const year = time.getFullYear();
  const month = complement(time.getMonth() + 1);
  const day = complement(time.getDate());
  const hour = complement(time.getHours());
  const minute = complement(time.getMinutes());
  const second = complement(time.getSeconds());
  return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
};
const formateDay = (date) => {
  let monday = new Date(date);
  let sunday = new Date(date);
  const nowDay = new Date(date).getDay() || 7;
  monday.setDate(monday.getDate() - nowDay + 1);
  sunday.setDate(sunday.getDate() - nowDay + 7);
  return `${monday.toLocaleDateString()}--${sunday.toLocaleDateString()}`;
};
//定时刷新
onMounted(() => {
  setInterval(() => {
    nowTime.value = formateDate(new Date());
    nowWeek.value = formateDay(new Date());
    //currentLastingTime=lastingTime(new Date())
  });
});
//登录时间（未取用）
const currentLastingTime = ref("");
window.onload = function () {
  window.document.onmousedown = function () {
    localStorage.setItem("lastTime", new Date().getTime());
  };
};
const lastingTime = (date) => {
  let currentTime = date.getTime();
  let period = currentTime - localStorage.getItem("lastTime");
  period = period / 1000;
  let hour = period / 3600;
  let min = (period % 3600) / 60;
  let second = period % 60;
  return hour + ": " + min + ": " + second;
};

//状态表示转换
function lengthTransfer(){
  
  if(orders.value){
    return orders.value.length
  }
  else {return "没有"}
}
function typeTransfer(emergency) {
  if (emergency == 0) {
    return "warning";
  } else if (emergency == 1) {
    return "error";
  }
}
function timeTransfer(time) {
  return new Date(time);
}
function orderTimeTransfer(time) {
  const date = new Date(time);
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds().toString().padStart(2, "0")
  );
}
function scheduleTransfer(date) {
  if (date.time == 1) return "早";
  else if (date.time == 2) return "中";
  else if (date.time == 3) return "晚";
}
function emergencyTransfer(emergency){
  if(emergency==0){
    return 'custom-alert'
  }
  else if(emergency==1){
    return 'custom-alert-emergency'
  }
}

//公告查询
const searchTitle = ref("");
//点击事件
function handleSelect(index) {
  if (index == 1) {
    notificationCount.value = "";
  }
  activeIndex.value = index;
}

//推出与欢迎函数
function backToLogin() {
  router.push("/login");
}
function getWelcomeText() {
  return "欢迎来到后厨系统," + userNumber;
}


//公告alerts分页
let alerts = ref([]);
const currentPage = ref(1);
const pageSize = ref(6); // 每页显示的el-alert数量
function handleCurrentChange(page) {
  currentPage.value = page;
}
//计算总公告
let totalAlerts = computed(() => {
  return totalDisplayedAlerts.value.length;
});
//计算筛选出的总公告
let totalDisplayedAlerts = computed(() => {
  const filteredAlerts = alerts.value.filter((alert) => {
    if (searchTitle.value === "") {
      return true; // 如果未选择月份，则显示所有通知
    } else {
      return alert.title.includes(searchTitle.value);
    }
  });
  return filteredAlerts;
});
//分页筛选公告
let displayedAlerts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  const filteredAlerts = alerts.value.filter((alert) => {
    if (searchTitle.value === "") {
      return true; // 如果未选择月份，则显示所有通知
    } else {
      return alert.title.includes(searchTitle.value);
    }
  });
  return filteredAlerts.slice(startIndex, endIndex);
});
// let displayWeekSchedule=computed(()=> {
//   let tempDay=new Date()
//   let today=new Date()
//   let sunday=new Date()
//   const nowDay = (new Date()).getDay() || 7;
//   sunday.setDate(sunday.getDate() - nowDay + 7);
//   const weekSchedule= reactive([])
//   for(let i=0;i<schedule.value.length;i++)
//   {
//     tempDay.setDate(schedule.value[i].date)
//     tempDay.setMonth(today.getMonth()-schedule.value[i].month)

//     console.log(tempDay)
//     //如果在今天到星期天之内就取出
//     if(tempDay>=today && tempDay<=sunday)
//     {
//       weekSchedule.value.push(schedule.value[i])
//     }
//   }
//   return weekSchedule.value
// })

//排班表内本周排班相关
let schedule = ref([
  // { month: 9, date: 6,time:1},
  // { month: 9, date: 7,time:2},
  // { month: 9, date: 7,time:3},
  // { month: 9, date: 8,time:3},
  // { month: 9, date: 12,time:2},
  // { month: 8, date: 31,time:1},
  // { month: 10, date: 3,time:1},
]);
const today = new Date();
const endOfWeek = new Date();
endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
let findFilteredArr = computed(() => {
  const filteredArr = schedule.value.filter((obj) => {
    const objDate = new Date();
    const nextNextDate = new Date().setDate(today.getDate() + 2);
    objDate.setMonth(obj.month - 1); // 月份从0开始，所以需要减1
    objDate.setDate(obj.date);
    //console.log(objDate);
    return objDate >= today && objDate <= nextNextDate;
  });
  return filteredArr;
});
// const filteredArr = schedule.value.filter((obj) => {
//   const objDate = new Date();
//   const nextNextDate = new Date().setDate(today.getDate() + 2);
//   objDate.setMonth(obj.month - 1); // 月份从0开始，所以需要减1
//   objDate.setDate(obj.date);
//   console.log(objDate);
//   return objDate >= today && objDate <= nextNextDate;
// });

// let getDateClass = computed((data) => {
//   const month = data.date.getMonth();
//   const day = data.date.getDate();
//   const matchingSchedule = schedule.value.find(
//     (item) => item.month === month + 1 && item.date === day
//   );
//   if (matchingSchedule) {
//     return "blue-cell"; // 自定义的蓝色样式类名
//   }
//   return "";
// });
//点击日期函数
function clickDay(data) {
  if (
    schedule.value.find(
      (item) =>
        item.month === data.date.getMonth() + 1 &&
        item.date === data.date.getDate()
    )
  ) {
    const matchingItems = schedule.value.filter((item) => {
      return (
        item.month === data.date.getMonth() + 1 &&
        item.date === data.date.getDate()
      );
    });
    ElMessageBox.alert(
      //显示当日所有排班
      matchingItems.map((item) => scheduleTransfer(item) + "班"),
      "排班时间",
      {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: "OK",
      }
    );
  }
}

//工作空间相关

// let getOrderList=computed(()=>(index)=> {
//   if (orders[index] && orders[index].items) {
//     return orders[index].items.map(item => (item.name));
//   }
// })
const serveDish = (thisorderid) => {
  //把上菜的订单信息发给后端（待写）
  console.log(orders);
  cookHandOrder({ orderid: thisorderid }).then((result) => {
    cookGetOrder({ number: userNumber }).then((result) => {
      orders.value = result.data.data;
    });
    ElMessage({
      message: "上菜成功",
      type: "success",
    });
  });
};

//订单容器
let orders = ref([
    {
        "orderid": 1,
        "tableid": 2,
        "time": "2023-09-01T17:21:45",
        "phonenumber": "18551755238",
        "cookid": 1,
        "conditions": 1,
        "emergency": 1,
        "items": [
            {
                "name": "雪花勇闯天涯500ml",
                "quantity": 2
            },
            {
                "name": "可口可乐（大）",
                "quantity": 3
            },
            {
                "name": "椰汁",
                "quantity": 1
            },
            {
                "name": "自选饮料",
                "quantity": 1
            },
            {
                "name": "自选小料",
                "quantity": 1
            }
        ]
    },
    {
        "orderid": 5,
        "tableid": 7,
        "time": "2023-09-04T15:00:11",
        "phonenumber": "13915962565",
        "cookid": 1,
        "conditions": 1,
        "emergency": 1,
        "items": [
            {
                "name": "脆皮肠",
                "quantity": 1
            },
            {
                "name": "鹌鹑蛋",
                "quantity": 1
            },
            {
                "name": "年糕",
                "quantity": 1
            },
            {
                "name": "生鸡蛋",
                "quantity": 1
            }
        ]
    },
    {
        "orderid": 9,
        "tableid": 4,
        "time": "2023-09-08T15:00:21",
        "phonenumber": "13915962565",
        "cookid": 1,
        "conditions": 1,
        "emergency": 1,
        "items": [
            {
                "name": "雪花松板肉",
                "quantity": 2
            },
            {
                "name": "炸猪皮",
                "quantity": 2
            },
            {
                "name": "猪脑花",
                "quantity": 3
            },
            {
                "name": "血旺",
                "quantity": 3
            },
            {
                "name": "捞派猪黄喉",
                "quantity": 2
            },
            {
                "name": "鹌鹑蛋",
                "quantity": 1
            },
            {
                "name": "脆皮肠",
                "quantity": 1
            },
            {
                "name": "红薯苕皮",
                "quantity": 1
            },
            {
                "name": "年糕",
                "quantity": 1
            },
            {
                "name": "魔芋丝",
                "quantity": 1
            },
            {
                "name": "水晶粉丝",
                "quantity": 1
            },
            {
                "name": "豆腐皮",
                "quantity": 1
            },
            {
                "name": "8秒劲道油豆皮",
                "quantity": 1
            },
            {
                "name": "10秒腐竹",
                "quantity": 1
            },
            {
                "name": "注心火锅油条",
                "quantity": 1
            }
        ]
    },
    {
        "orderid": 10,
        "tableid": 4,
        "time": "2023-09-07T15:00:23",
        "phonenumber": "13915962565",
        "cookid": 1,
        "conditions": 1,
        "emergency": 1,
        "items": [
            {
                "name": "8秒劲道油豆皮",
                "quantity": 1
            },
            {
                "name": "10秒腐竹",
                "quantity": 1
            },
            {
                "name": "注心火锅油条",
                "quantity": 1
            }
        ]
    },
    {
        "orderid": 45,
        "tableid": 14,
        "time": "2023-09-06T22:31:58",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    },
    {
        "orderid": 47,
        "tableid": 14,
        "time": "2023-09-07T11:58:37",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    },
    {
        "orderid": 49,
        "tableid": 14,
        "time": "2023-09-07T12:25:33",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 1,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    },
    {
        "orderid": 51,
        "tableid": 14,
        "time": "2023-09-07T14:13:36",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    },
    {
        "orderid": 53,
        "tableid": 1,
        "time": "2023-09-07T14:45:29",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 1,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    },
    {
        "orderid": 55,
        "tableid": 1,
        "time": "2023-09-07T14:47:24",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "牛肉汤火锅",
                "quantity": 2
            }
        ]
    },
    {
        "orderid": 57,
        "tableid": 1,
        "time": "2023-09-07T17:34:07",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "清油麻辣火锅",
                "quantity": 1
            }
        ]
    },
    {
        "orderid": 59,
        "tableid": 14,
        "time": "2023-09-08T15:48:48",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    },
    {
        "orderid": 61,
        "tableid": 14,
        "time": "2023-09-08T15:51:11",
        "phonenumber": null,
        "cookid": 1,
        "conditions": 1,
        "emergency": 0,
        "items": [
            {
                "name": "番茄火锅",
                "quantity": 3
            },
            {
                "name": "真香锅",
                "quantity": 3
            },
            {
                "name": "经典麻辣火锅",
                "quantity": 3
            }
        ]
    }
]);
//正常订单分页
const orderCurrentPage = ref(1);
const orderPageSize = ref(6); // 每页显示的order数量
function orderHandleCurrentChange(page) {
  orderCurrentPage.value = page;
}

let totalOrders = computed(() => {
  return (orders.value && orders.value.length)? orders.value.length:0
});
let displayedOrders = computed(() => {
  const startIndex = (orderCurrentPage.value - 1) * orderPageSize.value;
  const endIndex = startIndex + orderPageSize.value;
  //console.log(orders);
  if(orders.value && orders.value.length){
    const filteredOrders = orders.value.filter((order) => {
    return order.emergency == 0; // 普通订单
  });
    return filteredOrders.slice(startIndex, endIndex);
  }
  else {return new Array(0)}
  
});
//获取紧急订单列表
let emergencyOrders = computed(() => {
  if(orders.value && orders.value.length){
    return orders.value.filter((order) => {
    return order.emergency == 1; // 紧急订单
  });
  }
  else {return new Array(0)}
  
});
//页面初始化时调用接口
onMounted(() => {
  //存储登陆时的厨师账号
  userNumber = localStorage.getItem("cookNumber") || "";
  //获取订单信息
  cookGetOrder({ number: userNumber }).then((result) => {
    orders.value = result.data.data;
    console.log(orders)
  });
  //获取公告信息
  cookGetAlerts().then((result) => {
    //console.log(result.data.data)
    alerts.value = result.data.data;
  });
  //获取排班信息
  cookGetSchedule({ number: userNumber }).then((result) => {
    schedule.value = result.data.data;
    //console.log(schedule.value);
    //console.log(filteredArr);
  });
  //Websocket接收实时变化

  ////////注意更改ip////////

  socket.value = new WebSocket("ws://192.168.121.155:8082/websocket");

  socket.value.onopen = () => {
    console.log("WebSocket连接已建立");
  };

  socket.value.onmessage = (event) => {
    const dataMessage=JSON.parse(event.data)
    console.log(event.data);
    // 处理WebSocket消息，核对是否该由本地接收
    if(dataMessage.number==userNumber || dataMessage.number=='公告')
       {  
          //查看消息类型，确定是哪种消息并作出对应响应
          if(dataMessage.type==1){
            cookGetOrder({number:userNumber}).then((result)=>{
              orders.value=result.data.data
              //console.log(orders.value)

            })
            ElNotification({
              title: '订单变动',
              message: dataMessage.data,
              duration: 0,
              type:'warning'
            })
          }
          else if(dataMessage.type==2){
            cookGetOrder({number:userNumber}).then((result)=>{
              orders.value=result.data.data
              //console.log(orders.value)

            })
            ElNotification({
              title: '有新订单',
              message: dataMessage.data,
              duration: 0,
              type:'success'
            })
          }
          else if(dataMessage.type==3){
            if(notificationCount.value=='')
            {
              notificationCount.value=1
            }else{
              notificationCount.value=notificationCount.value+1
            }
            cookGetAlerts().then((result)=>{
              //console.log(result.data.data)
              alerts.value=result.data.data
              
            })
            ElNotification({
              title: '有新公告',
              message: dataMessage.data,
              duration: 0,
            })
          }

          
          
          
          
       }
  };

  socket.value.onclose = () => {
    console.log("WebSocket连接已关闭");
  };
});
</script>

<style lang="scss" scoped>
//菜单字体
.menu-text {
  font-weight: bold; /* 加粗 */
  font-size: 30px; /* 加大 */
}
//页面背景
.background {
  background: #ffffff;
  width: 100%;
  height: 100vh;
}
.block {
  flex: 1;
}
//图标
.icon {
  width: 24px;
  height: 24px;
}
//退出图标
.exit-icon {
  content: url("../assets/exit-outlined.png");
}
//用户图标
.user-icon {
  width: 80px;
  justify-content: center;
  justify-items: center;
  display: flex;
}
//菜单样式
.el-menu {
  height: 60px;
  justify-content: center;
  display: flex;
}

.flex-grow {
  flex-grow: 1;
}
//居中
.item-center {
  left: 50%;
}
.el-menu-item {
  font-size: 16px;
  font-family: sans-serif;
  height: 60px;
  width: 120px;
}
.menu-line {
  height: 4px;
  background-color: #3f97ff;
}
//通知样式
.custom-alert {
  //height: 80px;
  width: 1200px;
  margin-block: 20px;
  border-radius: 13px;
  //background-color: #6dd5ed;
}
.custom-alert ::v-deep .el-alert__title {
  font-size: 25px; /* 调整标题字体大小 */
  display: none;
}

.custom-alert ::v-deep .el-alert__description {
  font-size: 18px; /* 调整内容字体大小 */
}
//紧急通知样式
.custom-alert-emergency {
  //height: 80px;
  width: 1200px;
  margin-block: 20px;
  border-radius: 13px;
  //background-color: #6dd5ed;
}
.custom-alert-emergency ::v-deep .el-alert__title {
  font-size: 25px; /* 调整标题字体大小 */
  display: none;
}

.custom-alert-emergency ::v-deep .el-alert__description {
  font-size: 18px; /* 调整内容字体大小 */
}
.page_box {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 0 20px 20px;
  background-color: #ffffff;
}
.el-pagination__number {
  font-size: 20px; /* 调整字体大小为您想要的大小 */
}

.icon-notification {
  content: url("../assets/notice-outlined.png");
}
.icon-order {
  content: url("../assets/cook.png");
}
.icon-schedule {
  content: url("../assets/calendar-outlined.png");
}
.center-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-label {
  display: flex;
  align-items: center;
  color: #3f97ff;
  right: 40px;
  font-size: 20px;
  width: 250px;
  justify-content: center;
}
.time {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.timetable-table {
  //display: flex;
  width: 70%;
  height: 70%;
  margin-left: 20%;
  margin-top: 5%;
}

.schedule-form {
  background-color: #f0fff0;
  width: 80%;
}
.schedule-form-alert {
  width: 80%;
  background-color: #6495ed;
  color: #f7f7f7;
  margin-top: 10%;
}
.schedule-form-alert::v-deep .el-alert__title {
  font-size: 14px;
}
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  //flex-shrink: 0;
  //align-items: center;
  //justify-content: center;
  width: 150px;
  //margin: 10px;
  text-align: center;
  //border-radius: 4px;
}

.order-form-alert {
  margin-top: 20px;
  width: 300px;
  margin-left: 40px;
}
.order-form-alert ::v-deep .el-alert__title {
  font-size: 25px; /* 调整标题字体大小 */
  display: none;
}
.order-form-alert-emergency {
  margin-top: 20px;
  width: 300px;
  border-top-left-radius: 20px; /* 左上角圆角 */
  border-top-right-radius: 20px; /* 右上角圆角 */
}
.order-form-alert-emergency ::v-deep .el-alert__title {
  font-size: 16px;
}
.order-form-alert::v-deep .el-alert__title {
  font-size: 16px;
}
.order-form {
  background-color: #f0fff0;
  width: 300px;
  margin-left: 40px;
  height: 250px;
  text-align: center;
  border-bottom-left-radius: 20px; /* 左下角圆角 */
  border-bottom-right-radius: 20px;
}
.order-form-emergency {
  background-color: #f9e2e4;
  width: 300px;
  height: 250px;
  border-bottom-left-radius: 20px; /* 左下角圆角 */
  border-bottom-right-radius: 20px;
}
.order_tatal {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  margin: 20px 0 0 30px;
  display: flex;
  align-items: center;
  .order_tatal_span {
    color: #3f97ff;
  }
}
.list_box {
  box-sizing: border-box;
  padding: 20px 20px 60px 20px;
  display: flex;
  .empty_div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .left_list {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .right_list {
    width: 350px;
    flex-shrink: 0;
    display: flex;
    justify-content: end;
    margin-right: 80px;
  }
}
.alerts-view {
  margin-left: 14%;
  //text-align: center;
  //display: flex;
}
.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1150px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
}
.alert-title {
  font-size: 23px;
  font-weight: bold;
}
.order-title {
  font-size: 16px;
  font-weight: bold;
}

.alert-time {
  font-size: 14px;
  //color: #999999;
  display: flex;
  margin-left: 20px;
  float: right;
  align-self: flex-end;
  width: 200px;
}
.order-time {
  font-size: 13px;
  //color: #999999;
  display: flex;
  margin-left: 20px;
  float: right;
  align-self: flex-end;
  width: 200px;
}
.alert-content {
  width: 500px;
}
.alert-block {
  height: 650px;
  width: 1200px;
}
.search-form {
  width: 400px;
  display: flex;
  margin-top: 30px;
}
.common-order-form {
  display: flex;
  width: 1200px;
  flex-wrap: wrap;
  height: 630px;
  margin-left: 40px;
}
//横向排列
.flex {
  display: flex;
}
.order-dish-scrollbar-item {
  width: 170px;
  text-align: left;
  height: 30px;
}
.blue-cell {
  background-color: rgb(138, 201, 238);
  height: 100%;
  width: 100%;
}
.el-badge ::v-deep .el-badge__content {
  margin-top: 20px;
}

.班 {
  color: #3f97ff;
}

.order-form-alert {
  width: 300px;
  margin-left: 40px;
  border-top-left-radius: 20px; /* 左上角圆角 */
  border-top-right-radius: 20px; /* 右上角圆角 */
}
</style>
