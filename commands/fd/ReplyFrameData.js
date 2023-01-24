// rip: import { getFrameData } from '../../dbquery.js';

const { getFrameData, getCharMoves } = require('../../dbquery.js');
const { Command } = require('discord.js-commando');
const { stripIndent, oneLine } = require('common-tags');


module.exports = class ReplyFrameData extends Command {
	constructor(client) {
		super(client, {
			name: 'fd',
			group: 'fd',
			memberName: 'framedata',
			description: oneLine`
					Returns frame data of a requested character move or
					returns full move list of a requested character.
					`,
			examples: ['!fd arizona 5a | !fd ari trample | !fd ari | !fd general pushblock'],
			argsPromptLimit: 0,
			args: [
				{
					key: 'character',
					prompt: 'Character name.',
					type: 'string',
					/* wait: 0,
					validate: text => {
						if (text.length > 2) {
							return true;
						}
						else {
							return 'Please provide at least three letters for the character name.';
						}
					}, */
				},
				{
					key: 'moveName',
					prompt: 'Move name.',
					type: 'string',
					default: '',
				},
			],
		});
	}

	async run(message, { character, moveName }) {

		/* better-sqlite3 returns a single row as an object with keys
			cannot use an index natively, solution if interested in the future
			may be Object.keys */
		/* Currently doing this method to provide a character length error. Using validate in an
			args object sets off message.js:186 in discord.js-commando. Look for a potential fix? */
		let data;

		if (character.length < 3) {
			message.say('Please input at least three letters for the character name.');
			return;
		}
		if (moveName == '') {
			data = getCharMoves(character);

			if(!data || !data.length) {
				message.say('Could not find that character!');
			}
			else {
				message.direct(stripIndent`
				\`\`\`
				${data.map(item => `
				${item.MoveName}`).join('')}
				\`\`\`
				`);
			}
		}
		else {
			data = getFrameData(character, moveName);

			/* Introduce better checks if a character name exists instead of lumping
		   with no move exists error. Utilize character name db */

			if(!data) {
				message.say('Could not find that character or move!');
			}
			else {
				message.say(stripIndent`
				\`\`\`Character: ${data.Character} | Move: ${data.MoveName} \n
				Startup: ${data.Startup} | Active: ${data.Active} | Recovery: ${data.Recovery} \n
				Advantage: ${data.FrameAdvantage} | Guard: ${data.Guard}
				\`\`\`
				`);
			}
		}
		// console.log(data);
		/* if (moveName == '') {
			data = getCharMoves(character);
		}
		else{
			data = getFrameData(character, moveName);
		}
		// console.log(data);
		/* Introduce better checks if a character name exists instead of lumping
		   with no move exists error. Utilize character name db */
		/* if(!data) {
			message.say('Could not find that move!');
		}
		else {
			message.say(`
		\`\`\`Character: ${data.Character} | Move: ${data.MoveName} \n
        Startup: ${data.Startup} | Active: ${data.Active} | Recovery: ${data.Recovery} \n
        Advantage: ${data.FrameAdvantage} | Guard: ${data.Guard}
        \`\`\`
		`);
		} */
	}

};