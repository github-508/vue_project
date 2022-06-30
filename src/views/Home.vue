<template>
  <div class="home">
    <!--img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /-->
    <Layout></Layout>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import Button from "@/components/HelloWorld.vue";
import Layout from "@/components/Layout.vue";

export default {
  name: "Home",
  components: {
    //HelloWorld,
    Layout,
  },
};
</script>
