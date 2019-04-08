import Vue from 'vue';

export default {
  SET_NEW_CITY(state, newCity) {
    Vue.set(state.apolloFilters, 'city', newCity);
  },
  SET_NEW_ACTIVITY(state, newActivity) {
    Vue.set(state.apolloFilters, 'activity', newActivity);
  },
  SET_ACTIVE_PLACE_ID(state, placeId) {
    Vue.set(state, 'activePlaceID', placeId);
  },
  SET_SHOW_ACTIVE_PLACE(state, status) {
    Vue.set(state, 'shwActivePlace', status);
  }
}