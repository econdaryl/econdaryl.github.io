export function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en-CA')
    .replace(/[’']/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
    .replace(/\bsaint\b/g, 'st').replace(/\bsainte\b/g, 'ste');
}
export function indexCities(cities) {
  const index = new Map();
  for (const city of cities) for (const alias of [city.name, ...city.aliases]) {
    const key = normalize(alias);
    if (!key) continue;
    if (!index.has(key)) index.set(key, new Set());
    index.get(key).add(city.id);
  }
  return index;
}
const provinceNames = {AB:'Alberta',BC:'British Columbia',MB:'Manitoba',NB:'New Brunswick',NL:'Newfoundland and Labrador',NS:'Nova Scotia',NT:'Northwest Territories',NU:'Nunavut',ON:'Ontario',PE:'Prince Edward Island',QC:'Quebec',SK:'Saskatchewan',YT:'Yukon'};
const provinceAliases = new Map(Object.entries(provinceNames).flatMap(([code,name]) => [[normalize(code),code],[normalize(name),code]]));
provinceAliases.set('newfoundland labrador','NL');
export function parseGuess(query, province='') {
  // A comma suffix is explicit; never silently discard an unknown province.
  const comma=query.lastIndexOf(',');
  if(comma>=0) return {name:query.slice(0,comma).trim(),province:provinceAliases.get(normalize(query.slice(comma+1))) || '__unknown__'};
  const normalized=normalize(query);
  for(const [suffix,code] of [...provinceAliases].sort((a,b)=>b[0].length-a[0].length)) {
    if(normalized.endsWith(' '+suffix)) return {name:normalized.slice(0,-suffix.length).trim(),province:code};
  }
  return {name:query,province};
}
export function matches(query, province, index, byId) {
  const parsed=parseGuess(query,province),key=normalize(parsed.name);
  return [...(index.get(key) || [])].map(id => byId.get(id))
    .filter(city => !parsed.province || city.province === parsed.province)
    .sort((a,b) => Number(normalize(b.name)===key)-Number(normalize(a.name)===key) || b.population-a.population || a.id-b.id);
}
export function restore(raw, version, byId) {
  try {
    const value = JSON.parse(raw);
    if (value.version !== version || !Array.isArray(value.found)) return null;
    return {found:[...new Set(value.found.filter(id => byId.has(id)))],
      elapsed: Number.isFinite(value.elapsed) ? Math.max(0, value.elapsed) : 0,
      finished: value.finished === true};
  } catch {return null;}
}
export function score(found, byId) {
  return [...new Set(found)].reduce((sum,id) => sum+(byId.get(id)?.population || 0),0);
}

// Logarithmic population scale: 1k -> pale, 3m+ -> dark.
export function populationColor(population) {
  const t=Math.max(0,Math.min(1,(Math.log10(Math.max(1000,population))-3)/(Math.log10(3000000)-3)));
  const stops=[[255,241,205],[244,168,94],[194,65,37],[65,5,20]];
  const segment=Math.min(2,Math.floor(t*3)),f=t*3-segment;
  const rgb=stops[segment].map((v,i)=>Math.round(v+(stops[segment+1][i]-v)*f));
  return `rgb(${rgb.join(',')})`;
}

// Province denominators include only playable cities, assigned to their main province.
export function provinceCoverage(cities, found) {
  const foundIds=new Set(found), result={};
  for(const city of cities){
    const code=city.province;
    if(!result[code])result[code]={total:0,reached:0};
    result[code].total+=city.population;
    if(foundIds.has(city.id))result[code].reached+=city.population;
  }
  for(const entry of Object.values(result))entry.percent=entry.total?100*entry.reached/entry.total:0;
  return result;
}
