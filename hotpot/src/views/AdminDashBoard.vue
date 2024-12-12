<!-- 管理员主界面 -->
<template>
    <div class="页面背景">
      <!-- 顶部栏 -->
      <div class="顶部栏">
        <el-button @click="showDialogHandler" class="发布公告按钮">
          <p class="发布公告文本">发布公告</p>
        </el-button>
        <el-button class="商家地址边框">
          <el-icon><Location /></el-icon>
          <p class="商家地址文本">太阳城店</p>
        </el-button>
        <img src="../assets/火锅.png" class="头像" />
        <p class="管理员文本">欢迎您，掌柜</p>
      </div>
  
      <!-- 发布公告弹出对话框 -->
      <el-dialog
        title="发布公告"
        v-model="state.dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        center
        width="30%"
      >
        <!-- 标题输入 -->
        <el-input
          v-model="announcement.inputTitle"
          placeholder="请输入标题"
          class="标题输入框"
        >
          <!-- 对象选择 -->
          <template #prepend>
            <el-select
              v-model="announcement.select"
              placeholder="公告对象"
              style="width: 100px"
            >
              <el-option label="所有员工" value=3 />
              <el-option label="后厨" value=2 />
              <el-option label="服务员" value=1 />
            </el-select>
          </template>
        </el-input>
        <!-- 公告内容 -->
        <el-input
          v-model="announcement.inputContent"
          autosize
          type="textarea"
          placeholder="请输入公告内容"
          class="公告输入框"
        >
        </el-input>
        <!-- 是否紧急 -->
        <div>
          <el-radio-group v-model="announcement.emergency" class="紧急选项">
            <el-radio-button label="紧急" value=1 />
            <el-radio-button label="非紧急" value=0 />
          </el-radio-group>
        </div>
        <!-- 确认与取消 -->
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelHandler()">取消</el-button>
            <el-button type="primary" @click="confirmHandler()"> 发布 </el-button>
          </span>
        </template>
      </el-dialog>
  
      <!-- 左侧导航栏 -->
      <el-menu default-active="1" :router="true" class="左侧导航栏">
        <el-menu-item index="/AdminMainArea/EmployeeManage">
          <el-icon><Avatar /></el-icon>
          <template #title>员工管理</template>
        </el-menu-item>
  
        <el-menu-item index="/AdminMainArea/CustomerManage">
          <el-icon><User /></el-icon>
          <template #title>顾客信息</template>
        </el-menu-item>
  
        <el-menu-item index="/AdminMainArea/ViewAnnouncement">
          <el-icon><Bell /></el-icon>
          <template #title>查看公告</template>
        </el-menu-item>
  
        <el-menu-item index="/AdminMainArea/HistoryOrder">
          <el-icon><Files /></el-icon>
          <template #title>历史订单</template>
        </el-menu-item>
  
        <el-menu-item index="/AdminMainArea/DishManage">
          <el-icon><Food /></el-icon>
          <template #title>菜品管理</template>
        </el-menu-item>
  
        <el-menu-item index="/AdminMainArea/DataReport">
          <el-icon><Histogram /></el-icon>
          <template #title>经营数据报表</template>
        </el-menu-item>
  
        <el-menu-item index="7" class="退出登录" @click="logoutHandler">
          <el-icon><SwitchButton /></el-icon>
          <template #title>退出登录</template>
        </el-menu-item>
      </el-menu>
  
      <!-- 右下内容栏 -->
      <el-main class="内容栏">
        <router-view></router-view>
      </el-main>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRouter, useRoute } from "vue-router"; //页面跳转第一步：引入，便于成功登录，跳转到下一个页面（第0步，修改router.js）
  import { h } from "vue";
  import { ElNotification } from "element-plus";
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Bell,
    Histogram,
    UserFilled,
    Avatar,
    ArrowRightBold,
    ArrowLeftBold,
    TurnOff,
    SwitchButton,
    Files,
    Food,
    User,
  } from "@element-plus/icons-vue";
import { adminAddAlert } from "../api/adminapi";
//页面跳转  
  const router = useRouter();
  const route = useRoute(); //页面跳转第二步：创建实例
//发布公告可见性
  const state = reactive({
    dialogVisible: false,
  });
//编辑新公告的临时数据
  const announcement = reactive({
    select: "",
    inputTitle: "",
    inputContent: "",
    emergency: "",
  });
  //显示新公告对话框
  const showDialogHandler = () => {
    state.dialogVisible = true;
    console.log(state.dialogVisible);
  };
  //取消发布
  const cancelHandler = () => {
    state.dialogVisible = false;
  };
  
  //紧急转换
  function emergencyTransfer(emergency){
    if(emergency=="紧急"){return 1}
    else return 0
  }
  //确认发布公告
  const confirmHandler = () => {
    //确认所需内容都已输入
    if (
      announcement.select &&
      announcement.inputTitle &&
      announcement.inputContent &&
      announcement.emergency
    ) {
      //调用发布公告接口
      adminAddAlert({title:announcement.inputTitle,content:announcement.inputContent,type:announcement.select,emergency:emergencyTransfer(announcement.emergency)}).then((result)=>{
        ElNotification({
          title: "通知",
          message: "公告发布成功",
          type: "success",
        });
        state.dialogVisible = false;
      })
      console.log({title:announcement.inputTitle,content:announcement.inputContent,type:announcement.select,emergency:emergencyTransfer(announcement.emergency)});
      
    } else {
      //提示要填完全内容
      ElNotification({
        title: "通知",
        message: "请选择公告对象和紧急程度",
        type: "error",
      });
    }
    //清缓存
    announcement.select = "";
    announcement.inputTitle = "";
    announcement.inputContent = "";
    announcement.emergency = "";
  };
  
  const logoutHandler = () => {
    router.push("/login"); //页面跳转第三步：页面跳转
  };
  </script>
  
  <style lang="scss" scoped>
  .页面背景 {
    background: aliceblue;
    width: 100vw;
    height: 100vh;
  }
  .顶部栏 {
    position: absolute;
    width: 100vw;
    height: 10vh;
    top: 0vh;
    box-sizing: border-box;
  
    background: rgb(255, 255, 255);
    border-bottom: 2px solid rgb(244, 244, 244);
  }
  .发布公告按钮 {
    background: rgb(63, 151, 255);
    border: 2px solid rgb(63, 151, 255);
    border-radius: 90px;
    position: absolute;
    left: 48vw;
    top: 2.5vh;
  }
  .发布公告文本 {
    color: rgb(255, 255, 255);
    font-size: 13px;
    font-weight: 1000;
  }
  
  :deep(.el-dialog) {
    border-radius: 20px;
  }
  
  .标题输入框 {
    position: relative;
    width: 310px;
    left: 50px;
    top: 0 px;
    border-radius: 26px;
  }
  .公告输入框 {
    position: relative;
    width: 310px;
    left: 50px;
    top: 30px;
    border-radius: 26px;
  }
  .紧急选项 {
    position: relative;
    width: 500px;
    left: 139px;
    top: 35px;
  }
  .公告栏确认取消 {
    position: absolute;
    width: 500px;
    left: 130px;
    top: 200px;
  }
  .头像 {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 6px;
    top: 1.5vh;
  }
  .管理员文本 {
    position: absolute;
    left: 70px;
    top: 0.7vh;
    font-size: 18px;
    font-weight: 1000;
  }
  .商家地址边框 {
    position: absolute;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(63, 151, 255);
    border-radius: 90px;
    position: absolute;
    width: 10%;
    left: 85vw;
    top: 2.5vh;
  }
  .左侧导航栏 {
    position: absolute;
    height: 90vh;
    top: 10vh;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
    border-bottom: 2px solid rgb(244, 244, 244);
  }
  .退出登录 {
    position: absolute;
    top: 82.2vh;
    left: 0vw;
    width: 100%;
    border-top: 2px solid rgb(244, 244, 244);
  }
  .内容栏 {
    position: relative;
    background: rgba(223, 227, 230, 0.3);
    width: 90%;
    height: 90%;
    top: 10%;
    left: 10%;
  }
  </style>
  