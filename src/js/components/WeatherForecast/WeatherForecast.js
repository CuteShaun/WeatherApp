import Component from '../../framework/Component';
import { Temperature } from '../Temperature';
import { Wind } from '../Wind';
import { Icon } from '../Icon';
import { WeatherForecastItem } from '../WeatherForecastItem';

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
  }

  setOdessaTips() {
    const temp = Math.round(this.props.todayData.main.temp);

    console.log(temp);

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
      description = this.props.fiveDayData.list[index].weather[0].main;
      // console.log(description);
    } else {
      description = this.props.todayData.weather[0].main;
      // console.log(description);
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
    console.log(this.props.fiveDayData, 'fivedayData');
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
                        content: this.props.todayData.name,
                        children: [
                          {
                            tag: 'span',
                            classList: ['weather-forecast-info__country-name'],
                            content: `, ${this.props.todayData.sys.country}`,
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
                          temperature:
                            `${Math.round(this.props.todayData.main.temp)}&deg;`
                            + '<span class="units"> C</span>',
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
                              speed: `${Math.round(this.props.todayData.wind.speed)}km/h`,
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
                            content: `${this.props.todayData.main.humidity}`,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            tag: 'div',
            classList: ['weather-forecast-item-box'],
            children: [
              {
                tag: WeatherForecastItem,
                props: {
                  data: this.props.fiveDayData.list[7],
                  temp: this.props.fiveDayData.list[7].main.temp,
                  src: this.chooseIcons(7),
                },
              },
              {
                tag: WeatherForecastItem,
                props: {
                  data: this.props.fiveDayData.list[15],
                  temp: this.props.fiveDayData.list[15].main.temp,
                  src: this.chooseIcons(15),
                },
              },
              {
                tag: WeatherForecastItem,
                props: {
                  data: this.props.fiveDayData.list[23],
                  temp: this.props.fiveDayData.list[23].main.temp,
                  src: this.chooseIcons(23),
                },
              },
              {
                tag: WeatherForecastItem,
                props: {
                  data: this.props.fiveDayData.list[31],
                  temp: this.props.fiveDayData.list[31].main.temp,
                  src: this.chooseIcons(31),
                },
              },
              {
                tag: WeatherForecastItem,
                props: {
                  data: this.props.fiveDayData.list[38],
                  temp: this.props.fiveDayData.list[38].main.temp,
                  src: this.chooseIcons(38),
                },
              },
            ],
          },
        ],
      },
    ];
  }
}
