<!-- 显示在管理员主界面Main区域的；菜品管理界面 -->

<!-- 菜品分几大类别，根据筛选框筛选菜品种类，显示对应表格，表格操作里加上置顶功能(置顶功能要单独按钮，已置顶就显示取消置顶，未置顶就显示置顶) ，只支持菜品价格和库存的修改-->
<!-- 添加菜品有bug, 然后添加菜品的话，先选择类别，然后在该类别下添加菜品，类别就写死，id、类别、月售都不能添加
添加菜品就搞弹窗，一定要搞出提交图片 -->
<!-- 然后就是顾客管理 只允许查看 不能修改 头像弹窗 -->
<template>
  <div>
    <!-- 查询输入框 -->
    <el-input
      v-model="data.inputSearch"
      placeholder="搜索菜品名称"
      class="inputSearch"
      clearable
    >
      <template #prepend>
        <el-select
          v-model="data.select"
          placeholder="筛选菜品"
          style="width: 105px"
        >
          <el-option label="全部菜品" value="" />
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
      </template>
    </el-input>
    <!-- 添加菜品按钮 -->
    <el-button round type="primary" @click="addFood" class="添加按钮"
      >添加菜品</el-button
    >
  </div>

  <!-- 添加菜品弹窗 -->
  <el-dialog
    title="添加菜品"
    v-model="data.dialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    center
    width="30%"
  >
  <!-- 菜品名称 -->
    <el-input
      v-model="dialogInput.foodName"
      placeholder="菜品名称"
      class="菜品类别及名称"
    >
      <template #prepend>
        <!-- 菜品类别 -->
        <el-select
          v-model="dialogInput.foodType"
          placeholder="菜品类别"
          style="width: 100px"
        >
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
      </template>
    </el-input>
    <!-- 库存输入 -->
    <el-input
      v-model="dialogInput.foodRepo"
      placeholder="请输入库存"
      class="库存输入框"
    >
    </el-input>
    <!-- 价格输入 -->
    <el-input
      v-model="dialogInput.foodPrice"
      placeholder="请输入单价"
      class="单价输入框"
    >
    </el-input>

    <!-- 上传图片 -->
    <!-- <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      class="上传图片"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog> -->
    
    <!-- 上传图片 -->
    <el-upload
    ref="upload"
    action="http://192.168.121.155:8082/images/upload"
    :limit="1"
    list-type="picture-card"
    accept=".png, .jpg,.webp"
    v-model:file-list="fileList"
    :on-success="successUpload"
    :on-error="errorUpload"
    :on-exceed="handleExceed"
    :before-upload="beforeAvatarUpload"
    :class="{ disabled: uploadDisabled}"
    :on-preview="handlePictureCardPreview"
    class="上传图片"
    
>
    <el-button size="small" type="primary"> 点击上传 </el-button>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

  <!-- 确认按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelHandler()">取消</el-button>
        <el-button type="primary" @click="confirmHandler()"> 添加 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 表格部分 -->
  <div class="表格">
    <!-- 菜品id -->
    <el-table :data="displayTable" stripe class="table" height="590" >
      <el-table-column fixed prop="foodid" label="菜品id" width="100">
        <template #default="scope">
          <el-input
            v-if="scope.row.isAdd"
            v-model="scope.row.foodid"
            type="text"
            placeholder="菜品id"
          />
          <span v-else>{{ scope.row.foodid }}</span>
        </template>
      </el-table-column>
      <!-- 菜品名 -->
      <el-table-column prop="name" label="菜名" width="180">
        <template #default="scope">
          <el-input
            v-if="scope.row.isAdd"
            v-model="scope.row.name"
            type="text"
            placeholder="菜名"
          />
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- 类别 -->
      <el-table-column prop="foodtype" label="类别" width="150">
        <template #default="scope">
          <!-- <el-input
            v-if="scope.row.isAdd"
            v-model="typeTransfer(scope.row.foodtype)"
            type="text"
            placeholder="类别"
          /> -->
          {{ typeTransfer(scope.row.foodtype) }}
        </template>
      </el-table-column>
      <!-- 库存 -->
      <el-table-column prop="repository" label="库存" width="180">
        <template #default="scope">
          <el-input-number
            v-if="scope.row.isEdit"
            v-model="scope.row.repository"
            :min="0"
            controls-position="right"
            placeholder="库存"
          />
          <span v-else>{{ scope.row.repository }} 份</span>
        </template>
      </el-table-column>
      <!-- 单价 -->
      <el-table-column prop="price" label="单价" width="150">
        <template #default="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.price"
            type="text"
            placeholder="单价"
          />
          <span v-else>{{ scope.row.price }} 元/份</span>
        </template>
      </el-table-column>
      <!-- 销量 -->
      <el-table-column prop="monthsale" label="月售" width="150">
        <template #default="scope">
          <el-input
            v-if="scope.row.isAdd"
            v-model="scope.row.monthsale"
            type="text"
            placeholder="月售"
          />
          <span v-else>{{ scope.row.monthsale }} 份</span>
        </template>
      </el-table-column>
      <!-- 确定、取消、编辑、上下架操作 -->
      <el-table-column fix="right" label="操作" width="170">
        <template #default="scope">
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
          <div v-else class="flex">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleRowEdit(scope.row)"
            >
              编辑</el-button
            >
            
            <el-button
              v-if="scope.row.inuse==0"
              link
              type="danger"
              size="small"
              @click="handleRowDelete(scope.row)"
              >下架</el-button
            >
            

              <el-button
              v-else
              link
              type="danger"
              size="small"
              @click="handleRowInuse(scope.row)"
              >上架</el-button
            >
            
          </div>
        </template>
      </el-table-column>
      <!-- 置顶与取消置顶 -->
      <el-table-column fix="right" prop="pinTop" label="置顶">
        <template #default="scope">
          <div v-if="scope.row.top">
            <el-button
              round
              bg
              type="primary"
              size="small"
              @click="handleUnPin(scope.row)"
              >取消置顶</el-button
            >
          </div>
          <div v-else>
            <el-button
              round
              bg
              type=""
              size="small"
              @click="handlePin(scope.row)"
            >
              置顶</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- 查看图片 -->
      <el-table-column  fixed="right" label="查看图片" width="140">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="handleDishPictureCardPreview(scope.row,scope.column)"
              >查看图片</el-button
            >
                </template>
            </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalData"
      layout="->, total, prev, pager, next"
      class="pagination-container"
    ></el-pagination>
  </div>
  <!-- 预览图片窗口 -->
  <el-dialog v-model="dishDialogVisible" :width="dialogWidth">
    <img w-full :src="dishDialogImageUrl" alt="Preview Image"/>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from "vue";
import { set } from "lodash-es";
import { ElMessage, ElMessageBox,UploadInstance, UploadProps, UploadRawFile,genFileId} from "element-plus";
import { ElNotification, UploadFile } from "element-plus";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { adminGetFood, adminTop ,adminNotTop, adminUnuseFood, adminInuseFood, adminEditFood, adminAddFood} from "../../api/adminapi";
import { filterFields } from "element-plus/es/components/form/src/utils";
//分页数据
const currentPage = ref(1);
const pageSize = ref(13);
const data = reactive({
  inputSearch: "", // 查询框的内容
  select: "",
  dialogVisible: false,
});
//添加菜品临时数据
const dialogInput = reactive({
  foodName: "",
  foodType: "",
  foodRepo: "",
  foodPrice: "",
});

// 每次编辑行时，先临时存储该行数据
const tempRowData = reactive({
  foodid: -1,
  name: "",
  foodtype: 0,
  repository: 0,
  price: 0,
  monthsale: 0,
  img:"",
  top:0,
  inuse:0
});

// 添加菜品按钮
const addFood = () => {
  // foodTable.push({
  //   foodid: 0,
  //   name: "",
  //   foodtype: "0",
  //   repository: 0,
  //   price: 0,
  //   monthsale: 0,
  //   isEdit: true,
  //   isAdd: true,
  //   pinTop: false,
  // });
  data.dialogVisible = true;
};

// 添加菜品弹窗-取消
const cancelHandler = () => {
  data.dialogVisible = false;
};

// 添加菜品弹窗-添加
const confirmHandler = () => {
  if (
    dialogInput.foodName &&
    parseInt(dialogInput.foodPrice)>0 &&
    dialogInput.foodRepo &&
    dialogInput.foodType
  ) {
    //调用添加接口
    adminAddFood({name:dialogInput.foodName,foodtype:dialogInput.foodType,repository: dialogInput.foodRepo, price:dialogInput.foodPrice,img:imageAction.value}).then((result)=>{
      adminGetFood().then((result)=>{
      foodTable.value=result.data.data
      })
      ElNotification({
        title: "通知",
        message: "菜品添加成功",
        type: "success",
      });
      data.dialogVisible = false;
    })
    
  } else {
    ElNotification({
      title: "通知",
      message: "请正确添加菜品信息",
      type: "error",
    });
  }
};



// 编辑菜品
const handleRowEdit = (row) => {
  set(row, "isEdit", true);
  tempRowData.foodid = row.foodid;
  tempRowData.repository = row.repository;
  tempRowData.price = row.price;
};

// 下架菜品
const handleRowDelete = (row) => {
  // let newIndex = index + (currentPage.value - 1) * pageSize.value;
  // foodTable.value.splice(newIndex, 1);
  adminUnuseFood({foodid:row.foodid}).then((result)=>{
    adminGetFood().then((result)=>{
      foodTable.value=result.data.data
    })
      ElMessage({
        type: "info",
        message: "下架成功",
      });
  })
};
//上架菜品
const handleRowInuse=(row)=>{
  adminInuseFood({foodid:row.foodid}).then((result)=>{
    adminGetFood().then((result)=>{
      foodTable.value=result.data.data
    })
      ElMessage({
        type: "success",
        message: "上架成功",
      });
  })
}

// 确认编辑菜品
const handleRowConfirm = (row) => {
  set(row, "foodid", row.foodid);
  set(row, "repository", row.repository);
  set(row, "price", row.price);
  set(row, "isEdit", false);
  set(row, "isAdd", false);
  
  adminEditFood({foodid:row.foodid, repository:row.repository,price:row.price}).then((result)=>{
      console.log(result.data)
      ElMessage({
        type: "success",
        message: "编辑成功！",

      });
  })
  
};

//取消
const handleRowCancel = (row) => {
  // if(tempRowData.foodid !=null && tempRowData.name!="" && tempRowData.foodtype!="" )
  set(row, "foodid", tempRowData.foodid);
  set(row, "repository", tempRowData.repository);
  set(row, "price", tempRowData.price);
  set(row, "isEdit", false);
  set(row, "isAdd", false);
  ElMessage({
    type: "info",
    message: "取消编辑！",
  });
};

// 取消置顶
const handleUnPin = (row) => {
  adminNotTop({foodid:row.foodid}).then((result)=>{
    adminGetFood().then((result)=>{
      foodTable.value=result.data.data
    })
      ElMessage({
        type: "info",
        message: "已取消置顶",
      });
  })
};

// 置顶
const handlePin = (row) => {
  adminTop({foodid:row.foodid}).then((result)=>{
    adminGetFood().then((result)=>{
      foodTable.value=result.data.data
    })
      ElMessage({
        type: "success",
        message: "已置顶",
      });
  })
};

// 分页handleCurrentChange
const handleCurrentChange = (page) => {
  currentPage.value = page;
};

// totalData
let displayTotalTable = computed(() => {
  const filteredTable = foodTable.value.filter((alert) => {
    if (data.inputSearch === "" && data.select === "") {
      //如果未输入查询项且未选择菜品类别，则显示所有数据
      return true;
    } else {
      if (data.inputSearch != "" && data.select === "") {
        // 只输入查询项，未选择菜品类别
        if (alert.name.includes(data.inputSearch)) {
          return alert.name.includes(data.inputSearch);
        }
      }
      if (data.inputSearch === "" && data.select != "") {
        //未输入查询项，只选择了菜品类别
        return alert.foodtype.toString()==data.select;
      }
      if (data.inputSearch != "" && data.select != "") {
        //输入了查询项，也选择了菜品类别
        data.select = "";
        return alert.name.includes(data.inputSearch);
      }
    }
  });
  return filteredTable
});
let totalData = computed(() => {
  return displayTotalTable.value.length;
});

// displayTable
let displayTable = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  const filteredTable = foodTable.value.filter((alert) => {
    
    if (data.inputSearch === "" && data.select === "") {
      //如果未输入查询项且未选择菜品类别，则显示所有数据
      return true;
    } else {
      if (data.inputSearch != "" && data.select === "") {
        // 只输入查询项，未选择菜品类别
        if (alert.name.includes(data.inputSearch)) {
          return alert.name.includes(data.inputSearch);
        }
      }
      if (data.inputSearch === "" && data.select != "") {
        //未输入查询项，只选择了菜品类别
        return alert.foodtype.toString()==data.select;
      }
      if (data.inputSearch != "" && data.select != "") {
        //输入了查询项，也选择了菜品类别
        data.select = "";
        return alert.name.includes(data.inputSearch);
      }
    }
  });
  return filteredTable.slice(startIndex, endIndex);
});


//显示菜品图片
const dialogWidth=ref('')
var img=new Image()
const dishDialogImageUrl = ref("");
const dishDialogVisible = ref(false);
function handleDishPictureCardPreview(row,column) {
  //拉下图片
  img.src=row.img;
  //延时，确保加载时间
  setTimeout(function(){ dialogWidth.value=img.width+40+'px'
  //图片显示
  dishDialogImageUrl.value = row.img
  dishDialogVisible.value = true},1000)

}
let foodTable=ref<food[]>([])
//页面初始化
onMounted(() => {
  //获取菜品信息
    adminGetFood().then((result)=>{
      console.log(result.data.data)
      foodTable.value=result.data.data
      console.log(foodTable.value)
      console.log(displayTable)
    })
});

//类型数字转换
function typeTransfer(foodtype){
  const type=['锅底','特色菜','牛羊肉','海鲜','丸滑','其他荤菜','豆面制品','菌菇','蔬菜','饮料酒水','甜品','主食','自选类']
  return type[foodtype-1]
}
//菜品interface
interface food {
  foodid: number;
  name: String;
  foodtype: String;
  repository: number;
  price: number;
  monthsale: number;
  img:String
  top:number
  inuse:number
}
//上传图片相关
const picAction = ref(""); // 这个可以说的保存图片发的请求，也可以去当作图片获取的请求
// 也就是说这个可以存到对应的数据库中
const imageAction = ref("");
const flag = ref(false);
const upload = ref<UploadInstance>()

const fileList=ref([])

//上传成功
function successUpload(response) {
  ElNotification({
    message: "图片上传成功",
    type: "success",
    duration: 1500,
  });
  console.log(response);
  flag.value = true;
  imageAction.value = response.data;
  console.log(imageAction.value);
}
//判断图片是否过大
function beforeAvatarUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    ElNotification({
       message: "图片大小不能超过1MB",
       type: "error",
       duration: 1500,
  });
  return false;
  }
}
//上传失败
function errorUpload() {
  ElNotification({
    message: "图片上传失败",
    type: "error",
    duration: 1500,
  });
  console.log("error");
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const uploadDisabled = computed(() => {
           
   return  fileList.value.length > 0
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//查看图片
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}



// let foodtable: food[] = [
//   {
//     foodid: 1,
//     name: "番茄火锅",
//     foodtype: "1",
//     repository: 100,
//     price: 84,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-543.jpg"
//   },
//   {
//     foodid: 2,
//     name: "真香锅",
//     foodtype: "1",
//     repository: 100,
//     price: 84,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://hudilao.oss-cn-nanjing.aliyuncs.com/2023-09-06/0c0d8b3a-73fa-40d9-8ae2-d14c5254a3c9.jpg"
//   },
//   {
//     foodid: 3,
//     name: "经典麻辣火锅",
//     foodtype: "1",
//     repository: 100,
//     price: 112,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 4,
//     name: "清油麻辣火锅",
//     foodtype: "1",
//     repository: 100,
//     price: 74,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 5,
//     name: "松茸菌汤火锅",
//     foodtype: "1",
//     repository: 100,
//     price: 80,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 6,
//     name: "三鲜火锅",
//     foodtype: "1",
//     repository: 100,
//     price: 72,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 7,
//     name: "牛肉汤火锅",
//     foodtype: "1",
//     repository: 100,
//     price: 72,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 8,
//     name: "捞派魔芋素毛肚",
//     foodtype: "2",
//     repository: 100,
//     price: 10,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 9,
//     name: "捞派豆花",
//     foodtype: "2",
//     repository: 100,
//     price: 15,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 10,
//     name: "捞派脆脆毛肚",
//     foodtype: "2",
//     repository: 100,
//     price: 41,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 11,
//     name: "捞派经典羔羊肉",
//     foodtype: "3",
//     repository: 100,
//     price: 29,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 12,
//     name: "蜜汁牛肉",
//     foodtype: "3",
//     repository: 100,
//     price: 30,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
//   {
//     foodid: 13,
//     name: "火锅牛排",
//     foodtype: "3",
//     repository: 100,
//     price: 31,
//     monthsale: 0,
//     isEdit: false,
//     isAdd: false,
//     pinTop: false,
//     img:"https://website.hdlcdns.com/website/image/66d9d0cff0b245308ec1f9fc4808bdc3-396-54\r\n3.jpg"
//   },
// ];
</script>

<style lang="scss" scoped>
//表格
.table {
  width: 95%;
  border-radius: 15px;
  background-color: rgb(255, 255, 255);
  // text-align: center;
  margin-left: 35px;
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
  margin-left: 35px;
}
.添加按钮 {
  position: relative;
  width: 70px;
  top: -5px;
  left: 775px;
}
.pagination-container {
  position: relative;
  top: 10px;
}
.菜品类别及名称 {
  position: relative;
  width: 305px;
  left: 50px;
}
.库存输入框 {
  position: relative;
  width: 305px;
  left: 50px;
  margin-top: 15px;
}
.单价输入框 {
  position: relative;
  width: 305px;
  left: 50px;
  top: 10 px;
  margin-top: 15px;
}
.上传图片 {
  position: relative;
  left: 130px;
  margin-top: 15px;
}
.flex{
  display: flex;
}
.disabled .el-upload--picture-card {
  display: none;
}
.pagination-container{
  width: 95%;
  margin-left: 35px;
}
</style>
