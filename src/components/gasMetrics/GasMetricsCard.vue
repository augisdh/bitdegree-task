<script setup lang="ts">
import { computed, ref } from "vue";
import { IGasMetricsCard } from "../../types/types.ts";

const { gasMetrics } = defineProps<{
  gasMetrics: IGasMetricsCard;
}>();
const subtitleColorClass = computed(() => {
  switch (gasMetrics.title) {
    case "Low":
      return "card-subtitle--green";
    case "Average":
      return "card-subtitle--blue";
    case "High":
      return "card-subtitle--red";
    default:
      return "";
  }
});
const titleIcon = computed(() => {
  switch (gasMetrics.title) {
    case "Low":
      return "https://etherscan.io/images/smile3.png";
    case "Average":
      return "https://etherscan.io/images/smile2.png";
    case "High":
      return "https://etherscan.io/images/smile1.png";
    default:
      return "";
  }
});
const isCardFlipped = ref(false);
function toggleFlipCard() {
  isCardFlipped.value = !isCardFlipped.value;
}
</script>

<template>
  <div class="card-static" @click.prevent="toggleFlipCard">
    <div class="card-static__content" :class="{ flip: isCardFlipped }">
      <template v-for="cardFace in ['front', 'back']">
        <div :class="`card-static__content__${cardFace}`">
          <div class="card" :class="{ 'bg-transparent': isCardFlipped }">
            <div class="card-body text-center">
              <h2
                class="card-title d-flex justify-content-center align-items-center gap-2"
              >
                <img :src="titleIcon" width="25" height="25" aria-hidden />
                {{ gasMetrics.title }}
              </h2>
              <h3 class="card-subtitle" :class="[subtitleColorClass]">
                {{ gasMetrics.subtitle }} gwei
              </h3>
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center bg-transparent"
                >
                  Base
                  <span class="fw-bold">{{ gasMetrics.base }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center bg-transparent"
                >
                  Priority
                  <span class="fw-bold">{{ gasMetrics.priority }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center bg-transparent"
                >
                  Total cost
                  <span class="fw-bold">${{ gasMetrics.cost }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-static {
  cursor: pointer;
  height: 250px;
  perspective: 1000px;
  &__content {
    position: relative;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    border-radius: 0.375rem;
  }
  &__content.flip {
    transform: rotateY(180deg);
    background-color: #27374d;
    .card-body,
    .list-group-item {
      color: #e7f6f2;
    }
  }
  &__content__front {
    transform: rotateY(0);
  }
  &__content__back {
    transform: rotateY(180deg);
  }
  &__content__front,
  &__content__back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
}

.card {
  height: 250px;
  &-subtitle--green {
    color: #00dfa2;
  }
  &-subtitle--blue {
    color: #0079ff;
  }
  &-subtitle--red {
    color: #ff0060;
  }
}
</style>
