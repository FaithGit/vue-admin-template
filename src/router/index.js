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
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [{
      path: 'Home',
      component: () => import('@/views/home/index')
    }]
  },
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
// @gly :管理员
// @kf :开发人员
// @yw :运维人员
// @sjfx :数据分析
// @az :安装人员
// @hbj :环保局
// @qy :企业

export const asyncRoutes = [
  {
    path: '/pandect',
    name: 'Pandect',
    component: () => import('@/views/pandect/index'),
    meta: { title: '总览一张图', icon: 'pandect', roles: ['kf', 'gly', 'hbj'] }
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '企业首页', icon: 'dashboard', roles: ['qy', 'kf'] },
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '企业首页', icon: 'dashboard', roles: ['qy', 'kf'] }
    }]

  },
  {
    path: '/hbj',
    component: Layout,
    meta: { title: '环保首页', icon: 'dashboard', roles: ['kf', 'hbj'] },
    children: [{
      path: 'index',
      name: 'Hbj',
      component: () => import('@/views/hbj/index'),
      meta: { title: '环保首页', icon: 'dashboard', roles: ['kf', 'hbj'] }
    }]

  },
  {
    path: '/fenxi',
    component: Layout,
    meta: { title: '数据分析', roles: ['kf', 'gly', 'az'], icon: 'fenxisvg' },
    children: [
      {
        path: 'dataCom',
        name: 'DataCom',
        component: () => import('@/views/dataCom/index'),
        meta: { title: '功率对比', icon: 'dataCom', roles: ['kf', 'gly'] }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', roles: ['kf', 'gly', 'az'], icon: 'system' },
    children: [
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/company/index'),
        meta: { title: '企业管理', icon: 'company', roles: ['kf', 'gly'] }
      },
      {
        path: 'lineList',
        name: 'LineList',
        component: () => import('@/views/lineList/index'),
        meta: { title: '生产线管理', icon: 'line', roles: ['kf', 'gly'] }
      },
      {
        path: 'form',
        name: 'Form',
        hidden: true,
        component: () => import('@/views/form/index'),
        meta: { title: '配置表管理', icon: 'form', roles: ['kf', 'gly', 'az'] }
      },
      {
        path: 'formlist',
        name: 'Formlist',
        component: () => import('@/views/formlist/index'),
        meta: { title: '配置表列表', icon: 'form', roles: ['kf', 'gly', 'az'] }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'users', roles: ['kf', 'gly'] }
      }
    ]
  },
  {
    path: '/realTime',
    component: Layout,
    meta: { title: '实时监控', roles: ['kf', 'gly', 'yw', 'qy', 'hbj'], icon: 'realTime' },
    children: [
      {
        path: 'status',
        name: 'Status',
        component: () => import('@/views/status/index'),
        meta: { title: '实时状态', icon: 'status2', roles: ['kf', 'gly', 'hbj'] }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '实时数据', icon: 'table', roles: ['kf', 'gly', 'yw', 'qy', 'hbj'] }
      },
      {
        path: 'craft',
        name: 'Craft',
        component: () => import('@/views/craft/index'),
        meta: { title: '工艺图', icon: 'craft', roles: ['kf', 'gly', 'qy'] }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    meta: { title: '数据查询', roles: ['kf', 'gly', 'yw', 'qy', 'sjfx', 'hbj'], icon: 'seacher' },
    children: [
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/history/index'),
        meta: { title: '历史数据', icon: 'history', roles: ['kf', 'gly', 'yw', 'sjfx', 'qy', 'hbj'] }
      }
    ]
  },
  {
    path: '/person',
    component: Layout,
    hidden: true,
    meta: { title: '图像上传', roles: ['kf'], icon: 'seacher' },
    children: [
      {
        path: 'index',
        name: 'Person',
        component: () => import('@/views/Person/index'),
        meta: { title: '图像上传', icon: 'history', roles: ['kf'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default router
