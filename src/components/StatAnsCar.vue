<template>
  <div
    v-for="(item, index) in csv_ans_list"
    :key="index"
    style="margin-left: 30px; width: 95%; backgroud: #d3d3d3"
  >
    <table>
      <tr>
        <th
          v-for="(value, index) in item['columns']"
          :key="index"
          :value="value"
        >
          {{ value }}
        </th>
      </tr>
      <tr
        v-for="(value1, index1) in item['data']"
        :key="index1"
        :value="value1"
      >
        <td
          v-for="(value2, index2) in item['data'][index1]"
          :key="index2"
          :value="value2"
        >
          {{ value2 }}
        </td>
      </tr>
    </table>
  </div>
  <!--图片-->
  <div style="display:table;width:100%;height:300px">
    <div v-for="(item, index) in img_stream" :key="index" style="float:left;width:50%;">
        <img style="width: 90%" :src="item" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, watchEffect } from "vue";
export default {
  props: {
    ans:{},
  },
  data() {
    return {};
  },
  components: {
  },
  setup(props) {
    const state = reactive({
      csv_ans_list:[],
      img_ans_list:[],
      csv_cnt:0,
      img_cnt:0,
      img_stream:[],
    });
    const change = (ans) => {
        console.log("ans")
        console.log(ans)
        state.csv_ans_list = [];
        state.img_ans_list = [];
        state.csv_cnt = 0;
        state.img_cnt = 0;
        state.img_stream = [];
        state.csv_ans_list = ans['csv'];
        state.img_ans_list = ans['img'];
        state.csv_cnt = state.csv_ans_list.length;
        state.img_cnt = state.img_ans_list.length;
        for(let i = 0;i<state.img_cnt;i++){
            state.img_stream.push('data:;base64,' + state.img_ans_list[i])
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
  border: 2px solid #3f8600;
}

table {
  border-collapse: collapse;
  width: 100%;
}
th {
  color: #3f8600;
}
td {
  text-align: center;
  color: #3f8600;
}
</style>