import Component from '../../framework/Component';
import { Temperature } from '../Temperature';
var moment = require('moment');

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  formatDate(date) {
    date = this.props.data.dt_txt;
    let formatedDate = date.slice(0, 10);
    let momentFormated = moment(formatedDate).format('dddd');
    return momentFormated;
  }

  render() {
    return [
      {
        tag: 'div',
        classList: ['weather-forecast-item'],
        children: [
          {
            tag: 'div',
            classList: ['weather-forecast-content'],
            children: [
              {
                tag: 'h5',
                classList: ['weather-forecast-item__day'],
                content: this.formatDate(),
              },
              {
                tag: Temperature,
                classList: ['weather-forecast-item__dat'],
                props: {
                  temperature: Math.round(this.props.temp) + '&deg;' + 'c',
                },
              },
              {
                tag: 'img',
                classList: ['weather-forecast-item__img'],
                attributes: [
                  {
                    name: 'alt',
                    value: 'weather-icon',
                  },
                  {
                    name: 'src',
                    value: this.props.src,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }
}
