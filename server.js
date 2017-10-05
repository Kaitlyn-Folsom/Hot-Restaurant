// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var reservations = [{
    name: "Tom",
    phone: "908-555-1234",
    email: "tom@gmail.com",
    id: 1
}, {
    name: "Max",
    phone: "323-123-4567",
    email: "max@gmail.com",
    id: 2
}, {
    name: "Sarah",
    phone: "405-098-7654",
    email: "sarah@gmail.com",
    id: 3
}, {
    name: "Mary",
    phone: "405-098-7654",
    email: "mary@gmail.com",
    id: 4
}, {
    name: "Bill",
    phone: "405-098-7654",
    email: "Bill@gmail.com",
    id: 5
}, {
    name: "Mark",
    phone: "405-098-7654",
    email: "Mark@gmail.com",
    id: 6
  },{
    name: "Scott",
    phone: "908-543-1234",
    email: "scott@gmail.com",
    id: 7
}];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
    console.log("Home page Requested");
});

app.get("/reserv", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
    console.log("Reservation's page requested");
});

// Get all characters
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
    console.log("View tables requested");
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/reservList?", function(req, res) {
    var chosen = req.params.reservList;
    console.log(chosen);

    if (chosen <= 5) {
        console.log(chosen);

        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].name) {
                return res.json(reservations[i]);
            }
        }
        return res.json(false);
    }
    return res.json(reservations);

});

app.get("/api/waitList?", function(req, res) {
    var waiting = req.params.waitList;
    console.log(waiting);

    if (waiting > 5) {
        console.log(waiting);

        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].name) {
                return res.json(reservations[i]);
            }
        }
        return res.json(false);
    }
    return res.json(reservations);

});

app.get('/api/tables', function(req, res) {

    res.json(reservations);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {

    var newReservation = req.body;

    console.log(newReservation);

    reservations.push(newReservation);

    res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});