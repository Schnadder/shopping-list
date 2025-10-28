<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Shopping Lists</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Tabs at the top -->
      <list-tabs
        :lists="lists"
        :active-list-id="activeListId"
        @select-list="handleSelectList"
        @create-list="handleCreateList"
        @delete-list="handleDeleteList"
      />

      <!-- Input field for adding items -->
      <add-item-input
        v-if="activeList"
        @add-item="handleAddItem"
      />

      <!-- List of items -->
      <item-list
        v-if="activeList"
        :items="activeList.items"
        @toggle-done="handleToggleDone"
        @reorder="handleReorder"
      />

      <!-- Empty state TODO: remove when default list is implemented -->
      <div v-else class="ion-padding ion-text-center">
        <p>No lists yet.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import type { ShoppingList, ListItem } from '../types/shopping'


import ListTabs from '../components/ListTabs.vue'
import AddItemInput from '../components/AddItemInput.vue'
import ItemList from '../components/ItemList.vue'

// TODO: connect to storageService

const lists = ref<ShoppingList[]>([
  {
    id: 'default',
    name: 'Default List',
    items: [],
  },
])

const activeListId = ref('default')
const activeList = computed(() =>
  lists.value.find(l => l.id === activeListId.value)
)

// --- Event handlers ---
function handleSelectList(id: string) {
  activeListId.value = id
}

function handleCreateList() {
  const newId = Date.now().toString()
  lists.value.push({
    id: newId,
    name: `List ${lists.value.length + 1}`,
    items: [],
  })
  activeListId.value = newId
}

function handleDeleteList(id: string) {
  const index = lists.value.findIndex(l => l.id === id)
  if (index !== -1) {
    lists.value.splice(index, 1)
    if (activeListId.value === id && lists.value.length > 0) {
      activeListId.value = lists.value[0].id
    } else if (lists.value.length === 0) {
      activeListId.value = ''
    }
  }
}

function handleAddItem(text: string) {
  if (!activeList.value) return
  activeList.value.items.push({
    id: Date.now().toString(),
    text,
    done: false,
    order: activeList.value.items.length,
  })
}

function handleToggleDone(itemId: string) {
  const item = activeList.value?.items.find(i => i.id === itemId)
  if (item) {
    item.done = !item.done
  }
}

function handleReorder(newOrder: ListItem[]) {
  if (!activeList.value) return
  activeList.value.items = newOrder
}
</script>
