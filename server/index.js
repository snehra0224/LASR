const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const Str = require('@supercharge/strings')
const db = require('./_helpers/db')
var Sequelize = require('sequelize')
var connection = new Sequelize('lasr_db', 'root', 'Taysachsdisease1!', { dialect: 'mysql' }) 

async function insertScores(params){
	await db.user_scores.create(params);
	console.log("success1");
}

async function insertSystemEngagement(params){
	await db.user_system_engagement.create(params);
}

async function insertBehaviors(params){
	await db.user_behaviors.create(params);
}

async function insertPsych(params){
	await db.user_psych.create(params);
}

async function insertPhys(params){
	await db.user_phys.create(params);
}

async function getIDStrings(){
	return db.user_scores.findAll({attributes: ['idString']});
}
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/getIDStrings", (req,res) => {
	getIDStrings().then(function(result){
		console.log(result);
		res.send(result);
	});
});

app.post("/api/insertScores", (req,res) => {
	console.log("entered");
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
	var params = {
		idString: idString,
		section1_h: section1_h,
		section1_c: section1_c,
		section2_h: section2_h,
		section2_c: section2_c,
		section3_h: section3_h,
		section3_c: section3_c,
		section4_h: section4_h,
		section4_c: section4_c,
		section5_h: section5_h,
		section5_c: section5_c,
		total: total
	}
	insertScores(params);
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

	var params = {
		idString: idString,
		foodAssist: foodAssist,
		houseAssist: houseAssist,
		childWelfare: childWelfare,
		foster: foster,
		foster_num: foster_num,
		j_div: j_div,
		j_p: j_p,
		j_p_num: j_p_num,
		j_short_term: j_short_term,
		j_short_term_num: j_short_term_num,
		j_long_term: j_long_term,
		j_long_term_num: j_long_term_num,
		a_div: a_div,
		a_div_num: a_div_num,
		a_p: a_p,
		a_p_num: a_p_num,
		a_short_term: a_short_term,
		a_short_term_num: a_short_term_num,
		a_long_term: a_long_term,
		a_long_term_num: a_long_term_num
	}
	insertSystemEngagement(params);
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
	var params = {
		idString: toPass[0],
		aggression: toPass[1],
		violence: toPass[2],
		cruelty: toPass[3],
		bullying: toPass[4],
		intimidation: toPass[5],
		destruction_of_property: toPass[6],
		lying: toPass[7],
		theft: toPass[8],
		assault: toPass[9],
		battery: toPass[10],
		drug_use: toPass[11],
		possession_drugs_sell: toPass[12],
		breaking_entering: toPass[13],
		forgery: toPass[14],
		counterfeit_bills: toPass[15],
		extortion: toPass[16],
		purse_snatching: toPass[17],
		physical_fights: toPass[18],
		assault_deadly_weapon: toPass[19],
		truancy_breaking_curfew: toPass[20],
		running_from_home: toPass[21],
		cruelty_animals: toPass[22],
		forcing_sexual_activity: toPass[23]
	}
	insertBehaviors(params);
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
	var params = {
		idString: toPass[0],
		anxiety: toPass[1],
		depression: toPass[2],
		conduct_disorder: toPass[3],
		IED: toPass[4],
		ICD: toPass[5],
		PTSD: toPass[6],
		MJD: toPass[7],
		BD: toPass[8],
		PD: toPass[9],
		substance: toPass[10],
		ADHD: toPass[11],
		autism: toPass[12],
		insomnia: toPass[13]
	}
	insertPsych(params);
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
	var params = {
		idString: toPass[0],
		high_bp: toPass[1],
		insulin_res: toPass[2],
		diabetes: toPass[3],
		obesity: toPass[4],
		stroke: toPass[5],
		cardio: toPass[6],
		heart_attack: toPass[7],
		preeclampsia: toPass[8],
		premature: toPass[9],
		low_birth_weight: toPass[10]
	}
	insertPhys(params);
});

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));