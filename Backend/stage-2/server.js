const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config(path.join(__dirname, ".env"));
const port = process.env.port || 3000;
const asyncHandler = require("express-async-handler");
const People = require("./models/peopleModel");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware.js");
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// @desc	Get redirect
// @route	GET /
// @access	Public
app.get("/", (req, res) => {
	res.status(200).send("Go to /api or /api/id_number")
});

// @desc	Get people
// @route	GET /api
// @access	Public
app.get("/api", asyncHandler(async (req, res) => {
	const people = await People.find();
	res.status(200).json(people);
}));

// @desc	Get person
// @route	GET /api/:id
// @access	Public
app.get("/api/:id", asyncHandler(async (req, res) => {
	const person = await People.find({"_id": req.params.id});

	if (person.length === 0)
	{
		res.status(400)
		throw new Error("id does not exist");
	}

	res.status(200).json(person);
}));

//@desc		CREATE person
//@route	SET /api/:id
//@access	Public
app.post("/api", asyncHandler(async (req, res) =>{
	console.log(req.body);
	if(!req.body.name)
	{
		res.status(400);
		throw new Error("Please add Person name.");
	}

	const id = await People.count() + 1;
	const person = await People.create({"_id": id, "name": req.body.name});
}));

//@desc		UPDATE person
//@route	PUT /api/:id
//@access	Public
app.put("/api/:id", asyncHandler(async (req, res) => {
	const person = await People.findById(req.params.id);
	if (!person)
	{
		res.status(400);
		throw new Error("id not found and updated");
	}

	const updatedPerson = await People.findByIdAndUpdate(req.params.id, req.body, {new:true});
	res.status(200).json(updatedPerson);
}))

//@desc
//@route
//@access
app.delete("/api/:id", asyncHandler(async (req, res) => {
	const person = await People.findByIdAndDelete(req.params.id);
	if (!person)
	{
		res.status(400);
		throw new Error("Id not found and deleted");
	}

	res.status(200).json({message: `Person removed for ${req.params.id}`});
}))

app.use(errorHandler);

app.listen(port, ()=>{
	console.log(`server started on port ${port}`);
});
