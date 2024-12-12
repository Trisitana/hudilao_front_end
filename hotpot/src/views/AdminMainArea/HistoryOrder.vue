<!-- 显示在管理员主界面Main区域的；历史订单界面 -->
<template>
     <div>
      <!-- 主界面 -->
      <div class="main-form">
        <!-- 查询部分 -->
        <el-form class="date-picker">
            <el-form-item label="查询手机号">
                <el-input placeholder="请输入手机号"
                v-model="searchPhone" 
                >
                </el-input>
            </el-form-item>
        <el-form-item label="选择月份" class="month-pick-form">
        <div class="block">
          <el-date-picker
            v-model="selectMonth"
            type="month"
            placeholder="选择查询月份"
            
          >
          </el-date-picker>
        </div>
        </el-form-item>
      
      
        </el-form>
        <!-- 表格部分 -->
        <el-table :data="displayedOrders" stripe class="table" height="590" :row-style="{height:'50px'}" >
            <el-table-column prop="finishedorderid" fixed label="订单号" width="140"   />
            <el-table-column prop="tableid" sortable  label="桌号" width="140" />
            <el-table-column prop="phonenumber" label="手机号" width="220"   />
            <el-table-column  prop="comment" label="订单评价" width="200" :filters="[
            { text: '未评分', value: 0 },
            { text: '一星', value: 1 },
            { text: '二星', value: 2 },
            { text: '三星', value: 3 },
            { text: '四星', value: 4 },
            { text: '五星', value: 5 },
            ]"
          :filter-method="commentFilterTag">
                <template #default="scope">
                  <!-- 判断是否评分 -->
                  <el-rate v-if="scope.row.comment>0"
                    v-model="scope.row.comment"
                    disabled
                    show-score
                    text-color="#ff9900"
                  />
                  <div v-else>
                    未评分
                  </div>
                </template>
            </el-table-column>
            <!-- 订单日期 -->
            <el-table-column  prop="time" label="订单日期" width="129" >
                <template #default="scope">
                {{ new Date(scope.row.time).getFullYear()+"/"+(new Date(scope.row.time).getMonth()+1)+"/"+new Date(scope.row.time).getDate() }}
                </template>
            </el-table-column>
            <!-- 订单时间 -->
            <el-table-column  prop="time" label="订单时间" width="129" >
                <template #default="scope">
                {{ new Date(scope.row.time).getHours()+":"+new Date(scope.row.time).getMinutes()+":"+new Date(scope.row.time).getSeconds() }}
                </template>
            </el-table-column>
            <!-- 订单总价 -->
            <el-table-column prop="money" label="总价" width="100"  :filters="[
            { text: '0-100', value: 1 },
            { text: '100-300', value: 2 },
            { text: '300-500', value: 3 },
            { text: '500-1000', value: 4 },
            { text: '1000以上', value: 5 },
            ]"
          :filter-method="moneyFilterTag" />
          <!-- 查看菜品详情 -->
        <el-table-column fixed="right" label="菜品详情" width="100">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="dishHandler(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalOrders"
            layout="->,total, prev, pager, next"
            class="pagination-container"
            background
            ></el-pagination>
    </div>
    </div> 
    <!-- 订单详细信息窗口 -->
    <el-dialog v-model="finishedOrderDialogVisible" title="订单菜品信息" class="订单菜品" width="400" >
      <el-table :data="items" show-summary cla>
      <el-table-column property="name" label="菜品名" width="150" />
      <el-table-column property="quantity" label="数量" width="100" />
      <el-table-column property="price" label="价格"  width="100"/>
    </el-table>
    </el-dialog>
  </template>
  
  <script setup>
  import { useRouter, useRoute } from "vue-router"; //页面跳转第一步：引入，便于成功登录，跳转到下一个页面（第0步，修改router.js）
  import { computed, onMounted, reactive, ref } from 'vue'  
  import { ElMessage } from "element-plus";
  import { adminGetOrderDetail, adminGetOrders } from "../../api/adminapi";
  const router = useRouter();
  const route = useRoute(); //页面跳转第二步：创建实例

let finishedOrders=ref([
        // {"finishedorderid": 1,"tableid": 1,"phonenumber": 18551755238,"comment": 5,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 2,"tableid": 2,"phonenumber": 18151755238,"comment": 4,"time": "2023-08-05T16:31:29","money": 300,},
        // {"finishedorderid": 3,"tableid": 3,"phonenumber": 18251755238,"comment": 3,"time": "2023-10-05T16:31:29","money": 200,},
        // {"finishedorderid": 4,"tableid": 4,"phonenumber": 18351755238,"comment": 2,"time": "2023-08-05T16:31:29","money": 400,},
        // {"finishedorderid": 5,"tableid": 5,"phonenumber": 18451755238,"comment": 1,"time": "2023-10-05T16:31:29","money": 500,},
        // {"finishedorderid": 6,"tableid": 6,"phonenumber": 18551755238,"comment": 5,"time": "2023-07-05T16:31:29","money": 700,},
        // {"finishedorderid": 7,"tableid": 7,"phonenumber": 18651755238,"comment": 4,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 8,"tableid": 8,"phonenumber": 18751755238,"comment": 3,"time": "2023-09-05T16:31:29","money": 1500,},
        // {"finishedorderid": 9,"tableid": 9,"phonenumber": 18851755238,"comment": 2,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 10,"tableid": 10,"phonenumber": 18951755238,"comment": 1,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 11,"tableid": 1,"phonenumber": 18151755238,"comment": 5,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 12,"tableid": 2,"phonenumber": 18251755238,"comment": 4,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 13,"tableid": 3,"phonenumber": 18351755238,"comment": 3,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 14,"tableid": 4,"phonenumber": 18451755238,"comment": 2,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 15,"tableid": 2,"phonenumber": 18551755238,"comment": 1,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 16,"tableid": 2,"phonenumber": 18651755238,"comment": 5,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 17,"tableid": 2,"phonenumber": 18751755238,"comment": 4,"time": "2023-09-05T16:31:29","money": 3000,},
        // {"finishedorderid": 18,"tableid": 2,"phonenumber": 18851755238,"comment": 3,"time": "2023-09-05T16:31:29","money": 3000,},

])
//菜品详情中的点菜列表
let items=ref([
{
                        "name": "娃娃菜",
                        "quantity": 2,
                        "price": 40,
                        "img": null
                    },
                    {
                        "name": "冬瓜",
                        "quantity": 1,
                        "price": 30,
                        "img": null
                    },
                    {
                        "name": "山药",
                        "quantity": 1,
                        "price": 50,
                        "img": null
                    },
                    {
                        "name": "五常米饭",
                        "quantity": 2,
                        "price": 15,
                        "img": null
                    }
])
//分页
const currentPage= ref(1)
const pageSize= ref(11)
function handleCurrentChange(page) {
  currentPage.value = page
}
let totalOrders=computed(()=> {
  return totalDisplayedOrders.value.length
})
let totalDisplayedOrders=computed(()=>{
  const filteredOrders = finishedOrders.value.filter(order => {
    if (selectMonth.value === '') {
        if(searchPhone.value===''){
            return true; // 如果未选择月份，则显示所有通知
        }
        else{
            return order.phonenumber.toString().includes(searchPhone.value);
        }
    } else {
      const orderMonth = new Date(order.time).getMonth() + 1; // 获取通知的月份（1-12）
      const selectedMonth = selectMonth.value.getMonth()+1; // 获取选择的月份（1-12）

      const orderYear = new Date(order.time).getFullYear(); // 获取通知的年份
      const selectedYear = selectMonth.value.getFullYear(); // 获取选择的年份
      //判断标题
      if(searchPhone.value===''){
        return (orderMonth === selectedMonth) && (orderYear === selectedYear); // 返回通知的月份是否与选择的月份相同
      }
      else{
        return (orderMonth === selectedMonth) && (orderYear === selectedYear)&&(order.phonenumber.toString().includes(searchPhone.value)); // 返回通知的月份是否与选择的月份相同
      }
      
    }
  });
  return filteredOrders
})
let displayedOrders=computed(()=> {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  //console.log(selectMonth)
  const filteredOrders = finishedOrders.value.filter(order => {
    if (selectMonth.value === '') {
        if(searchPhone.value===''){
            return true; // 如果未选择月份，则显示所有通知
        }
        else{
            return order.phonenumber.toString().includes(searchPhone.value);
        }
    } else {
      const orderMonth = new Date(order.time).getMonth() + 1; // 获取通知的月份（1-12）
      const selectedMonth = selectMonth.value.getMonth()+1; // 获取选择的月份（1-12）

      const orderYear = new Date(order.time).getFullYear(); // 获取通知的年份
      const selectedYear = selectMonth.value.getFullYear(); // 获取选择的年份
      //判断标题
      if(searchPhone.value===''){
        return (orderMonth === selectedMonth) && (orderYear === selectedYear); // 返回通知的月份是否与选择的月份相同
      }
      else{
        return (orderMonth === selectedMonth) && (orderYear === selectedYear)&&(order.phonenumber.toString().includes(searchPhone.value)); // 返回通知的月份是否与选择的月份相同
      }
      
    }
  });
  return filteredOrders.slice(startIndex, endIndex);
})


//日期筛选
const selectMonth=ref('')

//标题搜索
const searchPhone = ref('');

//菜品详细信息

let finishedOrderDialogVisible=ref(false)
function dishHandler(row){
  adminGetOrderDetail({finishedorderid:row.finishedorderid}).then((result)=>{
    items.value=result.data.data.items
  })
  finishedOrderDialogVisible.value=true
}

//筛选
const commentFilterTag = (value, row) => {
    return row.comment == value;
};
//金额筛选
const moneyFilterTag = (value, row) => {
    if(value==1){
      return row.money>0 &&row.money<=100
    }
    else if(value==2){
      return row.money>100 &&row.money<=300
    }
    else if(value==3){
      return row.money>300 &&row.money<=500
    }
    else if(value==4){
      return row.money>500 &&row.money<=1000
    }
    else if(value==5){
      return row.money>1000
    }
};
//页面初始化
onMounted(()=>{
  //获取订单
  adminGetOrders().then((result)=>{
    finishedOrders.value=result.data.data
  })
  console.log(displayedOrders)
  console.log(finishedOrders)
})


</script>
  
<style lang="scss" scoped>
//表格
.table {
    width: 90%;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    margin-left: 7.5%;
    text-align: center;
    font-size: 16px;
  }
//分页容器
.pagination-container {
  height: 40px;
  width: 100%;
  //position: fixed;
  bottom: 0;
  //text-align: center;
  margin-left: 7.5%;
  width: 90%;
}
//内容
.content{
    margin-left: 50px;
    font-size: 14px;
}
//详情字体
.font-detail{
    width: 500px;
}
//月份选择器
.date-picker{
    margin-left: 7.5%;
    //text-align: center;
    display: flex;
}
.month-pick-form{
    margin-left: 20px;
}
//主界面
.main-form{
  width: 90%;
}
//菜品表格
.订单菜品{
  width: 400px;
}
</style>
  