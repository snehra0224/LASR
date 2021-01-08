import React, {Component} from 'react';
import * as Survey from "survey-react";
import {Button} from 'semantic-ui-react';
import Axios from 'axios';
import './Scored.css';

class Unscored extends Component{
    constructor(props){
      super(props);
        this.state = {
            isCompleted: false
        }
    }
    continue = (e) => {
      e.preventDefault();
      this.props.nextStep();
    }
    onCompleteComponent = (survey) => {
        var results = survey.data;
        var questions = survey.getAllQuestions();
        for(var i = 0; i < questions.length; i++){
          var q = questions[i];
          var key = q.getValueName();
          if(results[key]){
            continue;
          }
          results[key] = null;
        }
        this.setState({
          isCompleted: true
        })
        Axios.post(`http://localhost:4000/api/insertSystemEngagement`, {idString: this.props.idString, json: results})
        .then(() => {
          alert("Insert successful");
        });
        Axios.post(`http://localhost:4000/api/insertBehaviors`, {idString: this.props.idString, json: results['Behaviors']})
        .then(() => {
          alert("Insert successful");
        });
        Axios.post(`http://localhost:4000/api/insertPsych`, {idString: this.props.idString, json: results['Psych']})
        .then(() => {
          alert("Insert successful");
        });
        Axios.post(`http://localhost:4000/api/insertPhys`, {idString: this.props.idString, json: results['Phys']})
        .then(() => {
          alert("Insert successful");
        });
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
      var json = {
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
                "defaultValue": "0",
                "indent": 10,
                "titleLocation": "left",
                "maxWidth": "1000px"
               }
              ],
              "title": "Please indicate if you have ever been in or used the following systems."
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
                  "type": "matrixdynamic",
                  "titleLocation": "hidden",
                  "name": "Juvenile how many",
                  "columns": [
                    {"name":"Type here, if applicable."}
                  ],
                  "cellType": "text",
                  "rowCount": 4,
                  "allowAddRows": false,
                  "allowRemoveRows": false
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
                  "name": "Adult Corrections",
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
                  "type": "matrixdynamic",
                  "titleLocation": "hidden",
                  "name": "Adult how many",
                  "columns": [
                   {"name": "Type here, if applicable."}
                  ],
                  "cellType": "text",
                  "rowCount": 4,
                  "allowAddRows": false,
                  "allowRemoveRows": false
                 }
              ],
              "title": "How many times?",
              "startWithNewLine": false,
              "width": "260px"
             }
            ]
           },
           {
            "name": "page2",
            "elements": [
              {
                "type": "panel",
                "elements": [
                 {
                  "type": "matrixdropdown",
                  "name": "Behaviors",
                  "titleLocation": "hidden",
                  "columns": [
                   {
                    "name": "Select one or more.",
                    "isRequired": true
                   }
                  ],
                  "choices": [
                   "I have never done this",
                   "I have done this",
                   "I have been criminally convicted of this"
                  ],
                  "cellType": "checkbox",
                  "rows": [
                   "Aggression",
                   "Violence",
                   "Cruelty",
                   "Bullying",
                   "Intimidation",
                   "Destruction of property",
                   "Lying",
                   "Theft",
                   "Assault",
                   "Battery",
                   "Drug Use",
                   "Possession of drugs with intent to sell",
                   "Breaking and entering",
                   "Forgery",
                   "Passing counterfeit bills",
                   "Extortion",
                   "Purse snatching",
                   "Initiating physical fights",
                   "Assault with a deadly weapon",
                   "Truancy or breaking curfew",
                   "Running away from home",
                   "Cruelty towards animals",
                   "Forcing someone into sexual activity"
                  ]
                 },
                ]
              }
          ],
          "showQuestionNumbers": "off",
          "requiredText": "",
          "title": "Please indicate if you have ever engaged in the following behaviors."
        },
        {
          "name": "page3",
          "elements": [
            {
              "type": "panel",
              "elements": [
               {
                "type": "matrixdropdown",
                "name": "Psych",
                "titleLocation": "hidden",
                "columns": [
                 {
                  "name": "Mark all that apply.",
                  "isRequired": true
                 }
                ],
                "choices": [
                 "Current diagnosis",
                 "Diagnosed in the past",
                 "Parental history"
                ],
                "cellType": "checkbox",
                "rows": [
                  "Anxiety",
                  "Depression",
                  "Conduct Disorder",
                  "Intermittent Explosive Disorder",
                  "Impluse Control Disorder",
                  "Posttraumatic Stress Disorder (PTSD)",
                  "Major Depressive Disorder",
                  "Bipolar Disorder",
                  "Psychotic Disorder",
                  "Poly/substance abuse",
                  "Attention Deficit Hyperactivity Disorder (ADHD)",
                  "Autism Spectrum Disorder",
                  "Insomnia"
                ]
               },
              ]
            }
        ],
        "showQuestionNumbers": "off",
        "requiredText": "",
        "title": "Please indicate if you or a parent have been diagnosed with the following."
      },
      {
        "name": "page4",
        "elements": [
          {
            "type": "panel",
            "elements": [
             {
              "type": "matrixdropdown",
              "name": "Phys",
              "titleLocation": "hidden",
              "columns": [
               {
                "name": "Mark all that apply.",
                "isRequired": true
               }
              ],
              "choices": [
               "Current diagnosis",
               "Diagnosed in the past",
               "Parental history"
              ],
              "cellType": "checkbox",
              "rows": [
                "High blood pressure",
                "Insulin resistance",
                "Diabetes",
                "Obesity",
                "Stroke",
                "Cardiovascular disease",
                "Heart attack",
                "Preeclampsia",
                "Premature birth",
                "Low birth weight"
              ]
             },
            ]
          }
      ],
      "showQuestionNumbers": "off",
      "requiredText": "",
      "title": "Please indicate if you or a parent have been diagnosed with the following."
    }
      ]
      };
         var onSurveyCompletion = this.state.isCompleted ? (
          <div>
			        <h1>Congratulations, you've completed the LASR!</h1>
			        <h2>
                  It was a long assessment, and we appreciate you taking the time to complete it. Click ahead to view your scores.
			        </h2>
			       <Button onClick={this.continue}>My scores</Button>
		      </div>
        ) : null;
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
              {onSurveyCompletion}
            </div>
        )
    }
}
export default Unscored;