const { Command } = require('discord.js-commando');
const { stripIndent, oneLine } = require('common-tags');

module.exports = class TermGlossary extends Command {
	constructor(client) {
		super(client, {
			name: 'glossary',
			group: 'glossary',
			memberName: 'glossary',
			description: oneLine`
					Infil's Fighting Game Glossary
					`,
			examples: ['!glossary safe jump'],
			argsPromptLimit: 0,
			args: [
				{
					key: 'term',
					prompt: 'Glossary Term.',
					type: 'string',
					default: ''
				},
			],
		});
	}

	async run(msg, { term }) {

		if(term){
			let terms = term.replace(/ /g, "%20");

			msg.say(`https://glossary.infil.net/?t=${terms}`);
		}
		else{
			msg.say('The Fighting Game Glossary: https://glossary.infil.net/')
		}
	}

}