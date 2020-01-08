import React from "react";
import {titleCase, getCardInfo} from "../utils/utils"
export default class NodeCard extends React.Component{

    render(){
        let item = this.props.data;
        const isGrid = this.props.isGrid
        if(isGrid) {
            item = getCardInfo(item)
        }
        const showDefaultScreen = item.topic ? false : true;
        if(showDefaultScreen)
        {
            return <div className="box"><h2 style ={{fontFamily: "'Karla', sans-serif"}}>Click on a node</h2></div>
        } 
        
        return (
            <>
                <div className = "box-container">
                    <div className = "text" style ={{fontSize:"15px", color: "#ff8acc", fontFamily: "'Karla', sans-serif", margin: "10px 0"}}><h4>{titleCase(item.topic)}</h4></div>
                    <h5 style ={{color: "#505458", fontFamily: "'Karla', sans-serif", fontSize:"12px", display:"flex", justifyContent:"space-between"}} >
                        <span>{item.intensity}</span> | 
                        <span>{item.relevance}</span> | 
                        <span>{item.likelihood}</span> 
                        {item.year ? <span>| {item.year}</span> :""}
                    </h5>
                    <a href={item.url} target="_blank" style = {{textDecoration: "none"}}>
                        <p className ="para">{item.title}</p>
                    </a>
                    <div style ={{float:"right", cursor: "pointer", paddingBottom:"5px"}} onClick ={()=>this.props.handleSearch(item.topic)} value ={item.topic}>...more</div>
                </div>
            </>
        )
    }
}