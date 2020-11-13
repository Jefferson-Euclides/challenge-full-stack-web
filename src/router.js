import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/students",
      name: "students",
      component: () => import("./components/StudentsList")
    },
    {
      path: "/students/:academicRegister",
      name: "editStudents",
      component: () => import("./components/AddStudents")
    },
    {
      path: "/addStudents",
      name: "addStudents",
      component: () => import("./components/AddStudents")
    }
  ]
});