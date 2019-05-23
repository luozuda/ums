<template>
  <a-form :form="form" @submit.prevent="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="账号">
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [{
              required: true, message: '请输入账号!',
            }],
          }
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="密码">
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="确认密码">
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请输入确认密码！',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { api } from "../api";
export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit() {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          api
            .get("/register", { params: values })
            .then(res => {
              if (res.status == 200 && res.data.code == 0) {
                this.$message.success(res.data.msg);
                this.$router.push({ path: "/login" });
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的密码不一致！");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>