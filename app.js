/* GeoWatch AI MVP. All indicator values below are synthetic demonstration data. */
const cities=[
{id:"abu",ar:"أبوظبي",en:"Abu Dhabi",lat:24.4539,lng:54.3773,value:72},
{id:"dubai",ar:"دبي",en:"Dubai",lat:25.2048,lng:55.2708,value:84},
{id:"sharjah",ar:"الشارقة",en:"Sharjah",lat:25.3463,lng:55.4209,value:65},
{id:"ajman",ar:"عجمان",en:"Ajman",lat:25.4052,lng:55.5136,value:58},
{id:"fujairah",ar:"الفجيرة",en:"Fujairah",lat:25.1288,lng:56.3265,value:79}
];
const copy={
ar:{subtitle:"منصة التحليل الجغرافي",demo:"بيانات تجريبية",navTitle:"لوحة المراقبة",navDashboard:"نظرة عامة",navMap:"الخريطة التفاعلية",navAnalysis:"تحليل المواقع",note:"البيانات المعروضة توضيحية وليست مراقبة حية.",heading:"لوحة المراقبة الجغرافية",description:"استكشف مؤشرات توضيحية لمدن الإمارات العربية المتحدة.",status:"الوضع التجريبي",metric1:"المواقع المعروضة",metric1sub:"مدن في الإمارات",metric2:"المواقع المحددة",metric2sub:"حسب الفلتر الحالي",metric3:"مصدر البيانات",metric3sub:"لا توجد بيانات مباشرة",mapHeading:"الخريطة التفاعلية",mapCaption:"اختر مدينة لعرض معلوماتها التجريبية.",filterLabel:"تصفية حسب المدينة",reset:"إعادة ضبط",detailHeading:"تحليل الموقع",detailHint:"اضغط على علامة في الخريطة لاختيار موقع.",locationLabel:"الموقع",indicatorLabel:"المؤشر التوضيحي",updatedLabel:"حالة البيانات",updated:"تجريبية",disclaimer:"هذه المؤشرات مولدة للعرض فقط، ولا تمثل قياسات بيئية أو أمنية فعلية أو استنتاجات ذكاء اصطناعي موثقة.",footer:"GeoWatch AI · إصدار تجريبي · لا يتضمن مراقبة مباشرة أو تحليل أقمار صناعية فعلي.",all:"جميع المدن",popup:"مؤشر تجريبي"},
en:{subtitle:"Geospatial Intelligence Platform",demo:"Demo data",navTitle:"MONITORING",navDashboard:"Overview",navMap:"Interactive Map",navAnalysis:"Location Analysis",note:"Displayed data is illustrative, not live monitoring.",heading:"Geospatial Monitoring Dashboard",description:"Explore illustrative indicators for cities in the United Arab Emirates.",status:"Demo mode",metric1:"Locations shown",metric1sub:"UAE cities",metric2:"Selected locations",metric2sub:"Current filter",metric3:"Data source",metric3sub:"No live data connected",mapHeading:"Interactive Map",mapCaption:"Select a city to inspect demo information.",filterLabel:"Filter by city",reset:"Reset",detailHeading:"Location Analysis",detailHint:"Select a marker on the map.",locationLabel:"Location",indicatorLabel:"Illustrative indicator",updatedLabel:"Data status",updated:"Demo only",disclaimer:"These indicators are synthetic demonstration values, not actual environmental or security measurements or verified AI findings.",footer:"GeoWatch AI · Demonstration release · No live monitoring or real satellite analysis.",all:"All cities",popup:"Demo indicator"}
};
let lang="ar",selected=null;
const map=L.map("map").setView([24.7,55.25],8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; OpenStreetMap contributors',maxZoom:19}).addTo(map);
const layer=L.layerGroup().addTo(map);
function render(){
const t=copy[lang];document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
for(const [key,val] of Object.entries(t)){const el=document.getElementById(key);if(el)el.textContent=val}
document.getElementById("language").textContent=lang==="ar"?"English":"العربية";
const sel=document.getElementById("city"),old=sel.value;sel.replaceChildren();
const all=document.createElement("option");all.value="all";all.textContent=t.all;sel.appendChild(all);
cities.forEach(c=>{const o=document.createElement("option");o.value=c.id;o.textContent=c[lang];sel.appendChild(o)});
sel.value=old&&[...sel.options].some(o=>o.value===old)?old:"all";
draw();
}
function draw(){
const filter=document.getElementById("city").value;
const visible=cities.filter(c=>filter==="all"||c.id===filter);
document.getElementById("selectedCount").textContent=visible.length;
layer.clearLayers();
visible.forEach(c=>{L.marker([c.lat,c.lng]).addTo(layer).bindPopup('<strong>'+c[lang]+'</strong><p>'+copy[lang].popup+': '+c.value+'/100</p>').on("click",()=>selectCity(c))});
if(selected){const c=cities.find(x=>x.id===selected);if(c)selectCity(c,false)}
}
function selectCity(c,pan=true){selected=c.id;document.getElementById("location").textContent=c[lang];document.getElementById("indicator").textContent=c.value+"/100";if(pan)map.panTo([c.lat,c.lng])}
document.getElementById("city").addEventListener("change",e=>{selected=null;document.getElementById("location").textContent="—";document.getElementById("indicator").textContent="—";draw();const c=cities.find(x=>x.id===e.target.value);if(c){map.setView([c.lat,c.lng],11);selectCity(c)}else map.setView([24.7,55.25],8)});
document.getElementById("reset").addEventListener("click",()=>{selected=null;document.getElementById("city").value="all";document.getElementById("location").textContent="—";document.getElementById("indicator").textContent="—";map.setView([24.7,55.25],8);draw()});
document.getElementById("language").addEventListener("click",()=>{lang=lang==="ar"?"en":"ar";render()});
render();