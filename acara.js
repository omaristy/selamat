// Pilihan jenis acara & bentuk foto (dipakai index.html, kirim.html, admin.html)
const ACARA={
 nikah:{n:"Pernikahan",ikon:"💍",tema:"rose-gold-champagne",sub:"Ucapan selamat menempuh hidup baru untuk",judul:"Selamat Menikah",
  pembuka:"Selamat menempuh hidup baru, {nama}! 💍",dari:"Keluarga & sahabat",
  ucapan:["Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. 🤍","Semoga cinta kalian terus tumbuh dan rezeki selalu dimudahkan.","Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. 🤲"],
  melingkar:"SELAMAT MENIKAH ✦ SAKINAH MAWADDAH WARAHMAH ✦ ",berjalan:"Selamat menempuh hidup baru 💍 Semoga sakinah, mawaddah, warahmah 🤍",orn:["💍","🤍","🌹","💐","🕊️"]},
 akikah:{n:"Akikah & Kelahiran",ikon:"👶",tema:"blush-pink-white",sub:"Ucapan syukur atas kelahiran buah hati",judul:"Selamat atas Kelahiran",
  pembuka:"Selamat atas kelahiran buah hati, {nama}! 👶",dari:"Keluarga & sahabat",
  ucapan:["Alhamdulillah, selamat datang di dunia, si kecil. 🍼","Semoga tumbuh menjadi anak yang saleh/salehah, sehat, cerdas, dan berbakti kepada orang tua.","Semoga ibu dan bayi sehat selalu, dan akikahnya penuh keberkahan. 🤲"],
  melingkar:"SELAMAT ATAS KELAHIRAN ✦ AKIKAH ✦ ",berjalan:"Alhamdulillah, selamat atas kelahiran buah hati 👶 Semoga menjadi anak saleh/salehah 🤲",orn:["👶","🍼","🧸","🎀","⭐"]},
 lulus:{n:"Kelulusan",ikon:"🎓",tema:"navy-blue-grey",sub:"Ucapan selamat atas kelulusan",judul:"Selamat Lulus",
  pembuka:"Selamat atas kelulusanmu, {nama}! 🎓",dari:"Keluarga & sahabat",
  ucapan:["Kerja keras dan doamu terbayar hari ini. Kami bangga padamu! 🌟","Semoga ilmu yang didapat bermanfaat dan membuka jalan menuju cita-cita.","Selamat melangkah ke babak baru kehidupan. Sukses selalu! 🚀"],
  melingkar:"SELAMAT LULUS ✦ CONGRATULATIONS GRADUATE ✦ ",berjalan:"Selamat atas kelulusanmu 🎓 Semoga sukses di langkah berikutnya 🚀",orn:["🎓","📚","⭐","🏆","🎉"]},
 pangkat:{n:"Naik Pangkat / Jabatan",ikon:"🎖️",tema:"black-gold",sub:"Ucapan selamat atas kenaikan pangkat",judul:"Selamat Naik Pangkat",
  pembuka:"Selamat atas kenaikan pangkat, {nama}! 🎖️",dari:"Rekan & keluarga",
  ucapan:["Selamat atas amanah dan pencapaian barunya. Kami ikut bangga! 👏","Semoga selalu diberi kesehatan, hikmah, dan kemudahan dalam mengemban tugas.","Semoga jabatan ini membawa berkah bagi keluarga dan banyak orang. 🤲"],
  melingkar:"SELAMAT NAIK PANGKAT ✦ CONGRATULATIONS ✦ ",berjalan:"Selamat atas kenaikan pangkat 🎖️ Semoga amanah dan penuh berkah 🤲",orn:["🎖️","⭐","🏅","👏","🎉"]},
 umroh:{n:"Pulang Umroh / Haji",ikon:"🕋",tema:"emerald-green-gold",sub:"Selamat datang kembali dari Tanah Suci",judul:"Selamat Datang dari Tanah Suci",
  pembuka:"Selamat datang kembali dari Tanah Suci, {nama}! 🕋",dari:"Keluarga & sahabat",
  ucapan:["Alhamdulillah, selamat datang kembali. Semoga umroh/hajinya mabrur. 🤲","Semoga dosa diampuni, amal diterima, dan ibadah menjadi bekal kebaikan.","Hajjan mabruron, sa'yan masykuran, wa dzanban maghfuron. 🤍"],
  melingkar:"SELAMAT DATANG ✦ SEMOGA MABRUR ✦ ",berjalan:"Selamat datang dari Tanah Suci 🕋 Semoga umroh/haji mabrur 🤲",orn:["🕋","🕌","🌙","🤲","🌴"]},
 custom:{n:"Lainnya (atur sendiri)",ikon:"🎉",tema:"classic-gold-white",sub:"Ucapan selamat untuk",judul:"Selamat!",
  pembuka:"Selamat, {nama}! 🎉",dari:"Keluarga & sahabat",
  ucapan:["Selamat atas kebahagiaan ini! 🎉","Semoga selalu diberi kesehatan, kebahagiaan, dan keberkahan.","Kami ikut berbahagia bersamamu. ❤️"],
  melingkar:"SELAMAT ✦ CONGRATULATIONS ✦ ",berjalan:"Selamat atas kabar bahagianya 🎉 Semoga selalu penuh berkah 🤍",orn:["🎉","✨","🎈","💐","🎁"]}
};
const BENTUK=[["lingkaran","⚪ Lingkaran"],["oval","🥚 Oval"],["lengkung","🕌 Lengkung"],["kotak","⬛ Kotak membulat"],["hati","❤️ Hati"],["bintang","⭐ Bintang"],["segienam","⬡ Segi enam"]];
const acaraPreset=A=>({judul:A.judul,sub:A.sub,pembuka:A.pembuka,ikon:A.ikon,ucapan:A.ucapan,dari:A.dari,teksMelingkar:A.melingkar,teksBerjalan:A.berjalan,tema:A.tema});
/* isi bagian yang belum pernah disimpan admin dengan contoh sesuai jenis acara */
function acaraIsi(C,o){const A=ACARA[C.jenis]||ACARA.custom;o=o||{};C.A=A;const P=acaraPreset(A);
  Object.keys(P).forEach(k=>{const v=o[k];if(v===undefined||v===null||(k==="tema"&&!v)||(k==="ucapan"&&!(v&&v.length)))C[k]=P[k]});return C}
/* acara yang diketik sendiri -> teks otomatis */
function acaraDariNama(nm){nm=String(nm||"").trim().slice(0,40);
  return {judul:"Selamat "+nm,sub:"Ucapan selamat untuk",pembuka:"Selamat atas "+nm+", {nama}! 🎉",ikon:"🎉",dari:"Keluarga & sahabat",
    ucapan:["Selamat atas "+nm+"! Kami ikut berbahagia. 🎉","Semoga selalu diberi kesehatan, kebahagiaan, dan keberkahan.","Semoga ke depannya semua urusan dimudahkan. 🤲"],
    teksMelingkar:"SELAMAT "+nm.toUpperCase()+" ✦ ",teksBerjalan:"Selamat atas "+nm+" 🎉 Semoga selalu penuh berkah 🤍"}}
