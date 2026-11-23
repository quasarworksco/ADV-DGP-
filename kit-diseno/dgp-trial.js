/*!
 * DGP Global Group · aviso de sitio en periodo de prueba.
 * Uso: <script src="assets/dgp-trial.js" data-expires="2026-11-18T23:59:59-06:00" data-site="Nombre del cliente" defer></script>
 * - data-expires: fecha y hora en que termina la prueba (ISO 8601 con zona horaria).
 * - data-site: nombre del cliente; se usa en el mensaje de WhatsApp.
 * - El idioma sigue al atributo lang de <html> (es / en) y cambia en vivo.
 * - Publica su altura en la variable CSS --dgp-trial-h de <html> para que la página baje su header fijo.
 * - Si el CSS del sitio no usa --dgp-trial-h, el aviso baja solo el contenido y lo que esté fijo arriba
 *   (header, barra de progreso). Con data-ajuste="css" no toca nada del sitio.
 * Para quitar el aviso cuando el cliente active el sitio: borra la etiqueta <script> y este archivo.
 * El panel de DGP (Sitios web → Prueba) lo pone y lo quita solo.
 */
(function(){
  var me=document.currentScript, d=document, root=d.documentElement;
  if(!me||d.getElementById('dgp-trial')) return;
  var end=new Date(me.getAttribute('data-expires')||'').getTime();
  if(isNaN(end)) return;
  var site=me.getAttribute('data-site')||d.title;
  var MARK='data:image/webp;base64,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';
  var T={
    es:{tag:'Vista previa',msg:'Este sitio es una demostración preparada por <b>DGP Global Group</b>.',left:'Quedan',d:'d',h:'h',m:'m',s:'s',cta:'Activar mi sitio',
        over:'La vista previa terminó. Escríbanos para activar su sitio.',aria:'Aviso de DGP Global Group: sitio en periodo de prueba',
        wa:'Hola, quiero activar el sitio web de '+site+'.'},
    en:{tag:'Preview',msg:'This site is a demo prepared by <b>DGP Global Group</b>.',left:'Time left',d:'d',h:'h',m:'m',s:'s',cta:'Activate my site',
        over:'The preview has ended. Message us to activate your site.',aria:'DGP Global Group notice: site in trial period',
        wa:'Hi, I would like to activate the website for '+site+'.'}
  };
  var host=d.createElement('div'); host.id='dgp-trial';
  host.style.cssText='position:fixed;top:0;left:0;right:0;z-index:150;display:block';
  var sh=host.attachShadow({mode:'open'});
  sh.innerHTML='<style>'+
  ':host{all:initial}'+
  '*{box-sizing:border-box;margin:0}'+
  '.bar{position:relative;overflow:hidden;display:flex;align-items:center;gap:14px;min-height:46px;padding:7px clamp(14px,4vw,40px);background:linear-gradient(90deg,#05070f,#0a1436 55%,#05070f);color:#fff;font:500 14px/1.3 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased}'+
  '.bar::after{content:"";position:absolute;left:0;bottom:0;width:200%;height:2px;background:linear-gradient(90deg,#1438cc 0%,#4d78ff 20%,#d4af37 30%,#4d78ff 40%,#1438cc 50%,#4d78ff 70%,#d4af37 80%,#4d78ff 90%,#1438cc 100%)}'+
  '.brand{display:flex;align-items:center;gap:10px;flex:none}'+
  '.mark{position:relative;width:26px;height:30px;flex:none}'+
  '.mark img{display:block;width:26px;height:30px}'+
  '.mark::before{content:"";position:absolute;inset:-7px -9px;border-radius:50%;background:radial-gradient(closest-side,rgba(77,120,255,.55),rgba(77,120,255,0));opacity:0}'+
  '.tag{flex:none;padding:3px 9px;border-radius:999px;font-weight:700;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#d4af37;box-shadow:inset 0 0 0 1px rgba(212,175,55,.6)}'+
  '.msg{flex:1;min-width:0;color:#c9d3f2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.msg b{color:#fff;font-weight:700}'+
  '.time{display:flex;align-items:center;gap:8px;flex:none;margin-left:auto}'+
  '.left{color:#c9d3f2}'+
  '.clock{display:flex;gap:4px;font-variant-numeric:tabular-nums}'+
  '.u{display:flex;align-items:baseline;gap:1px;padding:4px 7px;border-radius:7px;background:rgba(77,120,255,.16);box-shadow:inset 0 0 0 1px rgba(77,120,255,.35);font-weight:800;font-size:14px;overflow:hidden}'+
  '.u i{font-style:normal;font-weight:600;font-size:11px;color:#9fb4ff}'+
  '.u .n{display:inline-block}'+
  '.cta{flex:none;display:inline-flex;align-items:center;gap:7px;min-height:32px;padding:6px 14px;border-radius:999px;background:linear-gradient(180deg,#3b63ff,#1438cc);color:#fff;font-weight:700;font-size:13px;text-decoration:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 6px 16px -6px rgba(20,56,204,.9);transition:transform .16s ease-out,box-shadow .2s ease}'+
  '.cta svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}'+
  '.cta:active{transform:scale(.97)}'+
  '.cta:focus-visible{outline:2px solid #d4af37;outline-offset:2px}'+
  '@media (hover:hover) and (pointer:fine){.cta:hover{transform:translateY(-1px);box-shadow:inset 0 1px 0 rgba(255,255,255,.36),0 10px 20px -6px rgba(20,56,204,1)}}'+
  '.over .time{display:none}'+
  '@media (max-width:860px){.msg{display:none}}'+
  '@media (max-width:560px){.bar{gap:8px}.left{display:none}.sec{display:none}.tag{padding:3px 7px;font-size:10px}.u{padding:4px 5px;font-size:13px}.cta span{display:none}.cta{padding:6px 10px}.over .tag{display:none}.over .msg{display:block;white-space:normal;font-size:13px}}'+
  '@media (prefers-reduced-motion:no-preference){'+
    '.bar{animation:in .6s cubic-bezier(.23,1,.32,1) .2s both}'+
    '.bar::after{animation:run 7s linear infinite}'+
    '.mark::before{animation:glow 6s ease-out 1.2s infinite}'+
    '.n.roll{animation:roll .28s cubic-bezier(.23,1,.32,1)}'+
    '@keyframes in{from{transform:translateY(-100%)}}'+
    '@keyframes run{to{transform:translateX(-50%)}}'+
    '@keyframes glow{0%{opacity:0;transform:scale(.6)}8%{opacity:1}30%,100%{opacity:0;transform:scale(1.5)}}'+
    '@keyframes roll{from{opacity:0;transform:translateY(-70%)}}'+
  '}'+
  '</style>'+
  '<div class="bar" role="region">'+
    '<a class="brand" href="https://dgpglobalgroup.com" target="_blank" rel="noopener" aria-label="DGP Global Group"><span class="mark"><img src="'+MARK+'" width="26" height="30" alt=""></span></a>'+
    '<span class="tag"></span>'+
    '<p class="msg"></p>'+
    '<div class="time" role="timer" aria-live="off"><span class="left"></span><span class="clock">'+
      '<span class="u"><span class="n" data-k="d">0</span><i data-u="d"></i></span>'+
      '<span class="u"><span class="n" data-k="h">00</span><i data-u="h"></i></span>'+
      '<span class="u"><span class="n" data-k="m">00</span><i data-u="m"></i></span>'+
      '<span class="u sec"><span class="n" data-k="s">00</span><i data-u="s"></i></span>'+
    '</span></div>'+
    '<a class="cta" target="_blank" rel="noopener"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>'+
  '</div>';
  var bar=sh.querySelector('.bar'), q=function(s){return sh.querySelector(s);}, last={}, over=false;
  function lang(){return (root.lang||'es').toLowerCase().indexOf('en')===0?'en':'es';}
  function text(){
    var t=T[lang()];
    bar.setAttribute('aria-label',t.aria);
    q('.tag').textContent=t.tag; q('.msg').innerHTML=over?t.over:t.msg; q('.left').textContent=t.left;
    ['d','h','m','s'].forEach(function(k){q('[data-u='+k+']').textContent=t[k];});
    var c=q('.cta'); c.querySelector('span').textContent=t.cta; c.setAttribute('aria-label',t.cta);
    c.href='https://wa.me/12398231738?text='+encodeURIComponent(t.wa);
  }
  function two(n){return n<10?'0'+n:''+n;}
  function tick(){
    var ms=end-Date.now();
    if(ms<=0){ if(!over){over=true; bar.classList.add('over'); text(); clearInterval(timer);} return; }
    var s=Math.floor(ms/1000), v={d:''+Math.floor(s/86400),h:two(Math.floor(s%86400/3600)),m:two(Math.floor(s%3600/60)),s:two(s%60)};
    for(var k in v){ if(v[k]!==last[k]){ var el=q('[data-k='+k+']'); el.textContent=v[k];
      if(k!=='s'&&last[k]!==undefined){el.classList.remove('roll'); void el.offsetWidth; el.classList.add('roll');} last[k]=v[k]; } }
  }
  function size(){root.style.setProperty('--dgp-trial-h',host.offsetHeight+'px');}
  // Sitios cuyo CSS no usa --dgp-trial-h: se baja el contenido y todo lo fijo o pegajoso que esté arriba
  function cssListo(){
    if(me.getAttribute('data-ajuste')==='css') return true;
    for(var i=0;i<d.styleSheets.length;i++){ var r; try{r=d.styleSheets[i].cssRules;}catch(e){continue;}
      for(var j=0;r&&j<r.length;j++) if(r[j].cssText.indexOf('--dgp-trial-h')>-1) return true; }
    return false;
  }
  var V='var(--dgp-trial-h,0px)';
  function fijos(){
    var els=d.body.getElementsByTagName('*'), h=host.offsetHeight;
    for(var i=0;i<els.length;i++){ var el=els[i];
      if(el===host||el.hasAttribute('data-dgp-top')) continue;
      var cs=getComputedStyle(el); if(cs.position!=='fixed'&&cs.position!=='sticky') continue;
      var t=parseFloat(cs.top); if(isNaN(t)||t>8) continue;
      if(cs.position==='fixed'&&el.getBoundingClientRect().top>h+8) continue;
      el.setAttribute('data-dgp-top',cs.top); el.style.top='calc('+cs.top+' + '+V+')'; }
  }
  function ajustar(){
    var b=d.body, sp=getComputedStyle(root).scrollPaddingTop;
    b.style.paddingTop='calc('+getComputedStyle(b).paddingTop+' + '+V+')';
    root.style.scrollPaddingTop='calc('+(sp==='auto'?'0px':sp)+' + '+V+')';
    fijos(); var p=false;
    window.addEventListener('scroll',function(){ if(p) return; p=true; setTimeout(function(){p=false; fijos();},200); },{passive:true});
    window.addEventListener('resize',fijos);
  }
  function mount(){
    d.body.insertBefore(host,d.body.firstChild); text(); tick(); size();
    if('ResizeObserver' in window) new ResizeObserver(size).observe(host); else window.addEventListener('resize',size);
    new MutationObserver(text).observe(root,{attributes:true,attributeFilter:['lang']});
    if(!cssListo()) ajustar();
  }
  var timer=setInterval(tick,1000);
  if(d.body) mount(); else d.addEventListener('DOMContentLoaded',mount);
})();
