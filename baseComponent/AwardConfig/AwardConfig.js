import React, { Component, Fragment } from 'react';
import ShowInfo from './ShowInfo';
import EasyConfig from './EasyConfig';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

export default class AwardConfig extends Component{

  getDom = () => {
    const { type, filterType, config, title, desc, value } = this.props;
    let dom = null;

    switch (type) {
      case 'showInfo':
        dom = <ShowInfo {...config} title={title} desc={desc}>
          { filterType
            ? <Filter filterType={filterType}/>
            : null}
        </ShowInfo>;
        break;
      case 'easyConfig':
        dom = <EasyConfig name={value} onRef={this.props.onRef} title={title} {...config}/>;
        break;
      default:
        break;
    }

    return dom
  };

  render() {
    const dom = this.getDom();

    return (
      <Fragment>
        { dom }
      </Fragment>
    )
  }
}

AwardConfig.propTypes = {
  type: PropTypes.string,
  filterType: PropTypes.string,
};
AwardConfig.defaultProps = {
  type: '',
  filterType: '',
};
