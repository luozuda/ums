<template>
  <a-form :form="form" class="login-form" @submit.prevent="handleSubmit">
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入账号！' }] }
        ]"
        placeholder="账号"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码！' }] }
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { api } from "../../api";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          api
            .post("/auth/login", values)
            .then(res => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userName", res.data.userName);
              this.$message.success(res.data.msg);
              this.$router.push({ path: "/customers" });
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    }
  }
};
</script>
<style>
.login-form-button {
  width: 100%;
}
</style>