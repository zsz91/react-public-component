import moment from 'moment';

/**
 * 校验 开始时间必须在结束时间之前的函数
 * */
export function checkDate(endTime = '2019-01-01', startTime = '2018-12-31'){
    return moment(endTime).isAfter(moment(startTime));
}


/**
 * 去除字符串中的所有html 标签
 * */
export function matchReg(str){
  let reg =/<\/?.+?\/?>/g;
  return str.replace(reg,'').replace(/&nbsp;/g, ' ');
};





export function countSpecialField(filedSpanBig,nameSpanBig){
  let style = {};
  if(document.body.clientWidth > 1400) {
    if(filedSpanBig === 5){ // 当设置一行排列5个字段时 自定义宽度为20%
      style = {width: '20%'};
    }
    if(filedSpanBig === 1 && nameSpanBig === 2) {  // 当一行显示一个字段 然后名字又特别长时 使用这个width
      style = {width: '6%'};
    }
  }
  return style;
};


/**
 * 深拷贝函数
 * */
export  function deepCopy(obj, parent = null) {
  if(['boolean','string','number',].indexOf(typeof obj) > -1 || !obj){
    return obj;
  }
  let result;
  if (obj.constructor === Array) {
    result = [];
  } else {
    result = {};
  }
  let keys = Object.keys(obj),
    key = null,
    temp= null,
    _parent = parent;
  // 该字段有父级则需要追溯该字段的父级
  while (_parent) {
    // 如果该字段引用了它的父级则为循环引用
    if (_parent.originalParent === obj) {
      // 循环引用直接返回同级的新对象
      return _parent.currentParent;
    }
    _parent = _parent.parent;
  }
  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    temp= obj[key];
    // 如果字段的值也是一个对象
    if (temp && typeof temp=== 'object') {
      // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
      result[key] = deepCopy(temp, {
        originalParent: obj,
        currentParent: result,
        parent: parent
      });

    } else {
      result[key] = temp;
    }
  }
  return result;
}

/**
 * 获取表单元素中每个元素的值,
 * @param type
 * @param e
 * @param other
 * @returns {*|boolean}
 */
export function getFormElemValue(type, e, other) {
  let value = e;

  switch (type) {
    case 'input':
      value = e.target.value;
      break;
    case 'checkbox':
      value = e.target.checked;
      break;
    case 'textarea':
      value = e.target.value;
      break;
    case 'buttonUpload':
      value = e.url;
      break;
    default:
      break;
  }

  return value;
}

/**
 * 生成随机字符串
 * */
export function randomStr(){
 return Math.random().toString(36).substr(2);
}

export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      if(typeof JSON.parse(str) === 'number'){
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};
