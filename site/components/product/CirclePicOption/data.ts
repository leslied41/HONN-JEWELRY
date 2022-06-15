export type dataType =
  | {
      id: number
      name: string
      src: string
    }[]
  | undefined
export const dataA: dataType = [
  {
    id: 1,
    name: 'a',
    src: '/landing_bg2.jpg',
  },
  {
    id: 2,
    name: 'b',
    src: '/landing_bg2.jpg',
  },
  {
    id: 3,
    name: 'c',
    src: '/landing_bg2.jpg',
  },
  {
    id: 4,
    name: 'd',
    src: '/landing_bg2.jpg',
  },
]
export const dataB: dataType = [
  {
    id: 1,
    name: 'a',
    src: '/landing_bg2.jpg',
  },
  {
    id: 2,
    name: 'b',
    src: '/landing_bg2.jpg',
  },
]
export const titleA = 'Setting:'
export const titleB = 'Band:'
