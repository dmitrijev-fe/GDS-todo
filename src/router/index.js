import { createWebHistory, createRouter } from "vue-router";
import List from '../components/List.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  {
    path: "/",
    redirect: "/to-do"
  },
  {
    path: "/to-do",
    component: List,
  },
  { 
    path: '/404', 
    name: '404', 
    component: NotFound, 
  }, 
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/404' 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;