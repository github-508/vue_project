<template>
  <div>
    <span
      style="
        float: left;
        margin-left:60px;
        font-size: 18px;
        font-weight: bolder;
      "
      >{{ name }}</span
    >
    <div
      style="
        margin-top:30px;
        padding-left:60px;
        padding-right:20px;
        padding-top:10px;
        width: 100%;
        display:table;
        height: 250px;
      "
    >
      <div style="float: left; width: 32%; height: 100px; background: #fff">
        <a-card>
          <a-statistic
            :title="$store.getters.getSystemLanguage === 0?'平均值':'Mean'"
            :value="mean"
            :precision="2"
            style="font-size:25px;font-weight:bolder;"
            :value-style="{ color: '#3f8600' }"
          >
          </a-statistic>
        </a-card>
      </div>
      <div style="float: left; width: 32%; height: 100px; background: #fff">
        <a-card>
          <a-statistic
            :title="$store.getters.getSystemLanguage === 0?'最大值':'Max'"
            :value="maximum"
            :precision="2"
            style="font-size:25px;font-weight:bolder;"
            :value-style="{ color: '#3f8600' }"
          >
          </a-statistic>
        </a-card>
      </div>
      <div style="float: left; width: 32%; height: 100px; background: #fff">
        <a-card>
          <a-statistic
            :title="$store.getters.getSystemLanguage === 0?'最小值':'Min'"
            :value="minimum"
            :precision="2"
            style="font-size:25px;font-weight:bolder;"
            :value-style="{ color: '#3f8600' }"
          >
          </a-statistic>
        </a-card>
      </div>
      <div style="float: left; width: 32%; height: 100px; background: #fff">
        <a-card>
          <a-statistic
            :title="$store.getters.getSystemLanguage === 0?'中位数':'Median'"
            :value="median"
            :precision="2"
            style="font-size:25px;font-weight:bolder;"
            :value-style="{ color: '#3f8600' }"
          >
          </a-statistic>
        </a-card>
      </div>
      <div style="float: left; width: 32%; height: 100px; background: #fff">
        <a-card>
          <a-statistic
            :title="$store.getters.getSystemLanguage === 0?'偏度':'Skewness'"
            :value="skewness"
            :precision="2"
            style="font-size:25px;font-weight:bolder;"
            :value-style="{ color: '#3f8600' }"
          >
          </a-statistic>
        </a-card>
      </div>
      <div style="float: left; width: 32%; height: 10px; background: #fff">
        <a-card>
          <a-statistic
            :title="$store.getters.getSystemLanguage === 0?'峰度':'Kuetosis'"
            :value="kuetosis"
            :precision="2"
            style="font-size:25px;font-weight:bolder;"
            :value-style="{ color: '#3f8600' }"
          >
          </a-statistic>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, watchEffect } from "vue";

export default {
  name: "Statistics",
  props: {
    ans: Object
  },
  setup(props) {
    const state = reactive({
      name: "",
      mean: 0,
      maximum: 0,
      minimum: 0,
      median: 0,
      skewness: 0,
      kuetosis: 0,
    })
    const change = (ans) => {
      state.name = ans.name;
      state.mean = ans.mean;
      state.maximum = ans.max;
      state.minimum = ans.min;
      state.median = ans.median;
      state.skewness = ans.skew;
      state.kuetosis = ans.kurt;
    };
    watchEffect(() =>{
      change(props.ans);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
</style>