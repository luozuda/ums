<template>
  <div>
    <a-input-search
      placeholder="请输入搜索的内容"
      style="width: 200px;margin-bottom:10px;"
      @search="onSearch"
    />
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 6 }" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card :title="item.name">
          <p>身份证：{{item.id}}</p>
          <p>手机：{{item.phone}}</p>
          <p>住址：{{item.address}}</p>
          <p>备注：{{item.remarks}}</p>
          <a slot="actions" @click="editCustomer(item)">编辑</a>
          <a slot="actions" @click="delCustomer(item.name,index)">删除</a>
        </a-card>
      </a-list-item>
    </a-list>
    <a-modal title="编辑用户" v-model="visible" :footer="null">
      <a-form :form="form" @submit.prevent="handleSubmit">
        <a-form-item>
          <a-input addonBefore="用户名" v-decorator="['name']" disabled/>
        </a-form-item>
        <a-form-item>
          <a-input addonBefore="身份证" v-decorator="['id']" disabled/>
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
        .get("/customers")
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            this.data = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    onSearch(value) {
      api
        .get("/searchCustomer", {
          params: { value: value }
        })
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            this.data = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    delCustomer(name, index) {
      const _this = this;
      this.$confirm({
        title: "确定删除用户：" + name + "？",
        okText: "删除",
        onOk() {
          api
            .get("/delCustomer", { params: { index: index } })
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
            .get("/editCustomer", { params: values })
            .then(res => {
              if (res.status == 200 && res.data.code == 0) {
                this.data = res.data.data;
                this.$message.success(res.data.msg);
                this.visible = false;
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