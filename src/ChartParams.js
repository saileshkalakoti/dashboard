import React from "react";
export default class ChartParams extends React.Component {
    constructor(props){
        super(props)
    }

    renderDropdown( options, key ) {
        return options.map((item, k) => <option value = {item} key = {k} onClick={(e) => {console.log("pressed"); this.props.handleClick(e, key)}}>{item}</option>)
    }

    render() {
        return (
            <>
                <div className ="topic" onClick={(e) => this.props.handleClick(e, "topic")}>
                    Topic
                    <select>
                        {this.renderDropdown(this.props.listParams.topic)}
                    </select>
                </div>
                <div className ="sector" onClick={(e) => this.props.handleClick(e, "sector")}>
                    Sector
                    <select>
                        {this.renderDropdown(this.props.listParams.sector)}
                    </select>
                </div>
                <div className ="region" onClick={(e) => this.props.handleClick(e, "region")}>
                    Region
                    <select>
                        {this.renderDropdown(this.props.listParams.region)}
                    </select>
                </div>
                <div className ="pestle" onClick={(e) => this.props.handleClick(e, "pestle")}>
                    Pestle
                    <select>
                        {this.renderDropdown(this.props.listParams.pestle)}
                    </select>
                </div>
            </>
        )
    }
}