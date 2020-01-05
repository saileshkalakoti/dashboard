import React from "react";
import App from "./App"
import ChartParams from "./ChartParams"
import jsonData from "./jsondata.json"
// console.log(jsonData) 
import formatData, {getUniqueList, filterByTag} from "./utils/utils"
const initialData = ["relevance"].map( measure => formatData(jsonData, measure));
// console.log(initialData)
export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            measures:["relevance"],
            selectedParams : {
                topic:"",
                sector:"",
                region:"",
                pestle:"",
            },
            listParams : {
                topic: getUniqueList('topic'),
                sector: getUniqueList('sector'),
                region: getUniqueList('region'),
                pestle: getUniqueList('pestle'),
            },
            currentData: [new Array()]
        }
    }

    componentDidMount(){
        this.setState({
            currentData: initialData
        })
    }

    handleChangeValue = async (e, key) =>{
        e.persist();
        await this.setState((prevState) => {
            return {
                ...prevState,
                selectedParams: {
                    ...prevState.selectedParams,
                    [key]: e.target.value
                }
            }
        })
        console.log('state is ', this.state.selectedParams)
        this.searchResults();
    }

    handleMeasures = async (e) => {
        e.persist();
        let measures = [...this.state.measures]
        if(e.target.checked){
            measures.push(e.target.value);
        } else {
            measures = measures.filter( item => item != e.target.value)
        }

        await this.setState((prevState) => {
            return {
                ...prevState,
                    measures: measures
            }
        })
        this.searchResults();
    }

    searchResults = () => {
        const completeData = [...jsonData]
        const selectedParams = { ...this.state.selectedParams};
        let dataAfterTag = selectedParams.topic.length > 0 ? filterByTag(completeData, "topic", selectedParams.topic) : completeData;
        console.log("all data", dataAfterTag)
        dataAfterTag = selectedParams.sector.length > 0 ? filterByTag(dataAfterTag, "sector", selectedParams.sector) : dataAfterTag;
        dataAfterTag = selectedParams.region.length > 0 ? filterByTag(dataAfterTag, "region", selectedParams.region) : dataAfterTag;
        const measures = [...this.state.measures]
        console.log("reached here")
        const finalData = measures.map( measure => formatData(dataAfterTag, measure))
        this.setState({currentData: finalData})
    }

    isChecked = (item) => {
        if(this.state.measures.includes(item))
            return true;
        return false
    }

    render(){
        // console.log(this.state.listParams.topic)
        return(<>
        <div className = "chart"><App data = {this.state.currentData}/></div>
        <div className = "measures">
            <input type="checkbox" value = "relevance" checked={this.isChecked("relevance")} onChange = {(e) => {this.handleMeasures(e)}}/>Relevance
            <input type="checkbox" value = "likelihood" checked={this.isChecked("likelihood")} onChange = {(e) => {this.handleMeasures(e)}}/>Likelihood
            <input type="checkbox" value = "intensity" checked={this.isChecked("intensity")} onChange = {(e) => {this.handleMeasures(e)}}/>Intensity
        </div>
        <div className = "chartParams"><ChartParams listParams = {this.state.listParams} handleClick = {(e, key) => this.handleChangeValue(e, key)}/></div>
        </>)
    }
}