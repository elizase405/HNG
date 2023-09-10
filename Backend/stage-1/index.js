const express = require('express');
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
		console.log(req.url);
		return res.status(200)
			.json({
			"slack_name": req.query.slack_name,
			"current_day": "Monday",
			"utc_time": "2023-08-21T15:04:05Z",
			"track": req.query.track,
			"github_file_url": "https://github.com/elizase405/hng/blob/master/Backend/stage-1/index.js",
			"github_repo_url": "https://github.com/elizase405/hng",
			"status_code": 200
		});
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`Server started on port ${5000}`)});
