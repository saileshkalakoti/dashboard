import React from "react";
import ChartContainer from "./Components/ChartContainer"
import Grid from "./Components/Grid"
import ChartParams from "./Components/ChartParams"
import Tab from "./Components/Table"
import NodeCard from "./Components/NodeCard"
import jsonData from "./assets/jsondata.json"
import formatData, {getUniqueList, filterByTag, computeResult, getNodeData} from "./utils/utils"
const initialData = (["relevance"].map( measure => formatData(jsonData, measure, "topic")));
const allGridData = formatData(jsonData, "intensity", "topic");
allGridData.sort((a, b) => parseInt(a.graphData.value) < parseInt(b.graphData.value) ? 1 : -1);
const clippedGridData = allGridData.slice(0, 10);
const gridData = computeResult(clippedGridData)

console.log(initialData)
export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            measures:["relevance"],
            axis: "topic",
            searchQuery: "",
            selectedParams : {
                topic:"All",
                sector:"All",
                region:"All",
                pestle:"All",
            },
            listParams : {
                topic: getUniqueList('topic'),
                sector: getUniqueList('sector'),
                region: getUniqueList('region'),
                pestle: getUniqueList('pestle'),
            },
            currentData: [[]],
            gridData : gridData,
            nodeData: {},
        }
    }

    componentDidMount(){
        this.setState({
            currentData: [initialData[0].map(item => item.graphData)],
            gridResult: initialData[0].map(item => item.compleObj)
        })
    }

    handleChangeValue = async (e, key) =>{
        e.persist();

        if(e.target.type === 'radio'){
            await this.setState({ axis: e.target.value})
            this.searchResults();
            return ; 
        }
        await this.setState((prevState) => {
            return {
                ...prevState,
                selectedParams: {
                    ...prevState.selectedParams,
                    [key]: e.target.value
                }
            }
        })
        this.searchResults();
    }

    handleMeasures = async (e) => {
        e.persist();
        let measures = [...this.state.measures]
        if(e.target.checked){
            measures.push(e.target.value);
        } else {
            measures = measures.filter( item => item !== e.target.value)
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
        let dataAfterTag = selectedParams.topic !== "All" ? filterByTag(completeData, "topic", selectedParams.topic) : completeData;
        dataAfterTag = selectedParams.sector !== "All" ? filterByTag(dataAfterTag, "sector", selectedParams.sector) : dataAfterTag;
        dataAfterTag = selectedParams.region !== "All" ? filterByTag(dataAfterTag, "region", selectedParams.region) : dataAfterTag;
        const measures = [...this.state.measures]
        const dashboardData = measures.map( measure => formatData(dataAfterTag, measure, this.state.axis))
        const allGridData = formatData(dataAfterTag, "intensity", this.state.axis);
        allGridData.sort((a, b) => parseInt(a.graphData.value) < parseInt(b.graphData.value) ? 1 : -1);
        const clippedGridData = allGridData.slice(0, 10);
        const gridData = computeResult(clippedGridData)
        const finalData = dashboardData.map(item => item.map( item => item.graphData));
        if(finalData.length === 0)
            return
        let isEmpty = true;
        finalData.forEach(item => {
            isEmpty *= item.length === 0 ? true : false;
        })
        if (isEmpty ) return 
        this.setState({currentData: finalData, gridData: gridData})
    }

    isChecked = (item) => {
        if(this.state.measures.includes(item))
            return true;
        return false
    }

    handleSearch = (topic) => {
        this.setState({searchQuery: topic})
        var elmnt = document.getElementById("table");
        elmnt.scrollIntoView(); 
    }

    onClickHandler = (topic) => {
        const nodeData = getNodeData(topic)
        this.setState({nodeData: nodeData})
    }

    render(){
        return(<>
        <div className ="container" style = {{width: "90%", display: "flex", justifyContent:"space-between", marginLeft:"10px"}}>
            <div className = "chart" style ={{width:"60%"}}><ChartContainer data = {this.state.currentData} measures = {this.state.measures} onClick = {(topic) => this.onClickHandler(topic)}/></div>
            
            <div className = "filters" style = {{width: "30%"}}>

                <div className = "nodeData" style={{width: "100%", marginTop: "80px", minHeight: "200px"}}><NodeCard data = {this.state.nodeData} isGrid = {true} handleSearch = {(value) => this.handleSearch(value)}/></div>
                
                <div style = {{display:"flex", justifyContent: "space-between", marginTop:"20px"}}>
                    
                    <div className = "chartParams"><ChartParams listParams = {this.state.listParams} handleClick = {(e, key) => this.handleChangeValue(e, key)}/></div>
                    <div className = "measures">
                        <h3>Measures</h3>
                        <input type="checkbox" value = "relevance" checked={this.isChecked("relevance")} onChange = {(e) => {this.handleMeasures(e)}}/>     Relevance<br/>
                        <input type="checkbox" value = "likelihood" checked={this.isChecked("likelihood")} onChange = {(e) => {this.handleMeasures(e)}}/>       Likelihood<br/>
                        <input type="checkbox" value = "intensity" checked={this.isChecked("intensity")} onChange = {(e) => {this.handleMeasures(e)}}/>     Intensity<br/>
                    </div>
                </div>
            </div>
        </div>
            <div className = "grid" style={{marginTop:"30px", padding:"10px 10px 10px 10px"}}><Grid gridData = {this.state.gridData}/></div>
        <div id = "table" style={{paddingTop:"40px"}}><Tab searchQuery ={this.state.searchQuery} handleSearch = {(value) => this.handleSearch(value)}/></div>
        </>)
    }
}