/* Potong foto (crop): geser, cubit/geser zoom, putar, pilih rasio. Crop.buka(file,{max,q,ratio}) -> Promise<dataURL JPEG | null> */
window.Crop=(function(){
  const R={"1:1":[1,1],"4:5":[4,5],"16:9":[16,9],"9:16":[9,16]};
  const st=(e,s)=>{e.style.cssText=s;return e};
  function buka(file,o){o=o||{};return new Promise(done=>{
    const url=URL.createObjectURL(file),img=new Image();
    img.onerror=()=>{URL.revokeObjectURL(url);done(null)};
    img.onload=start;img.src=url;
    function start(){
      const iw=img.naturalWidth,ih=img.naturalHeight,dpr=Math.min(2,devicePixelRatio||1);
      let rot=0,zoom=1,ox=0,oy=0,ratio=R[o.ratio]||o.ratio==="asli"?o.ratio:"1:1",W=0,H=0,sc=1;
      const ov=st(document.createElement("div"),"position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:12px;font:500 14px Poppins,system-ui,sans-serif;color:#fff;touch-action:none");
      const cv=st(document.createElement("canvas"),"border-radius:10px;outline:2px solid var(--ac,#e6bd3a);cursor:grab;touch-action:none;background:#222");
      const bar=st(document.createElement("div"),"display:flex;gap:6px;flex-wrap:wrap;justify-content:center");
      const mk=(t,fn,pri)=>{const b=st(document.createElement("button"),"border:1px solid var(--ac,#e6bd3a);border-radius:20px;padding:8px 14px;font:inherit;cursor:pointer;"+(pri?"background:var(--ac,#e6bd3a);color:var(--on,#1a1305);font-weight:600":"background:transparent;color:#fff"));b.type="button";b.textContent=t;b.onclick=fn;return b};
      const chips={};
      const rz=st(document.createElement("input"),"width:min(80vw,320px)");rz.type="range";rz.min=1;rz.max=4;rz.step=.01;rz.value=1;rz.setAttribute("aria-label","Zoom");
      const ttl=st(document.createElement("div"),"font-weight:600");ttl.textContent="Potong foto — geser & perbesar";
      const rbar=st(document.createElement("div"),"display:flex;gap:6px;flex-wrap:wrap;justify-content:center");
      [...Object.keys(R),"asli"].forEach(k=>{const c=mk(k==="asli"?"Asli":k,()=>{ratio=k;ox=oy=0;layout()});chips[k]=c;rbar.append(c)});
      rbar.append(mk("⟳ Putar",()=>{rot=(rot+1)%4;ox=oy=0;layout()}));
      bar.append(mk("Batal",()=>fin(null)),mk("Pakai foto",()=>fin(out()),true));
      ov.append(ttl,cv,rz,rbar,bar);document.body.append(ov);
      const rd=()=>rot%2?[ih,iw]:[iw,ih];
      function layout(){
        const [rw,rh]=rd(),[a,b]=ratio==="asli"?[rw,rh]:R[ratio],mw=Math.min(innerWidth-24,440),mh=Math.max(160,innerHeight-250);
        W=mw;H=W*b/a;if(H>mh){H=mh;W=H*a/b}W=Math.round(W);H=Math.round(H);
        cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+"px";cv.style.height=H+"px";
        Object.keys(chips).forEach(k=>chips[k].style.background=k===ratio?"var(--ac,#e6bd3a)":"transparent");
        Object.keys(chips).forEach(k=>chips[k].style.color=k===ratio?"var(--on,#1a1305)":"#fff");
        draw()}
      function clamp(){const [rw,rh]=rd(),s0=Math.max(W/rw,H/rh);sc=s0*zoom;
        const mx=Math.max(0,rw*sc/2-W/2),my=Math.max(0,rh*sc/2-H/2);ox=Math.max(-mx,Math.min(mx,ox));oy=Math.max(-my,Math.min(my,oy))}
      function paint(x,k){clamp();x.save();x.translate(W*k/2+ox*k,H*k/2+oy*k);x.rotate(rot*Math.PI/2);x.scale(sc*k,sc*k);x.drawImage(img,-iw/2,-ih/2);x.restore()}
      function draw(){const x=cv.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,cv.width,cv.height);paint(x,dpr)}
      function out(){const k=(o.max||1000)/Math.max(W,H),c=document.createElement("canvas");c.width=Math.round(W*k);c.height=Math.round(H*k);
        const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);paint(x,k);return c.toDataURL("image/jpeg",o.q||.85)}
      const P=new Map();let d0=0;
      cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);P.set(e.pointerId,[e.clientX,e.clientY]);d0=0;cv.style.cursor="grabbing"};
      cv.onpointermove=e=>{if(!P.has(e.pointerId))return;const p=P.get(e.pointerId);
        if(P.size===1){ox+=e.clientX-p[0];oy+=e.clientY-p[1]}
        P.set(e.pointerId,[e.clientX,e.clientY]);
        if(P.size===2){const [a,b]=[...P.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d0)setZ(zoom*d/d0);d0=d}
        draw()};
      cv.onpointerup=cv.onpointercancel=e=>{P.delete(e.pointerId);d0=0;cv.style.cursor="grab"};
      cv.onwheel=e=>{e.preventDefault();setZ(zoom*(e.deltaY<0?1.08:.93));draw()};
      function setZ(z){zoom=Math.max(1,Math.min(4,z));rz.value=zoom}
      rz.oninput=()=>{zoom=+rz.value;draw()};
      const onk=e=>{if(e.key==="Escape")fin(null)};document.addEventListener("keydown",onk);
      function fin(v){document.removeEventListener("keydown",onk);ov.remove();URL.revokeObjectURL(url);done(v)}
      layout();
    }
  })}
  const keBlob=du=>{const b=atob(du.split(",")[1]),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return new Blob([u],{type:"image/jpeg"})};
  return {buka,keBlob}
})();
