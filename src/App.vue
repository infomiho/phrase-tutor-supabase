<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, RouterLink } from "vue-router";
import { useGeneralStore } from "./stores/general";
import { usePhrasesStore } from "@/stores/phrases";
import { useUserStore } from "./stores/user";
import { getFullURL } from "./utilities/audio";

const generalStore = useGeneralStore();
const phrasesStore = usePhrasesStore();
const userStore = useUserStore();

function unlockAudio() {
  const audioURL = getFullURL(1, "it");
  const sound = new Audio(audioURL);

  sound.play();
  sound.pause();
  sound.currentTime = 0;

  document.body.removeEventListener("click", unlockAudio);
  document.body.removeEventListener("touchstart", unlockAudio);
}

document.body.addEventListener("click", unlockAudio);
document.body.addEventListener("touchstart", unlockAudio);

onMounted(() => {
  phrasesStore.fetchPhrases();
  userStore.initUser();
});
</script>

<template>
  <header>
    <div class="header__title">
      <router-link to="/">
        <h2>Phrase Tutor</h2>
      </router-link>
      <router-link to="/stats">
        <h2 class="stats">Stats</h2>
      </router-link>
    </div>
    <div class="header__side">
      <div v-if="userStore.user" class="user">
        <div class="profile">
          <img :src="userStore.user.picture" alt="" /> {{ userStore.user.name }}
        </div>
        <a href="#" @click.prevent="userStore.signOut">Logout</a>
      </div>
      <a v-else href="#" @click.prevent="userStore.signIn">Login</a>
    </div>
  </header>

  <div class="intro" v-if="generalStore.isIntroVisible">
    <p>
      Hey, welcome to Phrase Tutor. Let's learn Italian language by learning the
      96 phrases we prepared.
    </p>
    <p>
      The system will first ask you all of the phrases. Then it will prioritise
      the phrases you didn't know. Just keep hitting next until you are 100%
      correct 😊
    </p>
    <p>
      <strong>Quick tutorial:</strong> when you see a phrase, try to remember
      the translation. If you know it, hit "I knew it", otherwise hit "Nope".
    </p>
    <div>
      <button @click="generalStore.dismissIntro" class="dismiss">Got it</button>
    </div>
  </div>

  <RouterView />

  <footer>
    <p>
      Made with ❤️ by
      <a href="https://ilakovac.com" target="_blank">Miho</a>
    </p>
  </footer>
</template>

<style scoped>
header {
  padding: 1rem 0;
}

.header__title {
  margin-bottom: 1rem;
}

.header__title a + a {
  margin-left: 1rem;
}

.header__title a.router-link-active h2 {
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
}

h2 {
  background-color: #00abb3;
  color: #fff;
  display: inline-block;
  font-weight: 700;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
}

h2.stats {
  background-color: #333;
}

h2:hover {
  opacity: 0.8;
}

@media (min-width: 768px) {
  header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 1rem 0 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}

.intro {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin: 0 auto 1rem;
  max-width: 800px;
}

.intro p + p {
  margin-top: 1rem;
}

button.dismiss {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button.dismiss:hover {
  background-color: #eee;
}

footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ccc;
  text-align: center;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user .profile {
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.user .profile:hover {
  background: #eee;
  border-radius: 10px;
  padding: 0.5rem;
}

.user .profile img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}
</style>
