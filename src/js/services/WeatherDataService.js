class WeatherDataService {
  constructor() {
    this.APIKEY = 'd5f2fdfdab2f973dc4e4e3aa87a6ccfb';
  }

  // eslint-disable-next-line class-methods-use-this
  getWeatherByGeo(weathertype, unit) {
    const getGeoLocation = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const getWeatherByPosition = (position) => {
      const { longitude } = position.coords;
      const { latitude } = position.coords;
      const api = `https://api.openweathermap.org/data/2.5/${weathertype}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${
        this.APIKEY
      }`;
      // eslint-disable-next-line max-len
      return fetch(api).then(response => (response.ok ? response.json() : Promise.reject(response.statusText)));
    };

    return getGeoLocation()
      .then(getWeatherByPosition)
      .then(result => result);
  }

  getCurrentWeather(userInput, unit) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=${unit}&appid=${
      this.APIKEY
    }`;
    return fetch(api).then((response) => {
      if (response.ok) {
        return response.json();
      }

      if (response.status === 404) {
        console.log('Ooops, nothing found');
      }
    });
  }

  getForecastWeather(userInput, unit) {
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=${unit}&appid=${
      this.APIKEY
    }`;
    return fetch(api).then((response) => {
      if (response.ok) {
        return response.json();
      }

      if (response.status === 404) {
        console.log('Ooops, nothing found');
      }
    });
  }
}

// getAllWeatherInfo(query, unit) {
//   return Promise.all([this.getCurrentWeather(query, unit), this.getWeatherForecast(query, unit)]);
// }

export default new WeatherDataService();
