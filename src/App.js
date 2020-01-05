import React from 'react';
import RadarChart from "./utils/React_Chart"
import './App.css';
import * as d3 from "d3"
import "./utils/React_Chart.css"

var LegendOptions = ['Smartphone','Tablet'];
var w = 500,
	h = 500;

var colorscale = d3.scale.category10();
var data = [
  [
  {axis:"Email",value:0.59},
  {axis:"Social Networks",value:0.56},
  {axis:"Internet Banking",value:0.42},
  {axis:"News Sportsites",value:0.34},
  {axis:"Search Engine",value:0.48},
  {axis:"View Shopping sites",value:0.14},
  {axis:"Paying Online",value:0.11},
  {axis:"Buy Online",value:0.05},
  {axis:"Stream Music",value:0.07},
  {axis:"Online Gaming",value:0.12},
  {axis:"Navigation",value:0.27},
  {axis:"App connected to TV program",value:0.03},
  {axis:"Offline Gaming",value:0.12},
  {axis:"Photo Video",value:0.4},
  {axis:"Reading",value:0.03},
  {axis:"Listen Music",value:0.22},
  {axis:"Watch TV",value:0.03},
  {axis:"TV Movies Streaming",value:0.03},
  {axis:"Listen Radio",value:0.07},
  {axis:"Sending Money",value:0.18},
  {axis:"Other",value:0.07},
  {axis:"Use less Once week",value:0.08}
  ],
  [
    {axis:"Email",value:0.59},
    {axis:"Social Networks",value:0.56},
    {axis:"Internet Banking",value:0.42},
    {axis:"News Sportsites",value:0.34},
    {axis:"Search Engine",value:0.48},
    {axis:"View Shopping sites",value:0.14},
    {axis:"Paying Online",value:0.11},
    {axis:"Buy Online",value:0.05},
    {axis:"Stream Music",value:0.07},
    {axis:"Online Gaming",value:0.12},
    {axis:"Navigation",value:0.27},
    {axis:"App connected to TV program",value:0.03},
    {axis:"Offline Gaming",value:0.12},
    {axis:"Photo Video",value:0.4},
    {axis:"Reading",value:0.03},
    {axis:"Listen Music",value:0.22},
    {axis:"Watch TV",value:0.03},
    {axis:"TV Movies Streaming",value:0.03},
    {axis:"Listen Radio",value:0.07},
    {axis:"Sending Money",value:0.18},
    {axis:"Other",value:0.07},
    {axis:"Use less Once week",value:0.08}
    ]
];

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data : [[]]
    }
    this.chartRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state){
    return {
      data: props.data
    }
  }

componentDidMount(){

}

renderChart(){

 
  var cfg = {
    w: 400,
    h: 400,
    maxValue: 0.6,
    levels: 6,
    ExtraWidthX: 300
  }

  const myChartRef = this.chartRef.current;
  console.log(data)
  console.log(this.state.data)
  RadarChart.draw(myChartRef, this.state.data, cfg);
  
var svg = d3.select(myChartRef)
.selectAll('svg')
.append('svg')
.attr("width", w+300)
.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
.attr("class", "title")
.attr('transform', 'translate(90,0)') 
.attr("x", w - 70)
.attr("y", 10)
.attr("font-size", "12px")
.attr("fill", "#404040")
.text("What % of owners use a specific service in a week");
  
//Initiate Legend	
var legend = svg.append("g")
.attr("class", "legend")
.attr("height", 100)
.attr("width", 200)
.attr('transform', 'translate(90,20)') 
;
//Create colour squares
legend.selectAll('rect')
  .data(LegendOptions)
  .enter()
  .append("rect")
  .attr("x", w - 65)
  .attr("y", function(d, i){ return i * 20;})
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function(d, i){ return colorscale(i);})
  ;
//Create text next to squares
legend.selectAll('text')
  .data(LegendOptions)
  .enter()
  .append("text")
  .attr("x", w - 52)
  .attr("y", function(d, i){ return i * 20 + 9;})
  .attr("font-size", "11px")
  .attr("fill", "#737373")
  .text(function(d) { return d; })
  ;	
}
  render() {
    this.renderChart();
    return (
      <div className="App">
    <div id="myChart" ref={this.chartRef}>

    </div>
        
      </div>
    );
  }
}

export default App;
