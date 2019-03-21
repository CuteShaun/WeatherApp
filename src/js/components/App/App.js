import Component from '../../framework/Component';
import { WeatherForecast } from '../WeatherForecast';
import { Temperature } from '../Temperature';
import { Wind } from '../Wind';
import { SearchForm } from '../SearchForm';
import { WeatherForecastItem } from '../WeatherForecastItem';

export default class App extends Component {
  constructor(host) {
    super(host);
    this._render();
  }

  beforeRender() {
    if (navigator.geolocation) {
      let lon;

      let lat;

      const unit = 'metric';

      const apiKey = 'd5f2fdfdab2f973dc4e4e3aa87a6ccfb';

      navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        const urlArr = [
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`,
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`,
        ];

        Promise.all(
          urlArr.map(url => fetch(url)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then(searchResult => searchResult)),
        ).then((arrPromise) => {
          this._render(arrPromise);
        });
      });
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const APIKEY = 'd5f2fdfdab2f973dc4e4e3aa87a6ccfb';
    const searchValue = event.target.elements[0].value;

    const search = (searchValue) => {
      const urlArr = [
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&&APPID=${APIKEY}`,
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&&APPID=${APIKEY}`,
      ];

      Promise.all(
        urlArr.map(url => fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then(searchResult => searchResult)),
      ).then((arrPromise) => {
        this._render(arrPromise);
      });
    };

    search(searchValue);
  }

  onClick(e) {}

  render(data) {
    if (data === undefined) {
      return '';
    }

    this.props.data = data;

    const t1 = document.createDocumentFragment();
    new Temperature(t1, { temperature: 25, unit: 'C' });

    const w1 = document.createDocumentFragment();
    new Wind(w1, { speed: 100500, unit: 'mph' });

    return [
      {
        tag: 'div',
        classList: ['container'],
        children: [
          {
            tag: 'div',
            classList: ['row'],
            children: [
              {
                tag: 'h3',
                content: 'Weather forecast from Odessa mother',
                classList: ['main-title'],
              },

              {
                tag: SearchForm,
                props: {
                  eventHandlers: [
                    {
                      eventType: 'submit',
                      handler: this.onSubmit,
                    },
                  ],
                  attributes: [
                    {
                      name: 'id',
                      value: 'search-form',
                    },
                  ],
                },
              },

              {
                tag: WeatherForecast,
                props: {
                  todayData: data[0],
                  fiveDayData: data[1],
                },
              },
            ],
          },

          {
            tag: 'footer',
            content: 'Для моей настоящей одесской мамы Лили :) <span class="copyright">C любовью <a class="link" href="https://github.com/CuteShaun">сuteshaun</a> из <a class="link" href="http://kottans.org/">Kottans</a></span>',
          },
        ],
      },
    ];
  }
}
