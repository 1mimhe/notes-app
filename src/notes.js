const fs = require('fs');

const addNote = function (title, body) {
    const oldNotes = loadNotes();
    if (oldNotes.some((note) => note.title === title)) {
        console.log('This title note already exists!');
    } else {
        saveNotes([...oldNotes, {title, body, date: new Date().toUTCString()}]);
        console.log('New note added!');
    }
};

const removeNote = function (title) {
    const oldNotes = loadNotes();
    const newNotes = oldNotes.filter((note) => note.title !== title);

    if (oldNotes.length === newNotes.length) {
        console.log('This title does not exist in the notes!');
    } else {
        saveNotes(newNotes);
        console.log(`Note '${title}' has been removed!`);
    }
};

const listNotes = function () {
    const notes = loadNotes();
    if (notes.length) {
        console.log('There is no note!');
    } else {
        console.log('Your Notes:');
        notes.forEach((note, index) => console.log(index + 1, note.title));
    }
}

const readNote = function (title) {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if (foundNote) {
        console.log(`-${foundNote.title}-`);
        console.log(foundNote.body);
    } else {
        console.log(`Note ${title} not found!`);
    }
}

const loadNotes = function () {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (e) {
        return [];
    }
};

const saveNotes = function (newNotes) {
    fs.writeFileSync('notes.json', JSON.stringify(newNotes));
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};