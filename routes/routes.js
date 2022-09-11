const fs = require('fs');
const path = require('path');

module.exports = app = {

    //API Routes
    //Get Notes
    app.get("/api/notes", function (req, res) {
        res.json(notes);
    });

    //Post Notes
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("New Note Added!");
    });

    //Get Specific Note
    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

    // Delete a Note 
    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Note Deleted!");
    });

    
}