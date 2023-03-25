import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'fs';

const DECKS_PATH = './decks';
const DECKS_TRANSFORMED_NAME = 'decks.json';
const DECKS_TRANSFORMED_PATH = `${DECKS_PATH}/transformed`;
const FILE_NAME_PREFIX = 'Advokit Decks - ';

const decks = [];

try {
  const files = readdirSync(DECKS_PATH, { withFileTypes: true })
    .filter((file) => file.isFile())
    .map((file) => file.name);

  files.map((file) => {
    const FILE_NAME = file.split('.')[0].slice(FILE_NAME_PREFIX.length);
    const FILE_PATH = `${DECKS_PATH}/${file}`;

    try {
      const file = readFileSync(FILE_PATH, 'utf8');

      const questions = file.split('\n').map((d) => d.replace('\r', ''));
      questions.shift();

      const deck = {
        id: FILE_NAME.toLowerCase().replace(' ', '-'),
        name: FILE_NAME,
        cards: questions.map((question) => ({
          question: question.trim().replace(/^"(.*)"$/, '$1'),
        })),
      };

      decks.push(deck);
    } catch (err) {
      console.error(err);
    }
  });
} catch (err) {
  console.error(err);
}

try {
  mkdirSync(DECKS_TRANSFORMED_PATH, { recursive: true });
  writeFileSync(`${DECKS_TRANSFORMED_PATH}/${DECKS_TRANSFORMED_NAME}`, JSON.stringify(decks));
} catch (err) {
  console.error(err);
}

console.log(`✅ ${decks.length} decks transformed`);
