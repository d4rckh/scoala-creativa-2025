import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function generateDailyChallenge(seed: number): string {
  function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function pickRandom<T>(arr: T[], seed: number): T {
    const index = Math.floor(seededRandom(seed) * arr.length);
    return arr[index];
  }

  const challengeTemplates: string[] = [
    "Mănâncă un {fruit} astăzi.",
    "Gătește ceva care conține {ingredient}.",
    "Cumpără și încearcă un fruct pe care nu l-ai mai mâncat până acum.",
    "Pregătește un smoothie cu {fruit} și {vegetable}.",
    "Evită zahărul rafinat azi și încearcă să-l înlocuiești cu {sweetener}.",
    "Pregătește o salată folosind {leafy_green} și adaugă un dressing sănătos.",
    "Mănâncă un mic dejun bogat în {nutrient} (ex: ovăz, semințe, etc.).",
    "Consumă un preparat tradițional dintr-o altă țară, inspirat din bucătăria {cuisine}.",
    "Încearcă să bei cel puțin {liters} litri de apă azi.",
    "Gătește o cină fără carne, folosind {protein_source}.",
    "Include în meniul de azi o porție de {fiber_source}.",
    "Renunță la băuturile carbogazoase și bea apă sau ceai.",
    "Mănâncă o porție de legume crude, cum ar fi {raw_veggie}.",
    "Pregătește o supă sau ciorbă folosind {vegetable}.",
    "Experimentează cu un condiment nou: {spice}.",
    "Consumă un aliment bogat în {vitamin}.",
    "Înlocuiește desertul cu un fruct proaspăt: {fruit}.",
    "Gătește o rețetă fără gluten azi.",
    "Pregătește un mic dejun bogat în proteine folosind {protein_source}.",
    "Încearcă o rețetă vegană cu {vegetable} ca ingredient principal.",
    "Bea un ceai de plante și relaxează-te 10 minute.",
    "Evită alimentele procesate azi.",
    "Mănâncă doar alimente de culoare {color} azi.",
    "Pregătește o tartă, plăcintă sau desert sănătos folosind {fruit}.",
    "Gătește cu un ingredient local cumpărat de la piață.",
    "Pregătește o gustare sănătoasă cu {nuts_or_seeds}.",
    "Fă-ți un sandviș sănătos cu {whole_grain_bread} și {protein_source}.",
    "Încearcă un suc fresh de {fruit} și {vegetable}.",
    "Renunță la cafea azi și bea ceai verde.",
    "Gătește ceva care conține minimum 5 culori diferite."
  ];

  const fruits = ["măr", "banană", "portocală", "kiwi", "căpșună", "ananas", "prună"];
  const vegetables = ["morcov", "broccoli", "ardei", "dovlecel", "spanac", "conopidă"];
  const leafyGreens = ["salată verde", "baby spanac", "rucola", "varză kale"];
  const sweeteners = ["miere", "sirop de arțar", "sirop de agave", "fructe uscate"];
  const nutrients = ["fibre", "proteine", "omega-3", "vitamina C", "fier"];
  const cuisines = ["italiană", "mexicană", "indiană", "chinezească", "libaneză"];
  const liters = ["2", "2.5", "3"];
  const proteinSources = ["linte", "năut", "tofu", "quinoa", "fasole roșie"];
  const fiberSources = ["fulgi de ovăz", "semințe de chia", "leguminoase"];
  const rawVeggies = ["morcov", "țelină", "ardei gras", "castravete"];
  const spices = ["curry", "turmeric", "coriandru", "chimion", "boia afumată"];
  const vitamins = ["vitamina C", "vitamina D", "calciu", "fier"];
  const colors = ["verde", "roșu", "galben", "portocaliu", "mov"];
  const nutsOrSeeds = ["migdale", "semințe de floarea-soarelui", "semințe de dovleac", "nuci"];
  const wholeGrainBreads = ["pâine integrală", "pâine cu secară", "pâine cu semințe"];
  const ingredients = [...fruits, ...vegetables, ...leafyGreens, ...proteinSources]

  const template = pickRandom(challengeTemplates, seed);

  let challenge = template;
  challenge = challenge.replace(/\{fruit\}/g, pickRandom(fruits, seed + 1));
  challenge = challenge.replace(/\{vegetable\}/g, pickRandom(vegetables, seed + 2));
  challenge = challenge.replace(/\{leafy_green\}/g, pickRandom(leafyGreens, seed + 3));
  challenge = challenge.replace(/\{sweetener\}/g, pickRandom(sweeteners, seed + 4));
  challenge = challenge.replace(/\{nutrient\}/g, pickRandom(nutrients, seed + 5));
  challenge = challenge.replace(/\{cuisine\}/g, pickRandom(cuisines, seed + 6));
  challenge = challenge.replace(/\{liters\}/g, pickRandom(liters, seed + 7));
  challenge = challenge.replace(/\{protein_source\}/g, pickRandom(proteinSources, seed + 8));
  challenge = challenge.replace(/\{fiber_source\}/g, pickRandom(fiberSources, seed + 9));
  challenge = challenge.replace(/\{raw_veggie\}/g, pickRandom(rawVeggies, seed + 10));
  challenge = challenge.replace(/\{spice\}/g, pickRandom(spices, seed + 11));
  challenge = challenge.replace(/\{vitamin\}/g, pickRandom(vitamins, seed + 12));
  challenge = challenge.replace(/\{color\}/g, pickRandom(colors, seed + 13));
  challenge = challenge.replace(/\{nuts_or_seeds\}/g, pickRandom(nutsOrSeeds, seed + 14));
  challenge = challenge.replace(/\{whole_grain_bread\}/g, pickRandom(wholeGrainBreads, seed + 15));
  challenge = challenge.replace(/\{ingredient\}/g, pickRandom(ingredients, seed + 16));

  return challenge;
}

type RankInfo = {
  rank: string;
  nextLevelName: string | null;
  nextLevelXP: number | null;
  progressPercent: number;
};

export function todayChallenge(offsetDay: number = 0) {
  const today = new Date();

  today.setDate(today.getDate() + offsetDay);

  const seed = parseInt(
    `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`
  );

  return generateDailyChallenge(seed);
}

export function getUserRankInfo(currentXP: number): RankInfo {
  const ranks = [
    { name: "începător", xp: 0 },
    { name: "intermediar", xp: 500 },
    { name: "avansat", xp: 1500 },
    { name: "expert", xp: 3000 },
    { name: "guru al sănătății", xp: 5000 },
  ];

  let currentRank = ranks[0];
  let nextRank = null;

  for (let i = 0; i < ranks.length; i++) {
    if (currentXP >= ranks[i].xp) {
      currentRank = ranks[i];
      nextRank = ranks[i + 1] ?? null;
    } else {
      break;
    }
  }

  const nextLevelXP = nextRank ? nextRank.xp - currentXP : null;
  const totalToNext = nextRank ? nextRank.xp - currentRank.xp : 0;
  const progress = nextRank
    ? ((currentXP - currentRank.xp) / totalToNext) * 100
    : 100;

  return {
    rank: currentRank.name,
    nextLevelName: nextRank ? nextRank.name : null,
    nextLevelXP,
    progressPercent: Math.round(progress),
  };
}
