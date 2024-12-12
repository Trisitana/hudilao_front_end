<!-- 现在的问题：
1.删除和新增不刷新（为什么编辑就能实时显示）
2.添加row跳转到最后一行
 -->
 <template>
  <div>
    <!-- 搜索栏 -->
    <el-input
      v-model="data.inputSearch"
      placeholder="搜索关键字"
      class="inputSearch"
    >
    </el-input>

    <el-button round type="primary" @click="addEmployee" class="添加按钮"
      >添加</el-button
    >
  </div>
  <!-- 表格部分 -->
  <div class="表格">
    <el-table :data="displayTable" stripe class="table" height="640" :row-style="{height:'50px'}" >
      <!-- 工号 -->
      <el-table-column fixed prop="number" label="工号" width="140">
        <template #default="scope">
          <!-- 判断是否再在编辑或添加 -->
          <el-input
            v-if="scope.row.isAdd"
            v-model="scope.row.number"
            type="text"
            placeholder="工号"
          />
          <span v-else class="bigger">{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column prop="name" label="姓名" width="150">
        <template #default="scope">
          <!-- 判断是否再在编辑或添加 -->
          <el-input
            v-if="scope.row.isAdd"
            v-model="scope.row.name"
            type="text"
            placeholder="姓名"
          />
          <span v-else class="bigger">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- 性别 -->
      <el-table-column prop="sex" label="性别" width="140">
        <template #default="scope">
          
          <!-- 这里可能有问题 -->
          <!-- <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.sex"
            type="text"
            placeholder="性别"
          /> -->
          <!-- 选择性别 -->
          <!-- 判断是否再在编辑或添加 -->
          <el-select v-if="scope.row.isAdd" v-model="scope.row.sex" class="m-2" placeholder="选择性别" >
            <el-option
              label="男"
              value= 0
            />
            <el-option
              label="女"
              value= 1
            />
          </el-select>
          <el-tag
            v-else
            :type="scope.row.sex === 0 ? 'warning' : ''"
            disable-transitions
            effect="light"
            round
            class="bigger"
            >{{ sexTransfer(scope.row.sex) }}</el-tag
          >
          <!-- <span v-else>{{ scope.row.sex }}</span> -->
        </template>
      </el-table-column>

      <el-table-column
        prop="type"
        label="职务"
        width="120"
        :filters="[
          { text: '厨师', value: 2 },
          { text: '服务员', value: 1 },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <!-- 判断是否再在编辑或添加 -->
          <el-tag
            v-if="!scope.row.isEdit"
            :type="scope.row.type === 2 ? 'success' : 'error'"
            disable-transitions
            class="bigger"
            >{{ typeTransfer(scope.row.type) }}</el-tag
          >
          <!-- 这里可能有点问题 -->
          <!-- <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.type"
            type="text"
            placeholder="职务"
          /> -->
          <!-- 判断是否再在编辑或添加 -->
          <el-select v-if="scope.row.isEdit" v-model="scope.row.type" class="m-2" placeholder="选择工种" >
            <el-option
              label="服务员"
              value= 1
            />
            <el-option
              label="厨师"
              value= 2
            />
          </el-select>
          <!-- <span v-else>{{ scope.row.type }}</span> -->
        </template>
      </el-table-column>

      <el-table-column prop="phonenumber" label="联系方式" width="200">
        <template #default="scope">
          <!-- 判断是否再在编辑或添加 -->
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.phonenumber"
            type="text"
            maxlength="11"
            placeholder="联系方式"
            @input="inputPhone(scope.row)"
            class="输入电话"
          />
          <span v-else width="120" class="bigger">{{ scope.row.phonenumber }}</span>
          <!-- 判断手机号输入是否正确 -->
          <el-tag v-if="phoneAlert=='正确' && scope.row.id==''">正确</el-tag>
          <el-tag v-if="phoneAlert=='错误' && scope.row.id==''" >错误</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="registertime" label="入职时间" width="180">
        <!-- 这里可以用日期选择组件？ -->
        <template #default="scope">
           <!-- <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.registertime"
            type="text"
            placeholder="入职时间"
          />  -->
          <span class="bigger">{{ scope.row.registertime }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="number" label="账号" width="150">
        <template #default="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.number"
            type="text"
            placeholder="账号"
          />
          <span v-else>{{ scope.row.number }}</span>
        </template>
      </el-table-column> -->
      <!-- 密码 -->
      <el-table-column prop="password" label="密码" width="220">
        <template #default="scope">
          <!-- 是否编辑中 -->
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.password"
            type="text"
            placeholder="密码"
          />
          <span v-else class="bigger">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <!-- 是否编辑中 -->
          <div v-if="scope.row.isEdit">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleRowConfirm(scope.row)"
              >确定</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="handleRowCancel(scope.row)"
              >取消</el-button
            >
          </div>
          <div v-else>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleRowEdit(scope.row)"
            >
              编辑</el-button
            >
            <el-button
              link
              type="danger"
              size="small"
              @click="handleRowDelete(scope.$index , scope.row)"
              >删除</el-button
            >
          </div>
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
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router"; //页面跳转第一步：引入，便于成功登录，跳转到下一个页面（第0步，修改router.js）
import type { FormInstance, TableColumnCtx, TableInstance } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { set } from "lodash-es";
import { ElNotification } from "element-plus";
import { Search, Upload } from "@element-plus/icons-vue";
import { adminAddEmployee, adminDeleteEmployee, adminEditEmployee, adminGetEmployee } from "../../api/adminapi";
import { aD } from "@fullcalendar/core/internal-common";
const router = useRouter();
const route = useRoute(); //页面跳转第二步：创建实例
const visible = ref(false);
//分页数据
const currentPage = ref(1);
const pageSize = ref(12);

const data = reactive({
  dialogVisible: false,
  modifyIndex: -1,
  inputSearch: "",
});

//判断手机号格式
let phoneAlert=''
function inputPhone(row){
  console.log("开始判断")
  //是否符合1、3-9、9*0-9的格式
  let reg = /^1[3-9][0-9]{9}$/;
  //是否过长
  if(row.phonenumber.length==11 && reg.test(row.phonenumber)){
    phoneAlert='正确'
    console.log(phoneAlert)
  }
  else{
    phoneAlert='错误'
    console.log(phoneAlert)
  }
}
//数据转换
const sexTransfer=((sex)=>{
  if(sex==0){return '男'}
  else if(sex==1){return '女'}
})
function typeTransfer(type){
  if(type==1){return '服务员'}
  else if(type==2){return '厨师'}
}


// 每次编辑行时，先临时存储该行数据
const tempRowData = reactive({
  id: "",
  name: "",
  sex: "",
  type: "",
  phonenumber: "",
  registertime: "",
  number: "",
  password: "",
  isEdit: true,
  isAdd: true,
});

interface Employee {
  id: String;
  name: String;
  sex: String;
  type: String;
  phonenumber: String;
  registertime: String;
  number: String;
  password: String;
  isEdit: boolean;
  isAdd: boolean;
}

// 添加员工
const addEmployee = () => {
  console.log(currentPage.value,totalData.value,pageSize.value, Math.floor(totalData.value/pageSize.value))
  currentPage.value=Math.floor(totalData.value/pageSize.value)+1  
  tableData.value.push({
    id: "",
    name: "",
    sex: "",
    type: "",
    phonenumber: "",
    registertime: "",
    number: "",
    password: "",
    isEdit: true,
    isAdd: true,
  });
}

// 编辑员工
const handleRowEdit = (row) => {
  set(row, "isEdit", true);
  //首先存储
  tempRowData.id = row.id;
  tempRowData.name = row.name;
  tempRowData.sex = row.sex;
  tempRowData.type = row.type;
  tempRowData.phonenumber = row.phonenumber;
  tempRowData.registertime = row.registertime;
  tempRowData.number = row.number;
  tempRowData.password = row.password;
  tempRowData.isEdit = row.isEdit;
  tempRowData.isAdd = row.isAdd;
};

// 删除员工
const handleRowDelete = (index: number , row) => {
  let newIndex = index + (currentPage.value - 1) * pageSize.value;
  //删除员工的接口
  adminDeleteEmployee({id:row.id}).then((result)=>{
    ElMessage({
    type: "success",
    message: "删除成功！",
  });
  })
  tableData.value.splice(newIndex, 1);
};

// 确认编辑员工
const handleRowConfirm = (row) => {
  set(row, "id", row.id);
  set(row, "name", row.name);
  set(row, "sex", row.sex);
  set(row, "type", row.type);
  set(row, "phonenumber", row.phonenumber);
  set(row, "registertime", row.registertime);
  set(row, "number", row.number);
  set(row, "password", row.password);
  set(row, "isEdit", false);
  set(row, "isAdd", false);
  //判断id、如果是空的，说明是在添加，如果不是，说明是在编辑
  if(row.id=='')
  {
    
    //添加员工的接口
    adminAddEmployee({number:row.number,name:row.name,sex:row.sex,type:row.type,phonenumber:row.phonenumber,password:row.password}).then((result)=>{
      ElMessage({
        type: "success",
        message: "添加成功！",
      });
    })
    
  }
  else if(row.id!=''){
    //编辑员工的接口
    console.log("成功")
    console.log({id:row.id,type:row.type,password:row.password,phonenumber:row.phonenumber})
    adminEditEmployee({id:row.id,type:row.type,password:row.password,phonenumber:row.phonenumber}).then(()=>{
      ElMessage({
        type: "info",
        message: "编辑成功！",
      });
    })
  } 
};

// 取消
const handleRowCancel = (row) => {
  //恢复
  set(row, "id", tempRowData.id);
  set(row, "name", tempRowData.name);
  set(row, "sex", tempRowData.sex);
  set(row, "type", tempRowData.type);
  set(row, "phonenumber", tempRowData.phonenumber);
  set(row, "registertime", tempRowData.registertime);
  set(row, "number", tempRowData.number);
  set(row, "password", tempRowData.password);
  set(row, "isEdit", false);
  set(row, "isAdd", false);
  console.log(row)
  if(row.id==''){
    tableData.value.splice(tableData.value.length-1,1)
  }
  
  ElMessage({
    type: "info",
    message: "取消编辑！",
  });
};
//分页所需函数
const handleCurrentChange = (page) => {
  currentPage.value = page;
};

let totalData = computed(() => {
  return tableData.value.length;
});

let displayTable = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  const filteredTable = tableData.value.filter((alert) => {
    if (data.inputSearch === "") {
      //如果未输入查询项，则显示所有数据
      return true;
    } else {
      if (alert.number.includes(data.inputSearch)) {
        return alert.number.includes(data.inputSearch);
      }
      if (alert.registertime.includes(data.inputSearch)) {
        return alert.registertime.includes(data.inputSearch);
      }
      if (sexTransfer(alert.sex)!.includes(data.inputSearch)) {
        return sexTransfer(alert.sex)!.includes(data.inputSearch);
      }
      if (alert.name.includes(data.inputSearch)) {
        return alert.name.includes(data.inputSearch);
      }
    }
  });
  // return tableData.slice(startIndex, endIndex);
  return filteredTable.slice(startIndex, endIndex);
});
//标签状态
const filterTag = (value: string, row: Employee) => {
  return row.type == value;
};
//页面初始化
onMounted(() => {
  //获得员工
    adminGetEmployee().then((result)=>{
      tableData.value=result.data.data
      //console.log(result.data.data)
    })
    //console.log(tableData)
});


let tableData=ref<Employee[]>([])
</script>

<style lang="scss" scoped>
.table {
  width: 90%;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  //text-align: center;
  margin-left: 70px;
  font-size: 17px;
  
}
</style>

<style>
.el-message-box {
  border-radius: 15px;
  width: 300px;
}
.inputSearch {
  position: relative;
  width: 300px;
  top: -5px;
  margin-left: 150px;
}
.添加按钮 {
  position: relative;
  width: 70px;
  top: -5px;
  left: 775px;
}
/* .表格 {
  width: 90vw;
} */
.pagination-container {
  position: relative;
  top: 10px;
  width: 90%;
}
.输入电话{
  width: 100px;
}
.border{
  font-weight: 600;
}
.bigger{
  font-size: 14px;
}
.el-table-column::v-deep .el-table-column__label{
  font-size:20px;
}
</style>


