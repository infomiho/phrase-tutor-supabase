import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  const isIntroVisible = ref(!loadIntroDismissed());

  function dismissIntro() {
    isIntroVisible.value = false;
    saveIntroDismissed();
  }

  return {
    isIntroVisible,
    dismissIntro,
  };
});

function saveIntroDismissed() {
  localStorage.setItem("introDismissed", "true");
}

function loadIntroDismissed() {
  return localStorage.getItem("introDismissed") === "true";
}
