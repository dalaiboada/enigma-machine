// --- Datos históricos (rótulos reales): rotores I, II, III y Reflector B (ejemplos) ---
const ALPH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function idx(c){return ALPH.indexOf(c);} 
function chr(i){return ALPH[(i+26)%26];}

const ROTORS = {
  'I':  {wiring: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', notch: 'Q'},
  'II': {wiring: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', notch: 'E'},
  'III':{wiring: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', notch: 'V'},
  'IV': {wiring: 'ESOVPZJAYQUIRHXLNFTGKDCMWB', notch: 'J'},
  'V':  {wiring: 'VZBRGITYUPSDNHLXAWMJQOFECK', notch: 'Z'}
};

const REFLECTORS = {
  'B': 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
  'C': 'FVPJIAOYEDRZXWGCTKUQSBNMHL'
};

// Estado de la máquina
let state = {
  left: {type:'I', pos:0},
  mid:  {type:'II', pos:0},
  right:{type:'III', pos:0},
  reflector: 'B',
  plugboard: {},
};

// Construcción de mapeos rápidos
function wiringMap(w){return w.split('').map(c=>idx(c));}

// init selects
const leftSelect = document.getElementById('rotorLeftSelect');
const midSelect = document.getElementById('rotorMidSelect');
const rightSelect = document.getElementById('rotorRightSelect');
const reflectorSelect = document.getElementById('reflectorSelect');

Object.keys(ROTORS).forEach(r=>{[leftSelect,midSelect,rightSelect].forEach(s=>{let o=document.createElement('option');o.value=r;o.textContent=r; s.appendChild(o)})});
Object.keys(REFLECTORS).forEach(r=>{let o=document.createElement('option');o.value=r;o.textContent=r; reflectorSelect.appendChild(o)});
leftSelect.value = state.left.type; midSelect.value=state.mid.type; rightSelect.value=state.right.type; reflectorSelect.value=state.reflector;

// UI elements
const leftPos = document.getElementById('leftPos');
const midPos  = document.getElementById('midPos');
const rightPos= document.getElementById('rightPos');
const plugsDiv = document.getElementById('plugPairs');
const lampsDiv = document.getElementById('lamps');
const keyboardDiv = document.getElementById('keyboard');
const pathDiv = document.getElementById('path');
const notchDiv = document.getElementById('notches');
const outputWire = document.getElementById('outputWire');

// Renders
function renderPositions(){ leftPos.textContent = chr(state.left.pos); midPos.textContent = chr(state.mid.pos); rightPos.textContent = chr(state.right.pos); }
function renderNotches(){
  notchDiv.innerHTML = `Izq: ${ROTORS[state.left.type].notch}, Medio: ${ROTORS[state.mid.type].notch}, Der: ${ROTORS[state.right.type].notch}`;
}

function renderPlugs(){ plugsDiv.innerHTML='';
  const pairs = Object.entries(state.plugboard);
  const shown = new Set();
  pairs.forEach(([k,v])=>{
    if(shown.has(k) || shown.has(v)) return; shown.add(k); shown.add(v);
    const el = document.createElement('div'); el.className='pair'; el.textContent = `${k} ↔ ${v}`;
    const btn = document.createElement('button'); btn.textContent='x'; btn.style.marginLeft='8px'; btn.onclick=()=>{delete state.plugboard[k]; delete state.plugboard[v]; renderPlugs(); renderLamps();}; el.appendChild(btn); plugsDiv.appendChild(el);
  });
}

function renderLamps(){ lampsDiv.innerHTML=''; for(let c of ALPH){const l=document.createElement('div'); l.className='lamp'; l.id='lamp_'+c; l.textContent=c; lampsDiv.appendChild(l);} }

function renderKeyboard(){ keyboardDiv.innerHTML=''; for(let c of ALPH){ const k=document.createElement('div'); k.className='key'; k.textContent=c; k.onclick=()=>pressKey(c); keyboardDiv.appendChild(k);} }

// --- Enigma core logic ---
function plugSwap(c){ return state.plugboard[c] || c; }

function rotorForward(letterIdx, rotor){
  // rotor: {type,pos}
  const wiring = wiringMap(ROTORS[rotor.type].wiring);
  // applying rotation: (input + pos) -> wiring -> -pos
  const steppedIn = (letterIdx + rotor.pos) % 26;
  const wired = wiring[steppedIn];
  const out = (wired - rotor.pos + 26) % 26;
  return out;
}

function rotorBackward(letterIdx, rotor){
  // inverse mapping
  const wiring = wiringMap(ROTORS[rotor.type].wiring);
  const steppedIn = (letterIdx + rotor.pos) % 26;
  // find index i such that wiring[i] == steppedIn
  const i = wiring.indexOf(steppedIn);
  const out = (i - rotor.pos + 26) % 26;
  return out;
}

function reflect(letterIdx){
  const ref = REFLECTORS[state.reflector];
  return idx(ref[letterIdx]);
}

function stepRotors(){
  // implement stepping with double-step behavior
  const rightNotchPos = idx(ROTORS[state.right.type].notch);
  const midNotchPos   = idx(ROTORS[state.mid.type].notch);

  // Determine if middle will step due to right being at notch AFTER step?
  // Historical simplified: if middle is at notch, it will step (double-step effect)
  const willStepMid = (state.right.pos === rightNotchPos) || (state.mid.pos === midNotchPos);

  // Right always steps
  state.right.pos = (state.right.pos + 1) % 26;

  // If right was at notch before stepping, step mid
  if( (state.right.pos === (rightNotchPos+1)%26) && ( (state.right.pos-1+26)%26 === rightNotchPos) ){
    // handled by willStepMid logic
  }

  if(willStepMid){ state.mid.pos = (state.mid.pos + 1) % 26; }
  // If mid stepped and is now at notch (approx), step left
  if( (state.mid.pos === (midNotchPos)%26) ){ state.left.pos = (state.left.pos + 1) % 26; }
}

function encodeChar(ch){
  // 1) step rotors (step before encoding)
  stepRotors(); renderPositions();

  // 2) plugboard in
  const in1 = plugSwap(ch);
  const path = [];
  path.push({stage:'plug-in',val:in1});

  // 3) pass forward through right, mid, left
  let v = idx(in1);
  v = rotorForward(v, state.right); path.push({stage:'R→',val:chr(v)});
  v = rotorForward(v, state.mid);  path.push({stage:'M→',val:chr(v)});
  v = rotorForward(v, state.left); path.push({stage:'L→',val:chr(v)});

  // 4) reflector
  v = reflect(v); path.push({stage:'Reflect',val:chr(v)});

  // 5) backward through left, mid, right
  v = rotorBackward(v, state.left); path.push({stage:'L←',val:chr(v)});
  v = rotorBackward(v, state.mid);  path.push({stage:'M←',val:chr(v)});
  v = rotorBackward(v, state.right); path.push({stage:'R←',val:chr(v)});

  // 6) plugboard out
  const outLetter = plugSwap(chr(v)); path.push({stage:'plug-out',val:outLetter});

  return {out: outLetter, path};
}

function highlightPath(path){
  pathDiv.innerHTML='';
  for(let s of path){const span=document.createElement('div'); span.className='step'; span.innerHTML = `<span class="chip">${s.stage}</span> <strong style="margin-left:8px">${s.val}</strong>`; pathDiv.appendChild(span);} 
}

function pressKey(letter){
  // visual: deactivate all lamps
  for(let c of ALPH){document.getElementById('lamp_'+c).classList.remove('on');}
  // encode
  const res = encodeChar(letter);
  // light lamp
  const lamp = document.getElementById('lamp_'+res.out);
  if(lamp) lamp.classList.add('on');
  highlightPath(res.path);
  outputWire.innerHTML = `<div class="chip highlight">${letter} → ${res.out}</div>`;
}

// UI hooks
leftSelect.onchange = ()=>{ state.left.type = leftSelect.value; renderNotches(); }
midSelect.onchange  = ()=>{ state.mid.type  = midSelect.value; renderNotches(); }
rightSelect.onchange = ()=>{ state.right.type = rightSelect.value; renderNotches(); }
reflectorSelect.onchange = ()=>{ state.reflector = reflectorSelect.value; }

// plugboard add/remove
const addPair = document.getElementById('addPair'); document.getElementById('btnAdd').onclick = ()=>{
  const txt = addPair.value.trim().toUpperCase(); if(!txt.match(/^[A-Z]\s+[A-Z]$/)) return alert('Formato: A G');
  const [a,b] = txt.split(/\s+/);
  if(a===b) return alert('No se puede emparejar la misma letra');
  // remove existing mappings
  if(state.plugboard[a] || state.plugboard[b]) return alert('Una de las letras ya está en uso');
  state.plugboard[a]=b; state.plugboard[b]=a; addPair.value=''; renderPlugs();
}

document.getElementById('btnClear').onclick = ()=>{ state.plugboard = {}; renderPlugs(); }

// reset
document.getElementById('btnReset').onclick = ()=>{ state.left.pos=0; state.mid.pos=0; state.right.pos=0; renderPositions(); }
document.getElementById('randomize').onclick = ()=>{ state.left.pos=Math.floor(Math.random()*26); state.mid.pos=Math.floor(Math.random()*26); state.right.pos=Math.floor(Math.random()*26); renderPositions(); }

// Keyboard capture
window.addEventListener('keydown', (e)=>{
  const k = e.key.toUpperCase(); if(ALPH.includes(k)){ pressKey(k); }
});

// Initialize
renderKeyboard(); renderLamps(); renderPositions(); renderPlugs(); renderNotches();