const fs = require('fs');
const chalk = require('chalk');

const addNote = function (title, body) {
    const oldNotes = loadNotes();
    if (oldNotes.some((note) => note.title === title)) {
        console.log(chalk.black.bgRed('This title note already exists!'));
    } else {
        saveNotes([...oldNotes, {title, body, date: new Date().toUTCString()}]);
        console.log(chalk.black.bgGreen('New note added!'));
    }
};

const removeNote = function (title) {
    const oldNotes = loadNotes();
    const newNotes = oldNotes.filter((note) => note.title !== title);

    if (oldNotes.length === newNotes.length) {
        console.log(chalk.black.bgRed('This title does not exist in the notes!'));
    } else {
        saveNotes(newNotes);
        console.log(chalk.black.bgGreen(`Note '${title}' has been removed!`));
    }
};

const listNotes = function () {
    const notes = loadNotes();
    if (!notes.length) {
        console.log(chalk.black.bgRed('There is no note!'));
    } else {
        console.log(chalk.inverse('Your Notes'));
        notes.forEach((note, index) => {
            console.log(chalk.blue.underline(index + 1), note.title, chalk.gray.bold(note.date));
        });
    }
}

const readNote = function (title) {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);

    if (foundNote) {
        console.log(chalk.black.bgYellow(foundNote.title), chalk.gray(foundNote.date));
        console.log(foundNote.body);
    } else {
        console.log(chalk.black.bgRed(`Note ${title} not found!`));
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