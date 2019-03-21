import Component from '../../framework/Component';

export default class SearchForm extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: 'form',
        eventHandlers: this.props.eventHandlers,
        classList: ['forecast-form'],
        attributes: this.props.attributes,
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
