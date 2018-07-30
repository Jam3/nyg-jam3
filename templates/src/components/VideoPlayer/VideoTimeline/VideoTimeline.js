import React from 'react';
import classnames from 'classnames';

import './VideoTimeline.css';

import { noop } from '../../../util/basic-functions';

type Props = {
  className?: string,
  style?: Object,
  duration: number,
  currentTime?: number,
  onTimeUpdate?: Function
};

type State = {
  currentTime: ?number,
  isMouseDown: boolean
};

export default class VideoTimeline extends React.PureComponent<Props, State> {
  static defaultProps: Object;
  input: ?HTMLInputElement;
  container: ?HTMLElement;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.currentTime !== prevState.currentTime && !prevState.isMouseDown) {
      return { currentTime: nextProps.currentTime };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      currentTime: this.props.currentTime,
      isMouseDown: false
    };
  }

  onChange = () => {
    if (this.input) {
      const value: number = this.input && parseFloat(this.input.value);

      if (value) {
        this.props.onTimeUpdate && this.props.onTimeUpdate(value, value / this.props.duration);
        this.setState({ currentTime: value });
      }
    }
  };

  onMouseDown = () => {
    this.setState({ isMouseDown: true });
  };

  onMouseUp = () => {
    this.setState({ isMouseDown: false });
  };

  render() {
    const progressStyle = { width: Number(this.state.currentTime) / this.props.duration * 100 + '%' };
    return (
      <div
        className={classnames('VideoTimeline', this.props.className)}
        style={this.props.style}
        ref={r => (this.container = r)}
      >
        <div className="VideoTimeline-progress" style={progressStyle} />
        <input
          type="range"
          ref={r => (this.input = r)}
          min="0"
          max={this.props.duration}
          step="0.001"
          onChange={this.onChange}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          value={this.state.currentTime}
          aria-label="Seek Video"
        />
      </div>
    );
  }
}

VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  onTimeUpdate: noop
};
