// Add contact URLs here when ready. Leave empty to keep the placeholder buttons.
const contactLinks = { LinkedIn: '', Email: 'mailto:dmsehd990815@gmail.com' };
const publications = [
{year:2026,type:'journal',venue:'Journal of the Korea Society of Computer and Information',title:'An Ensemble Approach for Outdoor Fire Detection Using DINOv2 and Swin Transformer to Minimize Unwanted Fire Alarms',authors:'Miseo Kim, Eun-Jin Kim, Young-Seob Jeong'},
{year:2026,type:'conference',venue:'2026 KICS Fall Conference',status:'In press',title:'A Framework for Child Utterance Classification and Response Generation in Stepwise Language Intervention for Children with Developmental Language Disorders',authors:'Eun-Jin Kim, Young-Seob Jeong, Gyung-Hun Hong'},
{year:2025,type:'journal',venue:'PLOS ONE',title:'Malware detection using pre-trained transformer encoder with byte sequences',authors:'Eun-Jin Kim, Yun-Kyung Lee, Sang-Min Lee, Jeong-Nyeo Kim, Ah Reum Kang, Mi-seo Kim, Young-Seob Jeong'},
{year:2025,type:'journal',venue:'Applied Sciences',title:'Efficient Malware Detection in HWP Byte Sequences Using Pooling-Based Model',authors:'Eun-Jin Kim, Young-Seob Jeong'},
{year:2025,type:'journal',venue:'Applied Sciences',title:'Generative Language Models for Personality-Based Utterances in Novels: A Character Clustering Approach',authors:'Eun-Jin Kim, Chung-Hwan Joe, Misun Yun, Young-Seob Jeong'},
{year:2025,type:'conference',venue:'2025 KICS Fall Conference',title:'A Generative Language Model-Based Dialogue System for Intervention in Children with Developmental Language Disorders',authors:'Eun-Jin Kim, Gyung-Hun Hong, Young-Seob Jeong'},
{year:2023,type:'conference',venue:'Korea Computer Congress (KCC 2023)',title:'Smishing Detection Language Model with Text Representation Learning',authors:'JunHa Hwang, SeungDong Lee, Eun-Jin Kim, JungHyun Park, Young-Seob Jeong'},
{year:2023,type:'conference',venue:'Korea Computer Congress (KCC 2023)',title:'Gesture Recognition System with Accelerometer in Mobile Device',authors:'JungHyun Park, Eun-Jin Kim, JunHa Hwang, SeungDong Lee, Young-Seob Jeong'},
{year:2022,type:'conference',venue:'5th International Conference on Artificial Intelligence for Industries (AI4I 2022)',title:'Language Model for Statistics Domain',authors:'Young-Seob Jeong, Eun-Jin Kim, JunHa Hwang, Medard E. Mswahili, YoungJin Kim'}
];
// Verified publisher / conference destinations. Add missing URLs here when available.
const publicationLinks = [
 {paper:'https://doi.org/10.9708/jksci.2026.31.09.151',pdf:null},
 {paper:null,pdf:null},
 {paper:'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0332307',pdf:'https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0332307&type=printable'},
 {paper:'https://www.mdpi.com/2076-3417/15/21/11525',pdf:'https://www.mdpi.com/2076-3417/15/21/11525/pdf'},
 {paper:'https://www.mdpi.com/2076-3417/15/15/8136',pdf:'https://www.mdpi.com/2076-3417/15/15/8136/pdf'},
 {paper:'https://conf.kics.or.kr/2025f/program',pdf:'https://d2j16w31g89z0j.cloudfront.net/site/2025f/abs/0208-LZCZY.pdf'},
 {paper:'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11488529',pdf:null},
 {paper:null,pdf:null},
 {paper:'https://doi.org/10.1109/AI4I54798.2022.00020',pdf:null}
];
publications.forEach((paper,index)=>Object.assign(paper,publicationLinks[index]));
function render(filter='all') {
 const list=document.querySelector('#publication-list'); list.replaceChildren(); let previousYear;
 publications.filter(p=>filter==='all'||p.type===filter).forEach(p=>{
  const article=document.createElement('article'); article.className='paper';
  const year=document.createElement('div');year.className='paper-year';year.textContent=p.year!==previousYear?p.year:'';previousYear=p.year;
  const body=document.createElement('div');body.className='paper-body';
  const meta=document.createElement('div');meta.className='paper-meta';
  const type=document.createElement('span');type.className='paper-type '+p.type;type.textContent=p.type==='journal'?'JOURNAL':'CONFERENCE';
  const venue=document.createElement('span');venue.textContent=p.venue;meta.append(type,venue);
  if(p.status){const status=document.createElement('span');status.className='status';status.textContent=p.status;meta.append(status);}
  const title=document.createElement('h3');title.textContent=p.title;
  const authors=document.createElement('p');authors.className='authors';
  p.authors.split('Eun-Jin Kim').forEach((part,i)=>{if(i){const strong=document.createElement('strong');strong.textContent='Eun-Jin Kim';authors.append(strong);}authors.append(document.createTextNode(part));});
  const links=document.createElement('div');links.className='paper-links';
  for(const [key,label,icon] of [['paper','Paper','↗'],['pdf','PDF','↓']]){
   const control=document.createElement(p[key]?'a':'span');
   control.className='paper-link'+(p[key]?'':' unavailable');
   control.textContent=p[key]?`${label} ${icon}`:`${label} · Pending`;
   if(p[key]){control.href=p[key];control.target='_blank';control.rel='noopener noreferrer';control.setAttribute('aria-label',`${label}: ${p.title}`);}
   else{control.setAttribute('aria-disabled','true');control.title=`${label} link has not been added yet.`;}
   links.append(control);
  }
  body.append(meta,title,authors,links);article.append(year,body);list.append(article);
 });
}
render();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});render(button.dataset.filter);}));
let toastTimer;
document.querySelectorAll('[data-placeholder]').forEach(button=>button.addEventListener('click',()=>{const name=button.dataset.placeholder;if(contactLinks[name]){window.location.href=contactLinks[name];return;}const toast=document.querySelector('#toast');toast.textContent=`${name} link will be added soon.`;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3000);}));
const navLinks=[...document.querySelectorAll('nav a')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navLinks.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-10% 0px -65% 0px',threshold:0});
document.querySelectorAll('main > section').forEach(s=>observer.observe(s));
document.querySelector('#year').textContent=new Date().getFullYear();

// Remember the theme; follow the system preference until a choice is saved.
const themeToggle=document.querySelector('.theme-toggle');
const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 themeToggle.setAttribute('aria-checked',String(theme==='dark'));
 const themeLabel=theme==='dark'?'Light mode':'Dark mode';
 themeToggle.setAttribute('aria-label',themeLabel);
 themeToggle.title=themeLabel;
 document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#252525':'#e9e9e9';
}
applyTheme(document.documentElement.dataset.theme||(systemTheme.matches?'dark':'light'));
themeToggle.addEventListener('click',()=>{
 const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
 applyTheme(theme);
 try{localStorage.setItem('ejk-theme',theme);}catch{}
});
systemTheme.addEventListener('change',event=>{
 try{if(localStorage.getItem('ejk-theme'))return;}catch{}
 applyTheme(event.matches?'dark':'light');
});

// Pull text upward as it reaches the top edge during scrolling.
const scrollMotionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const fadeTargets=new Set();
let scrollFadeFrame=0;
function collectScrollTargets(){
 for(const element of fadeTargets)if(!element.isConnected)fadeTargets.delete(element);
 document.querySelectorAll('.name-line,.hero .tagline,.hero .socials,.hero .tags,.section-top,.filter-bar,.paper-year,.paper-meta,.paper h3,.authors,.paper-links,.about-intro,.about-grid h3,.timeline').forEach(element=>{
  if(!fadeTargets.has(element)){element.classList.add('scroll-fade');fadeTargets.add(element);}
 });
}
function updateScrollFade(){
 scrollFadeFrame=0;
 const topEdge=window.innerWidth<=760?65:0;
 for(const element of fadeTargets){
  // offset geometry is unaffected by the animated transform.
  let layoutTop=0;
  for(let node=element;node;node=node.offsetParent)layoutTop+=node.offsetTop;
  const top=layoutTop-window.scrollY;
  const progress=scrollMotionPreference.matches||window.scrollY<=0?0:Math.max(0,Math.min(1,(topEdge+28-top)/150));
  element.style.setProperty('--scroll-opacity',String(1-progress));
  element.style.setProperty('--scroll-blur',`${(progress*5).toFixed(2)}px`);
  element.style.setProperty('--scroll-pull',`${(-progress*38).toFixed(2)}px`);
  element.style.setProperty('--scroll-scale',String(1-progress*.035));
 }
}
function scheduleScrollFade(){if(!scrollFadeFrame)scrollFadeFrame=requestAnimationFrame(updateScrollFade);}
collectScrollTargets();
window.addEventListener('scroll',scheduleScrollFade,{passive:true});
window.addEventListener('resize',scheduleScrollFade);
scrollMotionPreference.addEventListener('change',scheduleScrollFade);
new MutationObserver(()=>{collectScrollTargets();scheduleScrollFade();}).observe(document.querySelector('#publication-list'),{childList:true});
scheduleScrollFade();

// Give sidebar navigation a slower, gently eased scroll.
let navigationScrollFrame=0;
function stopNavigationScroll(){cancelAnimationFrame(navigationScrollFrame);navigationScrollFrame=0;}
for(const link of document.querySelectorAll('.sidebar nav a[href^="#"]')){
 link.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const target=document.querySelector(link.hash);
  if(!target)return;
  event.preventDefault();
  stopNavigationScroll();
  const start=window.scrollY;
  const padding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;
  const destination=link.hash==='#about'?target.querySelector('.section-top'):target;
  const end=Math.max(0,Math.min(destination.getBoundingClientRect().top+start-padding,document.documentElement.scrollHeight-window.innerHeight));
  history.pushState(null,'',link.hash);
  if(scrollMotionPreference.matches){window.scrollTo({top:end,behavior:'instant'});return;}
  const duration=Math.min(1800,1100+Math.abs(end-start)*.2);
  const started=performance.now();
  function animate(now){
   const progress=Math.min(1,(now-started)/duration);
   const eased=progress<.5?4*progress**3:1-(-2*progress+2)**3/2;
   window.scrollTo({top:start+(end-start)*eased,behavior:'instant'});
   navigationScrollFrame=progress<1?requestAnimationFrame(animate):0;
  }
  navigationScrollFrame=requestAnimationFrame(animate);
 });
}
window.addEventListener('wheel',stopNavigationScroll,{passive:true});
window.addEventListener('touchstart',stopNavigationScroll,{passive:true});
window.addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))stopNavigationScroll();});
