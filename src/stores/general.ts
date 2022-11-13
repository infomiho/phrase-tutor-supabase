import type { Langauges } from "@/models/question";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneralStore = defineStore("general", () => {
  const isIntroVisible = ref(!loadIntroDismissed());
  const langs = loadLangs();
  const questionLang = ref(langs.questionLang);
  const answerLang = ref(langs.answerLang);

  function dismissIntro() {
    isIntroVisible.value = false;
    saveIntroDismissed();
  }

  function switchLanguage() {
    const temp = questionLang.value;
    questionLang.value = answerLang.value;
    answerLang.value = temp;
    saveLangs(questionLang.value, answerLang.value);
  }

  return {
    isIntroVisible,
    dismissIntro,
    questionLang,
    answerLang,
    switchLanguage,
  };
});

function saveIntroDismissed() {
  localStorage.setItem("introDismissed", "true");
}

function loadIntroDismissed() {
  return localStorage.getItem("introDismissed") === "true";
}

function saveLangs(questionLang: string, answerLang: string) {
  localStorage.setItem("questionLang", questionLang);
  localStorage.setItem("answerLang", answerLang);
}

function loadLangs(): { questionLang: Langauges; answerLang: Langauges } {
  const questionLang = localStorage.getItem("questionLang");
  const answerLang = localStorage.getItem("answerLang");
  return {
    questionLang: isLanguage(questionLang) ? questionLang : "en",
    answerLang: isLanguage(answerLang) ? answerLang : "it",
  };
}

function isLanguage(lang: any): lang is Langauges {
  return lang === "en" || lang === "it";
}
