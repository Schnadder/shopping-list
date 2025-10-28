<template>
  <ion-list>
    <ion-item
      v-for="item in sortedItems"
      :key="item.id"
      button
      @click="$emit('toggle-done', item.id)"
    >
      <ion-label :class="{ done: item.done }">
        {{ item.text }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonList, IonItem, IonLabel } from '@ionic/vue'

interface ListItem {
  id: string
  text: string
  done: boolean
  order: number
}

const props = defineProps<{
  items: ListItem[]
}>()

defineEmits<{
  (e: 'toggle-done', id: string): void
  (e: 'reorder', newOrder: ListItem[]): void
}>()

const sortedItems = computed(() => {
  const unfinished = props.items.filter(i => !i.done)
  const done = props.items.filter(i => i.done)
  return [...unfinished, ...done]
})
</script>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
