import StakeHolderMeetingCards from './decks/stakeholder-meeting.json'

export type Card = {
  id: string
  question: string
  image: string
}

export type Deck = {
  id: string
  name: string
  cards: Card[]
}

export const Decks: Deck[] = [
  {
    id: 'stakeholder-meeting',
    name: 'Stakeholder meeting',
    cards: StakeHolderMeetingCards,
  },
]
