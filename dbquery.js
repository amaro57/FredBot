// rip:  import { db } from '../../index.js';
// const { db } = require('./dbconnect.js');


const Database = require('better-sqlite3');
const db = new Database('./db/tfh_framedata.db', { verbose: console.log, fileMustExist: true });

exports.getFrameData = function getFrameData(char, move) {

	/* Function returning a list of strings containing framedata
    for each move found in the database. If a precise result is found,
    return that one. If not, return a relaxed result where only similar
	moves are being found. Currently only returns first result of relaxed
	search. Implement stmt.all() to return an array of all results. */

	// console.log(db);
	let stmt = db
		.prepare('SELECT * FROM moveList WHERE character = @character COLLATE NOCASE \
							AND moveName = @moveName COLLATE NOCASE');

	let queryResult = stmt.get({
		character: char,
		moveName: move,
	});

	if (!queryResult) {
		stmt = db
			.prepare('SELECT * FROM moveList WHERE character LIKE @character COLLATE NOCASE \
							AND (moveName LIKE @moveName COLLATE NOCASE \
							OR moveAlias LIKE @moveName COLLATE NOCASE)');

		queryResult = stmt.get({
			character: char + '%',
			moveName: '%' + move + '%',
		});
	}
	return queryResult;
	/* let stmt = db
		.prepare('SELECT * FROM moveList WHERE character = @character COLLATE NOCASE \
							AND moveName = @moveName COLLATE NOCASE')
		.bind({
			character: char,
			moveName: move,
		});

	let queryResult = stmt.get();
	if (!queryResult) {
		stmt = db
			.prepare('SELECT * FROM moveList WHERE character = @character COLLATE NOCASE \
							AND moveName LIKE @moveName COLLATE NOCASE')
			.bind({
				character: char,
				moveName: '%' + move + '%',
			});
		queryResult = stmt.get();
	}
	return queryResult; */

	/* db.execute(`select * from moves where charname= @ collate nocase AND\
                     movename =? collate nocase`, (char, move))

    retVal = dbCursor.fetchall()

    if not retVal:
        #Nothing found with precise search, relax the movename reqs
        dbCursor.execute("select * from moves where charname=? collate nocase and\
                         movename like ? collate nocase", (char, '%' + move + '%'))
        retVal = dbCursor.fetchall()

    return retVal*/
};

exports.getCharMoves = function getCharMoves(char) {

	/* Function returning a list of strings containing all of a character's
    moves for each move found in the database. If a precise result is found,
    return that one. If not, return a relaxed result where only similar
	moves are being found. Currently only returns first result of relaxed
	search. Implement stmt.all() to return an array of all results. */

	// console.log(db);
	let stmt = db
		.prepare('SELECT moveName FROM moveList \
		WHERE character = @character COLLATE NOCASE');

	let queryResult = stmt.all({
		character: char,
	});

	if (!queryResult.length) {
		stmt = db
			.prepare('SELECT moveName FROM moveList \
			WHERE character LIKE @character COLLATE NOCASE');

		queryResult = stmt.all({
			character: char + '%',
		});
	}
	return queryResult;
};

/* module.exports = {

}; */
