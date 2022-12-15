export type Card = {
  question: string
}

export type Kit = {
  id: string
  name: string
  cards: Card[]
}

const kits = [
  {
    id: 'stakeholder-meeting',
    name: 'Stakeholder meeting',
    cards: [
      {
        "question": "Does this meet all functional requirements?",
      },
      {
        "question": "Why do we want this?",
      },
      {
        "question": "What are the business goals?",
      },
      {
        "question": "What problem are we trying to solve?",
      },
      {
        "question": "Who is involved, other than the stakeholders in the room?",
      },
      {
        "question": "What are the functional requirements?",
      },
      {
        "question": "Does this effectively reflect the brand?",
      },
      {
        "question": "What are the risks of doing this?",
      },
      {
        "question": "Do we need research?",
      }
    ]
  }
]

export default kits