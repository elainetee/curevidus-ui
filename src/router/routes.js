
const routes = [
  {
    path: "",
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { name: "login", path: "", component: () => import('pages/Index.vue') },
      { path: '/index2', component: () => import('pages/Index2.vue') },
      { name: "register", path: "/register", component: () => import('pages/Register.vue') },
      { name: "reset-password", path: "/reset-password", component: () => import('pages/ForgotPassword.vue') },
      // { name: "register", path: "/register", component: () => import('pages/Register.vue') },
      // { 
      //   path: '/reset-password', 
      //   name: 'reset-password', 
      //   component: ForgotPassword, 
      //   meta: { 
      //     auth:false 
      //   } 
      // },
      // { 
      //   path: '/reset-password/:token', 
      //   name: 'reset-password-form', 
      //   component: ResetPasswordForm, 
      //   meta: { 
      //     auth:false 
      //   }
      // } 
    ]
  },
  {
    path: "",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: "homepage", path: "/homepage", component: () => import('pages/Homepage.vue') },
      { name: "register-staff", path: "/registerStaff", component: () => import('pages/RegisterStaff.vue') },
      { name: "manage-account", path: "/manageaccount", component: () => import('pages/ManageAccount.vue') },
      { name: "profile", path: "/profile/:id", component: () => import('pages/Profile.vue') },
      { name: "edit-profile", path: "/editprofile/:id", component: () => import('pages/EditProfile.vue') },
      { name: "post", path: "/post/:id", component: () => import('pages/Post.vue') },
      { name: "editUser", path: "/user/:id", component: () => import('pages/EditUser.vue')},
      { name: "editPost", path: "/editpost/:id", component: () => import('pages/EditPost.vue')},
      { name: "public-post", path: "/publicpost", component: () => import('src/pages/PublicPost.vue')},
      { name: "friend-post", path: "/friendpost", component: () => import('pages/FriendPost.vue')},
      { name: "admin-post", path: "/adminpost", component: () => import('pages/AdminPost.vue')},
      { name: "hidden-post", path: "/hiddenpost", component: () => import('pages/AdminHiddenPost.vue')},
      { name: "call", path: "/call", component: () => import('pages/Call.vue')},
      // { path: "/homepage", component: () => import('pages/Homepage.vue') },
      { name: "report", path: "/report/:id", component: () => import('pages/ConditionReport.vue') },
      { name:"condition", path: "/condition/:id", component: () => import('pages/UpdateCondition.vue') },
      { name:"medicine", path: "/medicine", component: () => import('pages/Medicine.vue') },
      { name:"medicinepat", path: "/medicinepat", component: () => import('pages/MedicinePatient.vue') },
      { name:"chat", path: "/chat", component: () => import('pages/Chat.vue') },
      { name:"public-chat", path: "/publicchat", component: () => import('pages/PublicChat.vue') },
      { name:"friend", path: "/friend", component: () => import('pages/Friend.vue') },
      { name:"editMed", path: "/medicine/manage/:id", component: () => import('pages/ManageMedicine.vue') },
      { name:"addMed", path: "/medicine/manage", component: () => import('pages/ManageMedicine.vue') },
      { name:"cart", path: "/cart", component: () => import('pages/Cart.vue') },
      { name:"order", path: "/order", component: () => import('pages/ManageOrder.vue') },

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
