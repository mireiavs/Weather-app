<template>
  <div class="forecast">
    <div v-for="(date, index) in allDates" :key="index">
      <h2>{{ date }}</h2>
      <div class="forecasts">
        <div class="single-forecast" v-for="(forecast, index) in dayForecast(date)" :key="index">
          <div>
            <h3>{{getMoment(getTime(forecast.dt))}}</h3>
          </div>
          <v-icon
            class="forecast-icon"
            large
            color="white"
          >{{ geticonName(forecast.weather[0].icon) }}</v-icon>
          <p class="forecast-desc">{{ capitalizeFirstLetter(forecast.weather[0].description) }}</p>
          <p>Cloudiness: {{ forecast.clouds.all }} %</p>
          <p>Temperature: {{ forecast.main.temp }} &deg;C</p>
          <p>Humidity: {{ forecast.main.humidity }} %</p>
          <p>Pressure: {{ forecast.main.pressure }} hPa</p>
        </div>
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
    reducedForecast() {
      var today = new Date();
      var day = ("0" + today.getDate()).slice(-2);
      var month = ("0" + (today.getMonth() + 1)).slice(-2);
      var hours = ("0" + today.getHours()).slice(-2);
      var minutes = ("0" + today.getMinutes()).slice(-2);
      var fourdays = this.cityForecast.list.filter(
        forecast => this.getDate(forecast.dt) !== `${day}/${month}`
      );
      return fourdays.filter(
        forecast =>
          this.getTime(forecast.dt) === "11:00" ||
          this.getTime(forecast.dt) === "14:00" ||
          this.getTime(forecast.dt) === "17:00"
      );
    },
    allDates() {
      var dates = [];
      this.reducedForecast.forEach(forecast => {
        if (!dates.includes(this.getDate(forecast.dt)))
          dates.push(this.getDate(forecast.dt));
      });
      return dates;
    }
  },
  methods: {
    dayForecast(day) {
      return this.reducedForecast.filter(
        forecast => this.getDate(forecast.dt) === day
      );
    },
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
    getMoment(time) {
      if (time === "10:00") {
        return "Morning";
      } else if (time === "16:00") {
        return "Afternoon";
      } else if (time === "22:00") {
        return "Night";
      }
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

<style scoped>
.icon {
  display: inline-block;
  width: 20px;
  text-align: center;
}

.forecast {
  display: flex;
  flex-flow: column wrap;
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
  font-size: 1.3rem;
  font-weight: normal;
  margin-top: 20px;
}
.forecasts {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.single-forecast h3 {
  margin-top: 0;
}
h2 {
  margin-top: 20px;
}
</style>
