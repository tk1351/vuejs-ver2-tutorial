const userData = [
  {
    id: 1,
    name: "Takuya Tejima",
    description: "東南アジアで働くエンジニアです",
  },
  {
    id: 2,
    name: "Yohei Noda",
    description: "フットサルが趣味のエンジニアです",
  },
];

const getUsers = function (callback) {
  setTimeout(function () {
    callback(null, [
      {
        id: 1,
        name: "Takuya Tejima",
      },
      {
        id: 2,
        name: "Yohei Noda",
      },
    ]);
  });
};

const UserList = {
  template: "#user-list",
  data: function () {
    return {
      loading: false,
      users: function () {
        return [];
      },
      error: null,
    };
  },
  created: function () {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData: function () {
      this.loading = true;
      getUsers(
        function (err, users) {
          this.loading = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.users = users;
          }
        }.bind(this)
      );
    },
  },
};

const getUser = function (userId, callback) {
  setTimeout(function () {
    const filteredUsers = userData.filter(function (user) {
      return user.id === parseInt(userId, 10);
    });
    callback(null, filteredUsers && filteredUsers[0]);
  }, 1000);
};

const UserDetail = {
  template: "#user-detail",
  data: function () {
    return {
      loading: false,
      user: null,
      error: null,
    };
  },
  created: function () {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData: function () {
      this.loading = true;
      getUser(
        this.$route.params.userId,
        function (err, user) {
          this.loading = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.user = user;
          }
        }.bind(this)
      );
    },
  },
};

const postUser = function (params, callback) {
  setTimeout(function () {
    params.id = userData.length + 1;
    userData.push(params);
    callback(null, params);
  }, 1000);
};

const UserCreate = {
  template: "#user-create",
  data: function () {
    return {
      sending: false,
      user: this.defaultUser(),
      error: null,
    };
  },
  created: function () {},
  methods: {
    defaultUser: function () {
      return {
        name: "",
        description: "",
      };
    },
    createUser: function () {
      if (this.user.name.trim() === "") {
        this.error = "Nameは必須です";
        return;
      }
      if (this.user.description.trim() === "") {
        this.error = "Descriptionは必須です";
        return;
      }
      postUser(
        this.user,
        function (err, user) {
          this.sending = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.error = null;
            this.user = this.defaultUser();
            alert("新規ユーザーが登録されました");
            this.$router.push("/users");
          }
        }.bind(this)
      );
    },
  },
};

const router = new VueRouter({
  routes: [
    {
      path: "/top",
      component: {
        template: "<div>トップページです</div>",
      },
    },
    {
      path: "/users",
      component: UserList,
    },
    {
      path: "/users/new",
      component: UserCreate,
    },
    {
      path: "/users/:userId",
      component: UserDetail,
    },
  ],
});

new Vue({
  router,
}).$mount("#app");
