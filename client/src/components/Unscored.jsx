import React, {Component} from 'react';
import * as Survey from "survey-react";
import {Button} from 'semantic-ui-react';
import './Scored.css';

class Unscored extends Component{
    constructor(props){
        super(props);
        this.state = {
            isCompleted: false
        }
    }
    onCompleteComponent = (survey) => {
        this.setState({
          isCompleted: true
        })
    }
    onUpdateQuestionCssClasses = (survey, options) => {
      var classes = options.cssClasses

      classes.root = "sq-root";
      classes.title = "sq-title"
      classes.item = "sq-item";
      classes.label = "sq-label";

      if (options.question.getType() === "text") {
          classes.title += " sq-title-txt";
          classes.root += " sq-root-txt";
      }
      if (options.question.getType() === "matrixdropdown") {
        classes.title += " sq-title-mtx";
        classes.root += " sq-root-mtx";
      }
      if (options.question.name === "How many?") {
        classes.title += " sq-title-pnl";
        classes.root += " sq-root-pnl";
      }
    }
      render(){
      var json = 
        {
          title: "LASR",
          requiredText: "",
          showQuestionNumbers: "off",
          "pages": [
           {
            "name": "page1",
            "elements": [
             {
              "type": "panel",
              "name": "Upper Pannel",
              "elements": [
               {
                "type": "matrixdropdown",
                "name": "Food/Housing/Child Welfare/Foster",
                "titleLocation": "hidden",
                "columns": [
                 {
                  "name": "Select one or more",
                  "isRequired": true
                 }
                ],
                "choices": [
                 "Currently",
                 "In the past",
                 "Never"
                ],
                "cellType": "checkbox",
                "rows": [
                 "Food Assistance",
                 "Housing Assistance",
                 "Child Welfare/Child Protection",
                 "Foster Care"
                ]
               },
               {
                "type": "text",
                "name": "Foster text",
                "visible": false,
                "visibleIf": "{Food/Housing/Child Welfare/Foster.Foster Care.Select one or more} = ['Currently'] or {Food/Housing/Child Welfare/Foster.Foster Care.Select one or more} = ['In the past'] or {Food/Housing/Child Welfare/Foster.Foster Care.Select one or more} = ['Currently','In the past']",
                "title": "How many placements did you have in foster care?",
                "indent": 10,
                "titleLocation": "left",
                "maxWidth": "1000px"
               }
              ]
             },
             {
              "type": "panel",
              "name": "Lower left 1",
              "elements": [
                {
                  "type": "matrixdropdown",
                  "name": "Juvenile Detention",
                  "titleLocation": "hidden",
                  "rowTitleWidth": "300px",
                  "columns": [
                   {
                    "name": "Select one or more",
                    "isRequired": true
                   }
                  ],
                  "choices": [
                   "Currently",
                   "In the past",
                   "Never"
                  ],
                  "cellType": "checkbox",
                  "rows": [
                   "Diversion",
                   "Probation",
                   "Short term detention",
                   "Secure Facility long term placement"
                  ]
                 }
              ],
              "title": "Please indicate if you have been in any of the following as part of the juvenile justice system.",
              "width": "700px"
             },
             {
              "type": "panel",
              "name": "Lower Right 1",
              "elements": [
                {
                  "type": "matrixdropdown",
                  "titleLocation": "hidden",
                  "name": "question10",
                  "columns": [
                   {
                    "name": "Type here, if applicable.",
                    "cellType": "text"
                   }
                  ],
                  "cellType": "text",
                  "rows": [" ", " ", " ", " "]
                 }
              ],
              "title": "How many times?",
              "startWithNewLine": false,
              "width": "260px"
             },
             {
              "type": "panel",
              "name": "Lower left 2",
              "elements": [
                {
                  "type": "matrixdropdown",
                  "name": "Juvenile Detention",
                  "titleLocation": "hidden",
                  "rowTitleWidth": "300px",
                  "columns": [
                   {
                    "name": "Select one or more",
                    "isRequired": true
                   }
                  ],
                  "choices": [
                   "Currently",
                   "In the past",
                   "Never"
                  ],
                  "cellType": "checkbox",
                  "rows": [
                   "Diversion",
                   "Probation",
                   "Imprisoned for a sentence of 1 year or less",
                   "Imprisoned for a sentence of 1 year or more"
                  ]
                 }
              ],
              "title": "Please indicate if you have been in any of the following as part of the adult corrections system.",
              "width": "700px"
             },
             {
              "type": "panel",
              "name": "Lower Right 2",
              "elements": [
                {
                  "type": "matrixdropdown",
                  "titleLocation": "hidden",
                  "name": "question10",
                  "columns": [
                   {
                    "name": "Type here, if applicable.",
                    "cellType": "text"
                   }
                  ],
                  "cellType": "text",
                  "rows": [" ", " ", " ", " "]
                 }
              ],
              "title": "How many times?",
              "startWithNewLine": false,
              "width": "260px"
             }
            ]
           }
          ],
          "showQuestionNumbers": "off",
          "requiredText": ""
         };
        var surveyRender = !this.state.isCompleted ? (
            <Survey.Survey
              json={json}
              showCompletedPage={false}
              onComplete={this.onCompleteComponent}
              onUpdateQuestionCssClasses={this.onUpdateQuestionCssClasses}
              hideRequiredErrors={true}
              />
            ) : null
        return(
            <div>
              {surveyRender}
            </div>
        )
    }
}
export default Unscored;