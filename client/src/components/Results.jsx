import React, {Component} from 'react';
import SwitchSelector from "react-switch-selector";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Results extends Component{
    render(){
        const selectorOptions = [
            {
                label: "Combined Score",
                value: "Combined",
                selectedBackgroundColor: "#0097e6",
            },
            {
                label: "Historical Score",
                value: "Historical",
                selectedBackgroundColor: "#fbc531"
            },
            {
                label: "Contemporary Score",
                value: "Contemporary",
                selectedBackgroundColor: "#FF0000"
            }
	    ];
        const onChange = (newValue) => {
            this.setState({chartSelectorState: newValue});
            console.log(this.state.chartSelectorState);
        };
	 
	    const initialSelectedIndex = selectorOptions.findIndex(({value}) => value === "Combined");
        var chart1Options = {
            animationEnabled: true,
            theme: "light2",
            title: {text: "Your Results"},
            axisX: {title: "Category",reversed:true},
            axisY: {title: "Score",includeZero:true,labelFormatter:this.addSymbols, interval:5},
            toolTip: {shared: true},
            data:[
            {
                type:"bar",
                name: "Total score",
                toolTipContent: "<b>{label}</b> <br> <span style= color: #4F81BC>{name}</span>: {y}",
                dataPoints:[
                    {y:(this.state.section_scores[0] + this.state.section_scores[1]), label: "Section 1", color: "#f3a4a8"},
                    {y:(this.state.section_scores[2] + this.state.section_scores[3]), label: "Section 2"},
                    {y:(this.state.section_scores[4] + this.state.section_scores[5]), label: "Section 3"},
                    {y:(this.state.section_scores[6] + this.state.section_scores[7]), label: "Section 4"},
                    {y:(this.state.section_scores[8] + this.state.section_scores[9]), label: "Section 5"},
                    {y:this.state.section_scores[10], label: "Total"}
                ]
            },
            {
                type: "error",
                name: "Ideal range",
                toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
                dataPoints:[
                    {y:[(7),(11)], label: "Section 1"},
                    {y:[(13),(15)], label: "Section 2"},
                    {y:[(20),(26)], label: "Section 3"},
                    {y:[(7),(11)], label: "Section 4"},
                    {y:[(13),(15)], label: "Section 5"},
                    {y:[(20),(26)], label: "Total"}   
                ]
            }]
        };
        var chart2Options = {
            animationEnabled: true,
            theme: "light2",
            title: {text: "Your Results"},
            axisX: {title: "Category",reversed:true},
            axisY: {title: "Score",includeZero:true,labelFormatter:this.addSymbols, interval:5},
            toolTip: {shared: true},
            data:[
            {
                type:"bar",
                name: "Historical score",
                toolTipContent: "<b>{label}</b> <br> <span style= color: #4F81BC>{name}</span>: {y}",
                dataPoints:[
                    {y:this.state.section_scores[0], label: "Section 1", color: "#f3a4a8"},
                {y:this.state.section_scores[2], label: "Section 2"},
                {y:this.state.section_scores[4], label: "Section 3"},
                {y:this.state.section_scores[6], label: "Section 4"},
                {y:this.state.section_scores[8], label: "Section 5"},
                {y:this.state.section_scores[10], label: "Total"}
                ]
            },
            {
                type: "error",
                name: "Ideal range",
                toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
                dataPoints:[
                {y:[(7),(11)], label: "Section 1"},
                {y:[(13),(15)], label: "Section 2"},
                {y:[(20),(26)], label: "Section 3"},
                {y:[(7),(11)], label: "Section 4"},
                {y:[(13),(15)], label: "Section 5"},
                {y:[(20),(26)], label: "Total"}   
                ]
            }]
        };
        var chart3Options = {
            animationEnabled: true,
            theme: "light2",
            title: {text: "Your Results"},
            axisX: {title: "Category",reversed:true},
            axisY: {title: "Score",includeZero:true,labelFormatter:this.addSymbols, interval:5},
            toolTip: {shared: true},
            data:[
            {
                type:"bar",
                name: "Total score",
                toolTipContent: "<b>{label}</b> <br> <span style= color: #4F81BC>{name}</span>: {y}",
                dataPoints:[
                    {y: this.state.section_scores[1], label: "Section 1", color: "#f3a4a8"},
                {y: this.state.section_scores[3], label: "Section 2"},
                {y: this.state.section_scores[5], label: "Section 3"},
                {y: this.state.section_scores[7], label: "Section 4"},
                {y: this.state.section_scores[9], label: "Section 5"},
                {y: this.state.section_scores[10], label: "Total"}
                ]
            },
            {
                type: "error",
                name: "Ideal range",
                toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
                dataPoints:[
                    {y:[(7),(11)], label: "Section 1"},
                {y:[(13),(15)], label: "Section 2"},
                {y:[(20),(26)], label: "Section 3"},
                {y:[(7),(11)], label: "Section 4"},
                {y:[(13),(15)], label: "Section 5"},
                {y:[(20),(26)], label: "Total"}   
                ]
            }]
        };
    }
}
export default Results;