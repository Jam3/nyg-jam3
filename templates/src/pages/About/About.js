import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';
import animate from '../../util/gsap-animate';

class About extends React.PureComponent {
  state = {};

  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });
    this.animateIn();
  }

  componentDidUpdate(prevProps, prevState) {}

  animateIn = () => {
    return Promise.all([animate.to(this.container, 0.2, { autoAlpha: 1 })]);
  };

  render() {
    return (
      <section className={classnames('About', this.props.className)} ref={r => (this.container = r)}>
        <h1>About</h1>
      </section>
    );
  }
}

About.propTypes = checkProps({
  className: PropTypes.string
});

About.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(About);
