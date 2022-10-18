import StakeHolderMeetingsCards from './decks/stakeholder-meetings.json'

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
    id: 'stakeholder-meetings',
    name: 'Stakeholder meetings',
    cards: StakeHolderMeetingsCards,
  },
  {
    id: 'test-deck',
    name: 'Deck with an insanely long title',
    cards: StakeHolderMeetingsCards,
  },
]
