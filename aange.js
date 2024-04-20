function slep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(msegs) {
       await slep(msegs);
}
function d(dc) {
  return document.getElementById(dc);
}
function dh(dc, co) {
  document.getElementById(dc).innerHTML = co;
}
function dhs(dc, co) {
  d(dc).innerHTML+=co;
}
function dhg(dc) {
  return d(dc).innerHTML;
}
function dhgs(dc, co) {
  return d(dc).innerHTML+co;
}
function dv(dc, co) {
  d(dc).value = co;
}
function dvg(dc) {
  return document.getElementById(dc).value;
}
function cc(dc) {
  d(dc).click();
}
function sn(dc) {
  d(dc).style.display = 'none';
}
function sb(dc) {
  d(dc).style.display = 'block';
}
function ckd(dc) {
  return d(dc).checked;
}
function cs(lg) {
  console.log(lg);
}
function dt(dc, co) {
  d(dc).title = co;
}
function dtg(dc) {
  return d(dc).title;
}
function dck(dc) {
  var v = 1;
  if (d(dc).checked == false) v = 0;
  return v;
}
function dck01(dc,zerum) {
  var trfa = false;
  if (zerum == 1) trfa = true;
  d(dc).checked = trfa;
}
function dqs(dc) {
  return document.querySelector(dc);
}
function dqsa(dc) {
  return document.querySelectorAll(dc);
}
function dvh(dc) {
  d(dc).setAttribute('style', 'visibility: hidden');
}
function dvv(dc) {
  d(dc).setAttribute('style', 'visibility: visible');
}
function rf() {
  return false;
}
function cl(ct) {
  console.log.bind(ct);
}
function dqa(dc){
  return document.querySelectorAll('[id^='+dc+']');
}
function getData() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}
function getHora() {
  const today = new Date();
  const hour = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  return `${hour}:${minutes}:${seconds}`;
}
// console.log('ok')

