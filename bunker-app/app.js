let lat=0, lon=0, hasPos=false;
const NUM_CCO='2250759438962';
const NUM_PERSO_KEY='pn3c_numero_perso';
const CCO_KEY='pn3c_alertes_cco';
function onPos(pos){lat=pos.coords.latitude;lon=pos.coords.longitude;hasPos=true;document.getElementById('lat').innerText=lat.toFixed(6);document.getElementById('lon').innerText=lon.toFixed(6);document.getElementById('acc').innerText=Math.round(pos.coords.accuracy)+'m';document.getElementById('status').innerText='✅ GPS OK';document.getElementById('status').style.color='#00ff00';}
function onErr(err){document.getElementById('status').innerText='❌ GPS: '+err.message;document.getElementById('status').style.color='#f00';}
if(navigator.geolocation){navigator.geolocation.watchPosition(onPos,onErr,{enableHighAccuracy:true,maximumAge:0,timeout:10000});}
function saveNumPerso(){let n=document.getElementById('numPerso').value.replace(/[^0-9]/g,'');if(!n){alert("Entre un numéro!");return;}localStorage.setItem(NUM_PERSO_KEY,n);document.getElementById('numPersoStatus').innerText='✅ Numéro sauvé: '+n;alert('✅ Enregistré: '+n);}
function saveAlert(t,m){let a=JSON.parse(localStorage.getItem(CCO_KEY)||'[]');a.unshift({id:Date.now(),type:t,message:m,heure:new Date().toLocaleString()});localStorage.setItem(CCO_KEY,JSON.stringify(a));}
function openWA(message){
  let perso=localStorage.getItem(NUM_PERSO_KEY)||'';
  if(!perso){let el=document.getElementById('numPerso');if(el) perso=el.value.replace(/[^0-9]/g,'');}
  let txt=encodeURIComponent(message);
  let txtSms=encodeURIComponent(message);
  // 1 - ALERTE PERSO - WhatsApp + SMS secours
  if(perso){
    window.open("https://wa.me/"+perso+"?text="+txt,'_blank');
    setTimeout(()=>{window.location.href="sms:"+perso+"?body="+txtSms;},1200);
  }else{
    alert("⚠️ Mets d'abord ton numéro d'urgence en haut!");
  }
  // 2 - ALERTE CCO - Pour analyse et transfert urgences
  setTimeout(()=>{
    window.open("https://wa.me/"+NUM_CCO+"?text="+txt,'_blank');
  },2000);
}
function sendSOS(){let m=document.getElementById('msgSOS').value||'SOS URGENCE PN3C';let full="🚨 SOS PN3C BUNKER 🚨\n"+m+"\n📍 https://maps.google.com/?q="+lat+","+lon+"\n⏰ "+new Date().toLocaleString();saveAlert('SOS',full);openWA(full);}
function sendAlerte(){let m=document.getElementById('msgAlerte').value||'Alerte PN3C';let full="⚠️ ALERTE PN3C\n"+m+"\n📍 https://maps.google.com/?q="+lat+","+lon+"\n⏰ "+new Date().toLocaleString();saveAlert('ALERTE',full);openWA(full);}
function sharePos(){let full="📍 POSITION PN3C\nhttps://maps.google.com/?q="+lat+","+lon;openWA(full);}
setTimeout(()=>{let s=localStorage.getItem(NUM_PERSO_KEY);if(s){let el=document.getElementById('numPerso');if(el) el.value=s;let st=document.getElementById('numPersoStatus');if(st) st.innerText='✅ Actuel: '+s;}},600);
