<template>
  <ion-item>
    <ion-input
      ref="inputRef"
      v-model="text"
      placeholder="Add new item..."
      @keyup.enter="addItem"
      autofocus
    ></ion-input>
  </ion-item>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { IonItem, IonInput } from '@ionic/vue'

const text = ref('')
const inputRef = ref<InstanceType<typeof IonInput> | null>(null)

const emit = defineEmits<{
  (e: 'add-item', value: string): void
}>()

function addItem() {
  const value = text.value.trim()
  if (!value) return

  emit('add-item', value)
  text.value = ''

  // Re-focus the input so the keyboard stays open
  nextTick(() => {
    inputRef.value?.$el.setFocus()
  })
}
</script>
