import ReactTable from 'react-table'
import React from "react";
import 'react-table/react-table.css'
import tableData from "./../assets/jsondata.json"

import {columns} from "../utils/constant"
export default class Tab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchQuery: props.searchQuery,
      tableData: tableData,
    }
  }

  static getDerivedStateFromProps(props, state){
    return {
      searchQuery: props.searchQuery
    }
  }

  updateSearchQuery = async (e) => {
    const value = e.target.value;
    await this.setState({searchQuery: value})
    this.props.handleSearch(value)
    this.updateTableData();
  }

  updateTableData = () => {
    const searchData = this.state.searchQuery;
    const currentData = tableData
    const updatedData = currentData.filter( item => {
      const itemValue = Object.values(item).join();
      if(itemValue.includes(searchData))
        return true;
      else 
        return false;
    })
    console.log(updatedData)
    this.setState({ tableData: updatedData})
  }

  render() {

 
  const columnData = columns
 
  return (
    <>
    <div style ={{display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>Search: <input value={this.state.searchQuery} onChange = {(e) => {this.updateSearchQuery(e)}}/></div>
    <div style ={{margin: "20px", backgroundColor:"white"}}><ReactTable
      className="-striped -highlight"
      defaultPageSize = {10}
      data={this.state.tableData}
      columns={columnData}
    />
    </div>
    </>
  )
}
}