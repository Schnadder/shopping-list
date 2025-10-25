<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Shopping Lists</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button expand="block" @click="goToList">Go to example list</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToList = () => {
  router.push('/list/example')
}
</script>
