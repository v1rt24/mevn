import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth'),
    meta: {isAuth: false}, // можно не прописывать
  },
  {
    path: '/links',
    name: 'Links',
    component: () => import(/* webpackChunkName: "links" */ '../views/Links'),
    meta: {isAuth: true},
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "create" */ '../views/Create'),
    meta: {isAuth: true},
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail'),
    meta: {isAuth: true},
    props: true,
  },
  {
    path: '*',
    redirect: {
      name: 'Create',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  const auth = to.meta.isAuth;

  if (auth && store.getters['auth/getAuth'] || to.name === 'Auth') {
    next();
  }
  else {
    next({
      name: 'Auth',
    });
  }
});

export default router;
