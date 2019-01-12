

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

