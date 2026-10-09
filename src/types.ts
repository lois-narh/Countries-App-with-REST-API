export interface Country {
  names: {
    common: string;
    native?: Record<string, { common: string; official: string }>;
  };
  codes: { alpha_3: string };
  flag: { url_png: string; description: string };
  population: number;
  region: string;
  subregion?: string;
  capitals: { name: string }[];
  tlds?: string[];
  currencies?: { code: string; name: string; symbol: string }[];
  languages?: { name: string; native_name: string }[];
  borders?: string[];
}