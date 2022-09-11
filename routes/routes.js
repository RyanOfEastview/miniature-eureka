const fs = require('fs');
const path = require('path');

module.exports = app = {

    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;
        var notes = JSON.parse(data);

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

        //Delete a Note 
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Note Deleted!");
        });


        //Show Posted Notes
        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        //Show All Notes
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //Updates Notes When Changes Made
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '/t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}