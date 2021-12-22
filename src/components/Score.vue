<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="jeu"></ion-back-button>
        </ion-buttons>
        <ion-title>Les Scores</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <section class="full-width">
        <ion-item v-for="joueur in joueurs" :key="joueur">
          <ion-list>{{joueur.name}} score: {{joueur.score}} time: {{joueur.time}}</ion-list>
        </ion-item>
        
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonList,


  
  } from '@ionic/vue';
import { defineComponent } from 'vue';

import axios from 'axios';
const baseURL="http://localhost:3000/joueurs?_sort=score,time&_order=desc,asc";


export default defineComponent({
  name: 'Score',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonItem,
    IonList,
  },

  data(){ 
    return { joueurs: [] };
  },
  
  created(){
  try{
    axios
        .get(baseURL)
        .then((response) => {
          this.joueurs = response.data;
        });
  }
  catch (e) {
      console.error("erreur"+e);
    }
},






});
</script>

<style scoped>
ion-title{
  text-align: center;
  font-size: 15pt;
}

#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>