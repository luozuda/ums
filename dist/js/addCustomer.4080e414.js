(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["addCustomer"],{"9edf":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("a-form",{attrs:{form:e.form},on:{submit:function(r){return r.preventDefault(),e.handleSubmit(r)}}},[t("a-form-item",{attrs:{label:"用户名"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"请输入用户名！"}]}],expression:"[\n        'name',\n        { rules: [{ required: true, message: '请输入用户名！' }] }\n      ]"}],attrs:{placeholder:"name"}})],1),t("a-form-item",{attrs:{label:"手机"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone",{rules:[{required:!0,message:"请输入手机！"}]}],expression:"[\n        'phone',\n        { rules: [{ required: true, message: '请输入手机！' }] }\n      ]"}],attrs:{placeholder:"phone"}})],1),t("a-form-item",{attrs:{label:"住址"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["address"],expression:"['address']"}],attrs:{placeholder:"address"}})],1),t("a-form-item",{attrs:{label:"备注"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["remarks"],expression:"['remarks']"}],attrs:{placeholder:"remarks"}})],1),t("a-form-item",[t("a-button",{staticClass:"login-form-button",attrs:{type:"primary","html-type":"submit"}},[e._v("添加用户")])],1)],1)},s=[],o=t("d722"),n={beforeCreate:function(){this.form=this.$form.createForm(this)},methods:{handleSubmit:function(){var e=this;this.form.validateFields(function(r,t){r||o["a"].post("/customer/add",t).then(function(r){e.$message.success(r.data.msg),e.$router.push({path:"/customers"})}).catch(function(r){e.$message.error(r)})})}}},i=n,m=t("2877"),u=Object(m["a"])(i,a,s,!1,null,null,null);r["default"]=u.exports}}]);
//# sourceMappingURL=addCustomer.4080e414.js.map