import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
const path = require('path');
// import path from 'path';

export default async function handler(_: NextApiRequest, response: NextApiResponse) {
  const file = path.join(process.cwd(), 'decks/transformed/decks.json');
  const stringified = readFileSync(file, 'utf8');

  response.setHeader('Content-Type', 'application/json');
  return response.end(stringified);
}
