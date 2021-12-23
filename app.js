const auth = {
  login: function (id, pass) {
    window.alert("userId:" + id + "\n" + "password:" + pass);
  },
};

Vue.component("user-login", {
  template: "#login-template",
  data: function () {
    return {
      userId: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      auth.login(this.userId, this.password);
    },
  },
});

new Vue({
  el: "#login-example",
});
