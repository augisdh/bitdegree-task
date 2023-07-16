<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import NetworkNavigation from "./components/networkNavigation/NetworkNavigation.vue";
import GasMetricsGroup from "./components/gasMetrics/GasMetricsGroup.vue";
import PriceMeticsLineChart from "./components/priceMetrics/PriceMetricsLineChart.vue";
import {
  useGasService,
  usePriceService,
} from "./service/GasPriceMetricsService.ts";
import { useNetwork } from "./store/networkStore.ts";
import {
  MAX_TIME,
  MIN_TIME,
  SECOND_IN_MILLISECONDS,
} from "./utils/constants.ts";
import {
  IHistoricalData,
  IUseGasService,
  IGasInterval,
} from "./types/types.ts";

const prices: { network: IHistoricalData[] } = reactive({
  network: usePriceService(),
});
function loadPriceMetrics() {
  prices.network = usePriceService();
}

const gas: { network: IUseGasService } = reactive({ network: useGasService() });
function loadGasMetrics() {
  gas.network = useGasService();
}

const time = ref(MAX_TIME);
function resetTime() {
  time.value = MAX_TIME;
}

const gasInterval: IGasInterval = ref(undefined);
const runGasInterval = () =>
  (gasInterval.value = setInterval(() => {
    if (time.value <= MIN_TIME) {
      resetTime();
      loadGasMetrics();
    } else time.value--;
  }, SECOND_IN_MILLISECONDS));

const { state } = useNetwork();
watch(state.selectedNetwork, () => {
  resetTime();
  loadGasMetrics();
  loadPriceMetrics();
  clearInterval(gasInterval.value);
  runGasInterval();
});

onMounted(() => {
  runGasInterval();
});

onBeforeMount(() => {
  clearInterval(gasInterval.value);
});
</script>

<template>
  <main class="container">
    <NetworkNavigation class="my-4" />
    <GasMetricsGroup :gas-metrics="gas.network" :time="time" />
    <PriceMeticsLineChart :price-metrics="prices" class="my-4" />
  </main>
</template>
