<template>
  <div
    style="
      margin: 200px 0 0 500px;
      padding: 30px 30px 30px 30px;
      width: 550px;
      height: 350px;
      box-shadow: 0 0 9px 3px rgb(241, 242, 244);
    "
  >
    <div style="align: center; width: 500px; height: 200px">
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="账户:">
          <a-input v-model:value="formState.user" style="margin-top: 20px;" placeholder="用户名">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="邮箱:">
          <a-input v-model:value="formState.mail" style="margin-top: 20px;" placeholder="邮箱">
            <template #prefix
              ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="验证码:">
          <a-input v-model:value="formState.code" style="margin-top: 20px;" placeholder="输入验证码">
            <template #prefix
              ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="重置密码:">
          <a-input
            v-model:value="formState.password"
            style="margin-top: 20px;"
            type="password"
            placeholder="输入密码"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="确认密码:">
          <a-input
            v-model:value="formState.confirmpassword"
            style="margin-top: 20px;"
            type="password"
            placeholder="再次输入密码"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            @click="resetPassword"
            style="margin-top: 20px; margin-right: 20px;"
            type="primary"
            :disabled="
              formState.user === '' ||
              formState.mail === '' ||
              formState.code === '' ||
              formState.password === '' ||
              formState.confirmpassword === ''
            "
          >
            重置密码
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="resetCancel" style="margin-top: 20px;" type="primary"> 返回 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
export default {
  data() {
    return {
      formState: {
        user: "",
        password: "",
        mail: "",
        code: "",
        confirmpassword: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  methods: {
    resetPassword() {
      alert("密码重置成功,点击确认返回登录界面");
      this.$router.push("/Login");
    },
    resetCancel() {
      this.$router.push("/Login");
    },
  },
};
</script>