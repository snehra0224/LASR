import React, {Component} from 'react';
import * as Survey from "survey-react";
import {Button} from 'semantic-ui-react';
// import SwitchSelector from "react-switch-selector";
// import CanvasJSReact from './canvasjs.react';
import Axios from 'axios';
import './Scored.css';
import qs1_dict from './qs1';
import qs2_dict from './qs2';
import qs3_dict from './qs3';
import qs4_dict from './qs4';
import qs5_dict from './qs5';
import qs6_dict from './qs6';
import qs7_dict from './qs7';
import qs8_dict from './qs8';
import qs9_dict from './qs9';
import qs10_dict from './qs10';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Scored extends Component {
  constructor(props){
    super(props)
    this.state = {
	//   section_scores: [0,0,0,0,0,0,0,0,0,0,0],
	  qs: [qs1_dict, qs2_dict, qs3_dict, qs4_dict, qs5_dict, qs6_dict, qs7_dict, qs8_dict, qs9_dict, qs10_dict],
	  chartSelectorState: 'Combined'
    }
    this.onCompleteComponent = this.onCompleteComponent.bind(this)
  }

  continue = (e) => {
	e.preventDefault();
	this.props.nextStep();
  }

  onCompleteComponent = (survey) => {
    this.setState({
      isCompleted: true
    })
    var data1 = (survey.data);
    console.log(data1);
	var scores = [];

    for(const key1 in data1){
		var temp = 0;
    	var data2 = data1[key1]
		console.log(data2)
		var curr_qs = this.state.qs[key1-1] 
	    for(const key2 in data2){
		  var test = (data2[key2])["col1"]
		  var val = curr_qs[key2];
		  if(val === -1){
			  if(test === "Never"){
				  temp += 4; 
			  }
			  else if(test === "Rarely"){
				  temp += 3; 
			  }
			  else if(test === "Sometimes"){
				  temp += 2;
			  }
			  else if(test === "Often"){
				  temp += 1;
			  }
		  }
		  else if(val === 1){
			  if(test === "Rarely"){
				  temp += 1;
			  }
			  else if(test === "Sometimes"){
				  temp += 2;
			  }
			  else if(test === "Often"){
				  temp += 3;
			  }
			  else if(test === "Always"){
				  temp += 4;
			  }
		  }
		}
		scores.push(temp);
	}
	var sum = 0;
	for(var v in scores){
		sum += scores[v];
	}
	scores.push(sum);
	// this.setState({section_scores: scores});
	this.props.setScores(scores);
	var t = this.props;
    Axios.post(`http://localhost:3001/api/insert`, {section1_score: scores[0], section2_score: scores[1], total_score: scores[2], idString: t})
    .then(() => {
    	alert("Insert succesful");
    });
}
  render(){
	// const selectorOptions = [
	// 	{
	// 		label: "Combined Score",
	// 		value: "Combined",
	// 		selectedBackgroundColor: "#0097e6",
	// 	},
	// 	{
	// 		label: "Historical Score",
	// 		value: "Historical",
	// 		selectedBackgroundColor: "#fbc531"
	// 	},
	// 	{
	// 		label: "Contemporary Score",
	// 		value: "Contemporary",
	// 		selectedBackgroundColor: "#FF0000"
	// 	}
	//  ];
	//  const onChange = (newValue) => {
	// 	this.setState({chartSelectorState: newValue});
	// 	console.log(this.state.chartSelectorState);
	// };
	 
	// const initialSelectedIndex = selectorOptions.findIndex(({value}) => value === "Combined");
  	// var chart1Options = {
  	// 	animationEnabled: true,
  	// 	theme: "light2",
  	// 	title: {text: "Your Results"},
  	// 	axisX: {title: "Category",reversed:true},
  	// 	axisY: {title: "Score",includeZero:true,labelFormatter:this.addSymbols, interval:5},
  	// 	toolTip: {shared: true},
  	// 	data:[
  	// 	{
  	// 		type:"bar",
  	// 		name: "Total score",
  	// 		toolTipContent: "<b>{label}</b> <br> <span style= color: #4F81BC>{name}</span>: {y}",
  	// 		dataPoints:[
  	// 			{y:(this.state.section_scores[0] + this.state.section_scores[1]), label: "Section 1", color: "#f3a4a8"},
	// 			{y:(this.state.section_scores[2] + this.state.section_scores[3]), label: "Section 2"},
	// 			{y:(this.state.section_scores[4] + this.state.section_scores[5]), label: "Section 3"},
	// 			{y:(this.state.section_scores[6] + this.state.section_scores[7]), label: "Section 4"},
	// 			{y:(this.state.section_scores[8] + this.state.section_scores[9]), label: "Section 5"},
	// 			{y:this.state.section_scores[10], label: "Total"}
  	// 		]
  	// 	},
  	// 	{
  	// 		type: "error",
  	// 		name: "Ideal range",
  	// 		toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
  	// 		dataPoints:[
  	// 			{y:[(7),(11)], label: "Section 1"},
	// 			{y:[(13),(15)], label: "Section 2"},
	// 			{y:[(20),(26)], label: "Section 3"},
	// 			{y:[(7),(11)], label: "Section 4"},
	// 			{y:[(13),(15)], label: "Section 5"},
	// 			{y:[(20),(26)], label: "Total"}   
  	// 		]
  	// 	}]
	//   };
	// var chart2Options = {
	// 	animationEnabled: true,
	// 	theme: "light2",
	// 	title: {text: "Your Results"},
	// 	axisX: {title: "Category",reversed:true},
	// 	axisY: {title: "Score",includeZero:true,labelFormatter:this.addSymbols, interval:5},
	// 	toolTip: {shared: true},
	// 	data:[
	// 	{
	// 		type:"bar",
	// 		name: "Historical score",
	// 		toolTipContent: "<b>{label}</b> <br> <span style= color: #4F81BC>{name}</span>: {y}",
	// 		dataPoints:[
	// 			{y:this.state.section_scores[0], label: "Section 1", color: "#f3a4a8"},
	// 		  {y:this.state.section_scores[2], label: "Section 2"},
	// 		  {y:this.state.section_scores[4], label: "Section 3"},
	// 		  {y:this.state.section_scores[6], label: "Section 4"},
	// 		  {y:this.state.section_scores[8], label: "Section 5"},
	// 		  {y:this.state.section_scores[10], label: "Total"}
	// 		]
	// 	},
	// 	{
	// 		type: "error",
	// 		name: "Ideal range",
	// 		toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
	// 		dataPoints:[
	// 		  {y:[(7),(11)], label: "Section 1"},
	// 		  {y:[(13),(15)], label: "Section 2"},
	// 		  {y:[(20),(26)], label: "Section 3"},
	// 		  {y:[(7),(11)], label: "Section 4"},
	// 		  {y:[(13),(15)], label: "Section 5"},
	// 		  {y:[(20),(26)], label: "Total"}   
	// 		]
	// 	}]
	// };
	// var chart3Options = {
	// 	animationEnabled: true,
	// 	theme: "light2",
	// 	title: {text: "Your Results"},
	// 	axisX: {title: "Category",reversed:true},
	// 	axisY: {title: "Score",includeZero:true,labelFormatter:this.addSymbols, interval:5},
	// 	toolTip: {shared: true},
	// 	data:[
	// 	{
	// 		type:"bar",
	// 		name: "Total score",
	// 		toolTipContent: "<b>{label}</b> <br> <span style= color: #4F81BC>{name}</span>: {y}",
	// 		dataPoints:[
	// 			{y: this.state.section_scores[1], label: "Section 1", color: "#f3a4a8"},
	// 		  {y: this.state.section_scores[3], label: "Section 2"},
	// 		  {y: this.state.section_scores[5], label: "Section 3"},
	// 		  {y: this.state.section_scores[7], label: "Section 4"},
	// 		  {y: this.state.section_scores[9], label: "Section 5"},
	// 		  {y: this.state.section_scores[10], label: "Total"}
	// 		]
	// 	},
	// 	{
	// 		type: "error",
	// 		name: "Ideal range",
	// 		toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
	// 		dataPoints:[
	// 			{y:[(7),(11)], label: "Section 1"},
	// 		  {y:[(13),(15)], label: "Section 2"},
	// 		  {y:[(20),(26)], label: "Section 3"},
	// 		  {y:[(7),(11)], label: "Section 4"},
	// 		  {y:[(13),(15)], label: "Section 5"},
	// 		  {y:[(20),(26)], label: "Total"}   
	// 		]
	// 	}]
	// };
	var qarr1 = [];
	for(const key in qs1_dict){
		qarr1.push(key);
	}
	var qarr2 = [];
	for(const key in qs2_dict){
		qarr2.push(key);
	}
	var qarr3 = [];
	for(const key in qs3_dict){
		qarr3.push(key);
	}
	var qarr4 = [];
	for(const key in qs4_dict){
		qarr4.push(key);
	}
	var qarr5 = [];
	for(const key in qs5_dict){
		qarr5.push(key);
	}
	var qarr6 = [];
	for(const key in qs6_dict){
		qarr6.push(key);
	}
	var qarr7 = [];
	for(const key in qs7_dict){
		qarr7.push(key);
	}
	var qarr8 = [];
	for(const key in qs8_dict){
		qarr8.push(key);
	}
	var qarr9 = [];
	for(const key in qs9_dict){
		qarr9.push(key);
	}
	var qarr10 = [];
	for(const key in qs10_dict){
		qarr10.push(key);
	}
	var json = {
	    title: "LASR",
	    requiredText: "",
	    showQuestionNumbers: "off",
	    pages: [
	        {
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "1",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr1
	                }
	            ]
	        }, 
	        {
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "2",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr2
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "3",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr3
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "4",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr4
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "5",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr5
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "6",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr6
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "7",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr7
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "8",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr8
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "9",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr9
	                }
	            ]
			},
			{
	            title: "",
	            questions: [
	                {
	                  type: "matrixdropdown",
	                  name: "10",
	                  title: " ",
	                  columns: [
	                      {
	                          name: "col1",
	                          cellType: "radiogroup",
	                          showInMultipleColumns: true,
	                          isRequired: true,
	                          requiredErrorText: "Please complete",
	                          choices: ["Never", "Rarely", "Sometimes", "Often", "Always"]
	                      }
	                  ],

	                  rows: qarr10
	                }
	            ]
	        }
	    ]
	};
      var surveyRender = !this.state.isCompleted ? (
        <Survey.Survey
          json={json}
          showCompletedPage={false}
          onComplete={this.onCompleteComponent}
		  hideRequiredErrors={true}
          />
        ) : null
    //   var displayResults = this.state.isCompleted ? (
	//       	<div>
	// 		  <div>
	// 			  <SwitchSelector
	// 					onChange={onChange}
	// 					options={selectorOptions}
	// 					initialSelectedIndex={initialSelectedIndex}
	// 					backgroundColor={"#808080"}
	// 					fontColor={"#000000"}
	// 				/>
	// 		  </div>
	//   		  <div>
	// 			  {this.state.chartSelectorState === "Combined" && 
	// 			  <CanvasJSChart options = {chart1Options}/>}
	// 		  </div>
	// 		  <div>
	// 		      {this.state.chartSelectorState === "Historical" && 
	// 			  <CanvasJSChart options = {chart2Options}/>}
	// 		  </div>
	// 		  <div>
	// 		      {this.state.chartSelectorState === "Contemporary" && 
	// 			  <CanvasJSChart options = {chart3Options}/>}
	// 		  </div>
	//         </div>
	//     ) : null;
      var onSurveyCompletion = this.state.isCompleted ? (
          <div>
			  <h1>You've now completed the first portion of the LASR</h1>
			  <h2>
				  The next section is unscored, and asks specific questions about your past and present. 
				  Please answer them to the best of your ability. We understand if you cannot recall every detail.
			  </h2>
			  <Button onClick={this.continue}>Next Section</Button>
		  </div>
        ) : null;
    return (
      <div className="section1">
        <div>
          {surveyRender}
          {onSurveyCompletion}
          {/* <pre>{displayResults}</pre> */}
        </div>
      </div>
    );
  }
}

export default Scored;