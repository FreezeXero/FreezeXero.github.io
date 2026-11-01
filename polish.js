(() => {
 'use strict';
 const dialog=document.querySelector('#quick-look'),content=document.querySelector('#quick-look-content');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
 const motion=()=>!reduce.matches&&!document.body.classList.contains('motion-paused');
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let trigger=null;
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-preview]');if(!button)return;
  const index=Number(button.dataset.preview),p=portfolio.projects[index];if(!p)return;trigger=button;
  content.innerHTML=`<div class="quick-look-art art-${index%6}">${projectVisual(p,index)}</div><div class="quick-look-copy"><span class="eyebrow">PROJECT SPOTLIGHT</span><h2 id="quick-look-title">${esc(p.name)}</h2><p>${esc(p.description)}</p><div class="project-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="quick-look-links">${p.url?`<a class="primary" href="${esc(p.url)}" target="_blank" rel="noopener">Explore project ↗</a>`:''}${p.repo&&p.repo!=='https://github.com/FreezeXero'?`<a class="secondary" href="${esc(p.repo)}" target="_blank" rel="noopener">View source ↗</a>`:''}</div></div>`;
  dialog.showModal();dialog.scrollTop=0;
 });
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{if(trigger?.isConnected)trigger.focus({preventScroll:true});});
 document.addEventListener('portfolio:navigate',event=>{if(!motion())return;const body=document.querySelector('#win-'+event.detail.app+' .window-body');if(body?.animate)body.animate([{opacity:.2,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});});
 let frame=0,pending=null;
 document.addEventListener('pointermove',event=>{if(!fine.matches||!motion())return;const card=event.target.closest('.project-card');if(!card)return;pending={card,x:event.clientX,y:event.clientY};if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!pending)return;const {card,x,y}=pending;if(!card.isConnected)return;const r=card.getBoundingClientRect();if(!r.width||!r.height)return;const px=(x-r.left)/r.width,py=(y-r.top)/r.height;card.style.setProperty('--tilt-x',((.5-py)*3).toFixed(2)+'deg');card.style.setProperty('--tilt-y',((px-.5)*3).toFixed(2)+'deg');card.style.setProperty('--shine-x',(px*100).toFixed(1)+'%');card.style.setProperty('--shine-y',(py*100).toFixed(1)+'%');});});
 document.addEventListener('pointerout',event=>{const card=event.target.closest('.project-card');if(card&&!card.contains(event.relatedTarget)){if(pending?.card===card){cancelAnimationFrame(frame);frame=0;pending=null;}card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');}});
 function clearMotion(){if(motion())return;cancelAnimationFrame(frame);frame=0;pending=null;document.querySelectorAll('.project-card').forEach(card=>{card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');});document.getAnimations?.().forEach(a=>a.cancel());}
 reduce.addEventListener('change',clearMotion);document.querySelector('#motion-toggle').addEventListener('click',clearMotion);

 const intro=document.querySelector('.home-intro');let lightFrame=0,lightPoint=null;
 intro.addEventListener('pointermove',event=>{if(!fine.matches||!motion())return;lightPoint={x:event.clientX,y:event.clientY};if(lightFrame)return;lightFrame=requestAnimationFrame(()=>{lightFrame=0;if(!lightPoint)return;const r=intro.getBoundingClientRect();intro.style.setProperty('--light-x',(lightPoint.x-r.left)+'px');intro.style.setProperty('--light-y',(lightPoint.y-r.top)+'px');});});
 function resetLight(){cancelAnimationFrame(lightFrame);lightFrame=0;lightPoint=null;intro.style.removeProperty('--light-x');intro.style.removeProperty('--light-y');}
 intro.addEventListener('pointerleave',resetLight);reduce.addEventListener('change',resetLight);document.querySelector('#motion-toggle').addEventListener('click',resetLight);
})();
