import React from 'react';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}

App.propTypes = { initialCount: React.PropTypes.number };
App.defaultProps = { initialCount: 0 };

React.render(<App />, document.body);
