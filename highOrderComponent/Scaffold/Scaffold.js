/*
 * @Description: 页面脚手架
 * @Author: 袁永华
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-09 10:03:29
 * @LastEditTime: 2019-03-12 19:21:08
 */

import React from 'react';
import ButtonDiy from '@/baseComponent/ButtonDiy';
import {Button,Row} from 'antd';
import Shell from '@/baseComponent/Shell';
import PageHeader from '@/components/PageHeaderWrapper';
import CascadeSearch from '@/baseComponent/CascadeSearch/CascadeUpdate';
import * as Service from './Service';
import StandardTable from '@/components/StandardTable/index';
import BlockTitle from '@/baseComponent/BlockTitle';


const HOC = options => InnerComponent => class extends InnerComponent {

    componentWillMount() {
        //页面值初始化
        this.stateInit();
    }
    //页面值初始化
    stateInit = ()=>{
        const _options = options?options:null;
        let state = {
            searchArea:_options
                ?_options.searchArea
                ?_options.searchArea(this)
                :null
                :null,
            tableArea:_options
                ?_options.tableArea
                ?_options.tableArea(this)
                :null
                :null,
            CascadeSearchValue:{},//搜索框的值
            selectedRows:[],//多选得到的值
            tableData:null,//获取到的值
            loading:false,//表格的loading
        };
        state = Object.assign(this.state?this.state:{},state)
        this.setState({
            ...state
        })
    }

    //搜索条件改变
    changeValue = (v,k)=>{
        let {CascadeSearchValue,searchArea} = this.state;
        //处理transformKey逻辑
        const $item = searchArea.searchItems.find(item=>{
            return item.transformKey === k;
        })
        if($item){
            CascadeSearchValue[$item.key] = v;
        }
        CascadeSearchValue[k] = v;
        //--------------
        this.setState({CascadeSearchValue});
    }

    //重置搜索条件
    resetCascadeSearch = (v,k)=>{
        let {CascadeSearchValue} = this.state;
        for (const key in CascadeSearchValue) {
            CascadeSearchValue[key] = '';
        }
        this.setState({CascadeSearchValue})
    }
    //搜索区域开始搜索
    getPageData = (data,fn)=>{
        const {CascadeSearchValue,searchArea,getPageDataThen} = this.state;
        let reqParams = !searchArea.noPagination?{
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
            if(res){
                if(fn){
                    fn(res);
                    this.setState({getPageDataThen:fn});
                }else{
                    if(getPageDataThen){
                        getPageDataThen(res);
                    }else{
                        this.setState({tableData:res,loading:false,selectedRows:[]});
                    }
                }
            }
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
        this.setState({
            selectedRows:rows
        })
    }

    render() {
        const {tableData,searchArea,tableArea} = this.state;
        const _searchItems = searchArea?JSON.parse(JSON.stringify(searchArea.searchItems)):null;
        const superRender = super.render();

        if(_searchItems) {
            _searchItems.map(item=>{
                if(item.transformKey){
                    this.SetTransformKey(item);
                }
            })
            searchArea.searchItems = _searchItems;
        }
        return (
            <PageHeader>
                {
                    (searchArea &&!searchArea.isHide && !searchArea.searchAreaRender)&&(<Shell>
                        {
                            searchArea.title&&(
                                <BlockTitle
                                    title={searchArea.title.text||'搜索信息'} 
                                    isSmall={true}
                                    dom={searchArea.title.dom||''} 
                                    icon={searchArea.title.icon||`file-text`}/>
                            )
                        }
                        <CascadeSearch
                            fileSpan={{small:4,big:4}}
                            {...searchArea}
                            changeValue={this.changeValue}
                            value={this.state.CascadeSearchValue}
                            config={searchArea.searchItems}/>
                            <div>
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
                {
                     searchArea&&searchArea.searchAreaRender&&(
                        <div>
                            {searchArea.searchAreaRender(this.state)}
                        </div>
                    )
                }
                {
                    tableArea&&(
                        <>
                            <Shell>
                                {
                                    tableArea.title&&(
                                        <BlockTitle
                                            title={tableArea.title.text||'表格信息'} 
                                            isSmall={true}
                                            dom={tableArea.title.dom||''} 
                                            icon={tableArea.title.icon||`file-text`}/>
                                    )
                                }
                                <Row style={{
                                        padding:'20px 20px 0 20px'
                                    }}>
                                    {superRender}
                                </Row>
                                <StandardTable
                                    {...tableArea}
                                    loading={this.state.loading}
                                    bordered = {tableArea.bordered}
                                    rowKey={tableArea.rowKey||'id'}
                                    data={!searchArea||!searchArea.noPagination
                                        ?{
                                        list:tableData?tableData.rows:[],
                                        pagination:{
                                            pageSize:10,
                                            pageNo:1,
                                            total:tableData?tableData.total:0
                                        }
                                    }
                                    :{
                                        pagination:null,
                                        list:tableData?tableData:[]}
                                    }
                                    selectedRows={this.state.selectedRows}
                                    onChange={this.pageChange}
                                    onSelectRow={this.onSelectRow}
                                    columns={tableArea.columns}/>
                            </Shell>
                            <div>
                                {
                                    tableArea.addContent?tableArea.addContent():null
                                }
                            </div>
                        </>
                    )
                }
                {
                    !tableArea && (
                        <Shell> 
                            <Row style={{
                                padding:'0 20px',paddingBottom:0
                            }}>
                                {superRender}
                            </Row>
                        </Shell>
                    )
                }
            </PageHeader>
        );
    }
}

export default HOC;
  

