import ButtonDiy from '@/baseComponent/ButtonDiy';
import React, { Component, Fragment } from 'react';
import ExportInfo from '@/components/App/ExportInfo';
import ImportUtil from '@/components/App/ImportUtil';
import ModalForm from './ModalForm';
import LinkButton from './LinkButton';
import ModalDelete from './ModalDelete';
import ModalConfirm from './ModalConfirm';
import ModalBatch from './ModalBatch';

export default class ButtonListDom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { config, getPage, selectRows, formValues, children } = this.props;
    return (<div style={{ height: '50px', padding: '12px 0 12px 12px', positon:'relative'}}>

      {config.map((item, i) => {
        switch (item.component) {
          case 'ModalForm':  // 新增按钮 + 弹窗
            return <ModalForm {...item}
                              key={item.type}
                              getPage={getPage}
                              selectRows={selectRows}
            />;
          case 'LinkButton':  // 跳转按钮
            return <LinkButton {...item}
                              key={item.type}
            />;
          case 'ModalDelete': // 删除按钮
            return <ModalDelete {...item}
                                key={item.type}
                                getPage={getPage}
                                selectRows={selectRows}
            />;
          case 'ImportUtil': // 导入
            return <ImportUtil {...item.props}
                               key={item.type}
                               callback={() => getPage()}
            />;
          case 'ExportInfo': // 导出
            return <ExportInfo {...item.props}
                               key={item.type}
            />;
          case 'ModalConfirm': // 一般按钮 点击后弹出是否确定的 Modal Info
            return <ModalConfirm key={item.type}
                                 {...item}
                                 getPage={getPage}
                                 selectRows={selectRows}/>;
          case 'ModalBatch': // 一般按钮 点击后弹出 填写一些类似 审核理由 意见之类的信息
            return <ModalBatch key={item.type}
                               {...item}
                               handleSelectRows={this.props.handleSelectRows}
                               getPage={getPage}
                               selectRows={selectRows}/>;
          case 'OpenUrl': // 点击按钮 打开一个新窗口
            return window.open(item.url);
          case "Normal":
            return(
            <ButtonDiy name={item.name}
                       key={item.type}
                       className={item.className || 'defaultBule'}
                       handleClick={() => {item.handleClick(selectRows, formValues)}}
              />);
          default:
                break;
            //  return <ButtonDiy></ButtonDiy>;

          }
          })}
          <span style={{display:'inline-block'}}>{children}</span>
          </div>);
      }
      }


