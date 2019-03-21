/**
 * 2019年2月18日
 * 钟是志
 * 调接口的地方
 * */

import request from '@/utils/request';
import React , { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import config from '@/config/config';
import { getToken } from '@/utils/authority';
import fetch from 'dva/fetch';
import FormdataWrapper from '@/utils/object-to-formdata-custom';
import { notification } from 'antd';
import { randomStr } from '../baseComponent/utils';
const apiUrl =  `${config.mockServer}/${config.gateWayUrl.zydxg}`;


/**
 *
 */
export function getInfo(data,url) {
  return request(`${apiUrl}/${url}`,
    {
      method: 'POST',
      body: data,
    }
  );
}

export function addOrUpdate(data,url) {
  return request(`${apiUrl}/${url}`,
    {
      method: 'POST',
      body: data,
    }
  );
}

export function deleteData(data, url) {
  return request(`${apiUrl}/${url}`,
    {
      method: 'POST',
      body: data,
    }
  );
}

export function hrefWithToken(url){
  if(url.indexOf('?') > -1){
    url = `${url}&token=${getToken()}`;
  }else{
    url = `${url}?token=${getToken()}`;
  }
  window.open(`${apiUrl}${url}`);
}

export function downLoadFileByFetch(data,url,fileName) {
  fetch(`${apiUrl}${url}?token=${getToken()}`,{
    method: 'POST',
    mode: "no-cors",
    body: FormdataWrapper(data),
  }).then(res => {
    console.log(res.blob());
    return res.blob();
    if (res.status !== 200) {
      return res.json();
    }else {
      return res.blob();
    }
  }).then(data => {
    if (data instanceof Blob) {
      let a = document.createElement('a');
      let url2 = window.URL.createObjectURL(data);
      let filename = `${fileName}`;
      a.href = url2;
      a.download = filename;
      a.click();
    //  window.URL.revokeObjectURL(url);
      a = null;
    } else {
      notification.error({
        message: `文件导出错误`,
        description: data.errMsg,
      });
    }

  }).catch(err=>{
    notification.error({
      message: `网络请求超时`,
    });
  });
}

export function joinUrl(url){
  return `${apiUrl}${url}&token=${getToken()}`
}

/**
 * 查询出用户个人信息
 * */
export function getMyInfo() {
  return request(`${apiUrl}/UserApi/getMy`,
    {
      method: 'POST',
      body: {},
    }
  );
}

/**
 *
 * 通过模拟表单提交 下载文件
 * */
export function formPostFile(url, data){
  let dom = [];
  let i = 0;
  let id = 'downloadDiv' + randomStr();
  ((id)=>{
    let rootDom = document.getElementById('root');
    let divEle = document.createElement("div");
    divEle.setAttribute('id', id);
    divEle.style.display = 'none';
    rootDom.appendChild(divEle);
    setTimeout('console.log("")',500);
  })(id);

  let divElement = document.getElementById(id);
  if(!divElement){
    return false;
  }
  for(let item in data){
      i++;
      const value = data[item];
      dom.push(
        <input name={item}
               type="text"
               key={item + i}
               readOnly={true}
               value={value}/>
      )
  }
  ReactDOM.render(
    <form action={`${apiUrl}${url}?token=${getToken()}`}
          method="post"
          target="_blank">
      {dom}
    </form>,
    divElement,
  );

  ReactDOM.findDOMNode(divElement).querySelector('form').submit();
  ReactDOM.unmountComponentAtNode(divElement);
}
