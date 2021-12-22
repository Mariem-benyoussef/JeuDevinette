<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Devinez le nombre</ion-title>
        <div>
            {{ time }}
        </div>
      </ion-toolbar>
    </ion-header>
    

    <ion-content :fullscreen="true">
      <section class="full-width">
        <div>
        <ion-button expand="full" color="success" @click="myFunction()">NOUVEAU</ion-button>
        <!-- <p>Random Number = {{randomNumber}}</p> -->
        </div>
        <div>
        <ion-button expand="full" color="warning" router-link="/jeu/score">SCORES</ion-button>
        </div>
        
        <br>
        <br>
        <ion-list>
        <ion-item>
          <ion-label>Entrez un nombre</ion-label>
          <ion-input v-model="guess"></ion-input>
        </ion-item>
        <ion-button color="primary" size="medium" @click="comparaison();attemptsHist()">OK</ion-button>
        <br>
        <br>
        <div>
        <h4 id="resultat">{{res}}</h4>
        <ion-item>
          <ion-label v-if="success==true">Entrez votre nom</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <div v-if="success==true" >
          <h3 class="success">Bonjour {{name}} votre score est {{score}}</h3>
          <br>
          <ion-button @click="addData()">Ajout</ion-button>
        </div>
        <br>
        <br>
        <div>
          <h3 id="historique"> Historique de tentatives </h3>
          <ion-item >
            <ion-list><h4 v-for="attempt in attempts" :key="attempt">{{attempt.guessC}} {{attempt.guess}} {{attempt.finalResult}}</h4></ion-list>
          </ion-item>
        </div>
        </div>
        </ion-list>
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
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  
  } from '@ionic/vue';
import { defineComponent } from 'vue';

import axios from 'axios';
const baseURL="http://localhost:3000/joueurs/";


export default defineComponent({
  name: 'Jeu',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
  },

  data(){ 
      return{
        res:'',
        score:0,
        randomNumber: 0,
        guess:0,
        maxOfGuesses: 5,
        guessCount : 0,
        success:false,
        name:'',
        attempts:[{
          guessC:'',
          guess:'',
          finalResult:'',
        },],
        time: 0,
        isRunning: false,
        interval: 0
        }
    
  
  },
  
  methods:{
      toggleTimer() {
        this.interval = setInterval(this.incrementTime, 1000);
        this.isRunning = !this.isRunning
    },
    incrementTime() {
      this.time = this.time + 1;
    },

stops(){
if (this.isRunning) {
        clearInterval(this.interval);
        console.log('timer stops');
      } 
},

  myFunction(){
      this.randomNumber = (Math.trunc(Math.random()*100));
      console.log(this.randomNumber);
      this.toggleTimer();

    },


   
    comparaison(){
      if(this.randomNumber == this.guess)
        {
        this.guessCount+=1;
        this.res="Félicitations vous avez gagné!";
        this.score=(5-this.guessCount+1)*10;
        this.success=true;
        this.stops();
        }
      else
        {
        // console.log("counter"+this.guessCount)
        // this.guessCount+=1;
        // console.log("Counter after adding" + this.guessCount)
        if(this.guessCount>this.maxOfGuesses)
        {
          this.res="Vous avez perdu!"
          this.time=0;
          this.stops();
          
        }
        else
        {
          this.guessCount+=1;
          if (this.randomNumber>this.guess){
              this.res="Le nombre à deviner est plus grand!";
            }
          else if (this.randomNumber<this.guess){
              this.res="Le nombre à deviner est plus petit!"
            }
        }
        }
        return false;	

        },


      attemptsHist(){
        this.attempts.push({guessC: String(this.guessCount), guess: String(this.guess) , finalResult: this.res})
        console.log(this.attempts)
      },

      

    async addData(){
      if (this.name!=""){
        axios.post(baseURL,
          {
        name:this.name,
        score:this.score,
        time:this.time,
          }).then(()=>{
        this.$router.push('jeu');
        alert("Ajouté avec succès");
          });
      }
      else{
        alert("Entrez votre nom");
      }
    },



}
});
</script>

<style scoped>
ion-title{
  text-align: center;
  font-size: 15pt;
}

.success{
  color: green;
  text-align: center;
}
#historique{
  color: red;
  text-align: center;
  font-weight: bold;
}

#resultat{
  text-align: center;
  font-weight:bold ;

}
.center{
  text-align: center;
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