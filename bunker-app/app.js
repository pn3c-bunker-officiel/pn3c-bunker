const CCO_KEY = 'pn3c_alertes_cco';
const NUM_PERSO_KEY = 'pn3c_numero_perso';

function sauverNumero(){
  const el = document.getElementById('numPerso');
  const num = el ? el.value : prompt("Entre ton numéro d'urgence perso (ex: 22507...)");
  if(!num) return;
  localStorage.setItem(NUM_PERSO_KEY, num);
  alert("Numéro perso sauvé: "+num);
  return num;
}

function envoyerSOS(type){
  let numeroPerso = localStorage.getItem(NUM_PERSO_KEY);
  if(!numeroPerso){
    numeroPerso = sauverNumero();
    if(!numeroPerso) return;
  }
  const msg = `🚨 ${type} - PN3C BUNKER 🚨\nHeure: ${new Date().toLocaleString()}\nPosition: Abidjan\nTel perso: ${numeroPerso}\nBesoin d'aide!`;
  let alertes = JSON.parse(localStorage.getItem(CCO_KEY)||'[]');
  alertes.unshift({id:Date.now(), type, message:msg, heure:new Date().toLocaleString(), tel:numeroPerso});
  localStorage.setItem(CCO_KEY, JSON.stringify(alertes));
  window.open(`https://wa.me/${numeroPerso}?text=${encodeURIComponent(msg)}`, '_blank');
  alert('✅ Alerte envoyée au CCO et à ton numéro perso!');
}
