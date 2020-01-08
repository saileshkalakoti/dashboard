import React from "react"
import '../style/Grid.css'
import {titleCase} from "../utils/utils"
export default class Grid extends React.Component {
    renderGridItem = () => {
        return this.props.gridData.map( item => {
            return (
                <a href={item.url} target="_blank" style = {{textDecoration: "none"}}>
                    <div className = "box">
                    <div className = "text" style ={{fontSize:"15px", color: "#ff8acc", fontFamily: "'Karla', sans-serif", margin: "10px 0"}}><h4>{titleCase(item.topic)}</h4></div>
                    <h5 style ={{color: "#505458", fontFamily: "'Karla', sans-serif", fontSize:"12px", display:"flex", justifyContent:"space-between"}} >
                        <span>{item.intensity}</span> | 
                        <span>{item.relevance}</span> | 
                        <span>{item.likelihood}</span> 
                        {item.year ? <span>| {item.year}</span> :""}
                    </h5>
                </div>
                    </a>
            )
        })
    }
    render() {
        return (
                <div className = "wrapper">
                    {this.renderGridItem()}
                </div>
        )
    }
}