import React from "react"
export const columns = [{
    Header: 'Title',
    minWidth: 300,
    accessor: 'title', // String-based value accessors!
  Cell: props =>{  return <div style = {{wordWrap:"break-word", whiteSpace:"pre-wrap", fontSize: "15px", lineHeight: "40px"}}><div><a href={props.original.url} target = "_blank" style ={{textDecoration: "none"}}>{props.value}</a></div></div> }// Custom cell components!
  }, {
    Header: 'Topic',
    accessor: 'topic',
    maxWidth: 120,
    Cell: props =>{  return <div style = {{wordWrap:"break-word", whiteSpace:"pre-wrap", fontSize: "15px", lineHeight: "40px"}}><div>{props.value.charAt(0).toUpperCase() + props.value.slice(1)}</div></div> }// Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Year',
    maxWidth: 90,
    accessor: 'start_year',
    // accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: 'Intensity',
    maxWidth: 80,
    accessor: 'intensity'
  }, {
    // Header: props => <span>Friend Age</span>, // Custom header components!
    Header: 'Sector',
    maxWidth: 120,
    accessor: 'sector',
    Cell: props =>{ return <div style = {{wordWrap:"break-word", whiteSpace:"pre-wrap", fontSize: "15px", lineHeight: "40px"}}><div>{props.value}</div></div> }// Custom cell components!
  
  }, {
    // Header: props => <span>Friend Age</span>, // Custom header components!
    Header: 'Region',
    maxWidth: 120,
    accessor: 'region',
    Cell: props =>{ return <div style = {{wordWrap:"break-word", whiteSpace:"pre-wrap", fontSize: "15px", lineHeight: "40px"}}><div>{props.value}</div></div> }// Custom cell components!
  
  }, {
    // Header: props => <span>Friend Age</span>, // Custom header components!
    Header: 'Pestle',
    maxWidth: 120,
    accessor: 'pestle',
    Cell: props =>{ return <div style = {{wordWrap:"break-word", whiteSpace:"pre-wrap", fontSize: "15px", lineHeight: "40px"}}><div>{props.value}</div></div> }// Custom cell components!
  }
]