const HE_HIM = 'he/him';
const HE_THEY = 'he/they';
const SHE_HER = 'she/her';
const SHE_THEY = 'she/they';
const THEY_THEM = 'they/them';

const pronouns = {
	nes: HE_HIM
};

function getPronounsForPlayer(playerName) {
  return pronouns[playerName];
}
