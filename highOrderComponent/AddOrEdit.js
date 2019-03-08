import React, { Component, Fragment } from 'react';
import { Row, message } from 'antd';
import CascadeAdd from '@/baseComponent/CascadeSearch/CascadeAdd';
import BlockTitle from '@/baseComponent/BlockTitle';
import Shell from '@/baseComponent/Shell';
import ButtonDiy  from '@/baseComponent/ButtonDiy';
import router from 'umi/router';
import PropTypes from 'prop-types';
import * as service from '@/highOrderComponent/Service';

export default class AddOrEdit extends Component {
  constructor(props) {
    super(props);

  }

  formStateChange = (value, key) => {
    this.props.formStateChange && this.props.formStateChange(value, key);
  };
  goBack = () => {
    router.goBack();
  };

  getLineElem = (config, disabled) => {
    const { currentObj } = this.props;
    const lineFields = config.fields.map(item => {
      return [item];
    });

    return (
      <Fragment>
        {
          lineFields.map(item => {
            return (
              <Row key={item[0].key}>
                <CascadeAdd disabled={disabled}
                            config={item}
                            value={currentObj}
                            changeValue={this.formStateChange}
                            fileSpan={config.fileSpan}
                            nameSpan={config.nameSpan}
                />
              </Row>
            )
          })
        }
      </Fragment>
    )
  };

  save = () => {
    const { currentObj, hasBack } = this.props;
    const { saveBtn } = this.props;
    const param = JSON.parse(JSON.stringify(currentObj));
    const { needStringKey, requireKey } = this.getStringKendReqyiredKey();

    for (let key of requireKey) {
      if (!param[key] || (needStringKey.includes(key) && !param[key].editorHtml)) {
        message.error('请认真填写信息！');
        return;
      }
    }

    for(let key of needStringKey) {
      param[key] = JSON.stringify(param[key]);
    }

    service.addOrUpdate(param, saveBtn.url).then(res=>{
      if (res) {
        if (this.props.onSave){
          this.props.onSave(res);
        } else {
          message.success(currentObj.id ? '修改成功' : '保存成功');
        }

        hasBack && this.goBack();
      }
    });
  };

  getStringKendReqyiredKey = () =>{
    const { editShellConfig } = this.props;
    const needStringKey = [];
    const requireKey = [];

    editShellConfig.map(item=>{
      item.configs.map(config => {
        config.fields.map(field => {
          field.required && requireKey.push(field.key);
          if (field.type === 'upload') needStringKey.push(field.key);
        });
      });
    });

    return {needStringKey, requireKey};
  };

  getDom = (item) =>{
    const { disabled, currentObj } = this.props;
    return (
      <Shell>
        {
          item.title
            ? <BlockTitle title={item.title}/>
            : null
        }

        {
          item.configs.map((config,idx) => {
            return (
              <Fragment   key={item.title + idx}>
                {
                  config.isLine
                    ?  this.getLineElem(config, disabled)
                    :
                    <CascadeAdd disabled={disabled}
                                config={config.fields}
                                value={currentObj}
                                changeValue={this.formStateChange}
                                fileSpan={config.fileSpan}
                                nameSpan={config.nameSpan}
                    />
                }

              </Fragment>
            )
          })
        }

      </Shell>
    )
  }

  render() {
    const { editShellConfig, saveBtn, disabled, currentObj, hasBack } = this.props;

    return (
      <div>
        <Shell>
          <div style={{ height: '54px', padding: '12px 0 12px 12px' }}>
            <ButtonDiy handleClick={this.save}
                       disabled={disabled}
                       name={currentObj.id ? (saveBtn.editName || saveBtn.name) : saveBtn.name}
                       className='primaryBlue'
            />

            {
              hasBack
                ? <ButtonDiy name="返回"
                            className="defaultBlue"
                            icon="arrow-left"
                            handleClick={this.goBack}
                />
                : null
            }

          </div>
        </Shell>

          {
            editShellConfig.map(item => {
              return (
                <Fragment key={item.title}>
                  {
                    item.checkShow
                      ? (item.checkShow(currentObj[item.showKey]) ? this.getDom(item): null)
                      : this.getDom(item)
                  }

                </Fragment>
              )
            })
          }

      </div>
    );
  }

}


AddOrEdit.propTypes = {
  editShellConfig: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  disabled: PropTypes.bool
};

AddOrEdit.defaultProps = {
  editShellConfig:[
    {
      title: '',
      configs: [
        {
          fields:[
            {
              key: 'title',
              name: '信息标题',
              type: 'input',
              required: true,
            },
            {
              key: 'link',
              name: '外部链接',
              type: 'input',
              required: true,
            },
            {
              key: 'summery',
              name: '内容简介',
              type: 'textarea',
              required: true,
            },
            {
              key: 'content',
              name: '信息内容',
              type: 'editor',
              required: true,
            },
          ],
          fileSpan: {
            big: 1,
            small: 1
          },
          nameSpan: {
            big:3,
            small: 3
          },
        },
        {
          fields: [
            {
              key: 'pic',
              name: '配置图片',
              type: 'input',
              required: true,
            },
            {
              key: 'author',
              name: '作者',
              type: 'input',
              required: true,
            },
            {
              key: 'clicks',
              name: '点击量',
              type: 'input',
              required: true,
            },
            {
              key: 'createTime',
              name: '创建时间',
              type: 'datePicker',
              required: true,
            },
            {
              key: 'sort',
              name: '信息排序',
              type: 'input',
              required: true,
            },
          ],
          fileSpan: {
            big: 2,
            small: 2,
          },
          nameSpan: {
            big:6,
            small: 6
          },
          isLine: true,
        },
      ]
    },

  ],
  buttons: [
    {
      name: '保存',
      className: 'defaultBlue',
      url: '',

    }
  ],
  disabled: false,
};
