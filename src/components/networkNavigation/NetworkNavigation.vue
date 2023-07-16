<script setup lang="ts">
import { computed } from "vue";
import { useNetwork } from "../../store/networkStore.ts";
import { NETWORK_TYPES } from "../../utils/constants.js";

const { state, changeNetwork } = useNetwork();
const isEthereumActive = computed(
  () => state.selectedNetwork.value === NETWORK_TYPES.ETHEREUM
);
const isBinanceActive = computed(
  () => state.selectedNetwork.value === NETWORK_TYPES.BINANCE
);
const isPolygonActive = computed(
  () => state.selectedNetwork.value === NETWORK_TYPES.POLYGON
);
</script>

<template>
  <nav>
    <ul class="nav nav-pills nav-fill justify-content-center">
      <li class="nav-item">
        <button
          class="btn nav-link fw-bold"
          :class="{ active: isEthereumActive }"
          :value="NETWORK_TYPES.ETHEREUM"
          @click.prevent="changeNetwork"
          type="button"
        >
          Ethereum
        </button>
      </li>
      <li class="nav-item">
        <button
          class="btn nav-link fw-bold"
          :class="{ active: isBinanceActive }"
          :value="NETWORK_TYPES.BINANCE"
          @click.prevent="changeNetwork"
          type="button"
        >
          Binance Smart Chain
        </button>
      </li>
      <li class="nav-item">
        <button
          class="btn nav-link fw-bold"
          :class="{ active: isPolygonActive }"
          :value="NETWORK_TYPES.POLYGON"
          @click.prevent="changeNetwork"
          type="button"
        >
          Polygon
        </button>
      </li>
    </ul>
  </nav>
</template>
