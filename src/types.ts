export interface Country {
  names: { common: string };
  flag: { url_png: string; description: string };
  population: number;
  region: string;
  capitals: { name: string }[];
}