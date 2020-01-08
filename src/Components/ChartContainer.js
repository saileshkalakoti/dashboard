import React from 'react';
import RadarChart from "../utils/React_Chart"
import '../style/App.css';
import * as d3 from "d3"
import "../style/React_Chart.css"

var w = 500,
	h = 500;

var colorscale = d3.scale.category10();
class ChartContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data : [[]],
      LegendOptions:[],
    }
    this.chartRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state){
    return {
      data: props.data,
      LegendOptions: props.measures,
    }
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
  RadarChart.draw(myChartRef, this.state.data, cfg, this.props.onClick);
  
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
.text("Colours");
  
//Initiate Legend	
var legend = svg.append("g")
.attr("class", "legend")
.attr("height", 100)
.attr("width", 200)
.attr('transform', 'translate(90,20)') 
;
//Create colour squares
legend.selectAll('rect')
  .data(this.state.LegendOptions)
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
  .data(this.state.LegendOptions)
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
        <div id="myChart" style = {{backgroundColor:"white"}} ref={this.chartRef}/>
    );
  }
}

export default ChartContainer;
