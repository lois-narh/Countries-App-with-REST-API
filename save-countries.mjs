import { writeFileSync, mkdirSync } from "node:fs";

const baseUrl =
  "https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,names.native,codes.alpha_3,flag.url_png,flag.description,population,region,subregion,capitals,tlds,currencies,languages,borders";

const all = [];

for (const offset of [0, 100, 200]) {
  const res = await fetch(`${baseUrl}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${process.env.VITE_API_KEY}` },
  });
  const result = await res.json();
  if (result.errors) throw new Error(result.errors[0].message);
  all.push(...result.data.objects);
}

mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/countries.json", JSON.stringify(all));
console.log(`Saved ${all.length} countries`);