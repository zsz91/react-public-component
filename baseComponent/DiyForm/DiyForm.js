import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import * as Service from './Service';
import Dictionary from './DictionaryApi';
import UploadList from '@/baseComponent/UploadList';
import ButtonUpload from '@/baseComponent/ButtonUpload';
import {Row,Col,Form,Input,Radio,Switch,Select, Slider,TimePicker,DatePicker,Checkbox,Cascader,InputNumber  } from 'antd';
import { timer } from 'rxjs';
// import source from './source';
const DiyComponents = {
    input:Input,
    textArea:Input.TextArea,
    radio:Radio,
    radioGroup:Radio.Group,
    radioButton:Radio.Button,
    switch:Switch,
    slider:Slider,
    select:Select,
    checkbox:Checkbox,
    checkboxGroup:Checkbox.Group,
    option:Select.Option,
    timePicker:TimePicker,
    datePicker:DatePicker,
    monthPicker:DatePicker.MonthPicker, 
    rangePicker:DatePicker.RangePicker, 
    weekPicker:DatePicker.WeekPicker,
    cascader:Cascader,
    text:'p',
    a:'a',
    uploadList:UploadList,
    buttonUpload:ButtonUpload,
    inputNumber:InputNumber
}

let requested = [];

@Form.create()
class DiyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        Service.getTopList()
    }

    //获取对应的字典信息
    getListByDictType = item => {
        const state = this.state;
        let result = [];
        const DictionaryOne = Dictionary[item.key];
        let isInclude = requested.includes(item.key);
        if(state[`${item.key}List`]) return;
        if(isInclude) return;
        requested.push(item.key);
        Service.getOnlyChildList({dictType:DictionaryOne['code']}).then(res=>{
            if(res){
                res.map(el=>{
                    result.push({
                        name:el.dictName,
                        value:el.id
                    })
                })
                state[`${item.key}List`] = result;
                this.setState({...state})
            }
        })
    }

    //创建动态表单元素
    creatDymicComponent = (item) =>{
        const state = this.state;
        const {values} = this.props;
        const DymicComponent = DiyComponents[item.type?item.type:'input'];
        const DictionaryOne = Dictionary[item.key];
        if(DictionaryOne) {
            this.getListByDictType(item);
        }
        item.options = state[`${item.key}List`] || item.options || [];
        let Inner = null;

        switch (item.type) {
            case 'select':
                Inner = item.options.map((el,i)=>{
                    return (
                        <DiyComponents.option {...el} key={i} value={el.value} >
                            {el.name}
                        </DiyComponents.option>
                    )
                })
                break;
            case 'radioGroup':
                Inner = item.options.map(el=>{
                    return (
                        <Radio value={el.value} key={el.value}>{el.name}</Radio>
                    )
                })
                break;    
            case 'text':
                Inner = values?values[item.key]:item.value
                break;     
            default:
                break;
        }
        return  <DymicComponent 
                    onChange={item.onChange?(
                        e=>item.onChange(e)
                    ):null}
                    {...item.elementOptions}>
                    {Inner}
                </DymicComponent>
    }

    render() {
        // fileds
        const { getFieldDecorator,getValueFromEvent,setFieldsValue} = this.props.form; 
        const {fileds,values} = this.props;
        return (
            <Form labelCol={{span:6}} wrapperCol={{span:18}} layout="horizontal" {...fileds.config}>
                <Row gutter={10}>
                {
                    fileds.data.map((item,idx)=>{
                        // debugger
                        if(item.hide) return;
                        const initialValue = values
                                                ?values[item.key]
                                                ?values[item.key]
                                                :null
                                                :null
                        const label = <span style={{fontWeight:'400'}}>{item.name}</span>;
                        return (
                            <Col key={idx} 
                                xl={item.span?item.span.big:8} 
                                md={item.span?item.span.small:12}>
                                {
                                    item.type!=='a'?(
                                        <Form.Item
                                            style={{marginBottom:'10px'}}
                                            labelCol={item.labelCol || fileds.config.labelCol || {span:6}}
                                            wrapperCol={item.wrapperCol || fileds.config.wrapperCol || {span:18}}
                                            label={label}>
                                            {
                                                getFieldDecorator(item.key,{
                                                    initialValue,
                                                    validateFirst:true,
                                                    ...item.getFieldDecoratorOptions
                                                })(this.creatDymicComponent(item))
                                            }
                                        </Form.Item>
                                    ):<Form.Item>
                                        <a href={item.value}>{item.name}</a>
                                    </Form.Item>
                                }
                                
                            </Col>
                        );
                    })
                }
                </Row>
            </Form> 
        );
    }
}

DiyForm.propTypes = {
    fileds:PropTypes.object,//form数据
    values:PropTypes.object,//值
};

export default DiyForm;
