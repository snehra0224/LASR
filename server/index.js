const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const Str = require('@supercharge/strings')

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "Taysachsdisease1!",
	database: "lasr_db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/getIDStrings", (req,res) => {
	const sqlGet = "SELECT idString FROM lasr_db.user_results;";
	db.query(sqlGet, (err, result) => {
		res.send(result);
	});
});

app.post("/api/insertScores", (req,res) => {
	const section1_score_h = req.body.section1_score_h;
	const section1_score_c = req.body.section1_score_c;
	const section2_score_h = req.body.section2_score_h;
	const section2_score_c = req.body.section2_score_c;
	const section3_score_h = req.body.section3_score_h;
	const section3_score_c = req.body.section3_score_c;
	const section4_score_h = req.body.section4_score_h;
	const section4_score_c = req.body.section4_score_c;
	const section5_score_h = req.body.section5_score_h;
	const section5_score_c = req.body.section5_score_c;
	const total_score = req.body.total_score;
	const idString = req.body.idString;
	const sqlInsert = "INSERT INTO user_scores (idString, section1_score_h, section1_score_c, section2_score_h, section2_score_c, section3_score_h, section3_score_c, section4_score_h, section4_score_c, section5_score_h, section5_score_c, total_score) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
	db.query(sqlInsert, [idString, section1_score_h, section1_score_c, section2_score_h, section2_score_c, section3_score_h, section3_score_c, section4_score_h, section4_score_c, section5_score_h, section5_score_c, total_score], (err, result) => {
		console.log(err);
	});
});

app.post("/api/insertJSON", (req,res) => {
	const unscored_data = req.body.json;
	console.log(unscored_data);
	var temp = unscored_data['Food/Housing/Child Welfare/Foster'];
	var foodAssist = '';
	var houseAssist = '';
	var childWelfare = '';
	var foster = '';
	var foster_num = 0;
	if(unscored_data['Foster text']){
		foster_num = unscored_data['Foster text'];
	}
	for(var i in temp){
		var text = '';
		for(var j in temp[i]['Select one or more']){
			if(j != 0){
				text += ', ';
			}
			text += temp[i]['Select one or more'][j];
		}
		if(i === 'Food Assistance'){
			foodAssist = text;
		}
		else if(i === 'Housing Assistance'){
			houseAssist = text;
		}
		else if(i === 'Child Welfare/Child Protection'){
			childWelfare = text;
		}
		else if(i === 'Foster Care'){
			foster = text;
		}
	}
	j_div_num = 0;
	j_p_num = 0;
	j_short_term_num = 0;
	j_long_term_num = 0;
	temp = unscored_data['Juvenile how many'];
	if(temp){
		var test = JSON.stringify({});
		if(JSON.stringify(temp[0]) !== test){
			j_div_num = parseInt(temp[0]['Type here, if applicable.'], 10);
		}
		if(JSON.stringify(temp[1]) !== test){
			j_p_num = parseInt(temp[1]['Type here, if applicable.'], 10);
		}
		if(JSON.stringify(temp[2]) !== test){
			j_short_term_num = parseInt(temp[2]['Type here, if applicable.'], 10);
		}
		if(JSON.stringify(temp[3]) !== test){
			j_long_term_num = parseInt(temp[3]['Type here, if applicable.'], 10);
		}
	}
	temp = unscored_data['Juvenile Detention'];
	var j_div = '';
	var j_p = '';
	var j_short_term = '';
	var j_long_term = '';
	for(var i in temp){
		var text = '';
		for(var j in temp[i]['Select one or more']){
			if(j != 0){
				text += ', ';
			}
			text += temp[i]['Select one or more'][j];
		}
		if(i === 'Diversion'){
			j_div = text;
		}
		else if(i === 'Probation'){
			j_p = text;
		}
		else if(i === 'Short term detention'){
			j_short_term = text;
		}
		else if(i === 'Secure Facility long term placement'){
			j_long_term = text;
		}
	}
	a_div_num = 0;
	a_p_num = 0;
	a_short_term_num = 0;
	a_long_term_num = 0;
	temp = unscored_data['Adult how many'];
	if(temp){
		var test = JSON.stringify({});
		if(JSON.stringify(temp[0]) !== test){
			a_div_num = parseInt(temp[0]['Type here, if applicable.'], 10);
		}
		if(JSON.stringify(temp[1]) !== test){
			a_p_num = parseInt(temp[1]['Type here, if applicable.'], 10);
		}
		if(JSON.stringify(temp[2]) !== test){
			a_short_term_num = parseInt(temp[2]['Type here, if applicable.'], 10);
		}
		if(JSON.stringify(temp[3]) !== test){
			a_long_term_num = parseInt(temp[3]['Type here, if applicable.'], 10);
		}
	}
	temp = unscored_data['Adult Corrections'];
	var a_div = '';
	var a_p = '';
	var a_short_term = '';
	var a_long_term = '';
	for(var i in temp){
		var text = '';
		for(var j in temp[i]['Select one or more']){
			if(j != 0){
				text += ', ';
			}
			text += temp[i]['Select one or more'][j];
		}
		if(i === 'Diversion'){
			a_div = text;
		}
		else if(i === 'Probation'){
			a_p = text;
		}
		else if(i === 'Imprisoned for a sentence of 1 year or less'){
			a_short_term = text;
		}
		else if(i === 'Imprisoned for a sentence of 1 year or more'){
			a_long_term = text;
		}
	}
	const sqlInsert = "INSERT INTO user_results (unscored_data) VALUES (?)";
	db.query(sqlInsert, [{unscored_data}], (err, result) => {
		console.log(err);
	});
	console.log("success");
});

app.listen(3001, () => {
	console.log("running on port 3001");
});