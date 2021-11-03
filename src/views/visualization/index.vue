<template>
  <div class="charts">
    <div id="lineChart" class="lineChart"></div>
    <!-- <div id="pieChart1" class="pieChart1"></div>
    <div class="pieChart2"></div>
    <div class="pieChart3"></div> -->
  </div>
</template>

<script>
import {
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
  onUnmounted,
} from "vue";
import * as echarts from "echarts";
import qj from "static/qj.json";
/* 
1. 需求数据格式:
  dateArr: [2020-08....2021-07];
  categoryArr: [
    {
      name: "categoryName",
      type: "line",
      data: [123.....4156]长度与dateArr对应
    }
  ]
*/
export default {
  name: "",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      groupByDate();
      drawLink();
      // drawPie();
      // drawLine()
    });
    onUnmounted(() => {
      echarts.init(lineDom).dispose();
    });
    const state = reactive({
      dateList: [],
      categoryList: [],
      dateList: [],
      seriesArr: [],
      lineChart: null,
      pieChart1: null,
    });
    const groupByDate = () => {
      let dateArr = [];
      let categoryArr = [];
      let allArr = [];
      /* 
      1. 数据要求 
      Title date........
      category sum .....
      ....
      */
      qj.map((item) => {
        if (item.type != "支出" || item.category == "买基金") {
          return;
        }
        let i = -1;
        item.date = proxy.$moment(item.date).format("YYYY-MM");
        if (item.date == "2020-07") {
          return;
        }
        let isExists = categoryArr.some((newItem, index) => {
          if (item.category == newItem.name) {
            i = index;
            return true;
          }
        });
        let dateIsExists = dateArr.some((newItem) => {
          if (item.date == newItem) {
            return true;
          }
        });
        if (!dateIsExists) {
          dateArr.push(item.date);
        }
        if (isExists) {
          categoryArr[i].list.push(item);
          categoryArr[i].value += item.money;
        } else {
          categoryArr.push({
            name: item.category,
            list: [item],
            value: item.money,
          });
        }
      });
      dateArr.sort((a, b) => {
        if (a > b) {
          return 1;
        } else {
          return -1;
        }
      });
      dateArr.unshift("all");
      let newArr = [dateArr];
      let itemArr = [];
      categoryArr.map(item => {
        itemArr = new Array();
        itemArr = [item.name];
        item.list.map(childItem => {
          let dateIndex = dateArr.indexOf(childItem.date);
          if (itemArr[dateIndex]) {
            itemArr[dateIndex] += childItem.money;
          } else {
            itemArr[dateIndex] = childItem.money;
          }
        });


        for (let index = 0; index < dateArr.length; index++) {
          if (itemArr[index] && typeof(itemArr[index]) == 'number') {
            itemArr[index] = Number(itemArr[index].toFixed(2))
          }else if (!itemArr[index]){
            itemArr[index] = 0;
          }
        }
        newArr.push(itemArr);
      });
      state.dataList = newArr;
      let seriesArr = [];
      for (let index = 0; index < state.dataList.length - 1; index++) {
        seriesArr.push({
          type: "line",
          smooth: true,
          seriesLayoutBy: "row",
          emphasis: { focus: "series" },
        });
      }
      state.seriesArr = seriesArr;
    };
    const drawLink = () => {
      if (document.getElementById("lineChart") == null) {
        return;
      }
      echarts.dispose(document.getElementById("lineChart"));
      let lineChart = echarts.init(document.getElementById("lineChart"));
      var option;
      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: state.dataList,
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: state.seriesArr.concat([
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              emphasis: { focus: "data" },
              label: {
                formatter: "{b}: {@2012} ({d}%)",
              },
              encode: {
                itemName: "all",
                value: state.dataList[0][1],
                tooltip: state.dataList[0][1],
              },
            },
          ]),
        };

        lineChart.on("updateAxisPointer", function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            lineChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });

        lineChart.setOption(option);
      });

      option && lineChart.setOption(option);
    };
    const drawPie = () => {
      const pieList = state.categoryList.map((item) => {
        return {
          name: item.name,
          value: item.value.toFixed(2),
        };
      });
      if (document.getElementById("pieChart1") == null) {
        return;
      }
      echarts.dispose(document.getElementById("pieChart1"));
      state.pieChart1 = echarts.init(document.getElementById("pieChart1"));
      let options = {
        title: {
          text: "消费数据",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "消费分类",
            type: "pie",
            radius: "50%",
            data: pieList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      state.pieChart1.setOption(options);
    };
    const drawLine = () => {
      const monList = state.dateList;
      const countList = state.categoryList.map((item) => item.value.toFixed(2));
      if (document.getElementById("lineChart") == null) {
        return;
      }
      echarts.dispose(document.getElementById("lineChart"));
      state.lineChart = echarts.init(document.getElementById("lineChart"));
      let options = {
        title: {
          text: "开支统计图",
          textAlign: "left",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: monList,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: state.categoryArr,
        },
        series: [
          {
            data: countList,
            type: "line",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      };
      state.lineChart.setOption(options);
    };
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped lang="scss">
.charts {
  .lineChart {
    width: 100%;
    height: 500px;
  }
  .pieChart1 {
    width: 500px;
    height: 500px;
  }
}
</style>
