// Polaris gidlik kursi: modullar va darslar (keyinchalik API'dan keladi)
const L = (code, title, dur, s, pct = 0) => ({ code, title, dur, s, pct });

export const COURSE = {
  title: 'Polaris gidlik kursi',
  lessonsDone: 10,
  lessonsTotal: 34,
  modulesDone: 2,
  modulesTotal: 8,
  avgScore: 86,
  progress: 29
};

export const MODULES = [
  { n: 1, title: 'Gidlik kasbiga kirish', s: 'done', test: ['done', 'Topshirildi · 92 ball'], task: ['done', 'Ustoz baholadi'], lessons: [
    L('1.1', 'Gid kim va u nima qiladi?', '14 daq', 'done'),
    L('1.2', 'Turizm sohasining tuzilishi', '18 daq', 'done'),
    L('1.3', 'Gidning kasbiy talablari', '16 daq', 'done'),
    L('1.4', 'Birinchi turga tayyorgarlik', '21 daq', 'done')
  ] },
  { n: 2, title: 'Tarix va madaniyat', s: 'done', test: ['done', 'Topshirildi · 80 ball'], task: ['review', 'Ustozda tekshirilmoqda'], lessons: [
    L('2.1', 'Qadimgi davrlar va sivilizatsiyalar', '22 daq', 'done'),
    L('2.2', 'Temuriylar davri', '25 daq', 'done'),
    L('2.3', 'Xonliklar davri', '19 daq', 'done'),
    L('2.4', 'Urf-odatlar va bayramlar', '17 daq', 'done'),
    L('2.5', 'Milliy taomlar va hunarmandchilik', '15 daq', 'done')
  ] },
  { n: 3, title: 'Shaharlar va obidalar', s: 'progress', test: ['locked', 'Barcha darslar tugagach ochiladi'], task: ['locked', 'Test topshirilgach ochiladi'], lessons: [
    L('3.1', 'Samarqand: shahar bilan tanishuv', '20 daq', 'done'),
    L('3.2', 'Registon ansambli: uch madrasa tarixi', '24 daq', 'progress', 52),
    L('3.3', 'Shohi Zinda va Bibixonim', '22 daq', 'todo'),
    L('3.4', 'Buxoro: Ark va Poi Kalon', '23 daq', 'todo'),
    L('3.5', 'Xiva: Ichan qal’a', '21 daq', 'todo')
  ] },
  { n: 4, title: 'Din va me’morchilik', s: 'locked', lessons: [
    L('4.1', 'Asosiy atamalar', '16 daq', 'locked'),
    L('4.2', 'Masjid, madrasa va maqbara vazifalari', '20 daq', 'locked'),
    L('4.3', 'Naqsh va ramzlar', '18 daq', 'locked'),
    L('4.4', 'Turistlarning savollariga javob', '15 daq', 'locked')
  ] },
  { n: 5, title: 'Hikoya qilish va nutq', s: 'locked', lessons: [
    L('5.1', 'Ekskursiya matni tuzilmasi', '18 daq', 'locked'),
    L('5.2', 'Hikoya qilish usullari', '20 daq', 'locked'),
    L('5.3', 'Ovoz va nutq texnikasi', '17 daq', 'locked'),
    L('5.4', 'Guruh e’tiborini boshqarish', '16 daq', 'locked')
  ] },
  { n: 6, title: 'Guruh bilan ishlash', s: 'locked', lessons: [
    L('6.1', 'Aeroportda kutib olish va kuzatish', '15 daq', 'locked'),
    L('6.2', 'Marshrut va vaqtni boshqarish', '19 daq', 'locked'),
    L('6.3', 'Turli guruhlar bilan ishlash', '17 daq', 'locked'),
    L('6.4', 'Turistlar ko‘p beradigan savollar', '16 daq', 'locked')
  ] },
  { n: 7, title: 'Murakkab vaziyatlar va etika', s: 'locked', lessons: [
    L('7.1', 'Kechikish va jadval o‘zgarishi', '14 daq', 'locked'),
    L('7.2', 'Shikoyatlar bilan ishlash', '16 daq', 'locked'),
    L('7.3', 'Yo‘qolgan buyum va guruhdan ajralish', '15 daq', 'locked'),
    L('7.4', 'Kasbiy etika va muloqot', '18 daq', 'locked')
  ] },
  { n: 8, title: 'Xorijiy tilda ekskursiya', s: 'locked', lessons: [
    L('8.1', 'Gidlik lug‘ati', '17 daq', 'locked'),
    L('8.2', 'Namunaviy hikoyalar', '22 daq', 'locked'),
    L('8.3', 'AI bilan til mashqi', '20 daq', 'locked'),
    L('8.4', 'Yakuniy amaliyot', '24 daq', 'locked')
  ] }
].map((m) => ({
  test: ['locked', 'Darslardan keyin ochiladi'],
  task: ['locked', 'Testdan keyin ochiladi'],
  ...m
}));

export const USER = { name: 'Aziza Karimova', first: 'Aziza', initials: 'AK', role: 'Kurs o‘quvchisi' };
