/*
 * @Description: 页面脚手架
 * @Author: 袁永华
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-09 10:03:29
 * @LastEditTime: 2019-03-12 19:21:08
 */

import React, { Component } from 'react';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import {Button,Row} from 'antd';
import Shell from '@/baseComponent/Shell';
import PageHeader from '@/components/PageHeaderWrapper';
import CascadeSearch from '@/baseComponent/CascadeSearch/CascadeSearch';
import * as Service from './Service';
import StandardTable from '@/components/StandardTable/index';
import PropTypes from 'prop-types';
 
 class Scaffold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CascadeSearchValue:{},//搜索框的值
            selectedRows:[],//多选得到的值
            formData:null,//获取到的值
            loading:false,//表格的loading
        }
    }
 
    componentDidMount() {
        const {stateChange,searchArea} = this.props;
        const {CascadeSearchValue} = this.state;
        searchArea.searchItems.map(item=>{
            if(item.defaultValue){
                CascadeSearchValue[item.key] = item.defaultValue;
            }
        })
        this.setState({CascadeSearchValue},()=>{
            stateChange&&stateChange(this.state);
        })
    }
    //设置state的值
    setStateRef = (v,k)=>{
        let state = this.state;
        state[k] = v;
        this.state = state;
        this.forceUpdate();
    }
 
    //搜索条件改变
    changeValue = (v,k)=>{
        let {CascadeSearchValue} = this.state;
        const {stateChange,searchArea} = this.props;
        const $item = searchArea.searchItems.find(item=>{
            return item.transformKey === k;
        })
        if($item){
            CascadeSearchValue[$item.key] = v;
        }
        CascadeSearchValue[k] = v;
        this.setState({CascadeSearchValue},()=>{
            stateChange&&stateChange(this.state);
        });
    }
    //重置搜索条件
    resetCascadeSearch = (v,k)=>{
        let {CascadeSearchValue} = this.state;
        const {stateChange} = this.props;
        for (const key in CascadeSearchValue) {
            CascadeSearchValue[key] = '';
        }
        this.setState({CascadeSearchValue},()=>{stateChange&&stateChange(this.state);})
    }
    //搜索区域开始搜索
    getPageData = (data)=>{
        const {searchArea,stateChange} = this.props;
        const {CascadeSearchValue} = this.state;
        let reqParams = !searchArea.isPagination?{
            pageSize:10,
            pageNo:1,
            ...CascadeSearchValue,
            ...searchArea.params
        }:{...CascadeSearchValue,...searchArea.params}
        if(data){
            reqParams = Object.assign(reqParams,data);
        }
        this.setState({loading:true})
        Service.queryInfoByUrl(searchArea.url,reqParams).then(res=>{
            this.setState({
                formData:res,loading:false
            },()=>{
                stateChange&&stateChange(this.state);
            })
        })
    }
    
    //页码改变
    pageChange = (page)=>{
        this.getPageData({
            pageSize:page.pageSize,
            pageNo:page.current,
        })
    }

    //transformKey和Key交换;
    SetTransformKey = (item)=>{
        let tran;
        tran = item.key;
        item.key = item.transformKey;
        item.transformKey = tran;
    }
    //多选事件
    onSelectRow =(rows)=>{
        const {stateChange} = this.props;
        this.setState({
            selectedRows:rows
        },()=>{
            stateChange&&stateChange(this.state);
        })
    }

    render() {
        const {searchArea,tableArea,children} = this.props;
        const {formData} = this.state;
        const _searchItems = JSON.parse(JSON.stringify(searchArea.searchItems));
        _searchItems.map(item=>{
            if(item.transformKey){
                this.SetTransformKey(item);
            }
        })
        searchArea.searchItems = _searchItems;
        return (
            <PageHeader>
                {
                    (!searchArea.isAllowHide && searchArea)&&(<Shell>
                        <CascadeSearch
                            {...searchArea}
                            changeValue={this.changeValue}
                            value={this.state.CascadeSearchValue}
                            config={searchArea.searchItems}/>
                            <div>
                            {/* style={{float:'right',paddingRight:'20px'}} */}
                                {
                                    searchArea.searchButtons?(
                                        searchArea.searchButtons.map(item=>{
                                            return item;
                                        })
                                    ):(
                                        <div style={{float:"right",margin:'0 20px 20px 0'}}>
                                            <ButtonDiy name="搜索" handleClick={this.getPageData}/>
                                            <Button onClick={this.resetCascadeSearch }>重置</Button>
                                        </div>
                                    )
                                }
                                
                            </div>
                    </Shell>)
                }
                <Shell>
                    {children&&(
                        <Row style={{
                            padding:'20px',paddingBottom:0
                        }}>{children}</Row>
                    )}
                    {
                        tableArea&&(
                            <StandardTable
                                {...tableArea}
                                loading={this.state.loading}
                                bordered = {tableArea.bordered}
                                rowKey={tableArea.rowKey||'id'}
                                data={!searchArea.isPagination?{
                                    list:formData?formData.rows:[],
                                    pagination:{
                                        pageSize:10,
                                        pageNo:1
                                    }
                                }:{pagination:null,list:searchArea.dataSource}}
                                selectedRows={this.state.selectedRows}
                                onChange={this.pageChange}
                                onSelectRow={this.onSelectRow}
                                columns={tableArea.columns}/>
                        )
                    }
                </Shell>
            </PageHeader>
        );
    }
 }
 
// stateChange:当本组件所有数据改变后都会向父组件传递当前组件内的数据
Scaffold.propTypes = {
    isPagination:PropTypes.bool
};
Scaffold.defaultProps = {
    isPagination:true,
    stateChange:()=>{
        
    }
};

  
 export default Scaffold;
