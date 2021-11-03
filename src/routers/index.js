import { createRouter, createWebHistory } from 'vue-router'

import Layout from '../layouts/index.vue'

// 工厂函数创建router实例
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect.vue')
        }
      ]
    },
    {
      path: "/login",
      component: () => import('views/login.vue'),
      hidden: true,
      meta: {
        title: "登录"
      }
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('views/home.vue'),
          name: 'home',
          meta: {
            title: '首页',
            icon: 'icon-home',
            affix: true
          }
        }
      ]
    },
    {
      path: '/permission',
      component: Layout,
      redirect: '/permission/index',
      children: [
        {
          path: 'index',
          component: () => import('views/permission/index.vue'),
          name: 'Permission',
          meta: {
            title: '权限管理',
            icon: 'icon-permission',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/menu',
      component: Layout,
      redirect: '/menu/index',
      children: [
        {
          path: 'index',
          component: () => import('views/menu/index.vue'),
          name: 'Menu',
          meta: {
            title: '菜单管理',
            icon: 'icon-menu',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/visualization',
      component: Layout,
      redirect: '/visualization/index',
      children: [
        {
          path: 'index',
          component: () => import('views/visualization/index.vue'),
          name: 'visualization',
          meta: {
            title: '数据可视化',
            icon: 'icon-vi',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/blog',
      component: Layout,
      redirect: 'noRedirect',
      meta: {
        title: '博客管理',
        icon: 'icon-boke'
      },
      children: [
        {
          path: 'index',
          component: () => import('views/blog/index.vue'),
          name: 'Blog',
          meta: {
            title: '博客列表',
            icon: 'blog',
            icon: 'icon-liebiao',
            noCache: true
          }
        },
        {
          path: 'category',
          component: () => import('views/blog/category.vue'),
          name: 'Category',
          meta: {
            title: '博客分类',
            icon: 'category',
            icon: 'icon-fenlei-copy',

            noCache: true
          }
        },
        {
          path: 'blogDetail',
          component: () => import('views/blog/blogDetail.vue'),
          name: 'BlogDetail',
          hidden: true,
          meta: {
            title: '博客详情',
            icon: 'blogDetail',
            noCache: true
          }
        }
      ]
    },
    {
      path: '/setting',
      component: Layout,
      redirect: '/setting/index',
      children: [
        {
          path: 'index',
          component: () => import('views/setting/index.vue'),
          name: 'Setting',
          meta: {
            title: '设置管理',
            icon: 'icon-setting',
            noCache: true
          }
        }
      ]
    }
  ]
})

// router.beforeEach((to, from,next) => {
//   console.log("router/index.js -> to",to)
//   next()
// })

export default router
