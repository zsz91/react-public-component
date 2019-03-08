import React, { Component } from 'react';
import { Form } from 'antd';
import CustomFormItem from './CustomFormItem';
import PropTypes from 'prop-types';
import FormContext from './FormContext';
import DynamicComponent from './DynamicComponent';

const FormItem = Form.Item;

@Form.create()
export default class CustomForm extends Component{
  constructor(props) {
    super(props);

  }

  checkForm = () => {
    const { form } = this.props;

    form.validateFields((err, fieldsValue)=>{
      console.log(err, fieldsValue);
    });
  };

  render() {
    const {
      fieldsList,
      currentObj,
      labelConfig,
      form: {getFieldDecorator}
    } = this.props;

    return (
      <FormContext.Provider value={labelConfig}>
        <Form>
          {/*<CustomFormItem config={item}*/}
                          {/*key={item.key}*/}
                          {/*data={currentObj}*/}
          {/*/>*/}
          {
            fieldsList.map(item => {
              return (
                <FormItem key={item.key} {...labelConfig} label={item.name}>
                  {
                    getFieldDecorator(item.key, {
                      initialValue: 'currentObj[item.key]',
                      ...item.fieldConfig
                    })(
                      <DynamicComponent
                        type={item.type}
                      />
                    )
                  }
                </FormItem>


              )
            })
          }
          <div onClick={this.checkForm}>asd</div>
        </Form>
      </FormContext.Provider>

    );
  }

}

CustomForm.propTypes = {
  fieldsList: PropTypes.array
};

CustomForm.defaultProps = {
  currentObj:{
    title: 'asdasd',
  },
  labelConfig: {
    labelCol:{
      span: 3,
    },
    colon: true,
  },
  fieldsList: [
    {
      key: 'title',
      name: '信息标题',
      type: 'input',
      fieldConfig: {
        rules: [
          { required: true, message: '请输入信息标题' },
        ]
      }
    }
  ]
};
