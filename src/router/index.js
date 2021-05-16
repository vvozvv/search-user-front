import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import UserList from "../components/UserList.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/result",
    name: "result",
    component: UserList,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
