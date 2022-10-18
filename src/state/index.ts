import { atom } from 'jotai'
import { Deck, Decks as _Decks } from '../constants'

export const selectedDeckAtom = atom<Deck>(_Decks[0])

const decksAtomMutable = atom(_Decks)
export const decksAtom = atom((get) => get(decksAtomMutable))
