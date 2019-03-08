import react from 'react';
import Shell from '@/baseComponent/Shell';
import styles from './index.less';
import {
    Pagination ,List, Empty ,Row,Col
  } from 'antd';
const  matchReg =  function(str){
    let reg =/<\/?.+?\/?>/g;
    return str.replace(reg,'').replace(/&nbsp;/g, '');
};
  
const Vertical=(prop)=>{
    const props = prop.pass;
    const Height = props.Height || document.documentElement.clientHeight - 220;
    
    return (
        <Shell>
            <div style={{padding:'20px',height:(Height+'px') ,overflowY : 'auto'}}>
                {
                    props.data.rows.length>0?(
                        <List
                            itemLayout="horizontal"
                            dataSource={props.data.rows}
                            renderItem={item => (
                                <List.Item 
                                    actions={[
                                        <a onClick={()=>{
                                            props.handleClick(item);
                                        }}>详情</a>
                                    ]}>
                                    <List.Item.Meta
                                        avatar={
                                            <div style={{
                                                width:'50px',
                                                height:'50px',
                                                borderRadius:'50%',
                                                backgroundColor:'rgb(205,36,59)',
                                                color:'#fff',
                                                fontWeight:600,
                                                textAlign:'center',
                                                lineHeight:'50px',
                                                fontSize:'17px'
                                            }}>
                                                {item.id}
                                            </div>
                                        }
                                        title={<a href="javascript:void(0)" onClick={()=>{
                                            this.handleClick(item)
                                        }}>{item.title}</a>}
                                        description={
                                            <span
                                                dangerouslySetInnerHTML={{__html:item.content}}></span>
                                        }
                                    />
                                    <div>{item.publicPerson}&nbsp;{item.publicDate}</div>
                                </List.Item>
                            )}
                        />
                    ):(
                        <Empty/>
                    )
                }
            </div>
        </Shell>);
}
const Horizon=(prop)=>{
    const props = prop.pass;
    const Height = props.Height || document.documentElement.clientHeight - 220;
    return (
        <Row gutter={30} className={styles.horizonWrap}>
            {
                props.data.rows.length>0
                    ?(
                        props.data.rows.map((item,idx)=>{
                            const dateDay = new Date(item.publicDate).getDate();
                            const dateMonth = new Date(item.publicDate).getMonth()+1;
                            return (
                                <Col
                                    key={idx}
                                    onClick={()=> {
                                        props.handleClick(item)
                                    }}
                                    className={styles.item}
                                    xl={12}
                                    xxl={8}>
                                    <Row className={styles.itemInner}>
                                        <Col className={styles.left}>
                                            <span>{
                                                dateDay < 10 ?'0'+dateDay:dateDay
                                            }</span>
                                            <span>{
                                                dateMonth < 10 ?'0'+dateMonth:dateMonth
                                            }</span>
                                        </Col>
                                        <Col className={styles.right}>
                                            <p className={styles.title} title={item.title}>{item.title}</p>
                                            <p className={styles.content} 
                                                dangerouslySetInnerHTML={{__html:matchReg(item.content)}}>
                                                </p>
                                        </Col>
                                    </Row>
                                </Col>
                            );
                        })
                        
                    )
                    :(<Empty/>)
            }
        </Row>
    );
}
export default class NoticeList extends react.Component {
    constructor (props) {
        super(props)
        this.state = {
            test: '新闻公告列表',
        }
    }
    //componentDidMount
    componentDidMount(){

    }
    //render
    render(){
        const props = this.props;
        const type = props.type || 'vertical';//horizon
        return (
            <>
                {
                    type==='vertical'
                        ?<Vertical pass={props}/>
                        :<Horizon pass={props}/>
                }
                <div style={{marginTop:'60px',textAlign:'center'}}>
                    <Pagination 
                        onChange={(n,s)=>props.onChange({
                            pageNo:n,pageSize:s
                        })}
                        total={props.data.total} 
                        pageSize = {12}/>
                </div>
                
            </>    
        );
    }
}