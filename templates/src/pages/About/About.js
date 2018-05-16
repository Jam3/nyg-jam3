import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';

import BaseLink from '../../components/BaseLink/BaseLink';
import { default as Transition } from '../PagesTransitionWrapper';
import { wait } from '../../util/basic-functions';
import animate from '../../util/gsap-animate';

class About extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.containerEl = React.createRef();
  }

  componentDidMount() {
    this.container = this.containerEl.current;
    animate.set(this.container, { autoAlpha: 0 });
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this it you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    animate.to(this.container, 0.3, { autoAlpha: 0 });
  };

  render() {
    return (
      <section className={classnames('About', this.props.className)} ref={this.containerEl}>
        <h1>About</h1>
        <BaseLink link="/">Home</BaseLink>
      </section>
    );
  }
}

About.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string
});

About.defaultProps = {};

const mapStateToProps = state => ({
  previousRoute: state.previousRoute
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Transition(About));
