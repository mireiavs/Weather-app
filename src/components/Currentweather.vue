<template>
  <div>
    <div class="current-weather">
      <div class="icon-and-description">
        <v-icon dark size="150px">{{iconName}}</v-icon>
        <p>{{ description }}</p>
      </div>

      <div class="current-detail">
        <p>
          <span class="icon">
            <i class="fas fa-thermometer-half"></i>
          </span>
          Temperature: {{ cityCurrentWeather.main.temp
          }} &deg;C
        </p>

        <p>
          <span class="icon">
            <i class="fas fa-thermometer-three-quarters"></i>
          </span>
          Max. temperature: {{ cityCurrentWeather.main.temp_max }} &deg;C
        </p>
        <p>
          <span class="icon">
            <i class="fas fa-thermometer-quarter"></i>
          </span>
          Min. temperature: {{
          cityCurrentWeather.main.temp_min }} &deg;C
        </p>
      </div>

      <div class="current-detail">
        <p>
          <span class="icon">
            <i class="fas fa-tint"></i>
          </span>
          Humidity: {{ cityCurrentWeather.main.humidity }}%
        </p>
        <p>
          <span class="icon">
            <i class="fas fa-tachometer-alt"></i>
          </span>
          Pressure: {{ cityCurrentWeather.main.pressure
          }} hPa
        </p>
        <p>
          <span class="icon">
            <i class="fas fa-cloud"></i>
          </span>
          Cloudiness: {{ cityCurrentWeather.clouds.all }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";

export default {
  components: {
    Search
  },
  data() {
    return {

    };
  },
  computed: {
    cityCurrentWeather() {
      return this.$store.state.cityCurrentWeather;
    },
    iconName() {
      var iconObj = this.$store.state.icons.find(
        icon => icon.code === this.cityCurrentWeather.weather[0].icon
      );
      return iconObj.icon;
    },
    description() {
      var firstletter = this.cityCurrentWeather.weather[0].description[0].toUpperCase();
      var rest = this.cityCurrentWeather.weather[0].description.slice(1)
      return `${firstletter}${rest}`
    }
  }
};
</script>

<style>
.icon {
  display: inline-block;
  width: 20px;

  text-align: center;
}

.current-weather {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  font-family: "Karla", sans-serif;
  color: white;
  margin-top: 30px;
}
.current-weather p {
  font-family: "Karla", sans-serif;
  font-size: 1.3rem;
}
.icon-and-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.icon-and-description p {
  text-align: center;
  margin-top: 10px;
}
.current-detail {
  display: flex;
  flex-direction: column;
  justify-content: center
}
</style>
