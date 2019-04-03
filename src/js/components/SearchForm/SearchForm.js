import Component from '../../framework/Component';
import googleAutocomplete from '../../googlePlaces';
import AppState from '../../Services/AppState';

// google.maps.event.addDomListener(window, 'load', googleAutocomplete);

export default class SearchForm extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    ['updateMyself', 'onSubmit'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this)),
    );
  }

  updateMyself(newState) {
    this.updateState(newState);
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const inputValue = document.getElementById('city-input');
    AppState.update('USERINPUT', 'gg');
  }

  render() {
    return [
      {
        tag: 'form',
        eventHandlers: { submit: this.onSubmit },
        classList: ['forecast-form'],
        attributes: [],
        children: [
          {
            tag: 'input',
            classList: ['forecast-form__input'],
            attributes: [
              {
                name: 'type',
                value: 'text',
              },

              {
                name: 'id',
                value: 'city-input',
              },

              {
                name: 'placeholder',
                value: 'Синок, сюда пиши город, английскими буквами...',
              },

              {
                name: 'title',
                value: 'Ну ты же знаешь, твоя мама не любит три раза повторять, пиши город',
              },

              {
                name: 'name',
                value: 'city',
              },

              {
                name: 'required',
              },
            ],
          },

          {
            tag: 'button',
            content: 'Спросить маман за погоду',
            classList: ['forecast-form__button'],
            attributes: [
              {
                name: 'type',
                value: 'submit',
              },
              {
                name: 'id',
                value: 'city-button',
              },
            ],
          },
        ],
      },
    ];
  }
}
