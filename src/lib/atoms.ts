import { atomWithStorage } from "jotai/utils";

export const currentXpAtom = atomWithStorage("xp", 0);
export const lastDayDidAtom = atomWithStorage<String | null>("lastDay", null)