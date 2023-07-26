const fs = require('fs');

const addNotes = function (title, body) {
    let oldNotes = [];
    if (fs.existsSync('notes.json'))
        oldNotes =
            JSON.parse(fs.readFileSync('notes.json').toString());
    fs.writeFileSync('notes.json', [...oldNotes, {title, body}]);
};

module.exports = {
    addNotes : addNotes
};