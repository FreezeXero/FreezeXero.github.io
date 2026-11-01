(() => {
 const projects=[10,1,2];
 const blurbs=['Turn everyday requests into actions across your Mac.','Can AI reason about a tower before it falls?','A better-looking next chapter, built with LaTeX.'];
 const kickers=['CAL HACKS 13.0 / MACOS AI AGENT','TOP 3 AT SWECCATHON / AI BENCHMARK','FULL-STACK / RESUME PLATFORM'];
 let page=0;
 const $=s=>document.querySelector(s);
 function render(){const index=projects[page],project=portfolio.projects[index],gallery=$('#featured-preview');gallery.innerHTML=projectVisual(project,index);gallery.className='featured-preview art-'+index;$('#feature-title').textContent=project.name;$('#feature-description').textContent=blurbs[page];$('#feature-kicker').textContent=kickers[page];$('#feature-link').href=project.url;$('#feature-page').textContent=(page+1)+' / '+projects.length;document.querySelectorAll('[data-feature]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.feature)===page)));if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.body.classList.contains('motion-paused')&&gallery.animate)gallery.animate([{opacity:.4,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'cubic-bezier(.2,.8,.2,1)'});}
 $('#feature-prev').addEventListener('click',()=>{page=(page+projects.length-1)%projects.length;render();});
 $('#feature-next').addEventListener('click',()=>{page=(page+1)%projects.length;render();});
 document.querySelectorAll('[data-feature]').forEach(b=>b.addEventListener('click',()=>{page=Number(b.dataset.feature);render();}));
 const gallery=$('#featured-preview');
 gallery.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();page=(page+projects.length+(e.key==='ArrowRight'?1:-1))%projects.length;render();}});
 let start=null;
 gallery.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start={x:e.clientX,y:e.clientY};});
 gallery.addEventListener('pointerup',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5){page=(page+projects.length+(dx<0?1:-1))%projects.length;render();}});
 gallery.addEventListener('pointercancel',()=>start=null);
 render();
})();
