<!-- 显示在管理员主界面Main区域的；查看公告界面 -->
<template>
  <!-- 公告管理主界面 -->
    <div class="main-form">
      <!-- 月份选择 -->
        <el-form class="date-picker">
          <!-- 查询标题 -->
            <el-form-item label="查询标题">
                <el-input placeholder="请输入标题查询"
                v-model="searchTitle" 
                >
                </el-input>
            </el-form-item>
        <el-form-item label="选择月份" class="month-pick-form">
        <div class="block">
          <el-date-picker
            v-model="selectMonth"
            type="month"
            placeholder="选择查询月份"
            clearable
          >
          </el-date-picker>
        </div>
        </el-form-item>
      
      
      </el-form>
      <!-- 表格部分 -->
        <el-table :data="displayedAlerts" stripe class="table" height="590" :row-style="{height:'50px'}" >
          <!-- 下拉框 -->
            <el-table-column  type="expand" >
                <template #default="props">
                <div m="4" class="content">
                <p m="t-0 b-2" class="font-detail">标题: {{ props.row.title }}</p>
                <p m="t-0 b-2"  class="font-detail">内容: {{ props.row.content}}</p>
                <p m="t-0 b-2">发送时间: {{ props.row.time }}</p>
                <p m="t-0 b-2">发送对象: {{ typeFormatter(props.row,props.column) }}</p>
                </div>
                </template>
            </el-table-column>
            <!-- 标题 -->
            <el-table-column prop="title" label="公告标题" width="640"  class="加粗" >
              <template #default="scope">
                <div class="加粗 biggger">
                  {{ scope.row.title }}
                </div>
                </template>
            </el-table-column>
            <!-- 类型 -->
            <el-table-column  prop="emergency" label="公告类型" width="140">
                <template #default="scope">
                  <!-- 判断紧急 -->
                <el-tag
                :type="scope.row.emergency === 1 ? 'danger' : ''"
                disable-transitions
                effect="light"
                round
                class="biger"
                >{{ emergencyFormatter(scope.row,scope.column) }}</el-tag
                >
                </template>
            </el-table-column>
            <!-- 发送日期 -->
            <el-table-column  prop="time" label="发送日期" width="129" >
                <template #default="scope" >
                  <div class="bigger">
                    {{ new Date(scope.row.time).getFullYear()+"/"+(new Date(scope.row.time).getMonth()+1)+"/"+new Date(scope.row.time).getDate() }}
                  </div>
                
                </template>
            </el-table-column>
            <!-- 发送对象 -->
            <el-table-column
              prop="type"
              label="发送对象"
              width="140"
              :formatter="typeFormatter"
              :filters="[
                { text: '服务员', value: 1 },
                { text: '后厨', value: 2 },
                { text: '群发', value: 3 },
                ]"
              :filter-method="filterTag"
              class="biger"
            >
                <template #default="scope">
                    <el-tag
                    :type="typeTag(scope.row,scope.column)"
                    disable-transitions
                    >{{ typeFormatter(scope.row,scope.column) }}</el-tag
                    >
                </template>
        </el-table-column>
        <!-- 删除操作 -->
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="deleteHandler(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalAlerts"
            layout="->,total, prev, pager, next"
            class="pagination-container"
            background
            ></el-pagination>
    </div>
  </template>
  
<script setup>
import { useRouter, useRoute } from "vue-router"; //页面跳转第一步：引入，便于成功登录，跳转到下一个页面（第0步，修改router.js）
import { computed, onMounted, reactive, ref } from 'vue'  
import { adminDeleteAlerts, adminGetAlerts } from "../../api/adminapi";
import { ElMessage } from "element-plus";
const router = useRouter();
const route = useRoute(); //页面跳转第二步：创建实例

//分页数据
const currentPage= ref(1)
const pageSize= ref(11) // 每页显示的el-alert数量
//公告列表()
let AnnouncementList=ref([
    // {time:new Date(),emergency:0,content:'内容1',title:'标题1',type:1,id:1},
    // {time:new Date(),emergency:1,content:'内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2内容2',title:'标题2',type:2, id:2},
    // {time:new Date(),emergency:0,content:'内容3',title:'标题3',type:3,id:3},
    // {time:new Date(),emergency:1,content:'内容4',title:'标题4',type:2,id:4},
    // {time:new Date(),emergency:0,content:'内容5',title:'标题5',type:1,id:5},
    // {time:new Date(),emergency:1,content:'内容6',title:'标题6',type:3,id:6},
    // {time:new Date(),emergency:0,content:'内容7',title:'标题7',type:1,id:7},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:8},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:9},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:10},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:11},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:12},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:13},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:14},
    // {time:new Date(),emergency:0,content:'内容8',title:'标题8',type:1,id:15},
])
//分页函数
function handleCurrentChange(page) {
  currentPage.value = page
}
let totalAlerts=computed(()=> {
  return totalDisplayedAlerts.value.length
})
let totalDisplayedAlerts=computed(()=>{
  const filteredAlerts = AnnouncementList.value.filter(alert => {
    if (selectMonth.value === '') {
        if(searchTitle.value===''){
            return true; // 如果未选择月份，则显示所有通知
        }
        else{
            return alert.title.includes(searchTitle.value);
        }
    } else {
      const alertMonth = new Date(alert.time).getMonth() + 1; // 获取通知的月份（1-12）
      const selectedMonth = selectMonth.value.getMonth()+1; // 获取选择的月份（1-12）

      const alertYear = new Date(alert.time).getFullYear(); // 获取通知的年份
      const selectedYear = selectMonth.value.getFullYear(); // 获取选择的年份
      console.log(alertYear)
      console.log(selectedYear)
      //判断标题
      if(searchTitle.value===''){
        return (alertMonth === selectedMonth) && (alertYear === selectedYear); // 返回通知的月份是否与选择的月份相同
      }
      else{
        return (alertMonth === selectedMonth) && (alertYear === selectedYear)&&(alert.title.includes(searchTitle.value)); // 返回通知的月份是否与选择的月份相同
      }
      
    }
  });
  return filteredAlerts
})
let displayedAlerts=computed(()=> {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  //console.log(selectMonth)
  const filteredAlerts = AnnouncementList.value.filter(alert => {
    if (selectMonth.value === '') {
        if(searchTitle.value===''){
            return true; // 如果未选择月份，则显示所有通知
        }
        else{
            return alert.title.includes(searchTitle.value);
        }
    } else {
      const alertMonth = new Date(alert.time).getMonth() + 1; // 获取通知的月份（1-12）
      const selectedMonth = selectMonth.value.getMonth()+1; // 获取选择的月份（1-12）

      const alertYear = new Date(alert.time).getFullYear(); // 获取通知的年份
      const selectedYear = selectMonth.value.getFullYear(); // 获取选择的年份
      //console.log(alertYear)
      //console.log(selectedYear)
      //判断标题
      if(searchTitle.value===''){
        return (alertMonth === selectedMonth) && (alertYear === selectedYear); // 返回通知的月份是否与选择的月份相同
      }
      else{
        return (alertMonth === selectedMonth) && (alertYear === selectedYear)&&(alert.title.includes(searchTitle.value)); // 返回通知的月份是否与选择的月份相同
      }
      
    }
  });
  return filteredAlerts.slice(startIndex, endIndex);
})

//状态数字转换为文字
function emergencyFormatter(row,column){
    const emergency=row.emergency
    if(emergency==0){return '常规'}
    else if(emergency==1){return '紧急'}
}
function typeFormatter(row,column){
    const type=row.type
    //console.log(row.id)
    if(type==1){return '服务员'}
    else if(type==2){return '厨师'}
    else if(type==3){return '群发'}
}
function typeTag(row,column){
    const type=row.type
    if(type==1){return 'success'}
    else if(type==2){return 'warning'}
    else if(type==3){return 'danger'}
}


//日期筛选
const selectMonth=ref('')

//标题搜索
const searchTitle = ref('');



//删除公告
function deleteHandler(row){
  adminDeleteAlerts({announcementid:row.announcementid}).then((result)=>{
    adminGetAlerts().then((result)=>{
    AnnouncementList.value=result.data.data
    })
    ElMessage({
        type: "success",
        message: "已删除",
      });
  })  
}
//类型筛选功能函数
const filterTag = (value, row) => {
    return row.type == value;
};

//初始化
onMounted(() => {
  //获取公告
    adminGetAlerts().then((result)=>{
    AnnouncementList.value=result.data.data
    console.log(AnnouncementList.value)
    })
    
});


</script>
  
<style lang="scss" scoped>
//表格
.table {
    width: 94%;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    margin-left: 7.5%;
    text-align: center;
    font-size: 18px;
}
//分页组件容器
.pagination-container {
  height: 40px;
  width: 94%;
  //position: fixed;
  bottom: 0;
  //text-align: center;
  margin-left: 7.5%;
}
//公告内容
.content{
    margin-left: 50px;
    font-size: 14px;
}
//公告详细
.font-detail{
    width: 500px;
}
//日期选择器
.date-picker{
    margin-left: 7.5%;
    //text-align: center;
    display: flex;
}
//选择器位置
.month-pick-form{
    margin-left: 20px;
}
//主页面
.main-form{
  width: 90%;
}

//文字大小第一级
.bigger{
  font-size: 15px;
}
//文字大小第二级
.biggger{
  font-size: 16px;
}
//文字大小第三级
.bigger{
  font-size: 14px;
}
</style>
  