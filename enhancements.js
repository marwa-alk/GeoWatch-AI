// Progressive enhancements for the GeoWatch AI demo dashboard.
(function(){
 const originalRender=render;
 render=function(){
  originalRender();
  const words=lang==='ar'?{search:'بحث عن موقع',export:'تصدير البيانات CSV',selected:'تفاصيل الموقع المحدد',hint:'اضغط على اسم موقع أو علامة على الخريطة'}:{search:'Search locations',export:'Export demo CSV',selected:'Selected location',hint:'Select a location name or map marker'};
  const head=document.querySelector('.panel-head');
  const search=document.createElement('input');
  search.type='search';search.placeholder=words.search;search.className='site-search';search.setAttribute('aria-label',words.search);
  head.querySelector('.controls').prepend(search);
  const btn=document.createElement('button');btn.textContent=words.export;btn.className='export-button';head.querySelector('.controls').append(btn);
  const info=document.createElement('div');info.className='selection-info';info.textContent=words.hint;document.querySelector('.details').append(info);
  const entries=[...document.querySelectorAll('.site')];
  entries.forEach((node,i)=>{
    const data=sites.filter(x=>filter==='all'||x.type===filter)[i];
    node.tabIndex=0;node.setAttribute('role','button');
    const pick=()=>{map.setView([data.lat,data.lng],11);info.textContent=(lang==='ar'?data.nameAr:data.nameEn)+' · '+data.score+'/100 · '+data.lat.toFixed(4)+', '+data.lng.toFixed(4)};
    node.addEventListener('click',pick);
    node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}});
  });
  search.addEventListener('input',()=>{
   const q=search.value.trim().toLocaleLowerCase();
   entries.forEach(node=>{node.hidden=!node.textContent.toLocaleLowerCase().includes(q)});
  });
  btn.addEventListener('click',()=>{
   const shown=sites.filter(x=>filter==='all'||x.type===filter);
   const csv=[['city','category','demo_score','latitude','longitude'],...shown.map(x=>[x.nameEn,x.type,x.score,x.lat,x.lng])].map(row=>row.join(',')).join('\r\n');
   const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
   const link=document.createElement('a');link.href=url;link.download='geowatch-demo-data.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
 };
 render();
})();