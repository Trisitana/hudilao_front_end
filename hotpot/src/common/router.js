import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/", // 当访问首页时，重定向跳转到login界面
    redirect: {
      name: "login",
    },
  },
  {
    path: "/test",
    meta: { title: "测试" },
    component: () => import("../views/Test.vue"),
  },

  {
    path: "/login",
    meta: { title: "登录" },
    component: () => import("../views/Login.vue"),
    name: "login",
  },

  {
    path: "/AdminDashBoard",
    meta: { title: "管理员面板" },
    component: () => import("../views/AdminDashBoard.vue"),
    children: [
      {
        path: "/AdminMainArea/CustomerManage",
        meta: { title: "顾客信息" },
        component: () => import("../views/AdminMainArea/CustomerManage.vue"),
      },
      {
        path: "/AdminMainArea/DataReport",
        meta: { title: "经营数据报表" },
        component: () => import("../views/AdminMainArea/DataReport.vue"),
      },
      {
        path: "/AdminMainArea/DishManage",
        meta: { title: "菜品管理" },
        component: () => import("../views/AdminMainArea/DishManage.vue"),
      },
      {
        path: "/AdminMainArea/EmployeeManage",
        meta: { title: "员工管理" },
        component: () => import("../views/AdminMainArea/EmployeeManage.vue"),
      },
      {
        path: "/AdminMainArea/HistoryOrder",
        meta: { title: "历史订单" },
        component: () => import("../views/AdminMainArea/HistoryOrder.vue"),
      },
      {
        path: "/AdminMainArea/ViewAnnouncement",
        meta: { title: "查看公告" },
        component: () => import("../views/AdminMainArea/ViewAnnouncement.vue"),
      },
    ],
  },
  {
    path: "/CookDashBoard",
    meta: { title: "湖底捞后厨" },
    component: () => import("../views/CookDashBoard.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router, routes };
