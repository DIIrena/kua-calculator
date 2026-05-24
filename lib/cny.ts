// Server-side port of public/calculator/cny.js. Same Chinese New Year
// table; same effectiveKuaYear adjustment logic.

const CHINESE_NEW_YEAR: Record<number, string> = {
  1900: "01-31", 1901: "02-19", 1902: "02-08", 1903: "01-29", 1904: "02-16",
  1905: "02-04", 1906: "01-25", 1907: "02-13", 1908: "02-02", 1909: "01-22",
  1910: "02-10", 1911: "01-30", 1912: "02-18", 1913: "02-06", 1914: "01-26",
  1915: "02-14", 1916: "02-03", 1917: "01-23", 1918: "02-11", 1919: "02-01",
  1920: "02-20", 1921: "02-08", 1922: "01-28", 1923: "02-16", 1924: "02-05",
  1925: "01-24", 1926: "02-13", 1927: "02-02", 1928: "01-23", 1929: "02-10",
  1930: "01-30", 1931: "02-17", 1932: "02-06", 1933: "01-26", 1934: "02-14",
  1935: "02-04", 1936: "01-24", 1937: "02-11", 1938: "01-31", 1939: "02-19",
  1940: "02-08", 1941: "01-27", 1942: "02-15", 1943: "02-05", 1944: "01-25",
  1945: "02-13", 1946: "02-02", 1947: "01-22", 1948: "02-10", 1949: "01-29",
  1950: "02-17", 1951: "02-06", 1952: "01-27", 1953: "02-14", 1954: "02-03",
  1955: "01-24", 1956: "02-12", 1957: "01-31", 1958: "02-18", 1959: "02-08",
  1960: "01-28", 1961: "02-15", 1962: "02-05", 1963: "01-25", 1964: "02-13",
  1965: "02-02", 1966: "01-21", 1967: "02-09", 1968: "01-30", 1969: "02-17",
  1970: "02-06", 1971: "01-27", 1972: "02-15", 1973: "02-03", 1974: "01-23",
  1975: "02-11", 1976: "01-31", 1977: "02-18", 1978: "02-07", 1979: "01-28",
  1980: "02-16", 1981: "02-05", 1982: "01-25", 1983: "02-13", 1984: "02-02",
  1985: "02-20", 1986: "02-09", 1987: "01-29", 1988: "02-17", 1989: "02-06",
  1990: "01-27", 1991: "02-15", 1992: "02-04", 1993: "01-23", 1994: "02-10",
  1995: "01-31", 1996: "02-19", 1997: "02-07", 1998: "01-28", 1999: "02-16",
  2000: "02-05", 2001: "01-24", 2002: "02-12", 2003: "02-01", 2004: "01-22",
  2005: "02-09", 2006: "01-29", 2007: "02-18", 2008: "02-07", 2009: "01-26",
  2010: "02-14", 2011: "02-03", 2012: "01-23", 2013: "02-10", 2014: "01-31",
  2015: "02-19", 2016: "02-08", 2017: "01-28", 2018: "02-16", 2019: "02-05",
  2020: "01-25", 2021: "02-12", 2022: "02-01", 2023: "01-22", 2024: "02-10",
  2025: "01-29", 2026: "02-17", 2027: "02-06", 2028: "01-26", 2029: "02-13",
  2030: "02-03", 2031: "01-23", 2032: "02-11", 2033: "01-31", 2034: "02-19",
  2035: "02-08", 2036: "01-28", 2037: "02-15", 2038: "02-04", 2039: "01-24",
  2040: "02-12", 2041: "02-01", 2042: "01-22", 2043: "02-10", 2044: "01-30",
  2045: "02-17", 2046: "02-06", 2047: "01-26", 2048: "02-14", 2049: "02-02",
  2050: "01-23",
};

const MONTH_NAME = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export type CnyAdjustment =
  | { year: number; adjusted: false }
  | { year: number; adjusted: true; cnyLabel: string; cnyYear: number; cnyMonth: number; cnyDay: number }
  | { year: number; adjusted: null; message: string };

export function effectiveKuaYear(year: number, month: number, day: number): CnyAdjustment {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new TypeError("year, month, and day must all be integers.");
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    throw new TypeError("month must be 1-12 and day must be 1-31.");
  }
  const cny = CHINESE_NEW_YEAR[year];
  if (!cny) {
    return {
      year,
      adjusted: null,
      message: "Chinese New Year date for " + year + " is outside our table; using Gregorian year.",
    };
  }
  const [cnyMonthStr, cnyDayStr] = cny.split("-");
  const cnyMonth = parseInt(cnyMonthStr, 10);
  const cnyDay = parseInt(cnyDayStr, 10);
  const beforeCny = month < cnyMonth || (month === cnyMonth && day < cnyDay);
  if (beforeCny) {
    return {
      year: year - 1,
      adjusted: true,
      cnyMonth,
      cnyDay,
      cnyYear: year,
      cnyLabel: MONTH_NAME[cnyMonth - 1] + " " + cnyDay + ", " + year,
    };
  }
  return { year, adjusted: false };
}

export { MONTH_NAME };
