const $ = (s, r = document) => r.querySelector(s);
const app = $('#app');

const assets = {
  menu: 'assets/menu.jpg?v=14',
  map: 'assets/map.jpg?v=14',
  fireDress: 'assets/fire_dress.jpg?v=14',
  fireAction: 'assets/fire_action.jpg?v=14',
  policeAction: 'assets/police_action.jpg?v=14',
  ghostBg: 'assets/ghost_bg.jpg?v=14',
  davidMain: 'assets/hero_main_v7.jpg?v=14',
  davidPolice: 'assets/david_police.jpg?v=14',
  davidFunny: 'assets/david_funny.jpg?v=14',
  davidGhost: 'assets/david_ghost.jpg?v=14',
  davidDrink: 'assets/david_drink.jpg?v=14',
  davidPotty: 'assets/david_potty.jpg?v=14',
  davidCat: 'assets/david_cat.jpg?v=14',
  davidRadio: 'assets/david_radio.jpg?v=14',
  momDad: 'assets/mamapapa_icon.jpg?v=14',
  anya: 'assets/anya_icon.jpg?v=14',
  grandma: 'assets/grandma_icon.jpg?v=14',
  vika: 'assets/vika_icon.jpg?v=14',
  icon512: 'assets/icon-512.png?v=14',
  icon192: 'assets/icon-192.png?v=14',
  icons: {
    helmet: 'assets/icons/helmet.png',
    jacket: 'assets/icons/jacket.png',
    gloves: 'assets/icons/gloves.png',
    boots: 'assets/icons/boots.png',
    hose: 'assets/icons/hose.png',
    firetruck: 'assets/icons/firetruck.png',
    policeHat: 'assets/icons/police_hat.png',
    badge: 'assets/icons/badge.png',
    radio: 'assets/icons/radio.png',
    cuffs: 'assets/icons/cuffs.png',
    policecar: 'assets/icons/policecar.png',
    jail: 'assets/icons/jail.png',
    wheel: 'assets/icons/wheel.png',
    fireDoor: 'assets/icons/fire_door.png',
    policeDoor: 'assets/icons/police_door.png',
    trunk: 'assets/icons/trunk.png',
    seat: 'assets/icons/seat.png',
    siren: 'assets/icons/siren.png',
    lightbar: 'assets/icons/lightbar.png',
    ladder: 'assets/icons/ladder.png',
    waterTank: 'assets/icons/water_tank.png'
  }
};

const family = {
  parents: { name: 'Мама и папа', img: assets.momDad, phrase: 'Ай-яй-яй!' },
  anya: { name: 'Аня', img: assets.anya, phrase: 'Да-ви-да!' },
  grandma: { name: 'Инна', img: assets.grandma, phrase: 'Ну-ну!' },
  vika: { name: 'Вика', img: assets.vika, phrase: 'Штраф!' }
};

const familyKeys = ['parents', 'anya', 'grandma', 'vika'];
const randomFamily = () => familyKeys[Math.floor(Math.random() * familyKeys.length)];

const rewardCatalog = {
  fire: [
    { emoji: '🚒', title: 'Спасатель города' },
    { emoji: '🧯', title: 'Мастер шланга' },
    { emoji: '🔥', title: 'Укротитель огня' }
  ],
  police: [
    { emoji: '🚓', title: 'Страж порядка' },
    { emoji: '👮', title: 'Главный сыщик' },
    { emoji: '🕵️', title: 'Ловкий детектив' }
  ],
  ghost: [
    { emoji: '👻', title: 'Ловец привидений' },
    { emoji: '✨', title: 'Храброе сердце' },
    { emoji: '🏰', title: 'Покоритель замка' }
  ],
  bonus: [
    { emoji: '🐱', title: 'Спасатель котят' },
    { emoji: '🥛', title: 'Молочный герой' },
    { emoji: '⭐', title: 'Доброе сердце' }
  ],
  all: [
    { emoji: '🏆', title: 'Супергерой города' },
    { emoji: '🌈', title: 'Главный помощник' },
    { emoji: '⭐', title: 'Собираю победы' }
  ]
};

function rewardForLevel(level) {
  const list = rewardCatalog[level.theme] || rewardCatalog.all;
  const idx = (level.id - 1) % list.length;
  return list[idx];
}

function missionTip(level) {
  const tips = {
    fire: ['Смотри на детали машины очень внимательно.', 'Пожарные вещи обычно красные или защитные.', 'Сначала найди самые большие предметы.'],
    police: ['Полицейская машина любит мигалку и рацию.', 'Ищи детали, которые помогают ловить нарушителей.', 'Смотри, что подходит именно полицейскому авто.'],
    ghost: ['Привидения любят шалить — будь внимателен!', 'Фонарик и амулет помогут не бояться.', 'Сначала ищи необычные волшебные предметы.'],
    bonus: ['Помогай и улыбайся — так играть веселее!', 'Подсказка в названии задания.', 'Не спеши, но нажимай уверенно.'],
    all: ['Собери всё по порядку, как настоящий герой!', 'У каждого задания есть своя маленькая хитрость.', 'Слушай музыку и ищи нужные детали.']
  };
  const list = tips[level.theme] || tips.all;
  return list[(level.id - 1) % list.length];
}

function badgeChips(limit = 8) {
  const earned = Array.isArray(state.badges) ? state.badges.slice(-limit) : [];
  if (!earned.length) return '<div class="badge-chip empty">⭐ Первый значок ждёт тебя!</div>';
  return earned.reverse().map(b => `<div class="badge-chip"><span>${b.emoji}</span><b>${b.title}</b></div>`).join('');
}

const levels = [
  {
    id: 1,
    title: 'Пожарный наряд',
    type: 'dress',
    theme: 'fire',
    bg: assets.fireDress,
    david: assets.davidMain,
    goal: 'Найди правильные вещи пожарного и одень Давидика.',
    time: 105,
    items: [
      { id: 'helmet', label: 'Каска', icon: assets.icons.helmet, ok: true },
      { id: 'jacket', label: 'Куртка', icon: assets.icons.jacket, ok: true },
      { id: 'gloves', label: 'Перчатки', icon: assets.icons.gloves, ok: true },
      { id: 'boots', label: 'Сапоги', icon: assets.icons.boots, ok: true },
      { id: 'hose', label: 'Шланг', icon: assets.icons.hose, ok: true },
      { id: 'mask', label: 'Маска', emoji: '😷', ok: true },
      { id: 'belt', label: 'Пояс', emoji: '🦺', ok: true },
      { id: 'radio', label: 'Рация', icon: assets.icons.radio, ok: false },
      { id: 'cuffs', label: 'Наручники', icon: assets.icons.cuffs, ok: false },
      { id: 'badge', label: 'Значок', icon: assets.icons.badge, ok: false }
    ]
  },
  {
    id: 2,
    title: 'Выбери пожарную машину',
    type: 'choose',
    theme: 'fire',
    bg: assets.fireAction,
    david: assets.davidMain,
    goal: 'Какая машина нужна, чтобы ехать на пожар?',
    time: 55,
    choices: [
      { label: 'Пожарная машина', icon: assets.icons.firetruck, ok: true },
      { label: 'Полицейская машина', icon: assets.icons.policecar, ok: false },
      { label: 'Автобус', emoji: '🚌', ok: false }
    ]
  },
  {
    id: 3,
    title: 'Детали пожарной машины',
    type: 'dress',
    theme: 'fire',
    bg: assets.fireAction,
    david: assets.davidFunny,
    goal: 'Найди важные детали пожарной машины.',
    time: 95,
    items: [
      { id: 'ladder', label: 'Лестница', icon: assets.icons.ladder, ok: true },
      { id: 'siren', label: 'Сирена', icon: assets.icons.siren, ok: true },
      { id: 'tank', label: 'Бак с водой', icon: assets.icons.waterTank, ok: true },
      { id: 'wheel', label: 'Колёса', icon: assets.icons.wheel, ok: true },
      { id: 'hose', label: 'Шланг', icon: assets.icons.hose, ok: true },
      { id: 'door', label: 'Дверь авто', icon: assets.icons.fireDoor, ok: true },
      { id: 'cuffs', label: 'Наручники', icon: assets.icons.cuffs, ok: false },
      { id: 'jail', label: 'Тюрьма', icon: assets.icons.jail, ok: false },
      { id: 'badge', label: 'Полицейский значок', icon: assets.icons.badge, ok: false }
    ]
  },
  {
    id: 4,
    title: 'Собери пожарную машину',
    type: 'sequenceEmoji',
    theme: 'fire',
    bg: assets.fireAction,
    david: assets.davidRadio,
    goal: 'Сделай всё по порядку: подготовь пожарную машину к выезду.',
    time: 70,
    steps: [
      { label: 'Проверить колёса', emoji: '🛞' },
      { label: 'Залить воду', emoji: '💧' },
      { label: 'Подключить шланг', emoji: '🧯' },
      { label: 'Включить сирену', emoji: '🚨' }
    ]
  },
  {
    id: 5,
    title: 'Маршрут к пожару',
    type: 'numbers',
    theme: 'fire',
    bg: assets.fireAction,
    david: assets.davidFunny,
    goal: 'Нажимай цифры по порядку, чтобы проложить маршрут.',
    time: 80,
    count: 10,
    instruction: 'Ищи цифры от 1 до 10'
  },
  {
    id: 6,
    title: 'Потуши огонь',
    type: 'tap-fire',
    theme: 'fire',
    bg: assets.fireAction,
    david: assets.davidMain,
    goal: 'Потуши все очаги пожара.',
    time: 80,
    count: 8
  },
  {
    id: 7,
    title: 'Полицейский Давид',
    type: 'dress',
    theme: 'police',
    bg: assets.policeAction,
    david: assets.davidPolice,
    goal: 'Собери форму полицейского.',
    time: 110,
    items: [
      { id: 'cap', label: 'Фуражка', icon: assets.icons.policeHat, ok: true },
      { id: 'badge', label: 'Значок', icon: assets.icons.badge, ok: true },
      { id: 'radio', label: 'Рация', icon: assets.icons.radio, ok: true },
      { id: 'cuffs', label: 'Наручники', icon: assets.icons.cuffs, ok: true },
      { id: 'notebook', label: 'Блокнот', emoji: '📒', ok: true },
      { id: 'vest', label: 'Жилет', emoji: '🦺', ok: true },
      { id: 'helmet', label: 'Каска', icon: assets.icons.helmet, ok: false },
      { id: 'hose', label: 'Шланг', icon: assets.icons.hose, ok: false },
      { id: 'ladder', label: 'Лестница', emoji: '🪜', ok: false }
    ]
  },
  {
    id: 8,
    title: 'Выбери полицейскую машину',
    type: 'choose',
    theme: 'police',
    bg: assets.policeAction,
    david: assets.davidPolice,
    goal: 'Какая машина нужна полицейскому Давидику?',
    time: 55,
    choices: [
      { label: 'Полицейская машина', icon: assets.icons.policecar, ok: true },
      { label: 'Пожарная машина', icon: assets.icons.firetruck, ok: false },
      { label: 'Такси', emoji: '🚕', ok: false }
    ]
  },
  {
    id: 9,
    title: 'Детали полицейской машины',
    type: 'dress',
    theme: 'police',
    bg: assets.policeAction,
    david: assets.davidCat,
    goal: 'Найди важные детали полицейской машины.',
    time: 95,
    items: [
      { id: 'lightbar', label: 'Мигалка', icon: assets.icons.lightbar, ok: true },
      { id: 'siren', label: 'Сирена', icon: assets.icons.siren, ok: true },
      { id: 'door', label: 'Дверь авто', icon: assets.icons.policeDoor, ok: true },
      { id: 'wheel', label: 'Колёса', icon: assets.icons.wheel, ok: true },
      { id: 'trunk', label: 'Багажник', icon: assets.icons.trunk, ok: true },
      { id: 'seat', label: 'Сиденье', icon: assets.icons.seat, ok: true },
      { id: 'hose', label: 'Шланг', icon: assets.icons.hose, ok: false },
      { id: 'ladder', label: 'Лестница', icon: assets.icons.ladder, ok: false },
      { id: 'water', label: 'Бак с водой', icon: assets.icons.waterTank, ok: false }
    ]
  },
  {
    id: 10,
    title: 'Собери полицейскую машину',
    type: 'sequenceEmoji',
    theme: 'police',
    bg: assets.policeAction,
    david: assets.davidDrink,
    goal: 'Подготовь полицейскую машину к выезду.',
    time: 70,
    steps: [
      { label: 'Проверить колёса', emoji: '🛞' },
      { label: 'Включить мигалку', emoji: '🚨' },
      { label: 'Взять рацию', emoji: '📻' },
      { label: 'Пристегнуться', emoji: '🔒' }
    ]
  },
  {
    id: 11,
    title: 'Лови преступника',
    type: 'numbers',
    theme: 'police',
    bg: assets.policeAction,
    david: assets.davidPolice,
    goal: 'Нажимай цифры по порядку и догоняй преступника.',
    time: 85,
    count: 10,
    instruction: 'Ищи цифры от 1 до 10'
  },
  {
    id: 12,
    title: 'Посади в тюрьму',
    type: 'sequence',
    theme: 'police',
    bg: assets.policeAction,
    david: assets.davidPolice,
    goal: 'Сделай всё по порядку.',
    time: 75,
    steps: [
      { label: 'Найти преступника', icon: assets.icons.badge },
      { label: 'Надеть наручники', icon: assets.icons.cuffs },
      { label: 'Отвезти в машине', icon: assets.icons.policecar },
      { label: 'Закрыть в тюрьме', icon: assets.icons.jail }
    ]
  },
  {
    id: 13,
    title: 'Спаси котёнка',
    type: 'sequenceEmoji',
    theme: 'bonus',
    bg: assets.map,
    david: assets.davidDrink,
    goal: 'Сначала лестница, потом спасение и молоко.',
    time: 65,
    steps: [
      { label: 'Поставить лестницу', emoji: '🪜' },
      { label: 'Снять котёнка', emoji: '🐱' },
      { label: 'Дать молоко', emoji: '🥛' }
    ]
  },
  {
    id: 14,
    title: 'Охотник на привидений',
    type: 'ghost-gear',
    theme: 'ghost',
    bg: assets.ghostBg,
    david: assets.davidGhost,
    goal: 'Подготовь Давидика к встрече с привидениями.',
    time: 95,
    items: [
      { id: 'flashlight', label: 'Фонарик', emoji: '🔦', ok: true },
      { id: 'amulet', label: 'Амулет', emoji: '✨', ok: true },
      { id: 'net', label: 'Сачок', emoji: '🪤', ok: true },
      { id: 'star', label: 'Звезда храбрости', emoji: '⭐', ok: true },
      { id: 'map', label: 'Карта замка', emoji: '🗺️', ok: true },
      { id: 'bell', label: 'Колокольчик', emoji: '🔔', ok: true },
      { id: 'hose', label: 'Шланг', icon: assets.icons.hose, ok: false },
      { id: 'cuffs', label: 'Наручники', icon: assets.icons.cuffs, ok: false }
    ]
  },
  {
    id: 15,
    title: 'Замок привидений',
    type: 'numbers',
    theme: 'ghost',
    bg: assets.ghostBg,
    david: assets.davidGhost,
    goal: 'Найди путь по цифрам в замке привидений.',
    time: 80,
    count: 9,
    instruction: 'Ищи цифры от 1 до 9'
  },
  {
    id: 16,
    title: 'Поймай привидений',
    type: 'tap-ghost',
    theme: 'ghost',
    bg: assets.ghostBg,
    david: assets.davidGhost,
    goal: 'Нажимай на привидения и прогони их!',
    time: 85,
    count: 8
  },
  {
    id: 17,
    title: 'Автомойка',
    type: 'sequenceEmoji',
    theme: 'bonus',
    bg: assets.map,
    david: assets.davidFunny,
    goal: 'Помой машину правильно — шаг за шагом.',
    time: 90,
    steps: [
      { label: 'Смыть грязь водой', emoji: '🚿', sound: 'water' },
      { label: 'Нанести пену', emoji: '🫧', sound: 'soap' },
      { label: 'Помыть щёткой', emoji: '🧽', sound: 'brush' },
      { label: 'Смыть пену', emoji: '💦', sound: 'water' },
      { label: 'Высушить машину', emoji: '🌬️', sound: 'dryer' }
    ]
  },
  {
    id: 18,
    title: 'Готовим сок',
    type: 'sequenceEmoji',
    theme: 'bonus',
    bg: assets.menu,
    david: assets.davidDrink,
    goal: 'Приготовь свежий сок в соковыжималке.',
    time: 85,
    steps: [
      { label: 'Выбрать фрукты', emoji: '🍊', sound: 'fruit' },
      { label: 'Помыть фрукты', emoji: '💧', sound: 'water' },
      { label: 'Разрезать фрукты', emoji: '🔪', sound: 'cut' },
      { label: 'Положить в соковыжималку', emoji: '🧃', sound: 'fruit' },
      { label: 'Включить соковыжималку', emoji: '⚙️', sound: 'motor' },
      { label: 'Налить сок в стакан', emoji: '🥤', sound: 'pour' }
    ]
  },
  {
    id: 19,
    title: 'Супергерой города',
    type: 'final',
    theme: 'all',
    bg: assets.map,
    david: assets.davidDrink,
    goal: 'Собери все подвиги Давидика.',
    time: 130,
    actions: [
      { id: 'fire', label: 'Потушить пожар', emoji: '🧯' },
      { id: 'truck', label: 'Собрать пожарную машину', emoji: '🚒' },
      { id: 'police', label: 'Поймать вора', emoji: '👮' },
      { id: 'car', label: 'Подготовить полицейскую машину', emoji: '🚓' },
      { id: 'ghost', label: 'Прогнать привидение', emoji: '👻' },
      { id: 'cat', label: 'Спасти котёнка', emoji: '🐱' }
    ]
  }
];

let deferredPrompt = null;
const STATE_KEY = 'davidikStateV15';
let state = JSON.parse(localStorage.getItem(STATE_KEY) || '{"unlocked":1,"stars":0,"coins":1250,"sound":true,"badges":[]}');
if (!Array.isArray(state.badges)) state.badges = [];
if (!['ru', 'de'].includes(state.lang)) state.lang = 'ru';

const translations = {
  'Мама и папа':'Mama und Papa','Аня':'Anja','Инна':'Inna','Вика':'Vika','Штраф!':'Strafe!','Ну-ну!':'Na, na!','Ай-яй-яй!':'Oh je!','Да-ви-да!':'Da-wi-da!',
  'Спасатель города':'Retter der Stadt','Мастер шланга':'Schlauchmeister','Укротитель огня':'Feuerbezwinger','Страж порядка':'Hüter der Ordnung','Главный сыщик':'Meisterdetektiv','Ловкий детектив':'Cleverer Detektiv','Ловец привидений':'Geisterfänger','Храброе сердце':'Tapferes Herz','Покоритель замка':'Schlossbezwinger','Спасатель котят':'Katzenretter','Молочный герой':'Milchheld','Доброе сердце':'Gutes Herz','Супергерой города':'Superheld der Stadt','Главный помощник':'Bester Helfer','Собираю победы':'Siege sammeln','Первый значок ждёт тебя!':'Dein erstes Abzeichen wartet!',
  'Смотри на детали машины очень внимательно.':'Schau dir die Fahrzeugteile genau an.','Пожарные вещи обычно красные или защитные.':'Feuerwehrsachen sind meist rot oder schützen dich.','Сначала найди самые большие предметы.':'Finde zuerst die größten Gegenstände.','Полицейская машина любит мигалку и рацию.':'Ein Polizeiauto braucht Blaulicht und Funkgerät.','Ищи детали, которые помогают ловить нарушителей.':'Suche Teile, die beim Fangen von Tätern helfen.','Смотри, что подходит именно полицейскому авто.':'Achte darauf, was zum Polizeiauto gehört.','Привидения любят шалить — будь внимателен!':'Geister treiben gern Unfug – pass gut auf!','Фонарик и амулет помогут не бояться.':'Taschenlampe und Amulett machen Mut.','Сначала ищи необычные волшебные предметы.':'Suche zuerst die ungewöhnlichen Zaubersachen.','Помогай и улыбайся — так играть веселее!':'Hilf mit und lächle – so macht Spielen mehr Spaß!','Подсказка в названии задания.':'Der Hinweis steckt im Namen der Aufgabe.','Не спеши, но нажимай уверенно.':'Lass dir Zeit und tippe sicher.','Собери всё по порядку, как настоящий герой!':'Erledige alles der Reihe nach wie ein echter Held!','У каждого задания есть своя маленькая хитрость.':'Jede Aufgabe hat einen kleinen Trick.','Слушай музыку и ищи нужные детали.':'Höre auf die Musik und finde die richtigen Teile.',
  'Пожарный наряд':'Feuerwehrausrüstung','Найди правильные вещи пожарного и одень Давидика.':'Finde die richtige Feuerwehrausrüstung und ziehe David an.','Каска':'Helm','Куртка':'Jacke','Перчатки':'Handschuhe','Сапоги':'Stiefel','Шланг':'Schlauch','Маска':'Maske','Пояс':'Gürtel','Рация':'Funkgerät','Наручники':'Handschellen','Значок':'Abzeichen',
  'Выбери пожарную машину':'Wähle das Feuerwehrauto','Какая машина нужна, чтобы ехать на пожар?':'Welches Fahrzeug fährt zum Brand?','Пожарная машина':'Feuerwehrauto','Полицейская машина':'Polizeiauto','Автобус':'Bus',
  'Детали пожарной машины':'Teile des Feuerwehrautos','Найди важные детали пожарной машины.':'Finde wichtige Teile des Feuerwehrautos.','Лестница':'Leiter','Сирена':'Sirene','Бак с водой':'Wassertank','Колёса':'Räder','Дверь авто':'Autotür','Тюрьма':'Gefängnis','Полицейский значок':'Polizeiabzeichen',
  'Собери пожарную машину':'Bereite das Feuerwehrauto vor','Сделай всё по порядку: подготовь пожарную машину к выезду.':'Mache alles der Reihe nach und bereite das Feuerwehrauto vor.','Проверить колёса':'Räder prüfen','Залить воду':'Wasser auffüllen','Подключить шланг':'Schlauch anschließen','Включить сирену':'Sirene einschalten',
  'Маршрут к пожару':'Weg zum Brand','Нажимай цифры по порядку, чтобы проложить маршрут.':'Tippe die Zahlen der Reihe nach, um den Weg zu finden.','Ищи цифры от 1 до 10':'Finde die Zahlen von 1 bis 10','Потуши огонь':'Lösche das Feuer','Потуши все очаги пожара.':'Lösche alle Feuerstellen.',
  'Полицейский Давид':'Polizist David','Собери форму полицейского.':'Stelle die Polizeiuniform zusammen.','Фуражка':'Polizeimütze','Блокнот':'Notizbuch','Жилет':'Weste','Выбери полицейскую машину':'Wähle das Polizeiauto','Какая машина нужна полицейскому Давидику?':'Welches Fahrzeug braucht Polizist David?','Такси':'Taxi','Детали полицейской машины':'Teile des Polizeiautos','Найди важные детали полицейской машины.':'Finde wichtige Teile des Polizeiautos.','Мигалка':'Blaulicht','Багажник':'Kofferraum','Сиденье':'Sitz','Собери полицейскую машину':'Bereite das Polizeiauto vor','Подготовь полицейскую машину к выезду.':'Bereite das Polizeiauto für den Einsatz vor.','Включить мигалку':'Blaulicht einschalten','Взять рацию':'Funkgerät nehmen','Пристегнуться':'Anschnallen','Лови преступника':'Fange den Täter','Нажимай цифры по порядку и догоняй преступника.':'Tippe die Zahlen der Reihe nach und hole den Täter ein.','Посади в тюрьму':'Bringe ihn ins Gefängnis','Сделай всё по порядку.':'Mache alles der Reihe nach.','Найти преступника':'Täter finden','Надеть наручники':'Handschellen anlegen','Отвезти в машине':'Mit dem Auto bringen','Закрыть в тюрьме':'Im Gefängnis einschließen',
  'Спаси котёнка':'Rette das Kätzchen','Спасти котёнка':'Kätzchen retten','Сначала лестница, потом спасение и молоко.':'Zuerst die Leiter, dann retten und Milch geben.','Поставить лестницу':'Leiter aufstellen','Снять котёнка':'Kätzchen herunterholen','Дать молоко':'Milch geben',
  'Охотник на привидений':'Geisterjäger','Подготовь Давидика к встрече с привидениями.':'Bereite David auf die Geister vor.','Фонарик':'Taschenlampe','Амулет':'Amulett','Сачок':'Fangnetz','Звезда храбрости':'Mutstern','Карта замка':'Schlosskarte','Колокольчик':'Glöckchen','Замок привидений':'Geisterschloss','Найди путь по цифрам в замке привидений.':'Finde den Weg durch das Geisterschloss anhand der Zahlen.','Ищи цифры от 1 до 9':'Finde die Zahlen von 1 bis 9','Поймай привидений':'Fange die Geister','Нажимай на привидения и прогони их!':'Tippe auf die Geister und vertreibe sie!',
  'Автомойка':'Autowäsche','Помой машину правильно — шаг за шагом.':'Wasche das Auto richtig – Schritt für Schritt.','Смыть грязь водой':'Schmutz mit Wasser abspülen','Нанести пену':'Schaum auftragen','Помыть щёткой':'Mit der Bürste waschen','Смыть пену':'Schaum abspülen','Высушить машину':'Auto trocknen',
  'Готовим сок':'Saft zubereiten','Приготовь свежий сок в соковыжималке.':'Bereite frischen Saft im Entsafter zu.','Выбрать фрукты':'Obst auswählen','Помыть фрукты':'Obst waschen','Разрезать фрукты':'Obst schneiden','Положить в соковыжималку':'In den Entsafter geben','Включить соковыжималку':'Entsafter einschalten','Налить сок в стакан':'Saft ins Glas gießen',
  'Собери все подвиги Давидика.':'Sammle alle Heldentaten von David.','Потушить пожар':'Feuer löschen','Собрать пожарную машину':'Feuerwehrauto zusammenbauen','Поймать вора':'Dieb fangen','Подготовить полицейскую машину':'Polizeiauto vorbereiten','Прогнать привидение':'Geist vertreiben',
  'Давидик':'David','Приключения':'Abenteuer','Давидика':'von David','Выбери миссию и помогай городу вместе с Давидиком!':'Wähle eine Mission und hilf der Stadt zusammen mit David!','Пожарный':'Feuerwehr','Полицейский':'Polizei','Привидения':'Geister','Все миссии':'Alle Missionen','Значки героя':'Heldenabzeichen','Играть':'Spielen','Карта миссий':'Missionskarte','Общий прогресс':'Gesamtfortschritt','Меню':'Menü','Сброс':'Zurücksetzen','Сначала пройди предыдущую миссию!':'Schließe zuerst die vorherige Mission ab!','Задание':'Aufgabe','Подсказка':'Hinweis','Баловство':'Unfug','Найди правильную машину для Давидика':'Finde das richtige Fahrzeug für David','Нажимай на привидения: осталось ':'Tippe auf die Geister: übrig ','Нажимай на огонь: осталось ':'Tippe auf das Feuer: übrig ','Нажимай внимательно!':'Tippe aufmerksam!','Нужно искать цифры по порядку.':'Finde die Zahlen der Reihe nach.','Выбирай только правильные предметы.':'Wähle nur die richtigen Gegenstände.','Нажми на все огоньки.':'Tippe auf alle Feuer.','Поймай всех привидений.':'Fange alle Geister.','Действуй строго по очереди.':'Handle genau der Reihe nach.','Уровень пройден!':'Level geschafft!','Давидик справился с миссией.':'David hat die Mission geschafft.','На карту':'Zur Karte','Следующий уровень':'Nächstes Level','Время вышло':'Die Zeit ist abgelaufen','Попробуй пройти миссию ещё раз.':'Versuche die Mission noch einmal.','Повторить':'Wiederholen','Карта':'Karte',
  'Иконка приложения':'App-Symbol','Установить приложение':'App installieren','Закрыть':'Schließen','Установи игру как приложение, чтобы быстро открывать её с экрана телефона.':'Installiere das Spiel als App, um es schnell vom Startbildschirm zu öffnen.','Установить':'Installieren','Если кнопка установки не сработает, выбери в меню браузера «Добавить на главный экран».':'Falls die Installation nicht startet, wähle im Browsermenü „Zum Startbildschirm hinzufügen“.','Добавить на главный экран':'Zum Startbildschirm hinzufügen',
  'Игра':'Spiel','Учить язык':'Sprache lernen','Выбери группу':'Wähle eine Gruppe','Нажимай на предметы и слушай их название.':'Tippe auf Gegenstände und höre ihren Namen.','Назад':'Zurück','Предметы':'Gegenstände','Прослушать':'Anhören','Русский':'Russisch','Немецкий':'Deutsch'
  ,'Детский садик':'Kindergarten','Карточки':'Karten','Я хочу кушать':'Ich möchte essen','Я хочу в туалет':'Ich muss auf die Toilette','Как тебя зовут?':'Wie heißt du?','Меня зовут Давид':'Ich heiße David','Я хочу пить':'Ich möchte trinken','Привет':'Hallo','Пока':'Tschüss','Пожалуйста':'Bitte','Спасибо':'Danke','Да':'Ja','Нет':'Nein','Помоги мне, пожалуйста':'Hilf mir bitte','Я не понимаю':'Ich verstehe nicht','Повтори, пожалуйста':'Bitte noch einmal','Мне холодно':'Mir ist kalt','Мне жарко':'Mir ist warm','Я устал':'Ich bin müde','У меня болит':'Mir tut es weh','Я хочу к маме':'Ich möchte zu Mama','Можно играть?':'Darf ich spielen?','Давай играть':'Komm, wir spielen','Это моё':'Das ist meins','Давай поделимся':'Lass uns teilen','Извини':'Entschuldigung','Всё хорошо':'Alles ist gut','Мне грустно':'Ich bin traurig','Я рад':'Ich freue mich','Где мой рюкзак?':'Wo ist mein Rucksack?','Где мои ботинки?':'Wo sind meine Schuhe?','Доброе утро':'Guten Morgen',
  'Апельсин':'Orange','Яблоко':'Apfel','Банан':'Banane','Груша':'Birne','Лимон':'Zitrone','Клубника':'Erdbeere','Виноград':'Trauben','Арбуз':'Wassermelone','Сок':'Saft','Стакан':'Glas','Нож':'Messer','Соковыжималка':'Entsafter','Гидрант':'Hydrant','Огнетушитель':'Feuerlöscher','Машина':'Auto','Колесо':'Rad','Дверь':'Tür','Руль':'Lenkrad','Фара':'Scheinwerfer','Зеркало':'Spiegel','Щётка':'Bürste','Вода':'Wasser','Привидение':'Geist','Звезда':'Stern','Замок':'Schloss','Животные':'Tiere','Кошка':'Katze','Собака':'Hund','Птица':'Vogel','Рыба':'Fisch','Лошадь':'Pferd','Корова':'Kuh','Заяц':'Hase','Медведь':'Bär','Дом':'Haus','Стол':'Tisch','Стул':'Stuhl','Кровать':'Bett','Чашка':'Tasse','Ложка':'Löffel','Молоко':'Milch','Игрушка':'Spielzeug','Фрукты и сок':'Obst und Saft','Транспорт':'Fahrzeuge','Дорога':'Straße','Светофор':'Ampel','Пена':'Schaum','Губка':'Schwamm','Сушилка':'Trockner','Дверь автомобиля':'Autotür'

};
const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([ru, de]) => [de, ru]));

function tx(value) {
  if (value == null) return '';
  const text = String(value);
  return state.lang === 'de' ? (translations[text] || text) : (reverseTranslations[text] || text);
}

function txDynamic(text) {
  const raw = String(text);
  const trimmed = raw.trim();
  const prefix = raw.slice(0, raw.indexOf(trimmed));
  const suffix = raw.slice(raw.indexOf(trimmed) + trimmed.length);
  let out = tx(trimmed);
  if (state.lang === 'de') {
    out = out.replace(/^Уровень (\d+)$/, 'Level $1')
      .replace(/^Собрано значков: (\d+) \/ (\d+)$/, 'Gesammelte Abzeichen: $1 / $2')
      .replace(/^Открыто уровней: (\d+) \/ (\d+)$/, 'Freigeschaltete Level: $1 / $2')
      .replace(/^Значки героя: (\d+)$/, 'Heldenabzeichen: $1');
  } else {
    out = out.replace(/^Level (\d+)$/, 'Уровень $1')
      .replace(/^Gesammelte Abzeichen: (\d+) \/ (\d+)$/, 'Собрано значков: $1 / $2')
      .replace(/^Freigeschaltete Level: (\d+) \/ (\d+)$/, 'Открыто уровней: $1 / $2')
      .replace(/^Heldenabzeichen: (\d+)$/, 'Значки героя: $1');
  }
  return prefix + out + suffix;
}

function applyLanguage(root = document) {
  document.documentElement.lang = state.lang === 'de' ? 'de' : 'ru';
  document.title = state.lang === 'de' ? 'Davids Abenteuer' : 'Приключения Давидика';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!node.nodeValue.trim()) return;
    node.nodeValue = txDynamic(node.nodeValue);
  });
  root.querySelectorAll?.('[alt]').forEach(el => el.alt = tx(el.alt));
  root.querySelectorAll?.('.lang-toggle').forEach(el => { const spans = el.querySelectorAll('span'); spans.forEach((span, i) => span.classList.toggle('active', (state.lang === 'ru' && i === 0) || (state.lang === 'de' && i === 1))); });
}

let levelData = null;
let learningView = null;
let timer = null;
let installShown = false;
let musicCtx = null;
let musicTimer = null;
let musicStarted = false;
let musicAudio = null;
let speechVoices = [];
const speechVoiceProfiles = {
  ru: { preferred: /child|kids|junior|little|neural|natural|online|premium|anna|alena|alyona|irina|maria|olga|svetlana|yana|milena|tatyana|катя|анна|ирина|ольга|светлана|яна/i, avoid: /male|man|pavel|maxim|alexander|sergey|ivan|муж/i, pitch: 1.22, rate: 0.92 },
  de: { preferred: /child|kids|junior|little|neural|natural|online|premium|katja|anna|petra|helena|vicki|heda|hedda|deutsch/i, avoid: /male|man|stefan|markus|thomas|hans|männlich/i, pitch: 1.18, rate: 0.93 }
};
function loadSpeechVoices() {
  if (!('speechSynthesis' in window)) return [];
  speechVoices = window.speechSynthesis.getVoices() || [];
  return speechVoices;
}
function chooseSpeechVoice(langKey) {
  const langPrefix = langKey === 'de' ? 'de' : 'ru';
  const voices = loadSpeechVoices().filter(v => (v.lang || '').toLowerCase().startsWith(langPrefix));
  if (!voices.length) return null;
  const profile = speechVoiceProfiles[langKey] || speechVoiceProfiles.ru;
  const score = (voice) => {
    const name = `${voice.name || ''} ${voice.voiceURI || ''}`.toLowerCase();
    let s = 0;
    if (voice.default) s += 6;
    if (profile.preferred.test(name)) s += 40;
    if (profile.avoid.test(name)) s -= 12;
    if (/female|woman|frau|girl|mädchen|жен/i.test(name)) s += 10;
    if (/google|microsoft|apple|samsung/i.test(name)) s += 4;
    return s;
  };
  return voices.sort((a, b) => score(b) - score(a))[0] || voices[0];
}
if ('speechSynthesis' in window) {
  loadSpeechVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', loadSpeechVoices);
}

function save() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function playSound(kind = 'tap') {
  if (!state.sound) return;
  const ctx = ensureMusicContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const oscillator = (type, from, to, duration, volume = 0.05, delay = 0) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const t = now + delay;
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    if (to) o.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + duration);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(volume, t + Math.min(0.018, duration / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + duration + 0.03);
  };

  const noise = (duration = 0.18, volume = 0.05, delay = 0, filterFreq = 1200) => {
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    const t = now + delay;
    source.buffer = buffer;
    filter.type = 'lowpass'; filter.frequency.value = filterFreq;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start(t); source.stop(t + duration + 0.02);
  };

  if (kind === 'bad') { oscillator('sawtooth', 170, 85, .28, .055); noise(.12,.025,0,500); return; }
  if (kind === 'win') { [523,659,784,1047].forEach((f,i)=>oscillator('sine',f,f,.34,.045,i*.07)); return; }
  if (kind === 'pop') { oscillator('sine',420,720,.12,.035); return; }
  if (kind === 'ghost') { oscillator('triangle',360,150,.34,.035); oscillator('sine',720,300,.28,.016,.04); return; }
  if (kind === 'water') { noise(.42,.065,0,2600); oscillator('sine',180,120,.38,.018); return; }
  if (kind === 'soap') { oscillator('sine',520,820,.16,.03); oscillator('sine',690,980,.18,.024,.06); return; }
  if (kind === 'brush') { noise(.34,.055,0,900); oscillator('triangle',95,75,.3,.022); return; }
  if (kind === 'dryer') { noise(.5,.055,0,650); oscillator('sine',110,135,.48,.025); return; }
  if (kind === 'fruit') { oscillator('triangle',260,180,.12,.04); noise(.08,.018,0,1400); return; }
  if (kind === 'cut') { noise(.1,.05,0,3000); oscillator('square',180,120,.08,.018); return; }
  if (kind === 'motor') { oscillator('sawtooth',75,120,.55,.035); noise(.55,.035,0,700); return; }
  if (kind === 'pour') { noise(.42,.045,0,2200); oscillator('sine',320,210,.38,.018); return; }
  if (kind === 'ok') { oscillator('sine',620,880,.16,.04); oscillator('sine',880,1100,.13,.025,.07); return; }
  oscillator('sine',480,620,.1,.028);
}

function ensureMusicContext() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!musicCtx) musicCtx = new AC();
  if (musicCtx.state === 'suspended') musicCtx.resume().catch(() => {});
  return musicCtx;
}

function tone(freq, start, duration = 0.16, volume = 0.028, type = 'sine') {
  const ctx = ensureMusicContext();
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(volume, start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(start);
  o.stop(start + duration + 0.04);
}

function drum(start, low = 120, high = 60, volume = 0.05) {
  const ctx = ensureMusicContext();
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.setValueAtTime(low, start);
  o.frequency.exponentialRampToValueAtTime(high, start + 0.12);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(volume, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(start);
  o.stop(start + 0.18);
}

function chime(freq, start, theme) {
  const wave = theme === 'ghost' ? 'triangle' : theme === 'police' ? 'square' : 'sine';
  tone(freq, start, 0.16, theme === 'ghost' ? 0.022 : 0.028, wave);
  if (theme !== 'ghost') tone(freq * 2, start + 0.02, 0.1, 0.012, 'sine');
}

function stopMusic() {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
  if (musicAudio) {
    musicAudio.pause();
    musicAudio.currentTime = 0;
  }
}

function musicFileForLevel(level) {
  const map = {
    fire: 'assets/music/fire.wav',
    police: 'assets/music/police.wav',
    ghost: 'assets/music/ghost.wav',
    bonus: 'assets/music/bonus.wav',
    all: 'assets/music/bonus.wav'
  };
  return map[level?.theme] || map.all;
}

function startMusicForLevel(level) {
  stopMusic();
  if (!state.sound || !level) return;
  const src = musicFileForLevel(level);
  musicAudio = new Audio(src);
  musicAudio.loop = true;
  musicAudio.preload = 'auto';
  musicAudio.volume = level.theme === 'ghost' ? 0.18 : 0.16;
  musicAudio.play().catch(() => {});
}

function formatTime(value) {
  const minutes = String(Math.max(0, Math.floor(value / 60))).padStart(2, '0');
  const seconds = String(Math.max(0, value % 60)).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function themeClass(theme) {
  return `theme-${theme}`;
}

function shell(bg, html, theme = 'default') {
  clearInterval(timer);
  app.innerHTML = `
    <main class="phone ${themeClass(theme)}">
      <div class="bg" style="background-image:url('${bg}')"></div>
      <div class="shade"></div>
      <section class="screen">${html}</section>
    </main>
    ${installTabMarkup()}
  `;
  applyLanguage(app);
}

function installTabMarkup() {
  if (isStandaloneApp() || sessionStorage.getItem('davidikInstallTabClosed') === '1') return '';
  return `
    <aside class="install-tab" role="region" aria-label="Установить приложение">
      <button class="install-tab-main" onclick="showInstallModal()">
        <img src="${assets.icon192}" alt="Иконка приложения">
        <span><b>Установить приложение</b><small>Приключения Давидика</small></span>
      </button>
      <button class="install-tab-close" onclick="closeInstallTab(event)" aria-label="Закрыть">✕</button>
    </aside>
  `;
}

window.closeInstallTab = function (event) {
  event?.stopPropagation();
  sessionStorage.setItem('davidikInstallTabClosed', '1');
  document.querySelector('.install-tab')?.remove();
  document.querySelector('.install-overlay')?.remove();
  document.querySelector('.install-tab')?.remove();
};

function topBar() {
  return `
    <div class="topbar">
      <div class="status-pills">
        <div class="pill">🪙 <span>${state.coins}</span></div>
        <div class="pill">⭐ <span>${state.stars}</span></div>
      </div>
      <div class="topbar-actions">
        <button class="lang-toggle" onclick="toggleLanguage()" aria-label="RU / DE"><span class="${state.lang === 'ru' ? 'active' : ''}">RU</span><i></i><span class="${state.lang === 'de' ? 'active' : ''}">DE</span></button>
        <button class="circle-btn" onclick="toggleSound()">${state.sound ? '🔊' : '🔇'}</button>
      </div>
    </div>
  `;
}

window.toggleLanguage = function () {
  state.lang = state.lang === 'ru' ? 'de' : 'ru';
  save();
  if (learningView === 'groups') return renderLanguageLearning();
  if (learningView && learningView.startsWith('group:')) return openLearningGroup(learningView.slice(6));
  applyLanguage(document);
};

window.toggleSound = function () {
  state.sound = !state.sound;
  save();
  if (!state.sound) stopMusic();
  else if (levelData) startMusicForLevel(levelData.level);
  if (levelData) renderLevel(); else renderMenu();
};

function cardPhoto(img, label) {
  return `<div class="family-card"><img src="${img}" alt="${label}"><div class="family-name">${label}</div></div>`;
}

function davidPhotoStrip() {
  const photos = [assets.davidPolice, assets.davidFunny, assets.davidGhost, assets.davidDrink];
  return `
    <div class="david-strip">
      ${photos.map((src, i) => `<div class="david-mini float-${(i % 4) + 1}"><img src="${src}" alt="Давид ${i + 1}"></div>`).join('')}
    </div>
  `;
}

window.renderMenu = function () {
  learningView = null;
  stopMusic();
  levelData = null;
  shell(assets.menu, `
    ${topBar()}
    <div class="main-tabs"><button class="main-tab active">🎮 Игра</button><button class="main-tab" onclick="renderLanguageLearning()">🔤 Учить язык</button></div>
    <div class="rainbow-title">
      <div class="rainbow-arc"></div>
      <div class="title-shell">
        <span class="title-top">Приключения</span>
        <span class="title-bottom">Давидика</span>
      </div>
    </div>

    <div class="hero-menu">
      <div class="hero-glass"></div>
      <div class="hero-photo-wrap float-1"><img src="${assets.davidMain}" alt="Давидик"></div>
      <div class="hero-caption">Выбери миссию и помогай городу вместе с Давидиком!</div>
    </div>

    <div class="mode-row">
      <button class="big-action fire" onclick="openMap('fire')">🔥 Пожарный</button>
      <button class="big-action police" onclick="openMap('police')">👮 Полицейский</button>
    </div>

    <div class="mode-row ghost-row">
      <button class="big-action ghost" onclick="openMap('ghost')">👻 Привидения</button>
      <button class="big-action all" onclick="openMap('all')">⭐ Все миссии</button>
    </div>


    <div class="family-row enhanced">
      ${cardPhoto(assets.momDad, 'Мама и папа')}
      ${cardPhoto(assets.anya, 'Аня')}
      ${cardPhoto(assets.grandma, 'Инна')}
      ${cardPhoto(assets.vika, 'Вика')}
    </div>

    <div class="panel-card compact reward-panel">
      <div class="progress-head">Значки героя</div>
      <div class="badge-row">${badgeChips()}</div>
      <div class="progress-text">Собрано значков: ${state.badges.length} / ${levels.length}</div>
    </div>

    <button class="play-btn" onclick="openMap('all')">Играть</button>
  `, 'menu');
  window.scrollTo({top: 0, behavior: 'auto'});
};


const learningGroups = [
  { id:'kindergarten', titleRu:'Детский садик', titleDe:'Kindergarten', emoji:'🎒', items:[
    ['Я хочу кушать','Ich möchte essen','assets/learning/kg_eat.png?v=16'],
    ['Я хочу в туалет','Ich muss auf die Toilette','assets/learning/kg_toilet.png?v=16'],
    ['Как тебя зовут?','Wie heißt du?','assets/learning/kg_name_question.png?v=16'],
    ['Меня зовут Давид','Ich heiße David','assets/learning/kg_my_name_david.png?v=16'],
    ['Я хочу пить','Ich möchte trinken','assets/learning/kg_drink.png?v=16'],
    ['Привет','Hallo','assets/learning/kg_hello.png?v=16'],
    ['Пока','Tschüss','assets/learning/kg_bye.png?v=16'],
    ['Пожалуйста','Bitte','assets/learning/kg_please.png?v=16'],
    ['Спасибо','Danke','assets/learning/kg_thanks.png?v=16'],
    ['Да','Ja','assets/learning/kg_yes.png?v=16'],
    ['Нет','Nein','assets/learning/kg_no.png?v=16'],
    ['Помоги мне, пожалуйста','Hilf mir bitte','assets/learning/kg_help_me.png?v=16'],
    ['Я не понимаю','Ich verstehe nicht','assets/learning/kg_dont_understand.png?v=16'],
    ['Повтори, пожалуйста','Bitte noch einmal','assets/learning/kg_repeat.png?v=16'],
    ['Мне холодно','Mir ist kalt','assets/learning/kg_cold.png?v=16'],
    ['Мне жарко','Mir ist warm','assets/learning/kg_hot.png?v=16'],
    ['Я устал','Ich bin müde','assets/learning/kg_tired.png?v=16'],
    ['У меня болит','Mir tut es weh','assets/learning/kg_it_hurts.png?v=16'],
    ['Я хочу к маме','Ich möchte zu Mama','assets/learning/kg_want_mom.png?v=16'],
    ['Можно играть?','Darf ich spielen?','assets/learning/kg_can_play.png?v=16'],
    ['Давай играть','Komm, wir spielen','assets/learning/kg_lets_play.png?v=16'],
    ['Это моё','Das ist meins','assets/learning/kg_mine.png?v=16'],
    ['Давай поделимся','Lass uns teilen','assets/learning/kg_share.png?v=16'],
    ['Извини','Entschuldigung','assets/learning/kg_sorry.png?v=16'],
    ['Всё хорошо','Alles ist gut','assets/learning/kg_all_good.png?v=16'],
    ['Мне грустно','Ich bin traurig','assets/learning/kg_sad.png?v=16'],
    ['Я рад','Ich freue mich','assets/learning/kg_happy.png?v=16'],
    ['Где мой рюкзак?','Wo ist mein Rucksack?','assets/learning/kg_where_backpack.png?v=16'],
    ['Где мои ботинки?','Wo sind meine Schuhe?','assets/learning/kg_where_shoes.png?v=16'],
    ['Доброе утро','Guten Morgen','assets/learning/kg_good_morning.png?v=16']
  ]},
  { id:'firefighter', titleRu:'Пожарный', titleDe:'Feuerwehr', emoji:'🚒', items:[
    ['Пожарный','Feuerwehrmann','assets/learning/fire_firefighter.png?v=16'],['Пожарная машина','Feuerwehrauto','assets/learning/fire_firetruck.png?v=16'],['Каска','Helm','assets/learning/fire_helmet.png?v=16'],['Куртка','Jacke','assets/learning/fire_jacket.png?v=16'],['Перчатки','Handschuhe','assets/learning/fire_gloves.png?v=16'],['Сапоги','Stiefel','assets/learning/fire_boots.png?v=16'],['Шланг','Schlauch','assets/learning/fire_hose.png?v=16'],['Гидрант','Hydrant','assets/learning/fire_hydrant.png?v=16'],['Лестница','Leiter','assets/learning/fire_ladder.png?v=16'],['Огнетушитель','Feuerlöscher','assets/learning/fire_extinguisher.png?v=16'],['Маска','Maske','assets/learning/fire_mask.png?v=16'],['Пояс','Gürtel','assets/learning/fire_belt.png?v=16'],['Бак с водой','Wassertank','assets/learning/fire_watertank.png?v=16'],['Сирена','Sirene','assets/learning/fire_siren.png?v=16'] ]},
  { id:'police', titleRu:'Полицейский', titleDe:'Polizei', emoji:'🚓', items:[
    ['Полицейский','Polizist','assets/learning/police_officer.png?v=16'],['Полицейская машина','Polizeiauto','assets/learning/police_car.png?v=16'],['Фуражка','Polizeimütze','assets/learning/police_hat.png?v=16'],['Значок','Abzeichen','assets/learning/police_badge.png?v=16'],['Рация','Funkgerät','assets/learning/police_radio.png?v=16'],['Наручники','Handschellen','assets/learning/police_cuffs.png?v=16'],['Мигалка','Blaulicht','assets/learning/police_lightbar.png?v=16'],['Сирена','Sirene','assets/learning/police_siren.png?v=16'],['Тюрьма','Gefängnis','assets/learning/police_jail.png?v=16'],['Блокнот','Notizbuch','assets/learning/police_notebook.png?v=16'],['Жилет','Weste','assets/learning/police_vest.png?v=16'],['Дверь автомобиля','Autotür','assets/learning/police_door.png?v=16'] ]},
  { id:'car', titleRu:'Машина', titleDe:'Auto', emoji:'🚗', items:[
    ['Машина','Auto','assets/learning/car_car.png?v=16'],['Колесо','Rad','assets/learning/car_wheel.png?v=16'],['Дверь','Tür','assets/learning/car_door.png?v=16'],['Багажник','Kofferraum','assets/learning/car_trunk.png?v=16'],['Сиденье','Sitz','assets/learning/car_seat.png?v=16'],['Руль','Lenkrad','assets/learning/car_steering.png?v=16'],['Фара','Scheinwerfer','assets/learning/car_headlight.png?v=16'],['Зеркало','Spiegel','assets/learning/car_mirror.png?v=16'],['Щётка','Bürste','assets/learning/car_brush.png?v=16'],['Вода','Wasser','assets/learning/car_water.png?v=16'],['Пена','Schaum','assets/learning/car_foam.png?v=16'],['Губка','Schwamm','assets/learning/car_sponge.png?v=16'],['Сушилка','Trockner','assets/learning/car_dryer.png?v=16'] ]},
  { id:'transport', titleRu:'Транспорт', titleDe:'Fahrzeuge', emoji:'🚌', items:[
    ['Автобус','Bus','assets/learning/transport_bus.png?v=16'],['Такси','Taxi','assets/learning/transport_taxi.png?v=16'],['Пожарная машина','Feuerwehrauto','assets/learning/transport_firetruck.png?v=16'],['Полицейская машина','Polizeiauto','assets/learning/transport_policecar.png?v=16'],['Машина','Auto','assets/learning/transport_car.png?v=16'],['Колесо','Rad','assets/learning/transport_wheel.png?v=16'],['Дорога','Straße','assets/learning/transport_road.png?v=16'],['Светофор','Ampel','assets/learning/transport_trafficlight.png?v=16'] ]},
  { id:'juice', titleRu:'Фрукты и сок', titleDe:'Obst und Saft', emoji:'🍊', items:[
    ['Апельсин','Orange','assets/learning/juice_orange.png?v=16'],['Яблоко','Apfel','assets/learning/juice_apple.png?v=16'],['Банан','Banane','assets/learning/juice_banana.png?v=16'],['Груша','Birne','assets/learning/juice_pear.png?v=16'],['Лимон','Zitrone','assets/learning/juice_lemon.png?v=16'],['Клубника','Erdbeere','assets/learning/juice_strawberry.png?v=16'],['Виноград','Trauben','assets/learning/juice_grapes.png?v=16'],['Арбуз','Wassermelone','assets/learning/juice_watermelon.png?v=16'],['Сок','Saft','assets/learning/juice_juice.png?v=16'],['Стакан','Glas','assets/learning/juice_glass.png?v=16'],['Нож','Messer','assets/learning/juice_knife.png?v=16'],['Соковыжималка','Entsafter','assets/learning/juice_juicer.png?v=16'] ]},
  { id:'ghost', titleRu:'Привидения', titleDe:'Geister', emoji:'👻', items:[
    ['Привидение','Geist','assets/learning/ghost_ghost.png?v=16'],['Фонарик','Taschenlampe','assets/learning/ghost_flashlight.png?v=16'],['Амулет','Amulett','assets/learning/ghost_amulet.png?v=16'],['Сачок','Fangnetz','assets/learning/ghost_net.png?v=16'],['Звезда','Stern','assets/learning/ghost_star.png?v=16'],['Карта','Karte','assets/learning/ghost_map.png?v=16'],['Колокольчик','Glöckchen','assets/learning/ghost_bell.png?v=16'],['Замок','Schloss','assets/learning/ghost_castle.png?v=16'] ]},
  { id:'animals', titleRu:'Животные', titleDe:'Tiere', emoji:'🐾', items:[
    ['Кошка','Katze','assets/learning/animals_cat.png?v=16'],['Собака','Hund','assets/learning/animals_dog.png?v=16'],['Птица','Vogel','assets/learning/animals_bird.png?v=16'],['Рыба','Fisch','assets/learning/animals_fish.png?v=16'],['Лошадь','Pferd','assets/learning/animals_horse.png?v=16'],['Корова','Kuh','assets/learning/animals_cow.png?v=16'],['Заяц','Hase','assets/learning/animals_rabbit.png?v=16'],['Медведь','Bär','assets/learning/animals_bear.png?v=16'] ]},
  { id:'home', titleRu:'Дом', titleDe:'Haus', emoji:'🏠', items:[
    ['Дом','Haus','assets/learning/home_house.png?v=16'],['Стол','Tisch','assets/learning/home_table.png?v=16'],['Стул','Stuhl','assets/learning/home_chair.png?v=16'],['Кровать','Bett','assets/learning/home_bed.png?v=16'],['Чашка','Tasse','assets/learning/home_cup.png?v=16'],['Ложка','Löffel','assets/learning/home_spoon.png?v=16'],['Молоко','Milch','assets/learning/home_milk.png?v=16'],['Игрушка','Spielzeug','assets/learning/home_toy.png?v=16'] ]}
];

function learningLabel(item) { return state.lang === 'de' ? item[1] : item[0]; }
function learningTitle(group) { return state.lang === 'de' ? group.titleDe : group.titleRu; }
function learningVisual(value, alt) {
  return typeof value === 'string' && value.includes('/')
    ? `<img src="${value}" alt="${alt}">`
    : `<span class="learning-emoji">${value}</span>`;
}

window.renderLanguageLearning = function () {
  learningView = 'groups';
  stopMusic();
  levelData = null;
  shell(assets.menu, `
    ${topBar()}
    <div class="main-tabs"><button class="main-tab" onclick="renderMenu()">🎮 Игра</button><button class="main-tab active">🔤 Учить язык</button></div>
    <div class="language-hero panel-card compact">
      <div class="section-title language-main-title">${tx('Учить язык')}</div>
      <div class="goal-text language-main-subtitle">${tx('Нажимай на предметы и слушай их название.')}</div>
      <div class="language-selected">${state.lang === 'de' ? '🇩🇪 ' + tx('Немецкий') : '🇷🇺 ' + tx('Русский')}</div>
    </div>
    <div class="learning-groups">
      ${learningGroups.map(group => `
        <button class="learning-group" onclick="openLearningGroup('${group.id}')">
          <span>${group.emoji}</span><b>${learningTitle(group)}</b><small>${group.items.length} ${tx('Карточки').toLowerCase()}</small>
        </button>`).join('')}
    </div>
  `, 'menu');
  window.scrollTo({top:0,behavior:'auto'});
};

window.openLearningGroup = function (id) {
  learningView = `group:${id}`;
  const group = learningGroups.find(g => g.id === id) || learningGroups[0];
  shell(assets.menu, `
    ${topBar()}
    <div class="learning-header">
      <button class="circle-btn" onclick="renderLanguageLearning()">←</button>
      <div><div class="section-title">${group.emoji} ${learningTitle(group)}</div><div class="goal-text">${tx('Нажимай на предметы и слушай их название.')}</div></div>
    </div>
    <div class="learning-items">
      ${group.items.map((item,index) => `
        <button class="learning-item" onclick="speakLearningItem('${group.id}',${index},this)">
          <div class="learning-visual">${learningVisual(item[2], learningLabel(item))}</div>
          <b>${learningLabel(item)}</b>
          <span>🔊</span>
        </button>`).join('')}
    </div>
  `, 'menu');
  window.scrollTo({top:0,behavior:'auto'});
};

window.speakLearningItem = function (groupId, index, button) {
  const group = learningGroups.find(g => g.id === groupId);
  const item = group?.items[index];
  if (!item || !('speechSynthesis' in window)) return;
  const langKey = state.lang === 'de' ? 'de' : 'ru';
  const profile = speechVoiceProfiles[langKey] || speechVoiceProfiles.ru;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(langKey === 'de' ? item[1] : item[0]);
  utterance.lang = langKey === 'de' ? 'de-DE' : 'ru-RU';
  utterance.rate = profile.rate;
  utterance.pitch = profile.pitch;
  utterance.volume = 1;
  const voice = chooseSpeechVoice(langKey);
  if (voice) utterance.voice = voice;
  button?.classList.add('speaking');
  utterance.onend = utterance.onerror = () => button?.classList.remove('speaking');
  window.speechSynthesis.speak(utterance);
};

function filteredLevels(mode) {
  if (mode === 'fire') return levels.filter(l => ['fire'].includes(l.theme));
  if (mode === 'police') return levels.filter(l => ['police'].includes(l.theme));
  if (mode === 'ghost') return levels.filter(l => ['ghost'].includes(l.theme));
  return levels;
}

window.openMap = function (mode = 'all') {
  stopMusic();
  const list = filteredLevels(mode);
  const continueLevel = list.find(l => l.id >= state.unlocked) || list[list.length - 1] || levels[0];
  const missionChips = list.map(l => `<div class="mission-chip chip-${l.theme}">${themeEmoji(l.theme)} ${l.title}</div>`).join('');
  const nodes = list.map((level, index) => {
    const locked = level.id > state.unlocked;
    const side = index % 2 === 0 ? 'left' : 'right';
    return `
      <button class="map-node ${side} ${locked ? 'locked' : ''} node-${level.theme}" style="top:${24 + index * 108}px" onclick="${locked ? 'lockedLevel()' : 'startLevel(' + level.id + ')'}">
        <span class="map-node-id">${level.id}</span>
        <span class="map-node-title">${themeEmoji(level.theme)}</span>
        <span class="map-stars">⭐ ⭐ ⭐</span>
      </button>
    `;
  }).join('');

  shell(mode === 'ghost' ? assets.ghostBg : assets.map, `
    ${topBar()}
    <div class="section-title">Карта миссий</div>
    <div class="mission-strip">${missionChips}</div>

    <div class="map-card taller" style="min-height:${Math.max(640, list.length * 112 + 120)}px">
      <div class="map-path"></div>
      ${nodes}
      <div class="map-comment comment-1"><img src="${assets.anya}" alt="Аня"><span>Да-ви-да!</span></div>
      <div class="map-comment comment-2"><img src="${assets.grandma}" alt="Инна"><span>Ну-ну!</span></div>
      <div class="map-comment comment-3"><img src="${assets.vika}" alt="Вика"><span>Штраф!</span></div>
      <div class="map-comment comment-4"><img src="${assets.momDad}" alt="Мама и папа"><span>Ай-яй-яй!</span></div>
    </div>

    <div class="panel-card compact">
      <div class="progress-head">Общий прогресс</div>
      <div class="progress-line"><span style="width:${Math.round((state.unlocked - 1) / levels.length * 100)}%"></span></div>
      <div class="progress-text">Открыто уровней: ${Math.min(state.unlocked, levels.length)} / ${levels.length}</div><div class="progress-text">Значки героя: ${state.badges.length}</div>
    </div>

    <div class="footer-row sticky-bottom">
      <button class="mini-btn blue" onclick="renderMenu()">Меню</button>
      <button class="play-btn small" onclick="startLevel(${continueLevel.id})">Играть</button>
      <button class="mini-btn orange" onclick="resetProgress('${mode}')">Сброс</button>
    </div>
  `, mode === 'ghost' ? 'ghost' : 'map');
  window.scrollTo({top: 0, behavior: 'auto'});
};

window.lockedLevel = function () {
  playSound('bad');
  showFamilyPopup(randomFamily(), 'Сначала пройди предыдущую миссию!');
};

window.resetProgress = function (mode = 'all') {
  state = { unlocked: 1, stars: 0, coins: 1250, sound: state.sound, badges: [], lang: state.lang };
  save();
  openMap(mode);
};

function currentModeFromLevel(level) {
  if (level.theme === 'fire') return 'fire';
  if (level.theme === 'police') return 'police';
  if (level.theme === 'ghost') return 'ghost';
  return 'all';
}

window.startLevel = function (id) {
  const level = levels.find(l => l.id === id) || levels[0];
  levelData = {
    level,
    timeLeft: level.time,
    done: {},
    progress: 0,
    expectedNumber: 1,
    completedCount: 0,
    positions: shuffledPositions(level.count || 6),
    sequenceIndex: 0,
    finalDone: {}
  };
  renderLevel();
  startMusicForLevel(level);
  scrollToMissionControls();
  timer = setInterval(() => {
    levelData.timeLeft -= 1;
    const el = $('.time-value');
    if (el) el.textContent = formatTime(levelData.timeLeft);
    if (levelData.timeLeft <= 0) failLevel();
  }, 1000);
};

function renderLevel() {
  const l = levelData.level;
  shell(l.bg, `
    ${topBar()}
    <div class="level-head-row">
      <button class="circle-btn" onclick="openMap('${currentModeFromLevel(l)}')">←</button>
      <div class="timer-box">⏱️ <span class="time-value">${formatTime(levelData.timeLeft)}</span></div>
      <button class="circle-btn" onclick="hint()">?</button>
    </div>

    <div class="level-name">Уровень ${l.id}<span>${l.title}</span></div>

    <div class="scene-header panel-card compact">
      <div class="scene-avatar float-2"><img src="${l.david}" alt="Давидик"></div>
      <div class="scene-text">
        <div class="goal-title">Задание</div>
        <div class="goal-text">${l.goal}</div>
        <div class="mission-tip">💡 ${missionTip(l)}</div>
        <div class="progress-line"><span style="width:${Math.round(levelData.progress * 100)}%"></span></div>
      </div>
    </div>

    ${renderLevelContent(l)}

    <div class="footer-row sticky-bottom">
      <button class="mini-btn blue" onclick="hint()">Подсказка</button>
      <button class="mini-btn orange" onclick="mistakePopup()">Баловство</button>
    </div>
  `, l.theme);
}

function renderLevelContent(level) {
  if (level.type === 'dress' || level.type === 'ghost-gear') {
    return `
      <div class="panel-card auto-focus">
        <div class="icon-grid">
          ${shuffle(level.items.slice()).map(item => itemButton(item)).join('')}
        </div>
      </div>
    `;
  }

  if (level.type === 'choose') {
    return `
      <div class="scene-card">
        <img src="${level.bg}" alt="${level.title}">
        <div class="scene-overlay">Найди правильную машину для Давидика</div>
      </div>
      <div class="panel-card auto-focus">
        <div class="choice-grid triple">
          ${shuffle(level.choices.slice()).map((choice, index) => choiceButton(choice, index)).join('')}
        </div>
      </div>
    `;
  }

  if (level.type === 'numbers') {
    return `
      <div class="scene-card">
        <img src="${level.bg}" alt="${level.title}">
        <div class="scene-overlay">${level.instruction}</div>
      </div>
      <div class="panel-card auto-focus">
        <div class="number-board ${level.count > 8 ? 'nine' : ''}">
          ${shuffle(Array.from({ length: level.count }, (_, i) => i + 1)).map(n => `
            <button class="number-tile" onclick="tapNumber(${n}, this)">${n}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (level.type === 'tap-fire') {
    return hotspotScene(level, 'fire');
  }

  if (level.type === 'tap-ghost') {
    return hotspotScene(level, 'ghost');
  }

  if (level.type === 'sequence') {
    return `
      <div class="panel-card auto-focus">
        <div class="step-list">
          ${level.steps.map((step, index) => `
            <button class="step-btn" onclick="tapSequence(${index + 1}, this)">
              <img src="${step.icon}" alt="${step.label}">
              <span>${step.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (level.type === 'sequenceEmoji') {
    return `
      <div class="panel-card auto-focus">
        <div class="step-list">
          ${level.steps.map((step, index) => `
            <button class="step-btn emoji-only" onclick="tapSequence(${index + 1}, this)">
              <div class="emoji-spot">${step.emoji}</div>
              <span>${step.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="panel-card auto-focus">
      <div class="step-list">
        ${level.actions.map(action => `
          <button class="step-btn emoji-only" onclick="tapFinal('${action.id}', this)">
            <div class="emoji-spot">${action.emoji}</div>
            <span>${action.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function hotspotScene(level, type) {
  const count = level.count;
  return `
    <div class="scene-card hotspot-card auto-focus ${type === 'ghost' ? 'ghost-card' : ''}">
      <img src="${level.bg}" alt="${level.title}">
      <div class="scene-overlay">${type === 'ghost' ? 'Нажимай на привидения: осталось ' : 'Нажимай на огонь: осталось '}<b id="leftCount">${count}</b></div>
      <div class="hotspots-layer">
        ${levelData.positions.map((pos, i) => `
          <button class="hotspot ${type}" style="left:${pos[0]}%; top:${pos[1]}%" onclick="tapHotspot('${type}', this)">
            <span>${type === 'ghost' ? '👻' : '🔥'}</span>
            <small>${i + 1}</small>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function itemButton(item) {
  const visual = item.icon ? `<img src="${item.icon}" alt="${item.label}">` : `<div class="emoji-spot">${item.emoji}</div>`;
  return `
    <button class="icon-card" onclick="tapItem('${item.id}', ${item.ok}, this)">
      <div class="icon-visual">${visual}</div>
      <div class="icon-label">${item.label}</div>
    </button>
  `;
}

function choiceButton(choice) {
  const visual = choice.icon ? `<img src="${choice.icon}" alt="${choice.label}">` : `<div class="emoji-spot">${choice.emoji}</div>`;
  return `
    <button class="choice-card" onclick="tapChoice(${choice.ok}, this)">
      <div class="icon-visual">${visual}</div>
      <span>${choice.label}</span>
    </button>
  `;
}

window.tapItem = function (id, ok, element) {
  if (element.classList.contains('done') || element.classList.contains('wrong')) return;
  if (!ok) {
    element.classList.add('wrong');
    playSound('bad');
    mistakePopup();
    setTimeout(() => element.classList.remove('wrong'), 350);
    return;
  }
  levelData.done[id] = true;
  element.classList.add('done');
  playSound(levelData.level.theme === 'ghost' ? 'ghost' : 'ok');
  const needed = levelData.level.items.filter(item => item.ok).length;
  levelData.completedCount = Object.keys(levelData.done).length;
  setProgress(levelData.completedCount / needed);
  if (levelData.completedCount >= needed) completeLevel();
};

window.tapChoice = function (ok, element) {
  if (element.classList.contains('done')) return;
  if (!ok) {
    element.classList.add('wrong');
    playSound('bad');
    mistakePopup();
    setTimeout(() => element.classList.remove('wrong'), 350);
    return;
  }
  element.classList.add('done');
  playSound('ok');
  setProgress(1);
  setTimeout(completeLevel, 320);
};

window.tapNumber = function (n, element) {
  if (element.classList.contains('done')) return;
  if (n !== levelData.expectedNumber) {
    element.classList.add('wrong');
    playSound('bad');
    mistakePopup();
    setTimeout(() => element.classList.remove('wrong'), 350);
    return;
  }
  element.classList.add('done');
  element.disabled = true;
  levelData.expectedNumber += 1;
  levelData.completedCount += 1;
  playSound(levelData.level.theme === 'ghost' ? 'ghost' : 'tap');
  setProgress(levelData.completedCount / levelData.level.count);
  if (levelData.completedCount >= levelData.level.count) completeLevel();
};

window.tapHotspot = function (type, element) {
  if (element.classList.contains('done')) return;
  element.classList.add('done');
  element.innerHTML = `<span>${type === 'ghost' ? '✨' : '💧'}</span><small>ok</small>`;
  levelData.completedCount += 1;
  playSound(type === 'ghost' ? 'ghost' : 'ok');
  setProgress(levelData.completedCount / levelData.level.count);
  const left = $('#leftCount');
  if (left) left.textContent = Math.max(0, levelData.level.count - levelData.completedCount);
  if (levelData.completedCount >= levelData.level.count) completeLevel();
};

window.tapSequence = function (stepNumber, element) {
  const expected = levelData.sequenceIndex + 1;
  if (stepNumber !== expected) {
    playSound('bad');
    mistakePopup();
    return;
  }
  levelData.sequenceIndex = stepNumber;
  element.classList.add('done');
  playSound(levelData.level.steps[stepNumber - 1].sound || 'ok');
  setProgress(stepNumber / levelData.level.steps.length);
  if (stepNumber >= levelData.level.steps.length) completeLevel();
};

window.tapFinal = function (id, element) {
  if (levelData.finalDone[id]) return;
  levelData.finalDone[id] = true;
  element.classList.add('done');
  playSound('ok');
  const count = Object.keys(levelData.finalDone).length;
  setProgress(count / levelData.level.actions.length);
  if (count >= levelData.level.actions.length) completeLevel();
};

function setProgress(value) {
  levelData.progress = value;
  const bar = $('.progress-line span');
  if (bar) bar.style.width = `${Math.round(value * 100)}%`;
}

window.hint = function () {
  const level = levelData.level;
  let text = 'Нажимай внимательно!';
  if (level.type === 'numbers') text = 'Нужно искать цифры по порядку.';
  if (level.type === 'dress' || level.type === 'ghost-gear') text = 'Выбирай только правильные предметы.';
  if (level.type === 'tap-fire') text = 'Нажми на все огоньки.';
  if (level.type === 'tap-ghost') text = 'Поймай всех привидений.';
  if (level.type === 'sequence' || level.type === 'sequenceEmoji') text = 'Действуй строго по очереди.';
  showFamilyPopup(randomFamily(), text);
};

window.mistakePopup = function () {
  showFamilyPopup(randomFamily());
};

function showFamilyPopup(key = 'grandma', customText = '') {
  const f = family[key];
  playSound('pop');
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="family-popup ${key}">
      <img src="${f.img}" alt="${f.name}">
      <div class="family-popup-text">
        <div class="popup-name">${f.name}</div>
        <div class="popup-phrase">${customText || f.phrase}</div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  applyLanguage(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
  setTimeout(() => {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 260);
  }, 1500);
}

function completeLevel() {
  clearInterval(timer);
  stopMusic();
  playSound('win');
  const id = levelData.level.id;
  if (state.unlocked <= id) state.unlocked = Math.min(levels.length, id + 1);
  state.stars += 3;
  state.coins += 100;
  save();

  shell(levelData.level.bg, `
    ${topBar()}
    <div class="panel-card result-card">
      <div class="result-photo"><img src="${levelData.level.david}" alt="Давидик"></div>
      <div class="result-title">Уровень пройден!</div>
      <div class="result-stars">⭐⭐⭐</div>
      <div class="goal-text">Давидик справился с миссией.</div>
      <div class="footer-row single">
        <button class="play-btn small" onclick="${id >= levels.length ? 'openMap(\'all\')' : 'startLevel(' + (id + 1) + ')'}">${id >= levels.length ? 'На карту' : 'Следующий уровень'}</button>
      </div>
    </div>
  `, levelData.level.theme);
}

function failLevel() {
  clearInterval(timer);
  stopMusic();
  playSound('bad');
  shell(levelData.level.bg, `
    ${topBar()}
    <div class="panel-card result-card">
      <div class="result-photo"><img src="${levelData.level.david}" alt="Давидик"></div>
      <div class="result-title">Время вышло</div>
      <div class="goal-text">Попробуй пройти миссию ещё раз.</div>
      <div class="footer-row">
        <button class="mini-btn orange" onclick="startLevel(${levelData.level.id})">Повторить</button>
        <button class="mini-btn blue" onclick="openMap('${currentModeFromLevel(levelData.level)}')">Карта</button>
      </div>
    </div>
  `, levelData.level.theme);
}

function themeEmoji(theme) {
  return ({ fire: '🔥', police: '👮', ghost: '👻', bonus: '🐱', all: '⭐' }[theme] || '⭐');
}

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffledPositions(count) {
  const preset = [
    [16, 20], [45, 16], [77, 22], [22, 42], [54, 39], [80, 45], [18, 69], [45, 72], [77, 74]
  ];
  return shuffle(preset).slice(0, count);
}

function isStandaloneApp() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true || document.referrer.startsWith('android-app://') || localStorage.getItem('davidikInstalled') === '1';
}

function scrollToMissionControls() {
  const doScroll = () => {
    const anchor = document.querySelector('.auto-focus');
    if (!anchor) return;
    const top = anchor.getBoundingClientRect().top + window.pageYOffset - 14;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };
  setTimeout(doScroll, 120);
  setTimeout(doScroll, 420);
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

window.addEventListener('appinstalled', () => {
  localStorage.setItem('davidikInstalled', '1');
  deferredPrompt = null;
  document.querySelector('.install-overlay')?.remove();
  document.querySelector('.install-tab')?.remove();
});

window.showInstallModal = async function () {
  if (isStandaloneApp()) return;
  document.querySelector('.install-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.className = 'install-overlay';
  overlay.innerHTML = `
    <div class="install-modal">
      <button class="install-close" onclick="this.closest('.install-overlay').remove()">✕</button>
      <img class="install-icon" src="${assets.icon192}" alt="Иконка приложения">
      <div class="install-title">Приключения Давидика</div>
      <div class="install-text">Установи игру как приложение, чтобы быстро открывать её с экрана телефона.</div>
      <button class="play-btn small install-btn">Установить</button>
      <div class="install-note">Если кнопка установки не сработает, выбери в меню браузера «Добавить на главный экран».</div>
    </div>
  `;
  document.body.appendChild(overlay);
  applyLanguage(overlay);
  const btn = overlay.querySelector('.install-btn');
  btn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice.catch(() => null);
      if (result && result.outcome === 'accepted') {
        localStorage.setItem('davidikInstalled', '1');
        document.querySelector('.install-tab')?.remove();
      }
      deferredPrompt = null;
      overlay.remove();
    } else {
      btn.textContent = 'Добавить на главный экран';
    }
  });
};

function maybeShowInstallPopup() {
  return;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(reg => reg.unregister())).catch(() => {});
  if (window.caches) {
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))).catch(() => {});
  }
}

renderMenu();
