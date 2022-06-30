<template>
  <div
    style="
      margin: 250px 0 0 500px;
      padding: 30px 30px 30px 30px;
      width: 550px;
      height: 250px;
      box-shadow: 0 0 9px 3px rgb(241, 242, 244);
    "
  >
    <div style="align: center; width: 500px; height: 200px">
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="UserName:">
          <a-input v-model:value="formState.user" style="margin-top: 20px;" placeholder="UserName">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="Password:">
          <a-input-password
            v-model:value="formState.password"
            style="margin-top: 20px; "
            type="password"
            placeholder="Password"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            @click="userLogin"
            style="margin-top: 20px;"
            type="primary"
            :disabled="formState.user === '' || formState.password === ''"
          >
            Login
          </a-button>
        </a-form-item>
      </a-form>
      <div style="margin-top: 20px;">
        <strong>Forget Password?</strong>
        <!--router-link to="/ForgetPassword"> 忘记密码? </router-link-->
        |
        <router-link to="/Register"> Register </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
import axios from "axios";
export default {
  data() {
    return {
      axiosRet:"",
      formState: {
        user: "",
        password: "",
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
  methods: {
    async userLogin() {
      //this.$router.push("/Index");
      try{
        await axios.get(this.$store.state.base_url + "/api/login",{params:{'name':this.formState.user,'password':this.formState.password}})
          .then((res) => {
          this.axiosRet = res.data
          console.log(this.axiosRet)
        });
      }
      catch(e){
        alert("服务器出错,请求失败");
        //this.axiosRet = "-2"
        return 0
      }
      finally{
        if(this.axiosRet == "-2"){
          return 0
        }
        else if(this.axiosRet == "-1"){
          alert("用户不存在");
        }
        else if(this.axiosRet == "0"){
          alert("密码错误");
        }
        else{
          console.log(this.$store.state.userName);
          this.$store.commit("updateUserName", this.formState.user);
          this.$store.commit("updateLoginFlag", 1);
          this.$router.push("/Index");
          console.log(this.$store.state.userName);
        }
      }
    },
  },
};
</script>

