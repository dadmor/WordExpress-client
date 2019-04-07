<template>
  <div class="page-map">
    <div id="map"></div>
  </div>
</template>


<script>
import MapPlacesGql from '~/apollo/gql/mapPlaces.gql';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      name: 'Mapa',
      markers: []
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
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYWtjb2RlIiwiYSI6ImNqdTAzZmE5dzNiN2ozenBjcWZkN2x1M2sifQ.7AixSWnEAKb7RNudEFv7vg';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [21.0629888, 52.2446194],
      zoom: 10.15
    });

    if(this.posts){
      this.markers = this.posts.map(place => {
        const geo = {
          lat: place.post_meta.filter(x => x.meta_key === 'lat')[0].meta_value,
          lng: place.post_meta.filter(x => x.meta_key === 'lng')[0].meta_value
        };

        return {
          "type": "Feature",
          "properties": {
            'place_id': place.id
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              geo.lng,
              geo.lat
            ]
          }
        }
      });

      console.log(this.markers);

      map.on('load', () => {
        map.addLayer({
          "id": "symbols",
          // fill, line, symbol, circle, heatmap, fill-extrusion, raster, hillshade, background
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": this.markers
            }
          },
          "layout": {
            "icon-image": "rocket-15",
            "icon-size": 1.5
          }
        });

        map.on('click', 'symbols', (e) => {
          this.setActivePlaceID(e.features[0].properties.place_id);
        });
      });
    }

    console.log(this.markers);
  },
  apollo: {
    posts: {
      query: MapPlacesGql
    }
  }
}
</script>

<style scoped>
  #map {
    height: 100vh;
  }
</style>