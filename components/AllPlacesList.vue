<template>
  <div :class="{ 'places-list': true,'show': posts }">
    <img src="~/assets/logo.png" alt="Logo Opiekunnik" style="max-width: 100%; height: auto;"/>
    <h2 class="places-list__title">{{name}} - <span>{{posts && posts.length}}</span></h2>
    <div class="places-list__wrap" v-if="posts">
      <div
        v-for="place in posts"
        :key="place.id"
        @click="setActivePlaceID(place.id)"
        class="places-list__place"
      >
        <h3 class="places-list__place-title">{{place.post_title}}</h3>
        <h4>{{place.post_meta.find(x => x.meta_key === 'address').meta_value}}</h4>
        <p>kontakt: {{place.post_meta.find(x => x.meta_key === 'tel').meta_value}}</p>
        <span class="places-list__place-tag">
          {{place.categories.find(x => x.taxonomy_name === 'city').name}}
        </span>

      </div>
    </div>
    <div v-else>
      <p>Wybierz miasto i dzielnice</p>
    </div>
    <div v-if="posts && !posts.length" class="places-list__place">
      <p>W tej lokalizacji nie ma miejsc :(</p>
      <p>Wybierz inną dzielnice</p>
    </div>
  </div>
</template>

<script>
import AllPlacesGql from '~/apollo/gql/allPlaces.gql';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      name: 'Znalezione miejsca'
    };
  },
  computed: {
    ...mapMutations({
      SET_ACTIVE_PLACE_ID: 'SET_ACTIVE_PLACE_ID',
      SET_SHOW_ACTIVE_PLACE: 'SET_SHOW_ACTIVE_PLACE'
    }),
    ...mapState({
      categoryId: state => state.apolloFilters.city
    })
  },
  methods: {
    setActivePlaceID(placeID) {
      this.$store.commit('SET_ACTIVE_PLACE_ID', placeID);
      this.$store.commit('SET_SHOW_ACTIVE_PLACE', true);
    }
  },
  apollo: {
    posts: {
      query: AllPlacesGql
    }
  }
}
</script>

<style scoped>
  .places-list {
    pointer-events: auto;
    position: relative;
    left: -100%;
    max-width: 450px;
    background: #fff;
    z-index: 1;
    animation-name: sidebar-hide-box;
    animation-duration: .5s;
    box-shadow: 5px 0 10px rgba(1,1,1,.2);
  }

  .places-list.show {
    left: 0;
    animation-name: sidebar-show-box;
    animation-duration: .5s;
  }

  .places-list__title {
    font-family: Lato;
    font-size: 24px;
    font-weight: 100;
    text-transform: uppercase;
    padding: 24px;
    background: #f5f5f5;
    text-align: center;
  }

  .places-list__title span {
    color: #3c9f00;
    font-weight: 900;
  }

  .places-list__wrap {
    margin-top: 48px;
    overflow-y: scroll;
    height: calc(100% - 100px );
  }

  .places-list__place {
    position: relative;
    padding: 24px;
    font-family: Lato;
    font-weight: 300;
    margin-bottom: 24px;
  }

  .places-list__place:after,
  .places-list__place:before {
    position: absolute;
    content: '';
    width: 5px;
    left: 0;
  }

  .places-list__place:before {
    height: 0;
    top: 50%;
    background: #3c9f00;
    animation-name: place-hide-left-line;
    animation-duration: .5s;
  }

  .places-list__place:after {
    height: 100%;
    top: 0;
    background: #3c9f0069;
  }

  .places-list__place:hover:before {
    animation-name: place-show-left-line;
    animation-duration: .5s;
    height: 100%;
    top: 0;
  }

  .places-list__place-title {
    text-transform: uppercase;
    font-size: 1.5rem;
  }

  .places-list__place-tag {
    padding: 0.2em 0.3em;
    background: #89d775;
    line-height: 2em;
    color: #fff;
  }

  @keyframes sidebar-show-box {
    0%{
      left: -100%;
    }
    100%{
      left: 0;
    }
  }

  @keyframes sidebar-hide-box {
    0%{
      left: 0;
    }
    100%{
      left: -100%;
    }
  }

  @keyframes place-show-left-line {
    0% {
      top: 50%;
      height: 0;
    }
    100% {
      top: 0;
      height: 100%;
    }
  }

  @keyframes place-hide-left-line {
    0% {
      top: 0;
      height: 100%;
    }
    100% {
      top: 50%;
      height: 0;
    }
  }
</style>