import React, { Component } from 'react';
import { Form, Input } from 'antd';
import DynamicComponent from './DynamicComponent';
import FormContext from './FormContext';

const FormItem = Form.Item;


@Form.create()
export default class CustomFormItem extends Component{
  constructor(props) {
    super(props);

  }

  render() {
    const {
      config: {
        key,
        name,
        fieldConfig,
        type,
      },
      data,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <FormContext.Consumer>
        {
          (labelConfig) => {
            return (
              <FormItem {...labelConfig} label={name}>
                {
                  getFieldDecorator(key, {
                    initialValue: data[key],
                    ...fieldConfig
                  })(
                    <DynamicComponent
                      type={type}
                    />
                  )
                }
              </FormItem>
            )
          }
        }
      </FormContext.Consumer>
    );
  }

}
