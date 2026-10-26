import {indexCities,matches,restore,score,populationColor,provinceCoverage} from './game.js?v=9';
const $=id=>document.getElementById(id), NS='http://www.w3.org/2000/svg';
const number=new Intl.NumberFormat('en-CA');
const provinces={AB:'Alberta',BC:'British Columbia',MB:'Manitoba',NB:'New Brunswick',NL:'Newfoundland & Labrador',NS:'Nova Scotia',NT:'Northwest Territories',NU:'Nunavut',ON:'Ontario',PE:'Prince Edward Island',QC:'Quebec',SK:'Saskatchewan',YT:'Yukon'};
let data,byId,index,state={found:[],elapsed:0,finished:false}, started=performance.now(), ready=false;
let view,originalView,saveKey,confirmAction,selectedId;
const pointers=new Map(); let dragStart=null,moved=false;
function element(tag,attrs={}){const el=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);return el;}
function message(text,type=''){ $('feedback').textContent=text;$('feedback').className=`feedback ${type}`; }
function elapsed(){return state.elapsed+(ready&&!state.finished?(performance.now()-started)/1000:0);}
function save(){if(!ready)return;try{localStorage.setItem(saveKey,JSON.stringify({version:data.version,...state,elapsed:elapsed()}));}catch{$('saved-status').textContent='Saving unavailable in this browser';}}
function tick(){const s=Math.floor(elapsed());$('timer').textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
function setView(next){
  const ratio=originalView[2]/originalView[3], width=Math.min(originalView[2]*1.4,Math.max(35,next[2]));
  const height=width/ratio;
  view=[Math.max(-width*.75,Math.min(originalView[2]-width*.25,next[0])),Math.max(-height*.75,Math.min(originalView[3]-height*.25,next[1])),width,height];
  $('map').setAttribute('viewBox',view.join(' '));
  for(const dot of $('dots').children)dot.setAttribute('r',Math.max(view[2]/300,1));
}
function zoom(factor,clientX,clientY){
  if(!ready)return;
  const point=$('map').createSVGPoint();const rect=$('map').getBoundingClientRect();
  point.x=clientX??rect.x+rect.width/2;point.y=clientY??rect.y+rect.height/2;
  const p=point.matrixTransform($('map').getScreenCTM().inverse());
  setView([p.x-(p.x-view[0])*factor,p.y-(p.y-view[1])*factor,view[2]*factor,view[3]*factor]);
}
function focusCity(city){
  const [x,y,w,h]=city.bounds, ratio=originalView[2]/originalView[3];
  const width=Math.max(110,w*1.5,h*ratio*1.5),height=width/ratio;
  setView([x+w/2-width/2,y+h/2-height/2,width,height]);
  $('map-caption').textContent=`${city.name}${city.province?', '+city.province:''}`;
}
function appendShape(city,revealed=false){
  const group=element('g',{class:'city-shape'+(revealed?' revealed':''),'data-id':city.id});
  const parts=city.parts || [city];
  // A base fill prevents hairline gaps between independently simplified pieces.
  const base=element('path',{d:city.path,'data-id':city.id,class:'city-part','aria-label':city.name});
  base.style.fill=populationColor(Math.max(...parts.map(part=>part.population)));
  group.append(base);
  for(const part of parts){
    const path=element('path',{d:part.path,'data-id':city.id,class:'city-part','aria-label':city.name});
    path.style.fill=populationColor(part.population);
    group.append(path);
  }
  group.append(element('path',{d:city.path,class:'city-outline','aria-hidden':'true'}));
  $('found-shapes').append(group);
}

function render(){
  const found=new Set(state.found);$('count').textContent=number.format(found.size);
  const reached=score(state.found,byId);
  const coverage=100*reached/data.summary.playable_population;
  $('population-reached').textContent=`${number.format(reached)} people`;
  $('coverage').replaceChildren(document.createTextNode(coverage.toFixed(1)),Object.assign(document.createElement('span'),{textContent:'%'}));
  $('total').textContent=`/ ${number.format(data.cities.length)}`;
  $('progress').style.width=`${100*found.size/data.cities.length}%`;
  $('found-shapes').replaceChildren();$('dots').replaceChildren();
  if(state.finished)for(const city of data.cities)if(!found.has(city.id))appendShape(city,true);
  for(const id of state.found)appendShape(byId.get(id));
  if(found.size){
    $('found-list').replaceChildren();
    const ordered=[...state.found].reverse();
    if($('places-sort').value==='population')ordered.sort((a,b)=>byId.get(b).population-byId.get(a).population);
    ordered.forEach((id,i)=>{
      const city=byId.get(id),row=document.createElement('div'),button=document.createElement('button');row.className='found-row';button.className='found-focus';button.type='button';
      const label=document.createElement('span'),rank=document.createElement('span');rank.className='rank';rank.textContent=$('places-sort').value==='population'?i+1:found.size-i;
      label.append(rank,document.createTextNode(city.name+' '));const province=document.createElement('small');province.textContent=city.province;label.append(province);
      const pop=document.createElement('small');pop.textContent=number.format(city.population);button.append(label,pop);
      button.addEventListener('click',()=>focusCity(city));
      const remove=document.createElement('button');remove.type='button';remove.className='remove-city';remove.textContent='×';remove.setAttribute('aria-label',`Remove ${city.name}, ${city.province}`);remove.title=`Remove ${city.name}`;
      remove.addEventListener('click',()=>removeCity(id));row.append(button,remove);$('found-list').append(row);
    });
  }else{$('found-list').innerHTML='<div class="empty"><span aria-hidden="true">⌖</span><p>Your first place is out there.<br>Put it on the map.</p></div>';}
  const provincial=provinceCoverage(data.cities,state.found);$('province-coverage').replaceChildren();
  for(const [code,name] of Object.entries(provinces)){
    const entry=provincial[code]||{total:0,reached:0,percent:0},row=document.createElement('div');row.className='province-progress';
    const label=document.createElement('span');label.textContent=code;label.title=name;
    const value=document.createElement('span');value.textContent=entry.total?`${entry.percent.toFixed(1)}%`:'—';
    const bar=document.createElement('progress');bar.max=100;bar.value=entry.percent;bar.setAttribute('aria-label',`${name}: ${number.format(entry.reached)} of ${number.format(entry.total)} playable people reached`);
    row.title=`${name}: ${number.format(entry.reached)} / ${number.format(entry.total)} people`;row.append(label,value,bar);$('province-coverage').append(row);
  }
  $('milestones').replaceChildren();
  for(const [threshold,label] of [[1000000,'1 million'],[500000,'500k'],[100000,'100k']]){
    const eligible=data.cities.filter(city=>city.population>threshold), line=document.createElement('div');
    line.textContent=`${eligible.filter(city=>found.has(city.id)).length} of ${eligible.length} cities over ${label}`;
    $('milestones').append(line);
  }
  $('session-state').textContent=state.finished?'Quiz finished':'';
  $('guess').disabled=state.finished;$('submit-guess').disabled=state.finished;$('finish').disabled=state.finished;
  $('reset').disabled=false;$('share').disabled=false;
  if(state.finished)$('map-caption').textContent='Every place has a story.';
  save();tick();
}
function removeCity(id){
  const position=state.found.indexOf(id);if(position<0)return;
  const city=byId.get(id);state.found.splice(position,1);$('tooltip').hidden=true;render();
  message(`${city.name} removed. `);
  const undo=document.createElement('button');undo.type='button';undo.className='undo-remove';undo.textContent='Undo';
  undo.addEventListener('click',()=>{if(!state.found.includes(id))state.found.splice(Math.min(position,state.found.length),0,id);render();$('map-caption').textContent=`Restored: ${city.name}.`;message(`${city.name} restored.`,'success');});$('feedback').append(undo);
  $('map-caption').textContent=`Removed: ${city.name}.`;
}
function accept(city){
  $('choices').hidden=true;$('choices').replaceChildren();
  if(state.found.includes(city.id)){message(`${city.name} is already on your map.`);$('guess').select();return;}
  state.found.push(city.id);selectedId=city.id;render();
  message(`${city.name}${city.province?', '+city.province:''} — ${number.format(city.population)} people.`, 'success');
  if($('follow').checked)focusCity(city);
  else $('map-caption').textContent=`Just added: ${city.name}.`;
  $('guess').value='';$('guess').focus();
  if(state.found.length===data.cities.length){state.elapsed=elapsed();state.finished=true;render();message('You named every place in the atlas. Incredible!', 'success');}
}
$('guess-form').addEventListener('submit',event=>{
  event.preventDefault();if(!ready||state.finished)return;
  const query=$('guess').value.trim();if(!query)return;
  const options=matches(query,$('province').value,index,byId);
  $('choices').replaceChildren();$('choices').hidden=true;
  if(!options.length){message(`No match for “${query}”${$('province').value?' in this province':''}. Try another spelling or settlement name.`,'error');return;}
  accept(options[0]);
});
$('places-sort').addEventListener('change',()=>{if(ready)render();});
$('province').addEventListener('change',()=>{$('choices').hidden=true;$('guess').focus();});
$('guess').addEventListener('input',()=>{$('choices').hidden=true;});
$('boundaries').addEventListener('change',()=>{
  $('outlines').replaceChildren();if(!ready||!$('boundaries').checked)return;
  const fragment=document.createDocumentFragment();for(const city of data.cities)fragment.append(element('path',{d:city.path}));$('outlines').append(fragment);
});
function ask(title,body,label,action){$('confirm-title').textContent=title;$('confirm-body').textContent=body;$('confirm').textContent=label;confirmAction=action;$('confirm-dialog').showModal();}
$('finish').addEventListener('click',()=>ask('Ready to see the whole map?','Your current score will be kept, and the remaining places will be revealed. You can start a new game whenever you like.','Finish & reveal',()=>{state.elapsed=elapsed();state.finished=true;render();message(`Finished with ${state.found.length} places. Click the map to explore the answers.`);}));
$('reset').addEventListener('click',()=>ask('A fresh map?','This clears your saved progress on this device. Your current game cannot be restored.','Start over',()=>{state={found:[],elapsed:0,finished:false};started=performance.now();$('choices').hidden=true;$('guess').value='';$('tooltip').hidden=true;setView(originalView);render();$('map-caption').textContent='One place at a time.';message('A fresh start. Where will you go first?');$('guess').focus();}));
$('cancel').addEventListener('click',()=>$('confirm-dialog').close());
$('confirm').addEventListener('click',()=>{$('confirm-dialog').close();confirmAction?.();});
$('share').addEventListener('click',async()=>{
  const text=`Canada, by heart: I named ${state.found.length} of ${data.cities.length} places, reaching ${number.format(score(state.found,byId))} people, covering ${(100*score(state.found,byId)/data.summary.playable_population).toFixed(1)}% of the playable population. ${location.href.split('#')[0]}`;
  try{await navigator.clipboard.writeText(text);message('Score copied. Share it with someone who knows their hometowns.','success');}
  catch{message(text);}
});
for(const[id,dialog]of [['about','about-dialog'],['data-info','data-dialog']])$(id).addEventListener('click',()=>$(dialog).showModal());
for(const button of document.querySelectorAll('.dialog-close,.dialog-done'))button.addEventListener('click',()=>button.closest('dialog').close());
$('zoom-in').addEventListener('click',()=>zoom(.7));$('zoom-out').addEventListener('click',()=>zoom(1/.7));$('fit').addEventListener('click',()=>{if(ready)setView(originalView);});
$('map').addEventListener('wheel',event=>{if(!ready)return;event.preventDefault();zoom(Math.exp(Math.max(-150,Math.min(150,event.deltaY))*.003),event.clientX,event.clientY);},{passive:false});
$('map').addEventListener('dblclick',event=>{event.preventDefault();zoom(.65,event.clientX,event.clientY);});
$('map').addEventListener('keydown',event=>{
  if(!ready)return;let handled=true;
  if(event.key==='+'||event.key==='=')zoom(.7);else if(event.key==='-')zoom(1/.7);
  else if(event.key==='Home')setView(originalView);
  else if(event.key==='ArrowLeft')setView([view[0]-view[2]*.1,view[1],view[2],view[3]]);
  else if(event.key==='ArrowRight')setView([view[0]+view[2]*.1,view[1],view[2],view[3]]);
  else if(event.key==='ArrowUp')setView([view[0],view[1]-view[3]*.1,view[2],view[3]]);
  else if(event.key==='ArrowDown')setView([view[0],view[1]+view[3]*.1,view[2],view[3]]);else handled=false;
  if(handled)event.preventDefault();
});
function screenPoint(x,y){const p=$('map').createSVGPoint();p.x=x;p.y=y;return p.matrixTransform($('map').getScreenCTM().inverse());}
$('map').addEventListener('pointerdown',event=>{
  if(!ready || (event.pointerType==='mouse' && event.button!==0))return;event.preventDefault();pointers.set(event.pointerId,[event.clientX,event.clientY]);$('map').setPointerCapture(event.pointerId);
  dragStart={x:event.clientX,y:event.clientY,view:[...view]};moved=false;$('map').classList.add('dragging');
});
$('map').addEventListener('pointermove',event=>{
  if(!ready)return;
  if(pointers.has(event.pointerId)){
    const previous=pointers.get(event.pointerId);
    if(pointers.size===2){const other=[...pointers.entries()].find(([id])=>id!==event.pointerId)[1];
      const before=Math.hypot(previous[0]-other[0],previous[1]-other[1]),after=Math.hypot(event.clientX-other[0],event.clientY-other[1]);
      if(before>0&&after>0)zoom(before/after,(event.clientX+other[0])/2,(event.clientY+other[1])/2);moved=true;
    }else{const a=screenPoint(...previous),b=screenPoint(event.clientX,event.clientY);setView([view[0]+a.x-b.x,view[1]+a.y-b.y,view[2],view[3]]);
      if(Math.hypot(event.clientX-dragStart.x,event.clientY-dragStart.y)>4)moved=true;}
    pointers.set(event.pointerId,[event.clientX,event.clientY]);$('tooltip').hidden=true;return;
  }
  const id=Number(event.target.dataset.id);const city=byId.get(id);
  if(city)showTooltip(city,event.clientX,event.clientY);else $('tooltip').hidden=true;
});
function showTooltip(city,x,y){const r=$('map-stage').getBoundingClientRect();$('tooltip').textContent=`${city.name}${city.province?', '+city.province:''}\n${number.format(city.population)} people`;$('tooltip').style.left=`${Math.min(r.width-220,Math.max(5,x-r.left+14))}px`;$('tooltip').style.top=`${Math.max(5,Math.min(r.height-75,y-r.top+14))}px`;$('tooltip').hidden=false;}
function pointerEnd(event){
  const wasTracked=pointers.delete(event.pointerId);if(!wasTracked)return;
  if(!moved&&event.type==='pointerup'){
    // Pointer capture retargets events; hit-test the released coordinate.
    const target=document.elementFromPoint(event.clientX,event.clientY),city=byId.get(Number(target?.dataset.id));
    if(city)showTooltip(city,event.clientX,event.clientY);
  }
  if(pointers.size===0){$('map').classList.remove('dragging');dragStart=null;}
  else{const p=[...pointers.values()][0];dragStart={x:p[0],y:p[1],view:[...view]};}
}
$('map').addEventListener('pointerup',pointerEnd);$('map').addEventListener('pointercancel',pointerEnd);$('map').addEventListener('lostpointercapture',pointerEnd);
$('map').addEventListener('dragstart',event=>event.preventDefault());
$('map').addEventListener('pointerleave',()=>{if(!pointers.size)$('tooltip').hidden=true;});
window.addEventListener('pagehide',save);
async function start(){
  try{
    const response=await fetch('./data/canada.json', {cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);data=await response.json();
    byId=new Map(data.cities.map(city=>[city.id,city]));index=indexCities(data.cities);saveKey=`canada-by-heart:${data.version}`;
    try{const previous=restore(localStorage.getItem(saveKey),data.version,byId);if(previous)state=previous;
      else for(const [version,mapping] of Object.entries(data.migrations||{}).reverse()){
        const raw=localStorage.getItem(`canada-by-heart:${version}`);if(!raw)continue;
        const old=JSON.parse(raw);if(!Array.isArray(old.found))continue;
        const migrated=restore(JSON.stringify({...old,version:data.version,found:old.found.map(id=>mapping[id]).filter(id=>id!=null)}),data.version,byId);
        if(migrated){state=migrated;break;}
      }}catch{$('saved-status').textContent='Saving unavailable in this browser';}
    originalView=data.extent;view=[...originalView];
    for(const path of data.provinces){$('land').append(element('path',{d:path}));$('terrain-clip').append(element('path',{d:path,'clip-rule':'evenodd'}));$('province-lines').append(element('path',{d:path}));}
    $('terrain-mask').append(element('rect',{x:0,y:0,width:data.extent[2],height:data.extent[3],fill:'white'}));
    for(const city of data.cities)$('terrain-mask').append(element('path',{d:city.path,fill:'black','fill-rule':'evenodd'}));
    $('terrain').setAttribute('width',data.extent[2]);$('terrain').setAttribute('height',data.extent[3]);
    for(const[code,name]of Object.entries(provinces)){$('province').append(new Option(name,code));}
    const s=data.summary;$('dataset-detail').textContent=`This edition has ${number.format(s.playable_cities)} playable areas. ${number.format(s.unmatched_catchments)} additional areas still have no settlement-name match and are excluded from the quiz until reviewed.`;
    ready=true;started=performance.now();setView(originalView);render();$('map-loading').hidden=true;
    if(state.finished)message(`Your completed game: ${state.found.length} places found. Start over to play again.`);
    else message(state.found.length?'Welcome back. Your map is right where you left it.':'Ready when you are. Every hometown counts.');
    setInterval(tick,1000);setInterval(save,10000);
  }catch(error){$('map-loading').textContent='The map couldn’t load.';message('Unable to load the city data. Refresh to retry. If running locally, open this page through the preview server.','error');console.error(error);}
}
start();
