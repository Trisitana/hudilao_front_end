<!-- Web端登录界面（管理员+后厨） -->
<template>
  <div class="登录页面">
    <!-- 登陆卡片 -->
    <div class="登录卡片背景">
      <img src="../assets/登录卡片.png" class="登录卡片图片" />
    </div>
    <div class="登录主卡片">
      <p class="登录文本">登录</p>
      <!-- 输入框 -->
      <el-input
        v-model="admin.account"
        maxlength="11"
        placeholder="请输入账号"
        clearable
        class="账号输入框"
      />
      <el-input
        v-model="admin.password"
        placeholder="请输入密码"
        show-password
        class="密码输入框"
      />

      <el-checkbox v-model="admin.remember" label="记住我" class="记住我" />
      <!-- 登录按钮 -->
      <el-button @click="cookLoginHandler" type="primary" class="后厨登录按钮">
        <img src="../assets/后厨logo.png" class="后厨logo" />
        <p class="后厨登录文本">后厨登录</p>
      </el-button>

      <el-button @click="adminLoginHandler" class="管理员登录按钮">
        <img src="../assets/锁定.png" class="管理员logo" />
        <p class="管理员登录文本">管理员登录</p>
      </el-button>
    </div>
    <!-- 页脚 -->
    <footer class="footer">
      <span>© 2023 东南大学风雨无组出品</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { CookLoginStore } from "../stores/CookLoginStore";
import { defineComponent } from "vue";
import globalMsg from "../global.js";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router"; //页面跳转第一步：引入，便于成功登录，跳转到下一个页面（第0步，修改router.js）
import { cookLogin } from "../api/cookapi";
//const axios = inject("axios"); //用于访问服务端
const cookLoginStore = CookLoginStore(); //实例化

const router = useRouter();
const route = useRoute(); //页面跳转第二步：创建实例

// let rules = { //账号，密码的输入规则
//     account: [
//         { required: true, message: "请输入账号", trigger: "blur" },
//         { min: 3, max: 12, message: "账号长度应在4至12个字符", trigger: "blur" },
//     ],
//     password: [
//         { required: true, mseesage: "请输入密码", trigger: "blur" },
//         { min: 6, max: 18, message: "密码长度应在6至18个字符", trigger: "blur" }
//     ]
// };

const admin = reactive({
  //定义一个管理员对象
  account: localStorage.getItem("account") || "",
  password: localStorage.getItem("password") || "",
  remember: localStorage.getItem("remember") == 0,
});
//厨师对象
const cook = reactive({
  account: localStorage.getItem("account") || "",
  password: localStorage.getItem("password") || "",
  remember: localStorage.getItem("remember") == 0,
});
//处理登录
const cookLoginHandler = async () => {
  cook.account = admin.account;
  cook.password = admin.password;
  cook.remember = admin.remember;
  //核对厨师登录信息接口
  cookLogin({ number: cook.account, password: cook.password }).then(
    (result) => {
      if (result.data.code == 200) {
        ElMessage({
          message: "后厨登录成功^_^",
          type: "success",
        });
        if (cook.remember) {
          //记住我
          localStorage.setItem("account", cook.account);
          localStorage.setItem("password", cook.password);
          localStorage.setItem("remember", cook.remember ? 0 : 1);
        } else {
          localStorage.setItem("account", "");
          localStorage.setItem("password", "");
          localStorage.setItem("remember", cook.remember ? 0 : 1);
        }
        //传递账号
        localStorage.setItem("cookNumber", cook.account);
        console.log("localStorage.account: " + localStorage.getItem("account"));
        console.log(
          "localStorage.password: " + localStorage.getItem("password")
        );
        console.log(
          "localStorage.remember: " + localStorage.getItem("remember")
        );
        router.push("/CookDashBoard"); //页面跳转第三步：页面跳转
      } else {
        //后厨登录失败
        ElMessage.error("后厨账号或密码错误~_~");
      }
    }
  );
};

const adminLoginHandler = () => {
  //管理员账号密码核对
  if (admin.account == "admin" && admin.password == "123456") {
    ElMessage({
      message: "管理员登录成功^_^",
      type: "success",
    });
    if (admin.remember) {
      //记住我
      localStorage.setItem("account", admin.account);
      localStorage.setItem("password", admin.password);
      localStorage.setItem("remember", admin.remember ? 0 : 1);
    } else {
      localStorage.setItem("account", "");
      localStorage.setItem("password", "");
      localStorage.setItem("remember", cook.remember ? 0 : 1);
    }

    router.push("/AdminMainArea/DataReport"); //页面跳转第三步：页面跳转
  } else {
    ElMessage.error("糟糕, 管理员账号或密码错误-_-");
  }
};
</script>

<style lang="scss" scoped>
.登录页面 {
  // background-color: #3f97ff;
  background-color: aliceblue;
  position: absolute;
  height: 100%;
  width: 100%;
}
.登录主卡片 {
  position: absolute;
  width: 464px;
  height: 436px;
  left: 380px;
  top: 130px;
  box-sizing: border-box;
  background-color: white;

  border-left: 1px solid rgba(63, 151, 255, 0.63);
  border-right: 1px solid rgba(63, 151, 255, 0.63);
  border-top: 1px solid rgba(63, 151, 255, 0.63);
  border-bottom: 1px solid rgba(63, 151, 255, 0.63);
  border-radius: 26px 0px 0px 26px;

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 42px 0px 42px;
}

.登录卡片背景 {
  position: absolute;
  background-color: aliceblue;
  width: 464px;
  height: 436px;
  left: 839px;
  top: 130px;
  box-sizing: border-box;

  // border: 2px solid rgba(63, 151, 255, 0.63);
  border-radius: 0px 26px 26px 0px;

  border-left: 1px solid rgba(63, 151, 255, 0.63);
  border-right: 1px solid rgba(63, 151, 255, 0.63);
  border-top: 1px solid rgba(63, 151, 255, 0.63);
  border-bottom: 1px solid rgba(63, 151, 255, 0.63);

  /* 自动布局 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px 42px 0px 42px;
}

.登录卡片图片 {
  position: absolute;
  width: 464px;
  height: 436px;
  left: 0px;
  top: 0px;
  border-radius: 0px 26px 26px 0px;
}

.登录文本 {
  /* 登录 */
  position: absolute;
  width: 226px;
  height: 93px;
  left: 200px;
  right: 282px;
  top: 20px;
  bottom: 389px;

  color: rgb(51, 51, 51);
  font-family: 微软雅黑;
  font-size: 40px;
  font-weight: 700;
  line-height: 66px;
  letter-spacing: 0%;
  text-align: left;

  display: flex;
  flex-direction: row;
  align-items: center;
}

.账号输入框 :deep(.el-input__wrapper) {
  border-radius: 26px;
  position: relative;
  width: 360px;
  height: 40px;
  left: 4px;
  right: 67px;
  top: -50px;
  bottom: 301px;
}
.密码输入框 :deep(.el-input__wrapper) {
  border-radius: 26px;
  position: relative;
  width: 360px;
  height: 40px;
  left: 4px;
  right: 67px;
  top: -20px;
  bottom: 301px;
}
.记住我 {
  position: absolute;
  left: 56px;
  right: 67px;
  top: 270px;
  bottom: 301px;
}
.后厨登录按钮 {
  position: absolute;
  border-radius: 26px;
  width: 360px;
  height: 40px;
  left: 56px;
  right: 67px;
  top: 310px;
  bottom: 301px;
}
.后厨登录文本 {
  position: absolute;
  top: -13px;
  left: 145px;
  color: rgb(255, 255, 255);
  font-family: Poppins;
  font-size: 17px;
  font-weight: 550;
  line-height: 30px;
  letter-spacing: 0%;
  text-align: center;
}
.管理员登录按钮 {
  position: absolute;
  border-radius: 26px;
  width: 360px;
  height: 40px;
  left: 45px;
  right: 67px;
  top: 370px;
  bottom: 301px;

  border: 1px solid rgba(63, 151, 255, 0.5);
}
.管理员登录文本 {
  position: absolute;
  top: -13px;
  left: 145px;
  color: rgb(17, 17, 17);
  // font-family: Poppins;
  font-size: 16px;
  font-weight: 550;
  line-height: 30px;
  letter-spacing: 0%;
  text-align: center;
}
.管理员logo {
  position: absolute;
  width: 16px;
  height: 15px;
  left: 117px;
  top: 10px;
}
.后厨logo {
  position: absolute;
  width: 16px;
  height: 16px;
  left: 117px;
  top: 10px;
}
.footer {
  position: absolute;
  top: 780px;
  left: 730px;
  display: flex;
  color: rgb(84, 93, 93);
}
.icon {
  width: 24px;
  height: 24px;
}

</style>
