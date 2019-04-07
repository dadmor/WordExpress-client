<template>
  <div :class="{
    'place-content': true,
    'show': post && post.post_title && shwActivePlace
  }">
    <template v-if="post">
      <h2 class="place-content__title">
        {{ post.post_title }}
        <button
          @click="closePlaceContent()"
          class="place-content__close"
        ><img src="~/assets/icon-close.svg" /></button>
      </h2>
      <div class="place-contet__content">
        <div>
          <p><b>Adres:</b> {{ getMetaByName(post.post_meta, 'address') }}</p>
          <p><b>Telefon:</b> {{ getMetaByName(post.post_meta, 'tel') }}</p>
        </div>
        <div class="place-content__element-list">
          <h4 class="place-content__headline">Dodakowe informacje</h4>
          <ul>
            <li v-for="item in post.categories" :key="item.term_id"><i>{{ item.name }}</i></li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import PlaceByID from '~/apollo/gql/placeByID.gql';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      name: 'Place Content'
    };
  },
  computed: {
    ...mapState({
      activePostID: state => state.activePlaceID,
      shwActivePlace: state => state.shwActivePlace
    }),
    ...mapMutations({
      SET_SHOW_ACTIVE_PLACE: 'SET_SHOW_ACTIVE_PLACE'
    }),
  },
  methods: {
    closePlaceContent() {
      this.$store.commit('SET_SHOW_ACTIVE_PLACE', false);
    },
    getMetaByName(metas, name) {
      return metas.filter( meta => meta.meta_key === name )[0].meta_value;
    }
  },
  apollo: {
    post: {
      query: PlaceByID,
      variables() {
        return {
          id: this.activePostID
        }
      }
    }
  }
}
</script>

<style scoped>
  .place-content {
    position: relative;
    left: -100%;
    background: #fff;
    z-index: 0;
    animation-name: place-content-hide-box;
    animation-duration: .5s;
    max-width: 800px;
    min-width: 500px;
  }

  .place-content.show {
    left: 0;
    animation-name: place-content-show-box;
    animation-duration: .5s;
  }

  .place-content__title {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    font-family: Lato;
    font-size: 24px;
    font-weight: 700;
    padding: 24px 48px;
    background: #f5f5f5;
  }

  .place-contet__content {
    padding: 0 24px;
  }

  .place-contet__content p {
    font-family: Lato;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4;
  }

  .place-content__element-list ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .place-content__element-list ul li {
    display: flex;
    position: relative;
    font-family: Lato;
    font-weight: 300;
    font-size: 16px;
    padding: 8px 8px 8px 16px;
  }

  .place-content__element-list ul li :before {
    position: absolute;
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3c9f00;
    left: 0;
    top: 14px;
  }

  .place-content__headline {
    font-family: Lato;
    font-weight: 700;
    font-size: 18px;
    margin: 16px 0;
  }

  .place-content__close {
    background: none;
    border: none;
    margin-left: 24px;
    cursor: pointer;
  }

  .place-contet__content {
    font-family: Lato;
    font-weight: 300;
    font-size: 18px;
    line-height: 1.3;
    padding: 24px 48px;
  }

  @keyframes place-content-show-box {
    0%{
      left: -100%;
    }
    100%{
      left: 0;
    }
  }

  @keyframes place-content-hide-box {
    0%{
      left: 0;
    }
    100%{
      left: -100%;
    }
  }
</style>