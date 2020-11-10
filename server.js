const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");
const dotenv = require("dotenv").config();
const { URI } = process.env;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

console.log("I'm working")

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/fitnessTrackerDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected!");
})

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({ day: new Date() })
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(({message}) => {
    console.log(message);
  });
});

app.put("/api/workouts/:id", (req, res) => {
  const newObjId = mongoose.Types.ObjectId(req.params.id);
  db.Exercise.create(req.body).then(exerciseData => {
    db.Workout.updateOne({_id:newObjId}, {$push: {exercises: exerciseData._id}}).then(data=>{
      res.json(data);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
  })
  })

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .populate("exercise")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  })



app.get("/", (req, res) => {
  res.send(200);
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
