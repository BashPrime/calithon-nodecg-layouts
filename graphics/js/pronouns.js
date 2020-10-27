const HE_HIM = 'He/Him';
const HE_THEY = 'He/They';
const SHE_HER = 'She/Her';
const SHE_THEY = 'She/They';
const THEY_THEM = 'They/Them';

const pronouns = {
  Brooke: SHE_HER,
  Celabeat: HE_HIM,
  Riekelt: null,
  Dangers: HE_HIM,
  Azorae: null,
  AmoebaUK: HE_HIM,
  'flying fox': SHE_HER,
  JoeyBaby69: null,
  HibnoticStreams: HE_HIM,
  LookinToad: HE_HIM,
  MrCab55: HE_HIM,
  zewing: null,
  Tiki: HE_HIM,
  Helix: THEY_THEM,
  WhiteHat94: HE_HIM,
  seckswrecks: THEY_THEM,
  RealmCopier: HE_HIM,
  Konasumi: HE_HIM,
  WinnerBit: SHE_THEY,
  Bluekandy: HE_HIM,
  tridenttail: HE_HIM,
  TGH: HE_HIM,
  mooglemod: HE_HIM,
  Shime: HE_HIM,
  'Big Jon': null,
  'Ryan Ford': HE_HIM,
  Drakodan: null,
  Focus: HE_HIM,
  Nimputs: HE_HIM,
  BahamutX_: HE_HIM,
  LRock617: HE_HIM,
  ElectronicLogic: HE_HIM,
  NecroSky90: HE_HIM,
  rezephos: HE_HIM,
  SuperBen1755: HE_HIM,
  NynahNina: SHE_HER,
  rossu123: HE_HIM,
  AlecK47: HE_HIM,
  giygasblues: null,
  Pea_txt: HE_THEY,
  Emmoji: SHE_HER
};

function getPronounsForPlayer(playerName) {
  return pronouns[playerName];
}
