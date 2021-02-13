const HE_HIM = 'he/him';
const HE_THEY = 'he/they';
const SHE_HER = 'she/her';
const SHE_THEY = 'she/they';
const THEY_THEM = 'they/them';

const pronouns = {
	nes: HE_THEY,
	GhostKumo: HE_HIM,
	Jaxler: HE_HIM,
	FromDarkHell: HE_HIM,
	KonceptioN2: HE_HIM,
	MrCab55: HE_HIM,
	KLM1187: HE_HIM,
	Torpedo: HE_HIM,
	DemonicRobots: HE_HIM,
	Aggy: THEY_THEM,
	Seckswrecks: THEY_THEM,
	PeekingBoo: HE_HIM,
	kirbymastah: HE_HIM,
	Kitt: THEY_THEM,
	Jai_Heart: HE_HIM,
	livelyraccoon: HE_HIM,
	amber_cxc: SHE_HER,
	Mr_Shasta: HE_HIM,
	Crispyspeedruns: HE_HIM,
	'The Sound Defense': HE_HIM
};

function getPronounsForPlayer(playerName) {
  return pronouns[playerName];
}
