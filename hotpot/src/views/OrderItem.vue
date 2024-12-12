<!-- 这里是厨师工作页面的每一个订单表单组件 -->
<template>
  <div
    class="order_item"
    :class="{
      commonOrder: order.emergency == 0,
      emergencyOrder: order.emergency == 1,
    }"
  >
  <!-- 组件上方的表头 -->
    <div class="top">
      <!-- 判断紧急性 -->
      <div v-if="order.emergency==0" class="top_div hi_color">
        <el-icon><List /></el-icon>
        订单信息
      </div>
      <div v-if="order.emergency==1" class="top_div hi_color">
        <el-icon><List /></el-icon>
        紧急订单信息
      </div>
      <!-- 下单时间 -->
      <span class="top_time hi_color"
        >下单时间：{{ orderTimeTransfer(order.time) }}</span
      >
    </div>
    <!-- 组件中间部分 -->
    <div class="midd">
      <span class="midd_order_code"
        >订单号：<span class="hi_color tag_bg">{{ order.orderid }}</span></span
      >
      <span
        >桌号：<span class="hi_color tag_bg">{{ order.tableid }}</span></span
      >
    </div>
    <!-- 菜单部分 -->
    <div class="order_main">
      <div class="order_main_t">菜单</div>
      <el-scrollbar height="130px">
        <el-checkbox-group v-model="checkList">
          <div
            v-for="(item, index) in sortDishs"
            :key="index"
            class="order_dish_item"
          >
            <div class="order_dish_item_div">
              <el-checkbox size="large" :label="item.name"
                ><span :class="{ del_span: isChecked(item.name) }">{{
                  item.name
                }}</span></el-checkbox
              >
              <span class="alert-time">x{{ item.quantity }}</span>
            </div>
            
          </div>
        </el-checkbox-group>
      </el-scrollbar>
    </div>
    <!-- 上菜按钮 -->
    <div class="btn_box">
      <el-button type="primary" @click="$emit('serveDish')">上菜</el-button>
    </div>
  </div>
</template>

<script setup>
import { List } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
const checkList = ref([]);
const props = defineProps({
  order: Object,
});
const isChecked = (key) => checkList.value.includes(key);
// 排序的菜单列表
const sortDishs = computed(() => {
  const list = (props.order?.items || []).map((item, index) => ({
    ...item,
    index,
  }));
  list.sort((a) => checkList.value.includes(a.name) ? 1 : -1);
  return list;
});
//时间转换
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
</script>

<style lang="scss" scoped>
//非紧急订单
.commonOrder {
  .top {
    background-color: #ffebd5;
  }
  .midd {
    background-color: #fff9f1;
  }
  .hi_color {
    color: #f27d14;
  }
}
//紧急订单
.emergencyOrder {
  .top {
    background-color: #fde3e6;
  }
  .midd {
    background-color: #fff1f4;
  }
  .hi_color {
    color: #e83e41;
  }
}
//订单卡片
.order_item {
  border-radius: 15px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  width: 320px;
  margin: 15px;
  flex-shrink: 0;
  overflow: hidden;
  height: 340px;
  .tag_bg {
    background-color: #f7fef7;
    padding: 3px 5px;
  }
  .del_span {
    text-decoration: line-through;
  }
  .top {
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top_div {
    display: flex;
    align-items: center;
    width: 100px;
    flex-shrink: 0;
  }
  .top_time {
    font-size: 12px;
  }
  .midd {
    box-sizing: border-box;
    padding: 20px;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .midd_order_code {
    width: 100px;
    flex-shrink: 0;
  }
  .order_main {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 0 20px;
    .order_main_t {
      font-size: 14px;
      color: #757776;
    }
    .order_dish_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #303030;
      .order_dish_item_div {
        display: flex;
        align-items: center;
        width: 300px;
        justify-content: space-between;
      }
    }
  }
  .btn_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
}
//下单时间
.alert-time {
  font-size: 14px;
  //color: #999999;
  display: flex;
  margin-left: 20px;
  float: right;
  align-self: flex-end;
  //width: 200px;
  margin-bottom: 20px;
}
</style>
