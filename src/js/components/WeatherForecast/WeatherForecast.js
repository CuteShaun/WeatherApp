import Component from '../../framework/Component';
import { Temperature } from '../Temperature';
import { Wind } from '../Wind';
import { Icon } from '../Icon';
import { WeatherForecastItem } from '../WeatherForecastItem';
import AppState from '../../services/AppState';

import WeatherDataService from '../../services/WeatherDataService';

import rain from '../../../img/rain.png';
import clearsky from '../../../img/clearsky.png';
import snowflake from '../../../img/snowflake.png';
import sunshine from '../../../img/sunshine.png';
import cloudy from '../../../img/cloudy.png';
import haze from '../../../img/haze.png';
import fog from '../../../img/fog.png';

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);

    this.geoLocationData();

    AppState.watch('USERINPUT', this.updateMyself);
    AppState.watch('UNIT', this.computeUnit);
    // AppState.watch('SHOWFAVOURITE', this.updateMyself);
    // AppState.watch('SHOWFROMHISTORY', this.updateMyself);
  }

  init() {
    ['updateMyself', 'geoLocationData', 'toggleUnit', 'computeUnit'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this)),
    );
    this.apiData = null;
    this.state = {
      weatherType: 'weather',
      unit: 'metric',
      city: null,
      celsium: 'C°',
      windSpeed: 'm/s',
    };
  }

  geoLocationData() {
    WeatherDataService.getWeatherByGeo(this.state.weatherType, this.state.unit).then((data) => {
      this.apiData = data;
      this.state.city = this.apiData.name;
      this.updateState(this.apiData);
    });
  }

  computeUnit(updatedUnit) {
    WeatherDataService.getCurrentWeather(updatedUnit.city, updatedUnit.unit).then((data) => {
      this.apiData = data;
      this.updateState(updatedUnit);
    });
  }

  updateMyself(userinput) {
    console.log(userinput, 'userinput');

    WeatherDataService.getCurrentWeather(userinput, this.state.unit).then((data) => {
      this.apiData = data;
      this.state.city = this.apiData.name;
      this.updateState(this.apiData);
    });
  }

  toggleUnit() {
    AppState.update('UNIT', {
      city: this.state.city,
      unit: this.state.unit === 'imperial' ? 'metric' : 'imperial',
      celsium: this.state.celsium === 'F°' ? 'C°' : 'F°',
      windSpeed: this.state.windSpeed === 'mph' ? 'm/s' : 'mph',
    });
  }

  setOdessaTips() {
    if (this.apiData === undefined) {
      return '';
    }

    const temp = Math.round(this.apiData.main.temp);

    if (temp >= 25) {
      return 'Это вы селёдку на привозе купили, или то вам так жарко?';
    }

    if (temp >= 10 && temp <= 18) {
      return 'Я шо то не могу понять, уже не холодно, но ещё не жарко';
    }

    if (temp > 18 && temp < 25) {
      return 'Ближе к мясу, но не фонтан';
    }

    if (temp >= 0 && temp <= 10) {
      return 'Надень шапку, не делай маме больно';
    }

    if (temp <= -1 && temp >= -10) {
      return 'Шоб ты был здоров, сиди дома, всех денег не заработаешь';
    }

    if (temp <= -10) {
      return 'Включите новости, там кому-то ещё хуже, чем нам';
    }

    return '';
  }

  chooseIcons(index) {
    let description;

    if (index) {
      description = this.apiData.list[index].weather[0].main;
    } else if (this.apiData === undefined) {
      description = '';
    } else {
      description = this.apiData.weather[0].main;
    }

    if (description === 'Clouds') {
      return `${cloudy}`;
    }

    if (description === 'Haze') {
      return `${haze}`;
    }

    if (description === 'Clear') {
      return `${clearsky}`;
    }

    if (description === 'Rain') {
      return `${rain}`;
    }

    if (description === 'Snow') {
      return `${snowflake}`;
    }

    if (description === 'Sunshine') {
      return `${sunshine}`;
    }

    if (description === 'Fog') {
      return `${fog}`;
    }

    return '';
  }

  render() {
    if (this.apiData) {
      return [
        {
          tag: 'div',
          classList: ['weather-forecast'],
          eventHandlers: this.props.todayData.eventHandlers,
          attributes: [
            {
              name: 'id',
              value: 'current-weather',
            },
          ],
          children: [
            {
              tag: 'div',
              classList: 'weather-forecast-item-wrapper',
              children: [
                {
                  tag: 'div',
                  classList: ['weather-forecast-info'],
                  children: [
                    {
                      tag: 'div',
                      classList: ['weather-forecast-info__item'],
                      children: [
                        {
                          tag: 'h1',
                          classList: ['weather-forecast-info__city-name'],
                          content: this.apiData.name,
                          children: [
                            {
                              tag: 'span',
                              classList: ['weather-forecast-info__country-name'],
                              content: `, ${this.apiData.sys.country}`,
                            },
                          ],
                        },
                        {
                          tag: 'div',
                          classList: ['weather-forecast-info__icon-wrapper'],
                          children: [
                            {
                              tag: Icon,
                              props: {
                                class: 'weather-forecast-info__icon',
                                src: this.chooseIcons(),
                                alt: 'weather-icon',
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tag: 'div',
                      classList: ['weather-forecast-info__item'],
                      children: [
                        {
                          tag: 'h4',
                          classList: ['weather-forecast-info__tips'],
                          content: this.setOdessaTips(),
                        },
                      ],
                    },
                  ],
                },
                {
                  tag: 'div',
                  classList: ['weather-forecast-add-info'],
                  children: [
                    {
                      tag: 'h2',
                      classList: ['weather-forecast-add-info__temp'],
                      children: [
                        {
                          tag: Temperature,
                          props: {
                            temperature: `<span class="units">${Math.round(
                              this.apiData.main.temp,
                            )} ${this.state.celsium}</span>`,
                          },
                        },
                      ],
                    },

                    {
                      tag: 'div',
                      classList: ['weather-forecast-add-info__wrapper'],
                      children: [
                        {
                          tag: 'div',
                          classList: ['weather-forecast-add-info__wind'],
                          children: [
                            {
                              tag: Wind,
                              props: {
                                speed: `${this.apiData.wind.speed} ${this.state.windSpeed}`,
                              },
                            },
                          ],
                        },
                        {
                          tag: 'div',
                          classList: ['weather-forecast-add-info__humadity'],
                          children: [
                            {
                              tag: 'div',
                              content: `${this.apiData.main.humidity}`,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // {
            //   tag: 'div',
            //   classList: ['weather-forecast-item-box'],
            //   children: [
            //     {
            //       tag: WeatherForecastItem,
            //       props: {
            //         data: '3',
            //         temp: '3',
            //         src: '3',
            //       },
            //     },
            //     {
            //       tag: WeatherForecastItem,
            //       props: {
            //         data: '11',
            //         temp: '11',
            //         src: '11',
            //       },
            //     },
            //     {
            //       tag: WeatherForecastItem,
            //       props: {
            //         data: '19',
            //         temp: '19',
            //         src: '19',
            //       },
            //     },
            //     {
            //       tag: WeatherForecastItem,
            //       props: {
            //         data: '27',
            //         temp: '27',
            //         src: '27',
            //       },
            //     },
            //     {
            //       tag: WeatherForecastItem,
            //       props: {
            //         data: '35',
            //         temp: '35',
            //         src: '35',
            //       },
            //     },
            //   ],
            // },
          ],
        },
      ];
    }
    return [''];
  }
}
