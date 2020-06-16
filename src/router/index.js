import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/redirect', // 跳转页
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard' }
    }]
  }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export const asyncRoutes = [
  // {
  //   path: '/Attention',
  //   component: Layout,
  //   meta: { title: '粉丝', roles: ['user', 'admin'], icon: 'userAttention' },
  //   children: [
  //     {
  //       path: 'UserLowFans',
  //       name: 'UserLowFans',
  //       component: () => import('@/views/userLowFans/index'),
  //       meta: { title: '刷量粉', roles: ['user', 'admin'] }
  //     },
  //     {
  //       path: 'UserOrdinaryFans',
  //       name: 'UserOrdinaryFans',
  //       component: () => import('@/views/userOrdinaryFans/index'),
  //       meta: { title: '初级粉', roles: ['user', 'admin'] }
  //     }
  //   ]
  // },
  {
    path: '/pandect',
    name: 'Pandect',
    component: () => import('@/views/pandect/index'),
    meta: { title: '总览一张图', icon: 'pandect', roles: ['kf', 'gly', 'hbj'] }
  },
  {
    path: '/table',
    // hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '数据列表', icon: 'table', roles: ['kf', 'gly', 'yw', 'qy'] }
      }
    ]
  },
  {
    path: '/form',
    // hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '工况表格', icon: 'form', roles: ['kf', 'gly', 'az'] }
      }
    ]
  },
  {
    path: '/company',
    // hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Company',
        component: () => import('@/views/company/index'),
        meta: { title: '企业管理', icon: 'company', roles: ['kf', 'gly'] }
      }
    ]
  },
  {
    path: '/lineList',
    // hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'LineList',
        component: () => import('@/views/lineList/index'),
        meta: { title: '生产线管理', icon: 'line', roles: ['kf', 'gly'] }
      }
    ]
  },
  {
    path: '/history',
    // hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'History',
        component: () => import('@/views/history/index'),
        meta: { title: '历史数据', icon: 'history', roles: ['kf', 'gly', 'yw', 'sjfx', 'qy'] }
      }
    ]
  },
  {
    path: '/craft',
    component: Layout,
    // hidden: true,
    children: [
      {
        path: 'index',
        name: 'Craft',
        component: () => import('@/views/craft/index'),
        meta: { title: '工艺图', icon: 'craft', roles: ['kf', 'gly'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default router
