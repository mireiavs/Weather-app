<template>
  <div class="weather-info container" v-if="$store.state.cityCurrentWeather.length !== 0 && $store.state.cityForecast.length !== 0">
    <v-tabs  color="transparent" dark slider-color="white" grow>
      <v-tab ripple class="tab-title" grow>Current weather</v-tab>
      <v-tab-item>
        <v-card flat color="transparent">
         <currentweather></currentweather>
        </v-card>
      </v-tab-item>

     <v-tab ripple class="tab-title" grow>Today's Forecast</v-tab>
      <v-tab-item>
        <v-card flat color="transparent">
         <forecasttoday></forecasttoday>
        </v-card>
      </v-tab-item>

           <v-tab ripple class="tab-title" grow>4-day Forecast</v-tab>
      <v-tab-item>
        <v-card flat color="transparent">
         <forecast></forecast>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Currentweather from "@/components/Currentweather.vue";
import Forecast from "@/components/Forecast.vue";
import Forecasttoday from "@/components/Forecasttoday.vue";


export default {
  components: { Currentweather, Forecast, Forecasttoday },
};
</script>

<style scoped>
.weather-info {
  border-radius: 20px;
  width: 80%;
  margin: 7vh;
  color: white;
  background-color: #b2c2c357;
  -webkit-box-shadow: 10px 10px 90px -26px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 90px -26px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 90px -26px rgba(0, 0, 0, 0.75);
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem;
}

.tab-title {
    font-family: "Karla", sans-serif;
    font-size: 1.3rem
}
</style>