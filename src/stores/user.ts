import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/services/supabase";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | undefined | null>(null);

  function signIn() {
    supabase.auth.signInWithOAuth({ provider: "google" });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      user.value = null;
    }
  }

  async function initUser() {
    const response = await supabase.auth.getUser();
    user.value = response.data.user?.user_metadata as User;
  }

  return { user, signIn, signOut, initUser };
});

type User = { name: string; picture: string };
