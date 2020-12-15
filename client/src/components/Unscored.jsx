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
                "name": "question9",
                "visible": false,
                "visibleIf": "{Food/Housing/Child Welfare/Foster.Foster Care.Select one or more} = ['Currently'] or {Food/Housing/Child Welfare/Foster.Foster Care.Select one or more} = ['In the past']",
                "title": "How many placements did you have in foster care?",
                "indent": 10,
                "titleLocation": "left",
                "maxWidth": "1000px"
               }
              ]
             },
             {
              "type": "panel",
              "name": "question2",
              "elements": [
               {
                "type": "matrixdropdown",
                "name": "question5",
                "titleLocation": "hidden",
                "columns": [
                 {
                  "name": " ",
                  "isRequired": true
                 }
                ],
                "choices": [
                 "Currently",
                 "In the past"
                ],
                "cellType": "checkbox",
                "rows": [
                 "Diversion"
                ]
               },
               {
                "type": "matrixdropdown",
                "name": "question7",
                "titleLocation": "hidden",
                "columns": [
                 {
                  "name": " ",
                  "isRequired": true
                 }
                ],
                "choices": [
                 "Currently",
                 "In the past"
                ],
                "cellType": "checkbox",
                "rows": [
                 "Row 1"
                ]
               },
               {
                "type": "matrixdropdown",
                "name": "question7",
                "titleLocation": "hidden",
                "columns": [
                 {
                  "name": " ",
                  "isRequired": true
                 }
                ],
                "choices": [
                 "Currently",
                 "In the past"
                ],
                "cellType": "checkbox",
                "rows": [
                 "Row 1"
                ]
               },
               {
                "type": "matrixdropdown",
                "name": "question7",
                "titleLocation": "hidden",
                "columns": [
                 {
                  "name": " ",
                  "isRequired": true
                 }
                ],
                "choices": [
                 "Currently",
                 "In the past"
                ],
                "cellType": "checkbox",
                "rows": [
                 "Row 1"
                ]
               }
              ],
              "title": "Please indicate if you have been in any of the following as part of the juvenile justice system."
             },
             {
              "type": "panel",
              "name": "question4",
              "elements": [
               {
                "type": "text",
                "name": "question6",
                "title": "How many times?"
               },
               {
                "type": "text",
                "name": "question8",
                "title": "How many times?"
               },
               {
                "type": "text",
                "name": "question8",
                "title": "How many times?"
               },
               {
                "type": "text",
                "name": "question8",
                "title": "How many times?"
               }
              ],
              "startWithNewLine": false
             }
            ]
           }
          ],
          "showQuestionNumbers": "off",
          "requiredText": ""
         };
        // {
        //     title: "LASR",
        //     requiredText: "",
        //     showQuestionNumbers: "off",
        //     pages: [
        //         {
        //           title: "Please indicate if you have engaged with the following services in the past, and if you are now.",
        //           questions: [
        //             {
        //                 type: "matrixdropdown",
        //                 name: "foodAssist",
        //                 title: " ",
        //                 isRequired: true,
        //                 columns: [
        //                   {
        //                    "name": " "
        //                   }
        //                 ],
        //                 choices: [
        //                     "In the past", "Currently"
        //                 ],
        //                 cellType: "checkbox",
        //                 rows: ["Food Assistance"]
        //               },
        //               {
        //                 type: "matrixdropdown",
        //                 name: "housingAssist",
        //                 title: " ",
        //                 isRequired: true,
        //                 columns: [
        //                   {
        //                    "name": " "
        //                   }
        //                 ],
        //                 choices: [
        //                     "In the past", "Currently"
        //                 ],
        //                 cellType: "checkbox",
        //                 rows: ["Housing Assistance"]
        //               }
        //             // }, {
        //             //     type: "dropdown",
        //             //     name: "kids",
        //             //     title: "How many kids do you have",
        //             //     visibleIf: "{haveKids}='Yes'",
        //             //     isRequired: true,
        //             //     choices: [1, 2, 3, 4, 5]
        //             // }, {
        //             //     type: "dropdown",
        //             //     name: "kid1Age",
        //             //     title: "The first kid age:",
        //             //     visibleIf: "{haveKids}='Yes' and {kids} >= 1",
        //             //     isRequired: true,
        //             //     "choicesMax": 18
        //             // }, {
        //             //     type: "dropdown",
        //             //     name: "kid2Age",
        //             //     title: "The second kid age:",
        //             //     visibleIf: "{haveKids}='Yes' and {kids} >= 2",
        //             //     isRequired: true,
        //             //     startWithNewLine: false,
        //             //     "choicesMax": 18
        //             // }, {
        //             //     type: "dropdown",
        //             //     name: "kid3Age",
        //             //     title: "The third kid age:",
        //             //     visibleIf: "{haveKids}='Yes' and {kids} >= 3",
        //             //     isRequired: true,
        //             //     startWithNewLine: false,
        //             //     "choicesMax": 18
        //             // }, {
        //             //     type: "dropdown",
        //             //     name: "kid4Age",
        //             //     title: "The fourth kid age:",
        //             //     visibleIf: "{haveKids}='Yes' and {kids} >= 4",
        //             //     isRequired: true,
        //             //     startWithNewLine: false,
        //             //     "choicesMax": 18
        //             // }, {
        //             //     type: "dropdown",
        //             //     name: "kid5Age",
        //             //     title: "The fifth kid age:",
        //             //     visibleIf: "{haveKids}='Yes' and {kids} >= 5",
        //             //     isRequired: true,
        //             //     startWithNewLine: false,
        //             //     "choicesMax": 18
        //             // }
        //           ]
        //         },
        //         {
        //           name: "page1",
        //           elements: [
        //             {
        //               type: "matrixdropdown",
        //               name: " ",
        //               columns: [
        //                   {
        //                   name: " "
        //                   },
        //                 ],
        //               choices: [
        //               1,
        //               2,
        //               3,
        //               4,
        //               5
        //               ],
        //               cellType: "checkbox",
        //               rows: [
        //               "Row 1",
        //               "Row 2"
        //               ]
        //             }
        //             ]
        //           }
        //       ]
        // };
        // var myCss = {
        //   question: {
        //     mainRoot: "sv_qstn custom_question",
        //     title: "custom_question_title"
        //   }
        // };
        // var survey = new Survey.Model(json);
        var surveyRender = !this.state.isCompleted ? (
            <Survey.Survey
              json={json}
              showCompletedPage={false}
              onComplete={this.onCompleteComponent}
              onUpdateQuestionCssClasses={this.onUpdateQuestionCssClasses}
              hideRequiredErrors={true}
              // css={myCss}
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