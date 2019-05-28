(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["customers"],{dfe8:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-input-search",{staticStyle:{width:"200px","margin-bottom":"10px"},attrs:{placeholder:"搜索用户名(精确搜索)"},on:{search:t.onSearch}}),a("a-list",{attrs:{grid:{gutter:16,xs:1,sm:2,md:3,lg:3,xl:3,xxl:6},dataSource:t.data},scopedSlots:t._u([{key:"renderItem",fn:function(e){return a("a-list-item",{},[a("a-card",{attrs:{title:e.name}},[a("p",[t._v("手机："+t._s(e.phone))]),a("p",[t._v("住址："+t._s(e.address))]),a("p",[t._v("备注："+t._s(e.remarks))]),a("a",{attrs:{slot:"actions"},on:{click:function(a){return t.editCustomer(e)}},slot:"actions"},[t._v("编辑")]),a("a",{attrs:{slot:"actions"},on:{click:function(a){return t.delCustomer(e.name)}},slot:"actions"},[t._v("删除")])])],1)}}])}),a("a-modal",{attrs:{title:"编辑用户",footer:null},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("a-form",{attrs:{form:t.form},on:{submit:function(e){return e.preventDefault(),t.handleSubmit(e)}}},[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name"],expression:"['name']"}],attrs:{addonBefore:"用户名",disabled:""}})],1),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone",{rules:[{required:!0,message:"手机不能为空!"}]}],expression:"[\n            'phone',\n            {\n              rules: [{\n                required: true, message: '手机不能为空!',\n              }],\n            }\n          ]"}],attrs:{addonBefore:"手机"}})],1),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["address"],expression:"['address']"}],attrs:{addonBefore:"住址"}})],1),a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["remarks"],expression:"['remarks']"}],attrs:{addonBefore:"备注"}})],1),a("a-form-item",[a("a-button",{staticClass:"login-form-button",attrs:{type:"primary","html-type":"submit"}},[t._v("提交")])],1)],1)],1)],1)},s=[],o=a("d722"),n={data:function(){return{visible:!1,data:[]}},beforeMount:function(){this.fetchCustomers(),this.form=this.$form.createForm(this)},methods:{fetchCustomers:function(){var t=this;o["a"].post("/customer/all").then(function(e){t.data=e.data.data}).catch(function(e){t.$message.error(e)})},onSearch:function(t){var e=this;t?o["a"].post("/customer/search",{value:t}).then(function(t){e.data=t.data.data}).catch(function(t){e.$message.error(t)}):this.fetchCustomers()},delCustomer:function(t){var e=this;this.$confirm({title:"确定删除用户："+t+"？",okText:"删除",onOk:function(){o["a"].post("/customer/delete",{name:t}).then(function(t){e.data=t.data.data,e.$message.success(t.data.msg)}).catch(function(t){e.$message.error(t)})},cancelText:"取消",onCancel:function(){}})},editCustomer:function(t){var e=this;this.visible=!0,setTimeout(function(){e.form.setFieldsValue(t)},0)},handleSubmit:function(){var t=this;this.form.validateFields(function(e,a){e||o["a"].post("/customer/edit",a).then(function(e){t.data=e.data.data,t.$message.success(e.data.msg),t.visible=!1}).catch(function(e){t.$message.error(e)})})}}},i=n,c=a("2877"),u=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=customers.f12d9c0b.js.map