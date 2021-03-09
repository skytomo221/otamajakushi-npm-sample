import * as fs from 'fs';
import OTMJSON from 'otamajakushi';

const json = fs.readFileSync('./lojbantan-zei-jbovlaste.json', 'utf8');
const dictionary = OTMJSON.parse(json);
console.log(dictionary.words.length); // 辞書の単語数を調べる
