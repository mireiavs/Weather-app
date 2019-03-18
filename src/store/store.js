import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        cityName: "",
        cityCurrentWeather: [],
        cityForecast: [],
        search: "",
        errormessage: "",
        fetchError: false,
        icons: [
            { code: "01d", icon: "mdi-white-balance-sunny" },
            { code: "01n", icon: "mdi-white-balance-sunny" },
            { code: "02d", icon: "mdi-weather-partlycloudy" },
            { code: "02n", icon: "mdi-weather-partlycloudy" },
            { code: "03d", icon: "mdi-cloud" },
            { code: "03n", icon: "mdi-cloud" },
            { code: "04d", icon: "mdi-cloud" },
            { code: "04n", icon: "mdi-cloud" },
            { code: "09d", icon: "mdi-weather-pouring" },
            { code: "09n", icon: "mdi-weather-pouring" },
            { code: "10d", icon: "mdi-weather-pouring" },
            { code: "10n", icon: "mdi-weather-pouring" },
            { code: "11d", icon: "mdi-weather-lightning" },
            { code: "11n", icon: "mdi-weather-lightning" },
            { code: "13d", icon: "mdi-weather-snowy" },
            { code: "13n", icon: "mdi-weather-snowy" },
            { code: "50d", icon: "mdi-waves" },
            { code: "50n", icon: "mdi-waves" }
          ]
    },
    actions: {
        getCityWeather({
            commit
        }) {
            var url =
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                this.state.cityName +
                "&appid=50c5a6b0d0771c35aaa4bc8f849d2953&units=metric";

            axios.get(url).then(data => {
                    commit("GETCITYWEATHER", data);
                    this.state.errormessage = ""
                })
                .catch(error => commit("API_FAILURE", error));
        },  
        getCityForecast({ commit }) {
            var url =
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                this.state.cityName +
                "&appid=50c5a6b0d0771c35aaa4bc8f849d2953&units=metric";

            axios.get(url)
                .then(data =>
                    commit("GETCITYFORECAST", data))
                .catch(error => commit("API_FAILURE", error))
        }
    },
    mutations: {
        API_FAILURE(state, error) {
            if (error.message.includes("400")) {
                state.errormessage = "Please enter a city"
            } else if (error.message.includes("404")) {
                state.errormessage = "City not found"
            }

        },
        GETCITYWEATHER(state, data) {
            state.cityCurrentWeather = data.data;
        },
        GETCITYFORECAST(state, data) {
            state.cityForecast = data.data;
        }
    }
})