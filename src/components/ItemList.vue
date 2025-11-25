<template>
  <ion-list>
    <!-- UNFINISHED ITEMS (top) -->
    <ion-reorder-group
      :disabled="false"
      @ionItemReorder="ev => onReorder(ev, false)"
    >
      <ion-item
        v-for="item in unfinishedItems"
        :key="item.id"
        button
        @click="$emit('toggle-done', item.id)"
      >
        <ion-label>
          {{ item.text }}
        </ion-label>
        <!-- drag handle on the right -->
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>

    <!-- DONE ITEMS (bottom) -->
    <ion-reorder-group
      v-if="doneItems.length"
      :disabled="false"
      @ionItemReorder="ev => onReorder(ev, true)"
    >
      <ion-item
        v-for="item in doneItems"
        :key="item.id"
        button
        @click="$emit('toggle-done', item.id)"
      >
        <ion-label class="done">
          {{ item.text }}
        </ion-label>
        <ion-reorder slot="end"></ion-reorder>
      </ion-item>
    </ion-reorder-group>
  </ion-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  IonList,
  IonItem,
  IonLabel,
  IonReorderGroup,
  IonReorder,
} from '@ionic/vue'
import type { ItemReorderEventDetail } from '@ionic/vue'

interface ListItem {
  id: string
  text: string
  done: boolean
  order: number
}

const props = defineProps<{
  items: ListItem[]
}>()

const emit = defineEmits<{
  (e: 'toggle-done', id: string): void
  (e: 'reorder', newOrder: ListItem[]): void
}>()

const unfinishedItems = computed(() => props.items.filter(i => !i.done))
const doneItems = computed(() => props.items.filter(i => i.done))

function reorderArray(arr: ListItem[], from: number, to: number): ListItem[] {
  const copy = [...arr]
  const [moved] = copy.splice(from, 1)
  copy.splice(to, 0, moved)
  return copy
}

function onReorder(
  ev: CustomEvent<ItemReorderEventDetail>,
  isDoneGroup: boolean,
) {
  const from = ev.detail.from
  const to = ev.detail.to

  const currentUnfinished = unfinishedItems.value
  const currentDone = doneItems.value

  const newUnfinished = isDoneGroup
    ? currentUnfinished
    : reorderArray(currentUnfinished, from, to)

  const newDone = isDoneGroup
    ? reorderArray(currentDone, from, to)
    : currentDone

  const merged = [...newUnfinished, ...newDone]

  emit('reorder', merged)

  ev.detail.complete()
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
