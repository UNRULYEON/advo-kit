import { NextApiRequest, NextApiResponse } from 'next';

const kits = [
  {
    id: 'stakeholder-meeting',
    name: 'Stakeholder meeting',
    cards: [
      {
        question: 'Does this meet all functional requirements?',
      },
      {
        question: 'Why do we want this?',
      },
      {
        question: 'What are the business goals?',
      },
      {
        question: 'What problem are we trying to solve?',
      },
      {
        question: 'Who is involved, other than the stakeholders in the room?',
      },
      {
        question: 'What are the functional requirements?',
      },
      {
        question: 'Does this effectively reflect the brand?',
      },
      {
        question: 'What are the risks of doing this?',
      },
      {
        question: 'Do we need research?',
      },
    ],
  },
  {
    id: 'demo-kit-1',
    name: 'Demo Kit 1',
    cards: [
      {
        question: 'Question 1',
      },
      {
        question: 'Question 2',
      },
      {
        question: 'Question 3',
      },
      {
        question: 'Question 4',
      },
      {
        question: 'Question 5',
      },
      {
        question: 'Question 6',
      },
      {
        question: 'Question 7',
      },
      {
        question: 'Question 8',
      },
      {
        question: 'Question 9',
      },
      {
        question: 'Question 10',
      },
      {
        question: 'Question 11',
      },
      {
        question: 'Question 12',
      },
    ],
  },
  {
    id: 'demo-kit-2',
    name: 'Demo Kit 2',
    cards: [
      {
        question: 'Question 1',
      },
      {
        question: 'Question 2',
      },
      {
        question: 'Question 3',
      },
      {
        question: 'Question 4',
      },
      {
        question: 'Question 5',
      },
      {
        question: 'Question 6',
      },
      {
        question: 'Question 7',
      },
      {
        question: 'Question 8',
      },
      {
        question: 'Question 9',
      },
      {
        question: 'Question 10',
      },
      {
        question: 'Question 11',
      },
      {
        question: 'Question 12',
      },
    ],
  },
  {
    id: 'demo-kit-3',
    name: 'Demo Kit 3',
    cards: [
      {
        question: 'Question 1',
      },
      {
        question: 'Question 2',
      },
      {
        question: 'Question 3',
      },
      {
        question: 'Question 4',
      },
      {
        question: 'Question 5',
      },
      {
        question: 'Question 6',
      },
      {
        question: 'Question 7',
      },
      {
        question: 'Question 8',
      },
      {
        question: 'Question 9',
      },
      {
        question: 'Question 10',
      },
      {
        question: 'Question 11',
      },
      {
        question: 'Question 12',
      },
      {
        question: 'Question 13',
      },
      {
        question: 'Question 14',
      },
      {
        question: 'Question 15',
      },
      {
        question: 'Question 16',
      },
      {
        question: 'Question 17',
      },
    ],
  },
];

export default function handler(_: NextApiRequest, response: NextApiResponse) {
  response.status(200).json(kits);
}
