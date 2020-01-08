import React from "react";
export default class ChartParams extends React.Component {
    
    renderDropdown( options, key ) {
        return options.map((item, k) => <option value = {item} key = {k}>{item}</option>)
    }

    render() {
        return (
            <>
                <div className ="topic">
                <input type = "radio" name = "radioId" value = "topic" onClick={(e) => this.props.handleClick(e, "topic")}/>Topic<br/>
                    <select onClick={(e) => this.props.handleClick(e, "topic")} style = {{minWidth: "200px"}}>
                        {this.renderDropdown(this.props.listParams.topic, "topic")}
                    </select>
                </div>
                <div className ="sector" style = {{minWidth: "200px"}}>
                <input type = "radio" name = "radioId" value = "sector" onClick={(e) => this.props.handleClick(e, "sector")}/>Sector<br/>
                    <select onClick={(e) => this.props.handleClick(e, "sector")} style = {{minWidth: "200px"}}>
                        {this.renderDropdown(this.props.listParams.sector)}
                    </select>
                </div>
                <div className ="region" style = {{minWidth: "200px"}}>
                <input type = "radio" name = "radioId" value = "region" onClick={(e) => this.props.handleClick(e, "region")}/>Region<br/>
                    <select onClick={(e) => this.props.handleClick(e, "region")} style = {{minWidth: "200px"}}>
                        {this.renderDropdown(this.props.listParams.region)}
                    </select>
                </div>
                <div className ="pestle" style = {{minWidth: "200px"}}>
                <input type = "radio" name = "radioId" value = "pestle" onClick={(e) => this.props.handleClick(e, "pestle")}/>Pestle<br/>
                    <select onClick={(e) => this.props.handleClick(e, "pestle")} style = {{minWidth: "200px"}}>
                        {this.renderDropdown(this.props.listParams.pestle)}
                    </select>
                </div>
            </>
        )
    }
}