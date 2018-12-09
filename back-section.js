import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HillChart from './HillChart';

const t = window.TrelloPowerUp.iframe();
const { card } = t.getContext();

function handleOnStop(x) {
  t.set(card, 'shared', { pos: x });
}

class BackSection extends Component {
  state = { initialPos: null };

  componentDidMount() {
    t.get(card, 'shared').then(data => {
      this.setState({ initialPos: data.pos });
    });
  }

  render() {
    const { initialPos } = this.state;
    if (initialPos === null) return null;
    return <HillChart onStop={handleOnStop} initialPos={initialPos} />;
  }
}


ReactDOM.render(<BackSection />, document.getElementById('root'));
