import React, { Component } from 'react';
import Draggable from 'react-draggable';
import arc from './arc.png';

function getY(x) {
  return Math.cos((x / 160) * Math.PI) * 40 + 37;
}

function convertX(pos) {
  return pos * 320 || 0;
}

class HillChart extends Component {
  state = {
    position: {
      x: convertX(this.props.initialPos),
      y: getY(convertX(this.props.initialPos))
    }
  };
  handleDrag = (e, data) => {
    const { x } = data;
    const y = getY(x);
    this.setState({ position: { x, y } });
  };

  handleStop = (e, data) => {
    this.props.onStop(data.x / 320);
  };

  render() {
    const {
      position: { x, y }
    } = this.state;
    const present = Math.ceil((x / 160) * 10) * 10;
    const text =
      x < 160 ? `Figuring out (~${present}%)` : `Doing it (~${present - 100}%)`;
    return (
      <div style={{ width: 340, margin: 'auto' }}>
        <div
          style={{
            width: 340,
            height: 120,
            backgroundImage: `url(${arc})`,
            position: 'relative'
          }}
        >
          <Draggable
            bounds="parent"
            axis="x"
            onDrag={this.handleDrag}
            position={{ x, y }}
            onStop={this.handleStop}
          >
            <div
              style={{
                cursor: 'move',
                borderRadius: 20,
                border: 'solid 2px black',
                width: 16,
                height: 16,
                backgroundColor: x < 160 ? 'orange' : 'green'
              }}
            />
          </Draggable>
        </div>
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#444'
          }}
        >
          {text}
        </div>
      </div>
    );
  }
}

export default HillChart;
