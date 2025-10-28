export interface ListItem {
  id: string
  text: string
  done: boolean
  order: number
}

export interface ShoppingList {
  id: string
  name: string
  items: ListItem[]
}