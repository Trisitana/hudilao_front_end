<!-- 显示在管理员主界面Main区域的；顾客管理界面 -->
<!-- 
  1.顾客信息里要历史订单？
  2.顾客管理 只允许查看 不能修改 头像弹窗
 -->
 <template>
  <div class="position">
    <el-row gutter="20">
    <el-col :span="18">
    <!-- 搜索栏 -->
    <el-input
      v-model="data.inputSearch"
      clearable
      placeholder="搜索关键字"
      class="inputSearch"
    >
      <template #prepend>
        <!-- 搜索星级选择 -->
        <el-select
          v-model="data.select"
          placeholder="星级"
          style="width: 120px"
        >
          <el-option label="全部星级" value="" />
          <!-- <el-option label="麻辣探险家" value="1" />
          <el-option label="热情火锅客" value="2" />
          <el-option label="湖底品鉴师" value="3" />
          <el-option label="湖底捞大师" value="4" />
          <el-option label="湖底捞传奇" value="5" />  -->
          <el-option label="麻辣探险家" value="1">
            <el-rate
              v-model="value1"
              disabled
              show-score
              score-template=" 麻辣探险家"
            />
          </el-option>
          <el-option label="热情火锅客" value="2">
            <el-rate
              v-model="value2"
              disabled
              show-score
              score-template=" 热情火锅客"
            />
          </el-option>
          <el-option label="湖底品鉴师" value="3">
            <el-rate
              v-model="value3"
              disabled
              show-score
              score-template=" 湖底品鉴师"
            />
          </el-option>
          <el-option label="湖底捞大师" value="4">
            <el-rate
              v-model="value4"
              disabled
              show-score
              score-template=" 湖底捞大师"
            />
          </el-option>
          <el-option label="湖底捞传奇" value="5">
            <el-rate
              v-model="value5"
              disabled
              show-score
              score-template=" 湖底捞传奇"
            />
          </el-option>
        </el-select>
      </template>
    </el-input>

    <!-- 表格部分 -->
    <div class="表格">
      <el-table :data="displayTable" stripe class="table">
        <!-- <el-table-colum prop="wishLists" type="expand">
          <template #default="props">
            <div m="3" class="content">
              <p m="t-0 b-2">心愿1: {{ props.row.wishLists[0] }}</p>
              <p m="t-0 b-2">心愿2: {{ props.row.wishList[1] }}</p>
              <p m="t-0 b-2">心愿3: {{ props.row.wishList[2] }}</p>
            </div>
          </template>
        </el-table-colum> -->
        <!-- 顾客id -->
        <el-table-column
          fixed
          sortable
          prop="customerid"
          label="顾客id"
          width="90"
        >
          <template #default="scope">
            <span>{{ scope.row.customerid }}</span>
          </template>
        </el-table-column>
        <!-- 昵称 -->
        <el-table-column prop="nickname" label="昵称" width="100">
          <template #default="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <!-- 顾客等级 -->
        <el-table-column prop="ranks" label="会员等级" width="240">
          <template #default="scope">
            <el-rate
              v-if="scope.row.ranks == 1"
              v-model="value1"
              disabled
              show-score
              score-template=" 麻辣探险家"
            />
            <el-rate
              v-if="scope.row.ranks == 2"
              v-model="value2"
              disabled
              show-score
              score-template=" 热情火锅客"
            />
            <el-rate
              v-if="scope.row.ranks == 3"
              v-model="value3"
              disabled
              show-score
              score-template=" 湖底品鉴师"
            />
            <el-rate
              v-if="scope.row.ranks == 4"
              v-model="value4"
              disabled
              show-score
              score-template=" 湖底捞大师"
            />
            <el-rate
              v-if="scope.row.ranks == 5"
              v-model="value5"
              disabled
              show-score
              score-template=" 湖底捞传奇"
            />
          </template>
        </el-table-column>
        <!-- 联系方式 -->
        <el-table-column prop="phonenumber" label="联系方式" width="140">
          <template #default="scope">
            <span>{{ scope.row.phonenumber }}</span>
          </template>
        </el-table-column>
        <!-- 生日 -->
        <el-table-column prop="birthday" label="生日" width="140">
          <template #default="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <!-- 入会日期 -->
        <el-table-column prop="registerdate" label="入会日期" width="140">
          <template #default="scope">
            <span>{{ scope.row.registerdate }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="wishLists" width="100">
          <template #default="scope">
            <el-tag
              v-if="
                scope.row.wishLists[0] ||
                scope.row.wishLists[1] ||
                scope.row.wishLists[2]
              "
              type="success"
              >心愿</el-tag
            >
            <div v-else></div>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- 心愿单 -->
        <el-table-column prop="wishLists" width="100">
          <template #default="scope">
            <!-- 心愿单弹窗 -->
            <el-popover
              v-if="
                scope.row.food1 ||
                scope.row.food2 ||
                scope.row.food3
              "
              placement="top"
              title="小心愿"
              :width="300"
              trigger="click"
            >
              <template #reference>
                <el-tag type="" class="bigger">小心愿</el-tag>
              </template>
              <template #default>
                <p v-if="scope.row.food1 != ''">
                  1. {{ scope.row.food1 }}
                </p>
                <p v-if="scope.row.food2 != ''">
                  2. {{ scope.row.food2 }}
                </p>
                <p v-if="scope.row.food3 != ''">
                  3. {{ scope.row.food3 }}
                </p>
              </template>
            </el-popover>
            <div v-else></div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalData"
            layout="->,total, prev, pager, next"
            class="pagination-container"
          ></el-pagination>
        </div>
    </el-col>  
    <el-col :span="6">
      <!-- 心愿值排行卡片 -->
          <el-card id="card-会员统计" shadow="hover" class="wish-card">
            <template #header>
              <span id="card-header">
                <span id="card-header-text">
                  心愿值排行榜
                </span>
                
              </span>
            </template>
            <!-- 心愿值排行容器 -->
            <div id="main1" style="width: 30vw; height: 55vh">
              <!-- 为Echarts准备的DOM必须添加高和宽，不然显示不出来 -->
            </div>
            <!-- <div id="main2" style="width: ;"></div> -->
          </el-card>
          
      
    </el-col> 
    
    </el-row>
  </div>
  
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { reactive, ref, computed, onMounted, watch } from "vue";
import { adminGetCustomer, adminGetWishRank } from "../../api/adminapi";
//分页数据
let drawer=ref(false)
const currentPage = ref(1);
const pageSize = ref(11);
//顾客等级
const value1 = ref(1);
const value2 = ref(2);
const value3 = ref(3);
const value4 = ref(4);
const value5 = ref(5);
//查找数据
const data = reactive({
  select: "",
  inputSearch: "",
});
//分页相关
// handleCurrentChange
const handleCurrentChange = (page) => {
  currentPage.value = page;
};

// totalData
let totalData = computed(() => {
  return tableData.value.length;
});

// displayTable
let displayTable = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  const filteredTable = tableData.value.filter((alert) => {
    if (data.inputSearch === "" && data.select === "") {
      //如果未输入查询项且未筛选星级，则显示所有数据
      return true;
    } else {
      if (data.select != "" && data.inputSearch === "") {
        //只筛选星级
        if (alert.ranks==data.select) {
          return alert.ranks==data.select;
        }
      }
      if (data.inputSearch != "" && data.select === "") {
        //只有搜索
        if (alert.nickname.includes(data.inputSearch)) {
          return alert.nickname.includes(data.inputSearch);
        }
      }
      if (data.select != "" && data.inputSearch != "") {
        data.select = "";
        return alert.nickname.includes(data.inputSearch);
      }
    }
  });
  // return tableData.slice(startIndex, endIndex);
  return filteredTable.slice(startIndex, endIndex);
});
//顾客信息
let tableData=ref<Customer[]>([
  {customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },
  {customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },{customerid: 3,
  nickname: '张飞',
  ranks:'3',
  phonenumber: '18652936273',
  birthday: '1989-12-10',
  registerdate: '2021-10-9',
  food1:'food1',
  food2:'food2',
  food3:'food3',
  },
])
//心愿单对象
interface Wish{
  food:String;
  totalRankedScore:Number;
}
//心愿单容器
let wishData=ref<Wish[]>([
  //{food:'海底捞',totalRankedScore:'12'}
])
//心愿排行榜渲染
const drawLine = () => {
  const myChart = echarts.init(document.getElementById("main1")); // 获取DOM元素并且进行初始化
  const option = {
    yAxis: {
      data: wishData.value.map((item)=>item.food),
      axisLabel: {
        inside: true,
        verticalAlign: 'bottom',
        lineHeight: 60,
        color: '#2193b0',
        fontSize:14
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
      inverse:true,
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
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
        data: wishData.value.map((item)=>item.totalRankedScore),
        type: "bar",
        itemStyle: {
          borderRadius: [3, 20, 20, 3],
          color: function (params) {   // 设置柱形图的颜色
                  if (params.dataIndex === 0) {
                    return '#d84430'
                  } else if (params.dataIndex === 1) {
                    return '#f38237'
                  } else if (params.dataIndex === 2) {
                    return '#e2aa20'
                  } else {
                    return '#608289'
                  }
                }
        },

        // emphasis: {
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       { offset: 0, color: "#2378f7" },
        //       { offset: 0.7, color: "#2378f7" },
        //       { offset: 1, color: "#83bff6" },
        //     ]),
        //   },
        // },
      },
    ],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        backgroundColor: '#fff', // 悬浮框背景色
        //borderColor: '#000', // 悬浮框边框颜色
        borderWidth: 1, // 悬浮框边框宽度
        textStyle: { // 悬浮框文字样式
            color: '#000',
            fontSize: 14
        }
    }

  };
  myChart.setOption(option);
}
//页面初始化
onMounted(() => {
    //获取顾客信息
    adminGetCustomer().then((result)=>{
      tableData.value=result.data.data
      console.log(result.data.data)
    })
    //console.log(tableData)
    //获取心愿排行信息
   adminGetWishRank().then((result)=>{
    wishData.value=result.data.data
    //console.log(result.data.data)
    //console.log(wishData.value)
    //重新渲染
    drawLine()
   })
   
    
  
   
});

// interface wishList {
//   wish1: String;
//   wish2: String;
//   wish3: String;
// }

interface Customer {
  customerid: Number;
  nickname: String;
  ranks: String; //1：麻辣探险家；2：热情火锅客；3：湖底品鉴师；4：湖底捞大师；5：湖底捞传奇
  phonenumber: String;
  birthday: String;
  registerdate: String;
  food1:String;
  food2:String;
  food3:String;
}


</script>

<style lang="scss" scoped>
//表格
.table {
  width: 90%;
  border-radius: 15px;
  background-color: rgb(255, 255, 255);
  // text-align: center;
  //margin-left: 10%;
  height: 580px;
}
//横向排列
.flex{
  display: flex;
}
//查询输入框
.inputSearch {
  position: relative;
  width: 300px;
  top: -5px;
  //margin-left: 10%;

}
//分页组件
.pagination-container {
  position: relative;
  //top: -150px;
  //left: -200px;
  left: -120px;
  //width: 200px;
  top: 20px;
}
.position{
  margin-left: 1%;
}
//心愿排行列表
.wish-card{
  margin-top: 30px;
  height: 500px;
  margin-left: -100px;
}
//卡片标题
#card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#card-header-text {
  font-size: larger;
  font-weight: 1000;
}
//图表容器
#main1 {
  position: relative;
  top: -40px;
  left: -40px;
}
</style>


