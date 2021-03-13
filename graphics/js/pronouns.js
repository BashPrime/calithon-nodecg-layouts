const HE_HIM = 'he/him';
const HE_THEY = 'he/they';
const SHE_HER = 'she/her';
const SHE_THEY = 'she/they';
const THEY_THEM = 'they/them';
const ANY = 'any';

const pronouns = {
	piner: ANY,
	Peas: null,
	gill42: null,
	Focus: HE_HIM,
	LinkaMeister: null,
	isbullets: HE_HIM,
	TaintedTali: SHE_HER,
	CosmykTheDolfyn: HE_HIM,
	musiquil: null,
	DemonicRobots: HE_HIM,
	SuperViperT302: null,
	Lylat_R: null,
	sickynar: null,
	BashPrime: HE_HIM,
	shredberg:HE_HIM,
	Sanjan: null,
	nes: HE_THEY,
	teddy: null,
	JeremyMKW: HE_HIM,
	juh0rse: HE_HIM,
	TempestMask1000: null
};

function getPronounsForPlayer(playerName) {
  return pronouns[playerName];
}
