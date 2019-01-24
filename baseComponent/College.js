import React , { Component } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import { Row, Col} from 'antd';
export default class College extends Component {
  constructor(props){
    super(props);
    this.state = {
      hoverChange:{},
      type:1,
      loading:true
    };
  }
  onMouseEnter = (key,bool) =>{
    let old = this.state.hoverChange;
    old[key] = bool;
    for(let item in old) {
      let oldX = old[item];
      oldX = item !== key ? !bool : oldX;
    }
    this.setState({
      hoverChange:old,
    })
  };
  componentDidMount(){
    let info = {};
    for(let item of this.props.config){
      info[item.key] = true;
    }
    this.setState({
      hoverChange: info,
    });
    /*setInterval(() =>{
      this.setState({
        loading:false
      })
    },500)*/
  }

  href = (e, info) => {
    e.stopPropagation();
    e.preventDefault();
    const { pigPath} = this.props;
    if(typeof info.style !== 'undefined' &&
       typeof info.style.width !== 'undefined' &&
       info.style.width === 400 ){
          window.open('http://yr.cdgmxy.com:89/yuren.html#/home');
    }else{
          window.location.href = `#/wenjianliebiao?path=${info.path}&id=${pigPath[info.path]}`;
    }
  };

  DoemContent = () => {
    const { config} = this.props;
    return config.map((item) => {
      return  (
        <Col key={item.key} >
          <Col span={item.length}
               style={item.style}

               onMouseEnter={()=>{this.onMouseEnter(item.key,false)}}
               onMouseLeave={()=>{this.onMouseEnter(item.key,true)}}>
            <a  onClick={(e)=>{this.href(e, item)}}>
              {/* <object data={item.type === 1 ? item.pinName : this.state.hoverChange[item.key] ? item.pinName : item.pinNameChange}
                      width={item.width}
                      height={item.height}
                      type="image/svg+xml">
              </object> */}
              {/* 1111 */}
              <img src={item.type === 1 ? item.pinName : this.state.hoverChange[item.key] ? item.pinName : item.pinNameChange}
                    width={item.width}
                    alt=''
                    height={item.height}/>
            </a>
          </Col>
        </Col>

        // /*object 必须开闭合标签*/
      )
    })


  };

  render(){
    const {title} = this.props;
    const dom =  this.DoemContent()
    return(
      <div>
        <div style={{paddingTop:24,padding:'24px 224px 117px',overflow:'hidden'}} >
          <div className={styles.collegeTitle} >{title}</div>
          {/* <Spin spinning={this.state.loading}
                style={{paddingLeft: '48%',
                  paddingTop: '21%'}}
                size={'large'}>
          </Spin> */}
          <Row>
            {dom}
          </Row>
        </div>

      </div>
    )
  }
}

College.propTypes = {
  config: PropTypes.array,
};
College.defaultProps = {
  title:'',
  config:[
    // {
    //     pinName:changBefor,
    //     pinNameChange:changeAfter,
    //     length:2,
    //     key:'1',
    //     type:1,
    //     className:'',
    //     Link:''
    // },
  ],
};
