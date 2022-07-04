
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
      { name: "profile", path: "/profile/:id", component: () => import('pages/Profile.vue') },
      { name: "edit-profile", path: "/editprofile/:id", component: () => import('pages/EditProfile.vue') },
      { name: "post", path: "/post/:id", component: () => import('pages/Post.vue') },
      { name: "editUser", path: "/user/:id", component: () => import('pages/EditUser.vue')},
      { name: "editPost", path: "/editpost/:id", component: () => import('pages/EditPost.vue')},
      { name: "all-post", path: "/allpost", component: () => import('pages/AllPost.vue')},
      // { path: "/homepage", component: () => import('pages/Homepage.vue') },
      { name: "report", path: "/report/:id", component: () => import('pages/ConditionReport.vue') },
      { name:"condition", path: "/condition/:id", component: () => import('pages/UpdateCondition.vue') },
      { name:"medicine", path: "/medicine", component: () => import('pages/Medicine.vue') }
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
