import Component from '../../framework/Component';
import { WeatherForecast } from '../WeatherForecast';
import { Temperature } from '../Temperature';
import { Wind } from '../Wind';
import { SearchForm } from '../SearchForm';
import { WeatherForecastItem } from '../WeatherForecastItem';

export default class App extends Component {
  constructor(host) {
    super(host);
    // this._render();
  }

  // onClick(e) {}

  render() {
    // if (data === undefined) {
    //   data = '';
    // }

    // this.props.data = data;

    const t1 = document.createDocumentFragment();
    new Temperature(t1, { temperature: 25, unit: 'C' });

    const w1 = document.createDocumentFragment();
    new Wind(w1, { speed: 100500, unit: 'mph' });

    // if () {
    //   return [
    //     {
    //       tag: 'div',
    //       classList: ['container'],
    //       children: [
    //         {
    //           tag: 'div',
    //           classList: ['row'],
    //           children: [
    //             {
    //               tag: 'h3',
    //               content: 'Weather forecast from Odessa mother',
    //               classList: ['main-title'],
    //             },

    //             {
    //               tag: SearchForm,
    //               props: {
    //                 eventHandlers: [
    //                   {
    //                     eventType: 'submit',
    //                     handler: this.onSubmit,
    //                   },
    //                 ],
    //                 attributes: [
    //                   {
    //                     name: 'id',
    //                     value: 'search-form',
    //                   },
    //                 ],
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           tag: 'footer',
    //           content:
    //             'Для моей настоящей одесской мамы Лили :) <span class="copyright">C любовью <a class="link" href="https://github.com/CuteShaun">сuteshaun</a> из <a class="link" href="http://kottans.org/">Kottans</a></span>',
    //         },
    //       ],
    //     },
    //   ];
    // }

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
                  todayData: 'fa',
                  fiveDayData: 'dadad',
                },
              },
            ],
          },
          {
            tag: 'footer',
            content:
              'Для моей настоящей одесской мамы Лили :) <span class="copyright">C любовью <a class="link" href="https://github.com/CuteShaun">сuteshaun</a> из <a class="link" href="http://kottans.org/">Kottans</a></span>',
          },
        ],
      },
    ];
  }
}
