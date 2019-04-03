import Component from '../../framework/Component';

export default class Temperature extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    console.log(this.props.temperature, 'this.props.temperature');
    return `${this.props.temperature}`;
  }
}
