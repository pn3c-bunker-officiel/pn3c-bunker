const NUM_CCO='2250759438962';
const NUM_PERSO_KEY='pn3c_numero_perso';
const CCO_KEY='pn3c_alertes_cco';

function saveNumPerso(){
  let n=document.getElementById('numPerso').value.replace(/[^0-9]/g,'');
  if(!n) return alert("Entre un numéro!");
  localStorage.setItem(NUM_PERSO_KEY,n);
  document.getElementById('numPersoStatus').innerText='✅ Numéro sauvé: '+n;
  alert('✅ Numéro enregistré: '+n);
}
function saveAlert(type,msg){
  let a=JSON.parse(localStorage.getItem(CCO_KEY)||'[]');
  a.unshift({id:Date.now(),type,message:msg,heure:new Date().toLocaleString()});
  localStorage.setItem(CCO_KEY,JSON.stringify(a));
}
function openWA(message){
  let perso=localStorage.getItem(NUM_PERSO_KEY)||'';
  let txt=encodeURIComponent(message);
  if(perso){ window.open(`https://wa.me/${perso}?text=${txt}`,'_blank'); }
  setTimeout(()=>{ window.open(`https://wa.me/${NUM_CCO}?text=${txt}`,'_blank'); },800);
}
function sendSOS(){
  let m=document.getElementById('msgSOS').value||'SOS URGENCE PN3C';
  let full=`🚨 SOS PN3C BUNKER 🚨\n${m}\n📍 https://maps.google.com/?q=${lat},${lon}\n⏰ ${new Date().toLocaleString()}`;
  saveAlert('SOS',full); openWA(full);
}
function sendAlerte(){
  let m=document.getElementById('msgAlerte').value||'Alerte PN3C';
  let full=`⚠️ ALERTE PN3C\n${m}\n📍 https://maps.google.com/?q=${lat},${lon}\n⏰ ${new Date().toLocaleString()}`;
  saveAlert('ALERTE',full); openWA(full);
}
function sharePos(){
  if(!hasPos) return alert("Attends le GPS");
  let full=`📍 POSITION PN3C\nhttps://maps.google.com/?q=${lat},${lon}`;
  openWA(full);
}