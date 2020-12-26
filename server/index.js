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
	const section1_h = req.body.section1_h;
	const section1_c = req.body.section1_c;
	const section2_h = req.body.section2_h;
	const section2_c = req.body.section2_c;
	const section3_h = req.body.section3_h;
	const section3_c = req.body.section3_c;
	const section4_h = req.body.section4_h;
	const section4_c = req.body.section4_c;
	const section5_h = req.body.section5_h;
	const section5_c = req.body.section5_c;
	const total = req.body.total;
	const idString = req.body.idString;
	const sqlInsert = "INSERT INTO user_scores (idString, section1_h, section1_c, section2_h, section2_c, section3_h, section3_c, section4_h, section4_c, section5_h, section5_c, total_score) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
	db.query(sqlInsert, [idString, section1_h, section1_c, section2_h, section2_c, section3_h, section3_c, section4_h, section4_c, section5_h, section5_c, total], (err, result) => {
		console.log(err);
	});
});

app.post("/api/insertSystemEngagement", (req,res) => {
	const idString = req.body.idString;
	const unscored_data = req.body.json;
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
	const sqlInsert = "INSERT INTO user_system_engagement (idString, foodAssist, houseAssist, childWelfare, foster, foster_num, j_div, j_div_num, j_p, j_p_num, j_short_term, j_short_term_num, j_long_term, j_long_term_num, a_div, a_div_num, a_p, a_p_num, a_short_term, a_short_term_num, a_long_term, a_long_term_num) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	db.query(sqlInsert, [idString, foodAssist, houseAssist, childWelfare, foster, foster_num, j_div, j_div_num, j_p, j_p_num, j_short_term, j_short_term_num, j_long_term, j_long_term_num, a_div, a_div_num, a_p, a_p_num, a_short_term, a_short_term_num, a_long_term, a_long_term_num], (err, result) => {
		console.log(err);
	});
	console.log("success1");
});

app.post("/api/insertBehaviors", (req,res) => {
	const idString = req.body.idString;
	const data = req.body.json;
	var toPass = [idString];
	for(var i in data){
		temp = data[i]['Select one or more.'];
		text = '';
		for(var j in temp){
			if(j != 0){
				text += ', ';
			}
			text += temp[j];
		}
		toPass.push(text);
	}
	const sqlInsert = "INSERT INTO user_behaviors (idString, aggression, violence, cruelty, bullying, intimidation, destruction_of_property, lying, theft, assault, battery, drug_use, possession_drugs_sell, breaking_entering, forgery, counterfeit_bills, extortion, purse_snatching, physical_fights, assault_deadly_weapon, truancy_breaking_curfew, running_from_home, cruelty_animals, forcing_sexual_activity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	db.query(sqlInsert, toPass, (err, result) => {
		console.log(err);
	});
	console.log("success2");
});

app.post("/api/insertPsych", (req,res) => {
	const idString = req.body.idString;
	const data = req.body.json;
	var toPass = [idString];
	for(var i in data){
		temp = data[i]['Mark all that apply.'];
		text = '';
		for(var j in temp){
			if(j != 0){
				text += ', ';
			}
			text += temp[j];
		}
		toPass.push(text);
	}
	const sqlInsert = "INSERT INTO user_psych (idString, anxiety, depression, conduct_disorder, IED, ICD, PTSD, MJD, BD, PD, substance, ADHD, autism, insomnia) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	db.query(sqlInsert, toPass, (err, result) => {
		console.log(err);
	});
	console.log("success3");
});

app.post("/api/insertPhys", (req,res) => {
	const idString = req.body.idString;
	const data = req.body.json;
	var toPass = [idString];
	for(var i in data){
		temp = data[i]['Mark all that apply.'];
		text = '';
		for(var j in temp){
			if(j != 0){
				text += ', ';
			}
			text += temp[j];
		}
		toPass.push(text);
	}
	const sqlInsert = "INSERT INTO user_phys (idString, high_bp, insulin_res, diabetes, obesity, stroke, cardio, heart_attack, preeclampsia, premature, low_birth_weight) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
	db.query(sqlInsert, toPass, (err, result) => {
		console.log(err);
	});
	console.log("success4");
});
app.listen(3001, () => {
	console.log("running on port 3001");
});