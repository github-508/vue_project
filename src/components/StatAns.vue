<template>
  <div
    style="
      margin: 10px 0 5px 0;
      minheight: 550px;
      width: 100%;
      backgroud: #d3d3d3;
    "
  >
    <template v-for="item in statList" :key="item">
      <Statistics :ans="item"></Statistics>
    </template>
    <div
      v-if="corr_data.length > 1"
      style="
        margin: 0 0 20px 0;
        padding: 10px 10px 10px 10px;
        minheight: 300px;
        width: 100%;
        backgroud: #d3d3d3;
      "
    >
      <div
        style="
          margin: 0 0 5px 0;
          padding: 10px 10px 10px 10px;
          width: 100%;
          backgroud: #d3d3d3;
        "
      >
        <table>
          <tr>
            <th>{{$store.getters.getSystemLanguage === 0?"相关系数矩阵":"Correlation Coefficient Matrix"}}</th>
            <th
              v-for="(value, index) in corr_columns"
              :key="index"
              :value="value"
            >
              {{ corr_columns[index] }}
            </th>
          </tr>
          <tr
            v-for="(value1, index1) in corr_data"
            :key="index1"
            :value="value1"
          >
            <td>
              {{ corr_columns[index1] }}
            </td>
            <td
              v-for="(value2, index2) in corr_data"
              :key="index2"
              :value="value2"
            >
              {{ corr_data[index1][index2] }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Statistics from "@/components/Statistics.vue";
//import StatStyle from "@/components/StatStyle.vue";
import { reactive, toRefs, nextTick, watchEffect } from "vue";
export default {
  props: {
    ans:{},
  },
  data() {
    return {};
  },
  components: {
    //StatStyle,
    Statistics,
  },
  setup(props) {
    const state = reactive({
      statList: [],
      corr_columns: [],
      corr_data: [],
    });
    const change = (ans) => {
      console.log("StatAns:")
      console.log(ans)
      let flag = 0;
      for (let key in ans) {
        if (key != "corr") {
          state.statList.push(ans[key]);
          flag = 1;
        }
      }
      if(flag == 1){
        state.corr_columns = ans["corr"]["columns"];
        state.corr_data = ans["corr"]["data"];
      }else{
        
      }
    };
    watchEffect(() => {
      change(props.ans);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style scoped>
table, td, th {
  border: 1px solid green;
}

table {
  border-collapse: collapse;
  width: 100%;
}
th {
  color: green;
}
td {
  text-align: center;
  color: green;
}
</style>