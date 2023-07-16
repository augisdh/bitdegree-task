<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import {
  MAX_TIME_FRAME,
  MID_TIME_FRAME,
  MIN_TIME_FRAME,
  DIVIDE_MAX_TIME_FRAME,
  DIVIDE_MID_TIME_FRAME,
} from "../../utils/constants.ts";
import { useNetwork } from "../../store/networkStore.ts";
import {
  IHistoricalData,
  IChartMetricsAccumulator,
} from "../../types/types.ts";

const { priceMetrics } = defineProps<{
  priceMetrics: { network: IHistoricalData[] };
}>();
const chartSeriesAndDays = computed(() => {
  const { days, low, avg, high } = priceMetrics.network
    .sort((firstPrice: IHistoricalData, secondPrice: IHistoricalData) =>
      firstPrice.unixDate > secondPrice.unixDate ? 1 : -1
    )
    .reduce(
      (metricsAcc: IChartMetricsAccumulator, metric: IHistoricalData) => {
        return {
          low: [...metricsAcc.low, metric.lowPrice],
          avg: [...metricsAcc.avg, metric.avgPrice],
          high: [...metricsAcc.high, metric.highPrice],
          days: [...metricsAcc.days, metric.unixDate],
        };
      },
      { low: [], avg: [], high: [], days: [] }
    );
  return {
    series: [
      { name: "Low", data: low },
      { name: "Average", data: avg },
      { name: "High", data: high },
    ],
    days,
  };
});

const selectedTimeFrame = ref(MIN_TIME_FRAME);
const getChartSeriesBasedOnTimeFrame = computed(() => {
  if (selectedTimeFrame.value === MAX_TIME_FRAME)
    return chartSeriesAndDays.value.series;
  return chartSeriesAndDays.value.series.map((chartSeries) => ({
    ...chartSeries,
    data: chartSeries.data.slice(
      chartSeries.data.length - selectedTimeFrame.value
    ),
  }));
});

function getChartDaysBasedOnTimeFrame(): number[] {
  if (selectedTimeFrame.value === MAX_TIME_FRAME)
    return chartSeriesAndDays.value.days;
  return chartSeriesAndDays.value.days.slice(
    chartSeriesAndDays.value.days.length - selectedTimeFrame.value
  );
}
function getChartDaysWithoutSomeTimeFrames() {
  const chartDaysBasedOnTimeFrame = getChartDaysBasedOnTimeFrame();
  if (selectedTimeFrame.value === MIN_TIME_FRAME)
    return chartDaysBasedOnTimeFrame;
  const divideBy =
    selectedTimeFrame.value === MAX_TIME_FRAME
      ? DIVIDE_MAX_TIME_FRAME
      : DIVIDE_MID_TIME_FRAME;
  return chartDaysBasedOnTimeFrame.map(
    (day: number, index: number, original: number[]) => {
      if (
        index === 0 ||
        index === original.length - 1 ||
        index % divideBy === 0
      )
        return day;
      return "";
    }
  );
}

function formatteUnixToMonthDayString(unixDate: number) {
  if (!unixDate) return "";
  const date = new Date(unixDate);
  const dateMonthName = date.toLocaleString("default", {
    month: "short",
  });
  const dateDay = date.getUTCDate();
  return `${dateDay} ${dateMonthName}`;
}

const { state } = useNetwork();
const chartOptions = reactive({
  chart: {
    id: "price-metrics-chart",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
    height: 500,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  grid: {
    row: {
      colors: ["#B8B8B8", "transparent"],
      opacity: 0.5,
    },
  },
  noData: {
    text: "Loading...",
  },
  title: {
    text: state.selectedNetwork.value,
  },
  xaxis: {
    labels: {
      formatter: (value: number) => formatteUnixToMonthDayString(value),
    },
    categories: getChartDaysWithoutSomeTimeFrames(),
  },
});

watch([selectedTimeFrame, state.selectedNetwork], () => {
  window.ApexCharts?.exec("price-metrics-chart", "updateOptions", {
    ...chartOptions,
    title: {
      text: state.selectedNetwork.value,
    },
    xaxis: {
      labels: {
        formatter: (value: number) => formatteUnixToMonthDayString(value),
      },
      categories: getChartDaysWithoutSomeTimeFrames(),
    },
  });
});
</script>

<template>
  <div>
    <div class="d-flex justify-content-end mb-2">
      <div
        class="btn-group d-flex justify-content-end"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          :value="MIN_TIME_FRAME"
          v-model="selectedTimeFrame"
        />
        <label class="btn btn-outline-primary" for="btnradio1">7 days</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
          :value="MID_TIME_FRAME"
          v-model="selectedTimeFrame"
        />
        <label class="btn btn-outline-primary" for="btnradio2">30 days</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          autocomplete="off"
          :value="MAX_TIME_FRAME"
          v-model="selectedTimeFrame"
        />
        <label class="btn btn-outline-primary" for="btnradio3">90 days</label>
      </div>
    </div>
    <div id="chart">
      <VueApexCharts
        height="500"
        :options="chartOptions"
        :series="getChartSeriesBasedOnTimeFrame"
      ></VueApexCharts>
    </div>
  </div>
</template>
