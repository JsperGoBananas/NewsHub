import { createRouter, createWebHashHistory } from "vue-router";
import routes from "@/router/routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   $loadingBar.start();
//   const token = localStorage.getItem('token');
//   if (to.name === 'login') {
//     next();
//   } else{
//     if (token) {
//       console.log('有token');
//       next();
//     } else {
//       console.log('没有token');
//       next({ name: 'login' });
//     }
//   }
    
// });

router.afterEach(() => {
  $loadingBar.finish();
});

export default router;