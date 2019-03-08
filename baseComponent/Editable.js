/**
 * 钟是志
 * 2019年1月10日
 * ContentEditable 用于简单的富文本编辑
 */

import React from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import FormArray from './FormArray';


export default class Editable extends React.Component {
  constructor() {
    super();
    this.contentEditable = React.createRef();
  };

  handleChange = evt => {
    const {filedKey, onChange} = this.props;
    onChange(evt.target.value, filedKey);
  };

  render = () => {
    const { value, disabled } = this.props;
    return <ContentEditable
      innerRef={this.contentEditable}
      html={value} // innerHTML of the editable div
      disabled={disabled}       // use true to disable editing
      onChange={this.handleChange} // handle innerHTML change
      tagName='article' // Use a custom HTML tag (uses a div by default)
    />;
  };
};
Editable.propTypes = {
  value: PropTypes.string.isRequired,
  filedKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,

};
Editable.defaultProps = {
  value : 'asdasdasd fsdfdsdf  gdfgdfg ',
  disabled: false,
};
