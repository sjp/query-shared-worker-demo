export interface Paged<T> {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export default async function fetchJson<T>(...args: Parameters<typeof fetch>): Promise<T> {
  const res = await fetch(...args);
  // Response.json() is `any`; the caller's type argument is the only contract.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return (await res.json()) as T;
}
