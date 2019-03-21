import CascadeSearch from '@/baseComponent/CascadeSearch/CascadeSearch';
import CascadeSearch2lx from '@/baseComponent/CascadeSearch/CascadeSearch2lx';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import Shell from '@/baseComponent/Shell';
import React, { Component, Fragment } from 'react';



export default class SearchDom extends Component {
  render() {
    const {config, formValues, formStateChange, getPage, resetFormValues} = this.props;
    let styleShell = config.fromTab ? { marginTop: '0px' } : {};
    const props = {
      config: config.condition,
      value: formValues,
      changeValue: formStateChange,
      nameSpan: config.nameSpan ||{ big: 8, small: 9 },
      fileSpan: config.fileSpan ||{ big: 5, small: 4 },
    };
    return (<Shell styleShell={styleShell}>
      {
        config.searchType === 'cascadeSearch2lx'
        ? <CascadeSearch2lx {...props}/>
        : <CascadeSearch {...props}/>
      }
      <div style={{ height: '54px', padding: '12px 0 12px 12px', float: 'right' }}>
        <ButtonDiy name='查询'
                   handleClick={getPage}/>
        {typeof resetFormValues !== 'undefined' ?
          <ButtonDiy name='重置'
                     className="defaultBlue"
                     handleClick={resetFormValues}/>: null
        }

      </div>
    </Shell>);
  }
}


