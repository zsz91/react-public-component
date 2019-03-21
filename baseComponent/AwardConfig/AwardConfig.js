import React, { Component, Fragment } from 'react';
import ShowInfo from './ShowInfo';
import EasyConfig from './EasyConfig';
import LineConfig from './LineConfig';
import ClazzApplyInfo from './ClazzApplyInfo';
import HouseholdEconomy from './HouseholdEconomy';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';

export default class AwardConfig extends Component{

  getDom = () => {
    const { type, isFilter, config, title,
      desc, value, filterLabelHide,filterLines,
      filterKey, data, dataKey, disabled, readOnly } = this.props;
    let dom = null;
    const filter = isFilter
      ? <Filter filterLines={filterLines}
                filterLabelHide={filterLabelHide}
                onRef={this.props.onRefFilter}
                name={filterKey}
                data={data[filterKey]}/>
      : null;
    let allConfig = {...JSON.parse(JSON.stringify(config || {})), disabled};

    switch (type) {
      case 'showInfo':
        dom = <ShowInfo {...config}
                        onRef={this.props.onRef}
                        title={title}
                        desc={desc}
                        name={value}
                        data={data[dataKey]}>
          { filter }
        </ShowInfo>;
        break;
      case 'easyConfig':
        dom = <EasyConfig name={value}
                          onRef={this.props.onRef}
                          title={title}
                          desc={desc}
                          readOnly={readOnly}
                          data={data[dataKey]}
                          {...allConfig}>
          { filter }
        </EasyConfig>;
        break;
      case 'lineConfig':
        dom = <LineConfig name={value}
                          onRef={this.props.onRef}
                          title={title}
                          desc={desc}
                          readOnly={readOnly}
                          data={data[dataKey]}
                          {...allConfig}>
          { filter }
        </LineConfig>;
        break;
      case 'clazzApplyInfo':
        dom = <ClazzApplyInfo name={value}
                              onRef={this.props.onRef}
                              title={title}
                              desc={desc}
                              readOnly={readOnly}
                              data={data[dataKey]}
                              {...allConfig}/>;
        break;
      case 'householdEconomy':
        dom = <HouseholdEconomy name={value}
                                onRef={this.props.onRef}
                                title={title}
                                desc={desc}
                                readOnly={readOnly}
                                data={data[dataKey]}
                                {...allConfig}>
          { filter }
        </HouseholdEconomy>;
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
  data: PropTypes.object,
  readOnly:PropTypes.bool, // 钟是志 2019年3月14日 用于 审核详情页面只读
};
AwardConfig.defaultProps = {
  type: '',
  filterType: '',
  data: {},
  disabled: false,
  readOnly: false,
};
