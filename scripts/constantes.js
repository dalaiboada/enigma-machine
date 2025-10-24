const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ROTORES = {
	I:	 { cableado: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", muesca: "Q" },
	II:	 { cableado: "AJDKSIRUXBLHWTMCQGZNPYFVOE", muesca: "E" }, 
	III: { cableado: "BDFHJLCPRTXVZNYEIWGAKMUSQO", muesca: "V" },
	IV:  { cableado: "ESOVPZJAYQUIRHXLNFTGKDCMWB", muesca: "J" },
	V:   { cableado: "VZBRGITYUPSDNHLXAWMJQOFECK", muesca: "Z" }
};

const REFLECTORES = {
	B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
	C: "FVPJIAOYEDRZXWGCTKUQSBNMHL"
};

const estado = {
  rotorIzquierdo: { tipo:'I', posicion: 0 },
  rotorMedio:  { tipo:'II', posicion: 0 },
  rotorDerecho:{ tipo:'III', posicion: 0 },
  reflector: 'B',
  enchufes: {},
};

export { ALFABETO, ROTORES, REFLECTORES, estado };