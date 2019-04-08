<template>
  <div class="page-map">
    <div id="map"></div>
  </div>
</template>


<script>
// import MapPlacesGql from '~/apollo/gql/mapPlaces.gql';
import MapPlacesGql from '~/apollo/gql/places.gql';
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      name: 'Mapa',
      markers: []
    };
  },
  computed: {
    posts() {
      return this.terms;
    },
    ...mapMutations({
      SET_ACTIVE_PLACE_ID: 'SET_ACTIVE_PLACE_ID',
      SET_SHOW_ACTIVE_PLACE: 'SET_SHOW_ACTIVE_PLACE'
    }),
    ...mapState({
      cityID: state => state.apolloFilters.city,
      activityId: state => state.apolloFilters.activity
    })
  },
  methods: {
    setActivePlaceID(placeID) {
      this.$store.commit('SET_ACTIVE_PLACE_ID', placeID);
      this.$store.commit('SET_SHOW_ACTIVE_PLACE', true);
    },
    setMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoicm9iYWtjb2RlIiwiYSI6ImNqdTAzZmE5dzNiN2ozenBjcWZkN2x1M2sifQ.7AixSWnEAKb7RNudEFv7vg';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [20.8, 52.2446194],
      zoom: 9.15
    });

    if(this.terms){
      console.log('zmiana mapy');
      this.markers = this.terms.map(place => {
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

      if (this.markers && this.markers.length) {
        map.on('load', () => {
          map.loadImage("https://i.imgur.com/MK4NUzI.png", (error, image) => {
            map.addImage("custom-marker", image);

            map.addLayer({
              "id": "symbols",
              "type": "symbol",
              "source": {
                "type": "geojson",
                "data": {
                  "type": "FeatureCollection",
                  "features": this.markers
                }
              },
              "layout": {
                "icon-image": "custom-marker"
              }
            });

            map.on('click', 'symbols', (e) => {
              this.setActivePlaceID(e.features[0].properties.place_id);
              e.features[0].geometry.coordinates[0] = e.features[0].geometry.coordinates[0];
              map.flyTo({center:
                e.features[0].geometry.coordinates
              });
            });
          });
        });
      }
    }
    }
  },
  mounted() {
    this.setMap();
  },
  watch: {
    posts() {
      this.setMap();
    }
  },
  apollo: {
    terms: {
      query: MapPlacesGql,
      variables() {
        return {
          cityID: this.cityID,
          activityID: this.activityId
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