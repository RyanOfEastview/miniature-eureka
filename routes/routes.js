const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);

    // API ROUTES
    // GET Notes
    app.get("/api/notes", function (req, res) {
      // Read the db.json file and return all saved notes as JSON.
      res.json(notes);
    });

    // POST Note
    app.post("/api/notes", function (req, res) {
      // Receives a new note, adds it to db.json, then returns the new note
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("Added new note: " + newNote.title);
    });

    // GET Notes
    app.get("/api/notes/:id", function (req, res) {
      // display json for the notes array indices of the provided id
      res.json(notes[req.params.id]);
    });

    // DELETE Specific Note
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log("Deleted note with id " + req.params.id);
    });

    // SHOW notes.html
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // SHOW index.html
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //UPDATE When Changes are Made
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
