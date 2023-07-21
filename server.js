const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

// // // API ROUTES // // //
// API GET
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes' });
      }
  
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });

  // API POST
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed saving note' });
      }
  
      const notes = JSON.parse(data);
      const newNoteId = Date.now().toString();
      const newNote = {
        id: newNoteId,
        title: req.body.title,
        text: req.body.text,
      };
  
      notes.push(newNote);
  
      fs.writeFile(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify(notes),
        'utf8',
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed saving note' });
          }
  
          res.json(newNote);
        }
      );
    });
  });
  
// Serve the HTML
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });
  
  // Serve the client JS
  app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/assets/js/index.js'));
  });
  

//   Server startup
app.listen(PORT, () => {
    console.log(`Server running successfully on http://localhost:${PORT}`);
  });
