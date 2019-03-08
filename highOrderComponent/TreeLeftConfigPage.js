import React, { Component, Fragment } from 'react';
import {
  Tree,
  Row,
  Col,
} from 'antd';
import propTypes from 'prop-types';
import * as service from './Service';
import styles from './TreeLeftConfigPage.less';

const { TreeNode, DirectoryTree } = Tree;

export default class TreeLeftConfigPage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      treeNodes: this.props.treeNodes || [],
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
  }

  getTreeNodes = () => {
    service.getInfo({}, this.props.url)
      .then(res=>{
        if (res) {
          this.setState({
            treeNodes: res,
          })
        }
      })
  };

  componentDidMount() {
    if (this.props.url) this.getTreeNodes();
  }

  renderTreeNodes = data => data.map((item) => {
    const { childName, nodeKeyName, nodeTitleName } = this.props;

    if (item[childName]) {
      return (
        <TreeNode title={item[nodeTitleName]} key={item[nodeKeyName]}>
          {this.renderTreeNodes(item[childName])}
        </TreeNode>
      );
    }
    return <TreeNode {...item} key={item[nodeKeyName]} />;
  });

  render() {
    const { treeLayout } = this.props;
    const { treeNodes } = this.state;
    const contentLayout = {};

    for (let key in treeLayout) {
      contentLayout[key] = 24 - treeLayout[key];
    }

    return (
      <Row>
        <Col {...treeLayout}>
          <DirectoryTree defaultExpandedKeys={['1']}
                         showIcon={false}
                         onSelect={(selectedKeys, e)=>{
                           this.props.onSelect(selectedKeys, e);
                         }}
                         className={styles['custom-tree']}
          >
            { this.renderTreeNodes(treeNodes) }
          </DirectoryTree>
        </Col>
        <Col {...contentLayout} className={styles.content}>
          { this.props.children }
        </Col>
      </Row>
    );
  }

}

TreeLeftConfigPage.propTypes = {
  url: propTypes.string,      // 请求 tree 节点url，如果存在以url返回节点为准,
  nodeKeyName: propTypes.string,  // tree key 字段键名
  nodeTitleName: propTypes.string, // tree tittle 字段键名
  childName: propTypes.string,  // tree 存储后代的 字段键名
  treeLayout: propTypes.object, // tree layout布局样式
  treeNodes: propTypes.array, // tree 节点
  onSelect: propTypes.func, // 选中节点后的操作
};

TreeLeftConfigPage.defaultProps = {
  url:'',
  nodeKeyName: 'key',
  nodeTitleName: 'title',
  childName: 'children',
  treeLayout: {
    xl: 6,
    xxl: 4,
  },
  treeNodes: [
    {
      key: '1',
      title: '根节点',
      children: [
        { key: '1-1', title: '奖学金' },
        { key: '1-2', title: '助学金' },
        { key: '1-3', title: '集体评优' },
        {
          key: '1-4',
          title: '优秀毕业生',
          children: [
            { key: '1-4-1', title: '校级优秀毕业生' },
            { key: '1-4-2', title: '省级优秀毕业生' },
          ]
        },
      ]
    },

  ],
  onSelect: (selectedKeys, {selected, selectedNodes, node, event})=>{

  }
};
