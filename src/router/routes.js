
const routes = [
  {
    path: "",
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: "", component: () => import('pages/Index.vue') },
      { path: '/index2', component: () => import('pages/Index2.vue') }
    ]
  },
  {
    path: "",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: "homepage", path: "/homepage", component: () => import('pages/Homepage.vue') },
      { name: "manage-account", path: "/manageaccount", component: () => import('pages/ManageAccount.vue') },
      { name: "post", path: "/post/:id", component: () => import('pages/Post.vue') },
      { name: "editUser", path: "/user/:id", component: () => import('pages/EditUser.vue')},
      { name: "editPost", path: "/editpost/:id", component: () => import('pages/EditPost.vue')},
      { path: "/homepage", component: () => import('pages/Homepage.vue') },
      { path: "/report", component: () => import('pages/ConditionReport.vue') },
      { path: "/condition", component: () => import('pages/UpdateCondition.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
