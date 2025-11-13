const API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:4000' : '';
const TOTAL_FRAMES = 15;
const grid = document.getElementById('grid');
const ownerToggle = document.getElementById('ownerToggle');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalActions = document.getElementById('modalActions');
let products=[];
async function fetchProducts(){try{const r=await fetch(API+'/api/products');products=await r.json();renderGrid();}catch(e){products=[];for(let i=1;i<=TOTAL_FRAMES;i++)products.push({id:i,title:`Product ${i}`,image:`https://via.placeholder.com/400x300.png?text=Frame+${i}`,description:'Demo',booked:false});renderGrid();}}
function renderGrid(){grid.innerHTML='';products.forEach(p=>{const card=document.createElement('div');card.className='card';const img=document.createElement('img');img.src=p.image;card.appendChild(img);const badge=document.createElement('div');badge.className='badge';badge.innerText='#'+p.id;card.appendChild(badge);if(p.booked){const b=document.createElement('div');b.className='booked';b.innerText='BOOKED';card.appendChild(b);}const title=document.createElement('div');title.className='title';title.innerText=p.title;card.appendChild(title);const btn=document.createElement('button');btn.className='buy';btn.innerText='Buy / Book ₹300';btn.onclick=()=>openModal(p.id);card.appendChild(btn);grid.appendChild(card);});}
function openModal(id){const p=products.find(x=>x.id===id);modalImg.src=p.image;modalTitle.innerText=p.title;modalDesc.innerText=p.description||'';modal.setAttribute('aria-hidden','false');modalActions.innerHTML='';if(p.booked){modalActions.innerText='Ye product booked hai.';}else{const pay=document.createElement('button');pay.className='buy';pay.innerText='Pay ₹300';pay.onclick=()=>simulatePay(p);modalActions.appendChild(pay);}}
closeModal.onclick=()=>modal.setAttribute('aria-hidden','true');
async function simulatePay(p){const ok=confirm('Simulate payment?');if(!ok)return;p.booked=true;renderGrid();modal.setAttribute('aria-hidden','true');alert('Payment done (simulated)');}
ownerToggle.addEventListener('change',renderGrid);
document.getElementById('refresh').addEventListener('click',fetchProducts);
fetchProducts();
