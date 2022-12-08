import * as tools from './tools.mjs';
import fs from 'fs';

console.log('importing translations...');

export const convert = (async () => {
	const translations = await tools.getTranslations();

	fs.writeFile('../data/translations.json', JSON.stringify(translations), () => {
		console.log('finished')
	});
})();

