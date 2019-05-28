<template>
  <a-form :form="form" @submit.prevent="handleSubmit">
    <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="用户名">
      <a-input
        v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入用户名！' }] }
        ]"
        placeholder="name"
      ></a-input>
    </a-form-item>
    <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="手机">
      <a-input
        v-decorator="[
          'phone',
          { rules: [{ required: true, message: '请输入手机！' }] }
        ]"
        placeholder="phone"
      ></a-input>
    </a-form-item>
    <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="性别">
      <a-radio-group
        v-decorator="[
          'sex',
          {
            rules: [{
              required: true, message: '性别不能为空!',
            }],
          }
        ]"
        buttonStyle="solid"
      >
        <a-radio-button value="a">男</a-radio-button>
        <a-radio-button value="b">女</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="住址">
      <a-input v-decorator="['address']" placeholder="address"></a-input>
    </a-form-item>
    <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="备注">
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
  data() {
    return {
      sex: "",
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    };
  },
  beforeMount() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          api
            .post("/customer/add", values)
            .then(res => {
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