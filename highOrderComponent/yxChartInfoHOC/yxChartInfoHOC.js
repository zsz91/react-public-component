import React, { Component } from 'react';
import Scaffold from '@/baseComponent/Scaffold/Scaffold';

const yxChartInfoHOC = (Innercomponent)=>{

  return class extends Component {
    render() {
      return (
          <Scaffold>
              <Innercomponent hello="hello"/>
          </Scaffold>
      )
    }
  }
}
export default yxChartInfoHOC;