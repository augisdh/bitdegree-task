import { reactive, toRefs } from "vue";
import { NETWORK_TYPES } from "../utils/constants.ts";

const state = reactive({
  selectedNetwork: NETWORK_TYPES.ETHEREUM,
});

export const useNetwork = () => {
  const changeNetwork = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    if (value === state.selectedNetwork) return;
    state.selectedNetwork = value;
  };

  return {
    state: toRefs(state),
    changeNetwork,
  };
};
