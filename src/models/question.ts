export const languages = {
  en: "en",
  it: "it",
};
export type Langauges = keyof typeof languages;

export type Question = {
  id: number;
  group: string;
  translations: Record<Langauges, string>;
};
