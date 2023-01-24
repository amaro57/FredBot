// const fs = require('fs');
// const Discord = require('discord.js');
// const client = new Discord.Client();
// import sqlite from 'sqlite';
const { prefix, token, owner } = require('./config');
const commandspath = require('path');

/* const Database = require('better-sqlite3');
const db = new Database('./db/tfh_framedata.db', { verbose: console.log, fileMustExist: true }); */

/* const Database = require('sqlite3');
const db = new Database.Database('./db/tfh_framedata.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to framedata db successfully.');
});
const dbPromise = sqlite.open('./') */

const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({
	commandPrefix: prefix,
	owner: owner,
	disableEveryone: true,
	unknownCommandResponse: false,
});

/* db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Close the database connection.');
}); */

client.registry
	.registerGroups([
		['fd', 'Frame Data'],
		['util', 'Util'],
		['glossary', 'Glossary'],
	])
	.registerDefaultTypes()
	// .registerDefaultGroups()
	// .registerDefaultCommands()
	.registerCommandsIn(commandspath.join(__dirname, 'commands'));
// client.commands = new Commando.Collection(owner);

client.once('ready', () => {
	client.user.setActivity('!help for assistance');
	console.log('Ready!');
});

/* client.on('message', message => {
	console.log(message.content);

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
}); */

client.login(token);