const db = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", function (request, response) {
        db.Workout.find({})
            .then(function (dbWorkout) {
                response.json(dbWorkout);  
            })
            .catch(function (error) {
                response.json(error)
            });
    });

    app.get("/api/workouts/range", function (request, response) {
        db.Workout.find(request.body)
        .then(function (dbRange) {
            response.json(dbRange); 
        })
        .catch(function (error) {
            response.json(error);
        });
    });

    app.post("/api/workouts", function (request, response) {
        console.log(request.body)
        db.Workout.create(request.body)
            .then(function (dbData) {
                response.json(dbData); 
            })
            .catch(function (error) {
                response.json(error);
            });
    });

    app.put("/api/workouts/:id", function (request, response) {
        const { id } = request.params;
        db.Workout.updateOne({ _id: id },
            { $push: { exercises: request.body }})
            .then(function (dbWorkout) {
                response.json(dbWorkout);
            })
            .catch(function (error) {
                response.json(error);
            });
    });
}
