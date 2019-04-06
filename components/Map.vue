<template>
  <div class="page-map">
    <div id="map"></div>
  </div>
</template>


<script>
import Places from '~/apollo/gql/places.gql';

export default {
  data() {
    return {
      name: 'Mapa'
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYWtjb2RlIiwiYSI6ImNqdTAzZmE5dzNiN2ozenBjcWZkN2x1M2sifQ.7AixSWnEAKb7RNudEFv7vg';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [21.0629888, 52.2446194],
      zoom: 11.15
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([21.0629888, 52.2446194])
      .addTo(map);
  },
  apollo: {
    posts: {
      query: Places,
      variables() {
        return {
          postType: ["place"]
        }
      }
    }
  }
}
</script>

<style scoped>
  #map {
    height: 100vh;
  }
</style>