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
    <ion-button size="small" @click="onCreateList">
      + New List
    </ion-button>

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
import { IonSegment, IonSegmentButton, IonButton, alertController } from '@ionic/vue'

interface List {
  id: string
  name: string
}

const props = defineProps<{
  lists: List[]
  activeListId: string
}>()

const emit = defineEmits<{
  (e: 'select-list', id: string): void
  (e: 'create-list', name: string): void
  (e: 'delete-list', id: string): void
}>()

function onSegmentChange(ev: CustomEvent) {
  const id = ev.detail.value
  if (id) {
    emit('select-list', id)
  }
}

// NEW: show alert to get the list name and emit it
async function onCreateList() {
  const alert = await alertController.create({
    header: 'New List',
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'List name',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Create',
        handler: (data: any) => {
          const name = (data?.name ?? '').trim()
          if (name) {
            emit('create-list', name)
          }
          // If empty, do nothing
        },
      },
    ],
  })

  await alert.present()
}
</script>
