const fs = require('fs');
const chalk = require('chalk');

const addNote = function (title, body, date = new Date()) {
    const oldNotes = loadNotes();
    if (oldNotes.some((note) => note.title === title)) {
        console.log(chalk.black.bgRed('This title note already exists!'));
    } else {
        saveNotes([...oldNotes, {title, body, date}]);
        console.log(chalk.black.bgGreen('New note added!'));
    }
};

const removeNote = function (title, permanently = false) {
    const oldNotes = loadNotes();
    const newNotes = oldNotes.filter((note) => note.title !== title);
    const removedNote = oldNotes.find((note) => note.title === title);

    if (oldNotes.length === newNotes.length) {
        console.log(chalk.black.bgRed('This title does not exist in the notes!'));
    } else if (permanently) {
        saveNotes(newNotes);
        console.log(chalk.black.bgGreen(`Note '${title}' has been removed permanently!`));
    } else {
        removedNote.deleteDate = new Date();
        saveNotes(newNotes);
        saveNotes([...loadNotes('trash.json'), removedNote], 'trash.json');
        console.log(chalk.black.bgGreen(`Note '${title}' is moved to trash!`));
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

const trashList = function () {
    const trashNotes = loadNotes('trash.json');
    const now = new Date();

    if (!trashNotes.length) {
        console.log(chalk.black.bgRed('Trash is empty!'));
    } else {
        console.log(chalk.inverse('Trash'), chalk.gray.bold('remaining days until remove permanently'));
        trashNotes.forEach((note, index) => {
            console.log(chalk.blue.underline(index + 1), note.title,
                chalk.gray.bold(3 -
                    Math.ceil((now - new Date(note.deleteDate)) / (1000 * 60 * 60 * 24)) + ' days'));
        });
    }
}

const updateTrash = function () {
    const trashNotes = loadNotes('trash.json');
    const updatedTrash = trashNotes.filter((note) => {
        return (new Date() - new Date(note.deleteDate) / (1000 * 60 * 60 * 24)) > 0;
    });
    saveNotes(updatedTrash, 'trash.json');
};

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

const loadNotes = function (path = 'notes.json') {
    try {
        return JSON.parse(fs.readFileSync(path).toString());
    } catch (e) {
        return [];
    }
};

const saveNotes = function (newNotes, path = 'notes.json') {
    fs.writeFileSync(path, JSON.stringify(newNotes));
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote,
    trashList, updateTrash
};