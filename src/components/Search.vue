<template>
  <div>
    <div class="page-title">
      <h1 v-if="$store.state.cityCurrentWeather.length === 0">Weather in the city</h1>
      <h1 v-else>Weather in {{ $store.state.cityCurrentWeather.name }}</h1>
    </div>

    <div class="search">
      <div class="search-btn">
        <div>
          <v-text-field
            outline
            dark
            color="white"
            placeholder="Search city"
            v-model="search"
            class="search-input"
            @keyup.enter="searchCity()"
          ></v-text-field>
          <p class="search-error">{{ errormessage }}</p>
        </div>

        <v-btn outline fab @click="searchCity()" color="white">
          <v-icon color="white">mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      search: ""
    };
  },
  computed: {
    errormessage() {
      return this.$store.state.errormessage;
    }
  },
  methods: {
    searchCity() {
      this.$store.state.cityName = this.search;
      this.$store.dispatch("getCityWeather");
      this.$store.dispatch("getCityForecast");
      this.search = "";
    }
  }
};
</script>

<style>
.page-title {
  font-family: "Pacifico", cursive;
  display: flex;
  padding: 7vh;
  flex-direction: column;
  align-items: center;
}

.page-title h1 {
  font-size: 3.5rem;
  color: white;
  text-align: center;
  font-weight: normal;
}

@media only screen and (max-width: 601px) {
  .title h1 {
    font-size: 2rem;
  }
}

.search {
  font-family: "Karla", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-left: 65px;
}

.search-input {
  font-size: 2em;
  background-color: transparent;
}
.v-input__control {
  margin-top: 6px;
}
.v-text-field--outline input {
  margin-top: auto;
  margin-bottom: auto;
  color: white;
  margin: 10px;
  text-align: center;

}
.search-btn {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.search-error {
  text-align: center;
  color: white;
  bottom: -33px;
  margin-bottom: 0;
}
</style>