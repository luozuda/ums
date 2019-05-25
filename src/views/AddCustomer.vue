<template>
  <a-form :form="form" @submit.prevent="handleSubmit">
    <a-form-item label="用户名">
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入用户名！' }] }
        ]"
        placeholder="name"
      ></a-input>
    </a-form-item>
    <a-form-item label="手机">
      <a-input
        v-decorator="[
          'phone',
          { rules: [{ required: true, message: '请输入手机！' }] }
        ]"
        placeholder="phone"
      ></a-input>
    </a-form-item>
    <a-form-item label="住址">
      <a-input v-decorator="['address']" placeholder="address"></a-input>
    </a-form-item>
    <a-form-item label="备注">
      <a-input v-decorator="['remarks']" placeholder="remarks"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">添加用户</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { api } from "../api";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          api
            .get("/addCustomer", { params: values })
            .then(res => {
              if (res.status == 200 && res.data.code == 0) {
                this.$message.success(res.data.msg);
                this.$router.push({ path: "/customers" });
              } else {
                this.$message.error(res.data.msg);
              }
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