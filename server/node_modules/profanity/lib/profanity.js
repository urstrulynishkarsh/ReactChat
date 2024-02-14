"use strict";

var exprProfanity = require('./wordlist');

var config = {
	"enabled": true,
	"level": 7
}

exports.addProfanity = function (str) {
	if (config.enabled != true) return;

	if (!str || str.length < 1) {
		console.error('No text provided');
		return;
	}
	str = str.toString();

	return generateProfanity(str);
}

function useProfanity () {
	var max = 10,
		level = parseInt(config.level, 10);

	if (level > 10) level = 10;
	if (level < 1) return false;


	return Math.floor(Math.random() * (max - level + 1) + level) <= level;
}

function generateProfanity (str) {
	var subjects = exprProfanity.subject.formal.join('|'),
		subjectsRE = new RegExp('[\\s](' + subjects + ')[\\s.]|^(' + subjects + ')[\\s.]', 'gim'),
		possessives = exprProfanity.possessive.formal.join('|'),
		possessivesRE = new RegExp('[\\s](' + possessives + ')[\\s.]|^(' + possessives + ')[\\s.]', 'gim');

	return str.replace(subjectsRE, function (match) {
		var index = exprProfanity.subject.formal.indexOf(match.toLowerCase().replace(/(\s+)/g, '')),
			profaneList = exprProfanity.subject.profane[index],
			replacement = profaneList[Math.floor(Math.random() * (profaneList.length))],
			newlines = match.match(/^([\n\r]|\.\s).*([\n\r]?)/i),
			firstOfAll = match.match(/^[A-Z]/);

		if (newlines) {
			replacement = newlines[1] + replacement.slice(0, 1).toUpperCase() + replacement.slice(1) + (newlines[2] || ' ');
		} else if (firstOfAll) {
			replacement = replacement.slice(0, 1).toUpperCase() + replacement.slice(1) + ' ';
		} else {
			replacement = ' ' + replacement + ' ';
		}

		return replacement;
	}).replace(possessivesRE, function (match) {
		var profaneList = exprProfanity.possessive.profane,
			replacement = profaneList[Math.floor(Math.random() * (profaneList.length))];

		return match + replacement + ' ';
	});
}
