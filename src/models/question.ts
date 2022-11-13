const languages = {
  en: "en",
  it: "it",
};
type Langauges = keyof typeof languages;

export type Question = {
  id: number;
  group: string;
  translations: Record<Langauges, string>;
};
