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

app.post("/api/insert", (req,res) => {
	const section1_score = req.body.section1_score;
	const section2_score = req.body.section2_score;
	const total_score = req.body.total_score;
	const idString = req.body.idString.idString;
	const sqlInsert = "INSERT INTO user_results (section1_score, section2_score, total_score, idString) VALUES (?,?,?,?);";
	db.query(sqlInsert, [section1_score, section2_score, total_score, idString], (err, result) => {
		console.log(err);
	});
});

app.listen(3001, () => {
	console.log("running on port 3001");
});