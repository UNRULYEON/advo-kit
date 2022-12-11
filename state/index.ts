import { atom } from 'jotai'

type Kit = {
  id: string
  name: string
}

const kits: Kit[] = [
  { id: 'stakeholder-meeting', name: 'Stakeholder meeting' }
]

export const currentKitAtom = atom<Kit['id']>(kits[0].id)

export const availableKitsAtom = atom<Kit[]>((get) => kits.filter((kit) => kit.id !== get(currentKitAtom)))