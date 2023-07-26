const fs = require('fs');

const addNote = function (title, body) {
    let oldNotes = loadNotes() || [];
    if (oldNotes.some((note) => note.title === title)) {
        console.log('This title note already exists!');
    } else {
        fs.writeFileSync('notes.json',
            JSON.stringify([...oldNotes, {title, body, date: new Date().toUTCString()}]));
        console.log('New note added!');
    }
};

const loadNotes = function () {
    return fs.existsSync('notes.json') ?
        JSON.parse(fs.readFileSync('notes.json').toString()) : undefined;
};

module.exports = {
    addNote: addNote
};