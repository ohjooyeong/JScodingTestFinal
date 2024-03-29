class Component {
  constructor(props) {
    this.props = props;
  }

  // state가 바뀌면 리렌더링이 일어나야함
  setState(newState) {
    this.state = newState;
    this.updater();
  }

  updater() {
    const rendered = this.render();
    this.lastRendered.replaceWith(rendered);
    this.lastRendered = rendered;
  }

  render() {}

  initialize() {
    const rendered = this.render();
    this.lastRendered = rendered;

    return rendered;
  }
}

export default Component;
