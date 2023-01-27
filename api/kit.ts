import { NextApiRequest, NextApiResponse } from 'next';
import kits from '../src/kits';

export default function handler(_: NextApiRequest, response: NextApiResponse) {
  response.status(200).json(kits);
}
