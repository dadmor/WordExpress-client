import Vue from 'vue';

export default {
  SET_NEW_CITY(state, newCity) {
    Vue.set(state.apolloFilters, 'city', newCity);
  },
  SET_ACTIVE_PLACE_ID(state, placeId) {
    Vue.set(state, 'activePlaceID', placeId);
  }
}