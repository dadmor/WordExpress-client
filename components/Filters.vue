<template>
  <div class="filters">
    <div class="filters-field">
      <div class="filters-logo">
        <img src="~/assets/logo.png" alt="Logo Opiekunnik"/>
      </div>
      <label>Wybierz miasto</label>
      <select v-model="city" class="filters-field__select">
        <option
          v-for="item in filters.city"
          :key="item.term_id"
          v-bind:value="item.term_id"
          v-text="item.name"
        />
      </select>
    </div>
    <div class="filters-field" v-if="childWithCity">
      <label>Wybierz dzielnice</label>
      <select v-model="stateCity" class="filters-field__select">
        <option
        v-for="item in childWithCity.child"
        :key="item.term_id"
        v-bind:value="item.term_id"
        v-text="item.name"
      />
      </select>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Filters from '~/components/Filters.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Filters
  },
  data() {
    return {
      name: 'Filters',
      city: '2'
    };
  },
  computed: {
    childWithCity() {
      return this.filters.city.filter(x => x.term_id === this.city)[0];
    },
    ...mapState({
      filters: state => {return state.filters}
    }),
    ...mapMutations({
      SET_NEW_CITY: 'SET_NEW_CITY'
    }),
    stateCity: {
      get() {
        return this.$store.state.apolloFilters.city;
      },
      set(newCity) {
        this.$store.commit('SET_NEW_CITY', newCity);
      }
    }
  }
}
</script>

<style scoped>
  .filters {
    position: relative;
    display: flex;
    flex: 1;
    width: 300px;
    flex-flow: column;
    box-shadow: 5px 0 10px rgba(1,1,1,.2);
    padding: 24px;
    background: #fff;
    z-index: 2;
  }

  .filters-logo {
    margin-bottom: 48px;
  }

  .filters-logo img {
    max-width: 100%;
    height: auto;
  }

  .filters__title {
    font-family: Lato;
    font-size: 24px;
    font-weight: 900;
  }

  .filters-field {
    display: flex;
    flex-flow: column;
    margin: 16px 0;
  }

  .filters-field label {
    font-family: Lato;
    font-size: 16px;
    font-weight: 300;
    margin: 8px 0;
  }

  .filters-field__select {
    border: 1px solid #cccc;
    background: none;
    padding: 8px;
    font-size: 14px;
    font-weight: 400;
    font-family: Lato;
  }
</style>