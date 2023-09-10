const express = require('express');
const moment = require("moment");

const current_day_index = moment().day();
const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const day = weeks[current_day_index];

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
	res.send("Go to /api?slack_name=example_name&track=backend");
});

app.get("/api", (req, res)=>{
	if (req.url === "/api")
	{
		return res.status(404)
			.json(
				{
					"Error": "query parameters not provided",
					"example": "http://example.com/api?slack_name=example_name&track=backend"
				});
	}
	else
	{
		return res.status(200)
			.json({
			"slack_name": req.query.slack_name,
			"current_day": day,
			"utc_time": moment().utc().format(),
			"track": req.query.track,
			"github_file_url": "https://github.com/elizase405/hng/blob/master/Backend/stage-1/index.js",
			"github_repo_url": "https://github.com/elizase405/hng",
			"status_code": 200
		});
	}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)});
