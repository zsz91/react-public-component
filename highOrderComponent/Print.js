import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import PrintTemplate from 'react-print';

export default class Print extends Component {
  constructor () {
    super();
  }

  componentDidMount() {
    this.popup = document.createElement("div");
    document.body.appendChild(this.popup);
    this._renderLayer();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._renderLayer();
  }

  _renderLayer(){
    ReactDom.render((
      <PrintTemplate>
        {this.props.children}
      </PrintTemplate>
    ), this.popup);
  }

  componentWillUnmount() {
    this.popup.remove();
  }

  render() {
    return <Fragment></Fragment>;
  }
}
