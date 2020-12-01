import React, {Component} from 'react';
import * as Survey from "survey-react";
import CanvasJSReact from './canvasjs.react';
import Axios from 'axios';
import './LASR.css';
import qs1_dict from './qs1';
import qs2_dict from './qs2';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LASR extends Component {
  constructor(props){
    super(props)
    this.state = {
	  score: [0,0,0],
	  qs: [qs1_dict, qs2_dict]
    }
    this.onCompleteComponent = this.onCompleteComponent.bind(this)
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
	      if(test === "Never"){
	        val *= 0
	      }
	      if(test === "Rarely"){
	        val *= 1
	      }
	      if(test === "Sometimes"){
	        val *= 2
	      }
	      if(test === "Often"){
	        val *= 3
	      }
	      if(test === "Always"){
	        val *= 4
		  }
		  temp += val;
		}
		scores.push(temp);
	}
	var sum = 0;
	for(var v in scores){
		sum += scores[v];
	}
	scores.push(sum);
	this.setState({score: scores});
	var t = this.props;
    Axios.post(`http://localhost:3001/api/insert`, {section1_score: scores[0], section2_score: scores[1], total_score: scores[2], idString: t})
    .then(() => {
    	alert("Insert succesful");
    });
}
  render(){
  	var options = {
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
  				{y:this.state.score[0], label: "Section 1", color: "#f3a4a8"},
				{y:this.state.score[1], label: "Section 2"},
				{y:this.state.score[2], label: "Total"}
				  
  			]
  		},
  		{
  			type: "error",
  			name: "Ideal range",
  			toolTipContent: "<span style=color:#C0504E>{name}</span>: {y[0]} - {y[1]}",
  			dataPoints:[
  				{y:[(7),(11)], label: "Section 1"},
				{y:[(13),(15)], label: "Section 2"},
				{y:[(20),(26)], label: "Total"}  
  			]
  		}]
  	};
	var qarr1 = [];
	for(const key in qs1_dict){
		qarr1.push(key);
	}
	var qarr2 = [];
	for(const key in qs2_dict){
		qarr2.push(key);
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
	                  requiredErrorText: "b",
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
      var displayResults = this.state.isCompleted ? (
	      	<div>
	          <div> Your total score is: {this.state.score[2]} </div>
	          <div><CanvasJSChart options = {options}/></div>
	        </div>
        ) : null;
      var onSurveyCompletion = this.state.isCompleted ? (
          <div> Thank you for taking the LASR </div>
        ) : null;

    return (
      <div className="section1">
        <div>
          {surveyRender}
          {onSurveyCompletion}
          <pre>{displayResults}</pre>
        </div>
      </div>
    );
  }
}

export default LASR;