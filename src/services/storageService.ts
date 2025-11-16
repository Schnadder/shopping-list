import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import type { ShoppingList } from '../types/shopping'

const FILE_NAME = 'shopping-lists.json'

export async function saveLists(lists: ShoppingList[]): Promise<void> {
  try {
    const data = JSON.stringify(lists)
    await Filesystem.writeFile({
      path: FILE_NAME,
      data,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    })
  } catch (err) {
    console.error('Error saving lists', err)
  }
}

export async function loadLists(): Promise<ShoppingList[]> {
  try {
    const result = await Filesystem.readFile({
      path: FILE_NAME,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    })
    return JSON.parse(result.data as string) as ShoppingList[]
  } catch (err: any) {
    if (err.message?.includes('File does not exist')) {
      // No file yet — return empty array (first startup)
      return []
    }
    console.error('Error loading lists', err)
    return []
  }
}

export async function deleteAllLists(): Promise<void> {
  try {
    await Filesystem.deleteFile({
      path: FILE_NAME,
      directory: Directory.Data,
    })
  } catch (err) {
    console.error('Error deleting lists file', err)
  }
}
