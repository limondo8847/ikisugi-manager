const fs = require('fs');
const path = require('path');

const commands = new Map();
const commandBuilders = [];

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js');

for (const file of files) {
    const command = require(path.join(__dirname, file));
    if (command && command.data && command.execute) {
        commands.set(command.data.name, command);
        commandBuilders.push(command.data);
    }
}

module.exports = {
    commands,
    commandBuilders
};
