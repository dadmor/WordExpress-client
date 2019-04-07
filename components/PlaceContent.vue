<template>
  <div :class="{
    'place-content': true,
    'show': post && post.post_title
  }">
    <template v-if="post">
      <h2 class="place-content__title" v-text="post.post_title">
        <button class="place-content__close"><IconClose /></button>
      </h2>
      <div class="place-contet__content" v-html="post.post_content" />
    </template>
  </div>
</template>

<script>
import PlaceByID from '~/apollo/gql/placeByID.gql';
import { mapState } from 'vuex';
import IconClose from '~/assets/icon-close.svg';

export default {
  data() {
    return {
      name: 'Place Content'
    };
  },
  computed: {
    ...mapState({
      activePostID: state => state.activePlaceID
    })
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
    max-width: 600px;
  }

  .place-content.show {
    left: 0;
    animation-name: place-content-show-box;
    animation-duration: .5s;
  }

  .place-content__title {
    font-family: Lato;
    font-size: 24px;
    font-weight: 700;
    padding: 24px 48px;
    background: #f5f5f5;
  }

  .place-content__close {
    background: none;
    border: none;
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