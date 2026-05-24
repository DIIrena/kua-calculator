// Server-side port of public/calculator/kua.js. Same algorithm, typed.
// The client and server both compute the Kua; the server is the source
// of truth for what gets persisted to saved_charts.

export type Gender = "male" | "female";
export type KuaGroup = "east" | "west";

function reduceToSingleDigit(n: number): number {
  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

export function calculateKua(year: number, gender: Gender): number {
  if (!Number.isInteger(year)) {
    throw new TypeError("year must be an integer (e.g. 1978).");
  }
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 1) {
    throw new TypeError(
      "year must be between 1900 and " + (currentYear + 1) + ".",
    );
  }
  if (gender !== "male" && gender !== "female") {
    throw new TypeError("gender must be 'male' or 'female'.");
  }

  const lastTwo = year % 100;
  const reduced = reduceToSingleDigit(lastTwo);
  const post2000 = year >= 2000;
  let kua: number;

  if (gender === "male") {
    const subtractFrom = post2000 ? 9 : 10;
    kua = subtractFrom - reduced;
    if (kua <= 0) kua += 9;
    if (kua === 5) kua = 2;
  } else {
    const addend = post2000 ? 6 : 5;
    kua = reduceToSingleDigit(reduced + addend);
    if (kua === 5) kua = 8;
  }

  return kua;
}

export function kuaGroup(kua: number): KuaGroup {
  if (kua === 1 || kua === 3 || kua === 4 || kua === 9) return "east";
  if (kua === 2 || kua === 6 || kua === 7 || kua === 8) return "west";
  throw new TypeError("kua must be 1, 2, 3, 4, 6, 7, 8, or 9.");
}
