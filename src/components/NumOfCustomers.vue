<template>
  <div id="main" style="width: 600px;height:400px;margin: auto;"></div>
</template>

<script>
import echarts from "echarts";
import { api } from "../api";
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: ["男", "女"]
        },
        series: [
          {
            name: "数据库统计得出",
            type: "pie",
            radius: ["40%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    };
  },
  methods: {
    fetchData() {
      api
        .post("/customer/number")
        .then(res => {
          if (res.data.data.length == 0) {
            this.option.series[0].data = [
              { value: 0, name: "男" },
              { value: 0, name: "女" }
            ];
          } else {
            res.data.data.map(item => {
              item.name = item.name == "a" ? "男" : "女";
            });
            this.option.series[0].data = res.data.data;
          }
          var myChart = echarts.init(document.getElementById("main"));
          myChart.setOption(this.option);
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>