<template>
  <ion-segment :value="activeListId" @ionChange="onSegmentChange">
    <ion-segment-button
      v-for="list in lists"
      :key="list.id"
      :value="list.id"
    >
      {{ list.name }}
    </ion-segment-button>
  </ion-segment>

  <div class="ion-padding">
    <ion-button size="small" @click="$emit('create-list')">+ New List</ion-button>
    <ion-button
      size="small"
      color="danger"
      :disabled="lists.length <= 1"
      @click="$emit('delete-list', activeListId)"
    >
      Delete List
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { IonSegment, IonSegmentButton, IonButton } from '@ionic/vue'

interface List {
  id: string
  name: string
}

defineProps<{
  lists: List[]
  activeListId: string
}>()

const emit = defineEmits<{
  (e: 'select-list', id: string): void
  (e: 'create-list'): void
  (e: 'delete-list', id: string): void
}>()

function onSegmentChange(ev: CustomEvent) {
  const id = ev.detail.value
  if (id) {
    emit('select-list', id)
  }
}
</script>
