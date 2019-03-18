<template>
  <div>
    <div class="forecast">
      <div class="single-forecast" v-for="(forecast, index) in todayForecast" :key="index">
        <h3>{{ getTime(forecast.dt) }}</h3>

        <v-icon
          class="forecast-icon"
          large
          color="white"
        >{{ geticonName(forecast.weather[0].icon) }}</v-icon>
        <p class="forecast-desc">{{ capitalizeFirstLetter(forecast.weather[0].description )}}</p>
        <p>Cloudiness: {{ forecast.clouds.all }} %</p>
        <p>Temperature: {{ forecast.main.temp }} &deg;C</p>
        <p>Humidity: {{ forecast.main.humidity }} %</p>
        <p>Pressure: {{ forecast.main.pressure }} hPa</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cityForecast() {
      return this.$store.state.cityForecast;
    },
    todayForecast() {
      var today = new Date();
      var day = ("0" + today.getDate()).slice(-2);
      var month = ("0" + (today.getMonth() + 1)).slice(-2);
      return this.cityForecast.list.filter(
        forecast => this.getDate(forecast.dt) === `${day}/${month}`
      );
    }
  },
  methods: {
    getDate(timestamp) {
      var date = new Date(timestamp * 1000);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var year = date.getFullYear();
      return `${day}/${month}`;
    },
    getTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var hours = ("0" + date.getHours()).slice(-2);
      var minutes = ("0" + date.getMinutes()).slice(-2);
      return `${hours}:${minutes}`;
    },
    geticonName(code) {
      var iconObj = this.$store.state.icons.find(icon => icon.code === code);
      return iconObj.icon;
    },
    capitalizeFirstLetter(description) {
      var firstletter = description[0].toUpperCase();
      var rest = description.slice(1);
      return `${firstletter}${rest}`;
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

.forecast {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  font-family: "Karla", sans-serif;
  color: white;
  text-align: center;
  padding-top: 20px;
}
.forecast p {
  font-size: 1.2rem;
  margin-bottom: 0;
}
.forecast h3 {
  font-size: 1.6rem;
  font-weight: normal;
}

.forecast-icon {
  color: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.single-forecast {
  border: 1px solid white;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
}

.single-forecast h3 {
  margin-top: 0;
}
</style>
