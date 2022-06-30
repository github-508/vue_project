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
          <a-input v-model:value="formState.user" style="margin-top: 20px;" placeholder="账户名">
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
        <a-form-item label="密码:">
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
            @click="newUser"
            style="margin-top: 20px;margin-right: 20px;"
            type="primary"
            :disabled="
              formState.user === '' ||
              formState.password === '' ||
              formState.mail === '' ||
              formState.confirmpassword === ''
            "
          >
            注册
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="registerCancel" style="margin-top: 20px;" type="primary"> 返回 </a-button>
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
import axios from "axios"
import { defineComponent, reactive } from "vue";
export default {
  data() {
    return {
      formState: {
        user: "",
        password: "",
        mail: "",
        confirmpassword: "",
      },
      axiosRet:"",
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
    async newUser() {
      try{
        await axios.get(this.$store.state.base_url + "/api/register",{params:{'name':this.formState.user,
              'password':this.formState.password,'mail':this.formState.mail}})
              .then((res) => {
          this.axiosRet = res.data
          console.log(this.axiosRet)
        });
      }
      catch(e){
        alert("服务器出错,请求失败");
        return
      }
      finally{
        if(this.axiosRet == "-1"){
          alert("用户已存在")
        }
        else if(this.axiosRet == "0"){
          alert("注册失败")
        }
        else{
          alert("注册成功,点击确认返回登录界面");
          this.$router.push("/Login");
        } 
      }
    },
    registerCancel() {
      this.$router.push("/Login");
    },
  },
};
</script>