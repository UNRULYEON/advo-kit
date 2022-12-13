import { atom } from 'jotai'

type Kit = {
  id: string
  name: string
}

const kits: Kit[] = [
  { id: 'stakeholder-meeting', name: 'Stakeholder meeting' }
]

export const currentKitAtom = atom<Kit>(kits[0])

export const availableKitsAtom = atom<Kit[]>((get) => kits.filter((kit) => kit.id !== get(currentKitAtom).id))