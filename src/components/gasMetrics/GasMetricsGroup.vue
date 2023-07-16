<script setup lang="ts">
import { computed } from "vue";
import GasMetricsCard from "./GasMetricsCard.vue";
import { MIN_TIME } from "../../utils/constants.ts";
import { IUseGasService } from "../../types/types.ts";

const props = defineProps<{
  gasMetrics: IUseGasService;
  time: number;
}>();
const metrics = computed(() => ({
  low: {
    title: "Low",
    subtitle: props.gasMetrics.lowPrice,
    base: props.gasMetrics.lowBase,
    priority: props.gasMetrics.lowPriority,
    cost: props.gasMetrics.lowPriceUsd,
  },
  avg: {
    title: "Average",
    subtitle: props.gasMetrics.avgPrice,
    base: props.gasMetrics.avgBase,
    priority: props.gasMetrics.avgPriority,
    cost: props.gasMetrics.avgPriceUsd,
  },
  high: {
    title: "High",
    subtitle: props.gasMetrics.highPrice,
    base: props.gasMetrics.highBase,
    priority: props.gasMetrics.highPriority,
    cost: props.gasMetrics.highPriceUsd,
  },
}));
const isTimeRanOut = computed(() => props.time === MIN_TIME);
</script>

<template>
  <h1 class="time">
    Next update in:
    <span v-show="!isTimeRanOut">{{ time }}s</span>
    <span v-show="isTimeRanOut" class="time__animation">s</span>
  </h1>
  <div class="card-groups">
    <GasMetricsCard
      :gas-metrics="metrics.low"
      class="card-groups__metrics-card"
    />
    <GasMetricsCard
      :gas-metrics="metrics.avg"
      class="card-groups__metrics-card"
    />
    <GasMetricsCard
      :gas-metrics="metrics.high"
      class="card-groups__metrics-card"
    />
  </div>
</template>

<style lang="scss" scoped>
@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

.time {
  font-family: system-ui;
  &__animation {
    animation: counter 1s;
    counter-reset: num var(--num);
  }
  &__animation::before {
    content: counter(num);
  }

  @keyframes counter {
    from {
      --num: 0;
    }
    to {
      --num: 14;
    }
  }
}

.card-groups {
  &__metrics-card {
    margin: 15px 0;
  }

  @media (min-width: 576px) {
    display: flex;
    gap: 10px;
    &__metrics-card {
      flex: 1 1 auto;
      margin: 0;
    }
  }
}
</style>
