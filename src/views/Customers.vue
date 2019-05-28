<template>
  <div>
    <a-input-search
      placeholder="搜索用户名(精确搜索)"
      style="width: 200px;margin-bottom:10px;"
      @search="onSearch"
    />
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 6 }" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.name">
          <p>手机：{{item.phone}}</p>
          <p>性别：{{item.sex=='a'?'男':'女'}}</p>
          <p>住址：{{item.address}}</p>
          <p>备注：{{item.remarks}}</p>
          <a slot="actions" @click="editCustomer(item)">编辑</a>
          <a slot="actions" @click="delCustomer(item.name)">删除</a>
        </a-card>
      </a-list-item>
    </a-list>
    <a-modal title="编辑用户" v-model="visible" :footer="null">
      <a-form :form="form" @submit.prevent="handleSubmit">
        <a-form-item>
          <a-input addonBefore="用户名" v-decorator="['name']" disabled/>
        </a-form-item>
        <a-form-item>
          <a-input
            addonBefore="手机"
            v-decorator="[
              'phone',
              {
                rules: [{
                  required: true, message: '手机不能为空!',
                }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-radio-group
            addonBefore="性别"
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
        <a-form-item>
          <a-input addonBefore="住址" v-decorator="['address']"/>
        </a-form-item>
        <a-form-item>
          <a-input addonBefore="备注" v-decorator="['remarks']"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { api } from "../api";
export default {
  data() {
    return {
      visible: false,
      data: []
    };
  },
  beforeMount() {
    this.fetchCustomers();
    this.form = this.$form.createForm(this);
  },
  methods: {
    fetchCustomers() {
      api
        .post("/customer/all")
        .then(res => {
          this.data = res.data.data;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    onSearch(value) {
      if (value) {
        api
          .post("/customer/search", { value })
          .then(res => {
            this.data = res.data.data;
          })
          .catch(err => {
            this.$message.error(err);
          });
      } else {
        this.fetchCustomers();
      }
    },
    delCustomer(name) {
      const _this = this;
      this.$confirm({
        title: "确定删除用户：" + name + "？",
        okText: "删除",
        onOk() {
          api
            .post("/customer/delete", { name })
            .then(res => {
              _this.data = res.data.data;
              _this.$message.success(res.data.msg);
            })
            .catch(err => {
              _this.$message.error(err);
            });
        },
        cancelText: "取消",
        onCancel() {}
      });
    },
    editCustomer(item) {
      this.visible = true;
      setTimeout(() => {
        this.form.setFieldsValue(item);
      }, 0);
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          api
            .post("/customer/edit", values)
            .then(res => {
              this.data = res.data.data;
              this.$message.success(res.data.msg);
              this.visible = false;
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