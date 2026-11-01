(() => {
 const projects=[0,1,2];
 const blurbs=['Find the friendships hidden in your message history.','Can AI reason about a tower before it falls?','A better-looking next chapter, built with LaTeX.'];
 const kickers=['HACKMIT / AI + HUMAN CONNECTION','TOP 3 AT SWECCATHON / AI BENCHMARK','FULL-STACK / RESUME PLATFORM'];
 let page=0;
 const $=s=>document.querySelector(s);
 function render(){const index=projects[page],project=portfolio.projects[index];$('#featured-preview').innerHTML=projectVisual(project,index);$('#featured-preview').className='featured-preview art-'+index;$('#feature-title').textContent=project.name;$('#feature-description').textContent=blurbs[page];$('#feature-kicker').textContent=kickers[page];$('#feature-link').href=project.url;$('#feature-page').textContent=(page+1)+' / '+projects.length;}
 $('#feature-prev').addEventListener('click',()=>{page=(page+projects.length-1)%projects.length;render();});
 $('#feature-next').addEventListener('click',()=>{page=(page+1)%projects.length;render();});
 render();
})();
