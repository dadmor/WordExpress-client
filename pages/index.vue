<template>
  <section class="container">
    <div>
      <logo />
      <ApolloQuery 
        :query="require('@/apollo/gql/posts.gql')"
        :variables="{ 
          first: 10 // posts_per_page
        }"
        >
        <template slot-scope="{ result: { data, loading } }">
          <div v-if="loading">Loading...</div>
          <section v-else id="section-1" class="item-wrapper">
            <div  v-for="item of data" >
              {{item}}
            </div>
          </section>
        </template>   
      </ApolloQuery>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
