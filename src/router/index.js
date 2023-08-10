import { projectAuth } from "@/configs/firebase";
import { createRouter, createWebHistory } from "vue-router";

// Auth Gurad
const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;
  next();
  if (!user) next({ name: "Login", params: {} });
  else next();
};
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      text: "Hi Minh Hiếu",
      icon: "t2ico-notification",
      leading: true,
      isShowFooter: true,
      isShowHeader: true,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      text: "Profile",
      icon: "t2ico-setting",
      leading: false,
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile"  */ "../views/profile.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "Logout" */ "../views/logout.vue"),
  },
  {
    path: "/report",
    name: "Report",
    meta: {
      text: "Report",
      icon: "t2ico-filter",
      leading: false,
      isShowFooter: true,
      isShowHeader: true,
    },
    component: () =>
      import(/* webpackChunkName: "Report"  */ "../views/report.vue"),
  },
  {
    path: "/budget",
    name: "Budget",
    meta: {
      text: "Budget",
      leading: false,
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "Budget" */ "../views/budget.vue"),
  },
  {
    path: "/new-transaction",
    name: "NewTransaction",
    meta: {
      text: "NewTransaction",
      bt: "Add",
      leading: false,
      isShowFooter: true,
      isShowHeader: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "transaction" */ "../views/new-transaction.vue"
      ),
  },
  {
    path: "/new-transaction/select-category",
    name: "select-category",
    meta: {
      text: "Select a category",
      bt: "Cancel",
      leading: false,
      isShowFooter: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "select-category" */ "../views/select-category"
      ),
  },
  {
    path: "/profile/my-wallet",
    name: "MyWallet",
    meta: {
      text: "MyWallet",
      bt: "Cancel",
      leading: false,
      isShowFooter: false,
      isShowHeader: false,
    },
    component: () =>
      import(/* webpackChunkName: "my-wallet */ "../views/MyProfile/my-wallet"),
  },
  {
    path: "/profile/my-wallet/edit-wallet",
    name: "Edit Wallet",
    meta: {
      text: "Edit Wallet",
    },
    component: () => import("../views/MyProfile/edit-wallet"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
