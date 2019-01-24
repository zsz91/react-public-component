import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import pdfFile from '../assets/2.pdf';
import styles from './index.less';
export default class FilePrivew extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    ;
  }
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  };

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  };

  pageChange = (page, pages) => {
    return (
      <p style={{textAlign:'center',}}
         className={styles.pageChange}
      >
        {page === 1 ? null :
          <span onClick={this.handlePrevious}>
            上一页 　　　
          </span>}
        {page === pages ? null:  <span onClick={this.handleNext}>
          下一页
        </span> }
      </p>
    )
  };

  render(){
    let pageChange = null;
    if (this.state.pages) {
      pageChange = this.pageChange(this.state.page, this.state.pages);
    }
    return (
      <div className={styles.Files}>
        <PDF
          file={pdfFile}
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        {pageChange}
      </div>
    )
  }
}



