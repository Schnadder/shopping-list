<template>
  <ion-item>
    <ion-input
      v-model="text"
      placeholder="Add new item..."
      @keyup.enter="addItem"
      autofocus
    ></ion-input>
  </ion-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonItem, IonInput } from '@ionic/vue'

const text = ref('')

const emit = defineEmits<{
  (e: 'add-item', value: string): void
}>()

function addItem() {
  const value = text.value.trim()
  if (value) {
    emit('add-item', value)
    text.value = ''
  }
}
</script>
