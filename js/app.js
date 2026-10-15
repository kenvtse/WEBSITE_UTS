(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P='jtk1:',mem={};
const load=(k,d)=>{try{const v=localStorage.getItem(P+k);return v==null?(k in mem?mem[k]:d):JSON.parse(v)}catch(e){return k in mem?mem[k]:d}};
const save=(k,v)=>{mem[k]=v;try{localStorage.setItem(P+k,JSON.stringify(v))}catch(e){toast('Penyimpanan browser penuh/tidak tersedia. Data hanya sementara.')}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nl=s=>esc(s).replace(/\n/g,'<br>');
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3000)}
const CAT=['Fasilitas','Riset & Inovasi','Kolaborasi Industri','Karier','Pengabdian'];
const JAB=['Tenaga Pengajar','Asisten Ahli','Lektor','Lektor Kepala','Guru Besar'];
const seedTxt='Tambahkan deskripsi resmi, kompetensi lulusan, dan informasi penerimaan mahasiswa.';
const D={};
const C={
 dosen:{t:'Dosen',lab:'nama',seed:[],v:[['nidn','NIDN / NIP'],['jabatan','Jabatan'],['prodi','Program studi'],['keahlian','Bidang keahlian'],['email','Email']],
  f:()=>[{k:'nama',l:'Nama lengkap',req:1},{k:'nidn',l:'NIDN / NIP'},{k:'jabatan',l:'Jabatan fungsional',o:JAB},{k:'prodi',l:'Program studi',o:D.program.map(p=>p.nama)},{k:'keahlian',l:'Bidang keahlian'},{k:'email',l:'Email',t:'email'},{k:'foto',l:'Foto (opsional)',t:'photo'}]},
 program:{t:'Program Studi',lab:'nama',seed:[
  {id:'p1',nama:'D3 Teknik Komputer',ringkas:'Informasi program studi perlu disesuaikan dengan data resmi POLMED.',detail:seedTxt},
  {id:'p2',nama:'D4 Teknik Informatika',ringkas:'Informasi program studi perlu disesuaikan dengan data resmi POLMED.',detail:seedTxt},
  {id:'p3',nama:'Program Studi Lainnya',ringkas:'Isi nama dan informasi program studi sesuai daftar resmi jurusan.',detail:'Ganti kartu ini dengan nama dan informasi program studi yang terverifikasi.'}],
  v:[['ringkas','Ringkasan'],['detail','Deskripsi']],f:()=>[{k:'nama',l:'Nama program studi',req:1},{k:'ringkas',l:'Ringkasan singkat'},{k:'detail',l:'Deskripsi lengkap',t:'textarea'}]},
 berita:{t:'Berita',lab:'judul',seed:[
  {id:'b1',judul:'Workshop Teknologi untuk Mahasiswa',tanggal:'2026-09-15',gambar:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',isi:'Ganti teks ini dengan isi berita resmi, tanggal kegiatan, dan tautan sumber.'},
  {id:'b2',judul:'Kegiatan Kolaborasi Industri',tanggal:'2026-09-10',gambar:'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80',isi:'Ganti teks ini dengan isi berita resmi, tanggal kegiatan, dan tautan sumber.'},
  {id:'b3',judul:'Seminar Teknologi Digital',tanggal:'2026-09-05',gambar:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80',isi:'Ganti teks ini dengan isi berita resmi, tanggal kegiatan, dan tautan sumber.'}],
  v:[['tanggal','Tanggal'],['isi','Isi berita']],f:()=>[{k:'judul',l:'Judul berita',req:1},{k:'tanggal',l:'Tanggal',t:'date'},{k:'gambar',l:'URL gambar (opsional)',t:'url'},{k:'isi',l:'Isi berita',t:'textarea'}]},
 info:{t:'Informasi',lab:'judul',seed:[],v:[['kat','Kategori'],['isi','Keterangan']],f:()=>[{k:'kat',l:'Kategori',o:CAT,req:1},{k:'judul',l:'Judul',req:1},{k:'isi',l:'Keterangan',t:'textarea'}]}
};
Object.keys(C).forEach(k=>{let d=load(k,null);if(!Array.isArray(d)){d=C[k].seed.map(x=>({...x}));save(k,d)}D[k]=d});
let S=load('stats',null)||{prestasi:'—',alumni:'—',publikasi:'—',kerjasama:'—'};
let ST=load('set',{});let tab=CAT[0];
const fmtDate=d=>{if(!d)return'';const x=new Date(d+'T00:00:00');return isNaN(x)?d:x.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})};
const mg=(c,id)=>`<span class="mg"><button class="mini" data-act="edit" data-c="${c}" data-id="${id}">Ubah</button><button class="mini dng" data-act="del" data-c="${c}" data-id="${id}">Hapus</button></span>`;
const empty=(c,txt)=>`<div class="empty">${txt}<br><button class="btn primary" data-act="addmg" data-c="${c}">+ Tambah ${C[c].t}</button></div>`;
const bad='this.onerror=null;this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22500%22 height=%22300%22%3E%3Crect width=%22500%22 height=%22300%22 fill=%22%23dbe8fa%22/%3E%3C/svg%3E\'';
/* ===== RENDER ===== */
function rProg(){const ic=['▱','</>','♧'];$('#programList').innerHTML=D.program.length?D.program.map((p,i)=>`<article class="program" data-act="view" data-c="program" data-id="${p.id}"><div class="picon">${esc(ic[i%3])}</div><h4>${esc(p.nama)}</h4><p>${esc(p.ringkas)}</p><button class="detail-link">Detail Program →</button>${mg('program',p.id)}</article>`).join(''):empty('program','Belum ada program studi.')}
function rNews(){$('#newsList').innerHTML=D.berita.length?D.berita.map(b=>`<article class="news" data-act="view" data-c="berita" data-id="${b.id}">${b.gambar?`<img src="${esc(b.gambar)}" alt="" onerror="${bad}">`:''}<div class="newscontent"><time>${esc(fmtDate(b.tanggal))}</time><h4>${esc(b.judul)}</h4><button class="detail-link">Baca selengkapnya →</button>${mg('berita',b.id)}</div></article>`).join(''):empty('berita','Belum ada berita.')}
const av=(d,big)=>`<div class="avatar${big?' big':''}">${d.foto?`<img src="${esc(d.foto)}" alt="">`:esc((d.nama||'?').trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase())}</div>`;
function rDosen(){const sel=$('#dsP'),cur=sel.value,q=$('#dsQ').value.toLowerCase().trim();
 sel.innerHTML='<option value="">Semua program studi</option>'+[...new Set(D.dosen.map(d=>d.prodi).filter(Boolean))].map(p=>`<option>${esc(p)}</option>`).join('');sel.value=cur;
 const L=D.dosen.filter(d=>(!sel.value||d.prodi===sel.value)&&(!q||[d.nama,d.nidn,d.keahlian,d.jabatan].join(' ').toLowerCase().includes(q)));
 $('#dosenTitle').textContent='Dosen'+(D.dosen.length?` (${D.dosen.length})`:'');
 $('#dosenList').innerHTML=L.length?L.map(d=>`<article class="dcard" data-act="view" data-c="dosen" data-id="${d.id}">${av(d)}<div><h4>${esc(d.nama)}</h4><p>${esc(d.jabatan||'')}</p><p>${esc(d.prodi||'')}</p><p>${esc(d.keahlian||'')}</p>${mg('dosen',d.id)}</div></article>`).join(''):D.dosen.length?'<div class="empty">Tidak ada dosen yang cocok dengan pencarian.</div>':empty('dosen','Belum ada data dosen. Anda bisa menambahkan lebih dari satu dosen.')}
function rInfo(){$('#infoTabs').innerHTML=CAT.map(c=>`<button class="tab${c===tab?' on':''}" data-tabset="${esc(c)}">${esc(c)}</button>`).join('');
 const L=D.info.filter(i=>i.kat===tab);$('#infoList').innerHTML=L.length?L.map(i=>`<article class="icard" data-act="view" data-c="info" data-id="${i.id}"><h4>${esc(i.judul)}</h4><p>${esc((i.isi||'').slice(0,110))}${(i.isi||'').length>110?'…':''}</p>${mg('info',i.id)}</article>`).join(''):empty('info','Belum ada data untuk "'+esc(tab)+'".')}
function rStats(){$$('[data-s]').forEach(e=>e.textContent=S[e.dataset.s]||'—')}
function renderAll(){rProg();rNews();rDosen();rInfo();rStats()}
/* ===== MODAL ===== */
let last;
function modal(h){last=document.activeElement;$('#mb').innerHTML=h;$('#m').hidden=false;document.body.style.overflow='hidden';const f=$('#mb input:not([type=file]),#mb textarea,#mb select,#mb button');f&&f.focus()}
function closeM(){$('#m').hidden=true;document.body.style.overflow='';last&&last.focus&&last.focus()}
function form(title,fields,vals,onSave){let photo=vals.foto||'';
 const inp=f=>{const id='f_'+f.k,v=vals[f.k]??'';
  if(f.t==='textarea')return`<textarea id="${id}" rows="4">${esc(v)}</textarea>`;
  if(f.t==='photo')return`<input type="file" id="${id}" accept="image/*"><div id="pv">${photo?av({foto:photo}):''}</div>`;
  if(f.o){const o=f.o.includes(v)||!v?f.o:[v,...f.o];return`<select id="${id}">${f.req?'':'<option value="">— pilih —</option>'}${o.map(x=>`<option${x===v?' selected':''}>${esc(x)}</option>`).join('')}</select>`}
  return`<input id="${id}" type="${f.t||'text'}" value="${esc(v)}">`};
 modal(`<button class="modalclose" data-act="close" aria-label="Tutup">✕</button><h3>${esc(title)}</h3><form id="fm" novalidate>${fields.map(f=>`<label for="f_${f.k}">${f.l}${f.req?' *':''}</label>${inp(f)}`).join('')}<p class="err" id="fe" role="alert"></p><div class="fbtn"><button class="btn primary" type="submit">Simpan</button><button class="btn light" type="button" data-act="close">Batal</button></div></form>`);
 const ph=$('#f_foto');ph&&ph.addEventListener('change',()=>{const fl=ph.files[0];if(!fl)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,260/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);photo=c.toDataURL('image/jpeg',.8);$('#pv').innerHTML=av({foto:photo})};im.onerror=()=>{$('#fe').textContent='File foto tidak valid.'};im.src=r.result};r.readAsDataURL(fl)});
 $('#fm').addEventListener('submit',e=>{e.preventDefault();const v={};
  for(const f of fields){v[f.k]=f.t==='photo'?photo:($('#f_'+f.k).value||'').trim();
   if(f.req&&!v[f.k])return $('#fe').textContent=f.l+' wajib diisi.';
   if(f.t==='email'&&v[f.k]&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v[f.k]))return $('#fe').textContent='Format email tidak valid.';
   if(f.t==='url'&&v[f.k]&&!/^https?:\/\//i.test(v[f.k]))return $('#fe').textContent='URL harus diawali http:// atau https://';}
  const err=onSave(v);if(err)$('#fe').textContent=err;else closeM()})}
/* ===== CRUD ===== */
function edit(c,id){const cfg=C[c],cur=id?D[c].find(x=>x.id===id):null;
 form((cur?'Ubah ':'Tambah ')+cfg.t,cfg.f(),cur||{kat:tab},v=>{
  if(c==='dosen'&&v.nidn&&D.dosen.some(d=>d.id!==id&&d.nidn===v.nidn))return'NIDN / NIP sudah terdaftar pada dosen lain.';
  if(cur)Object.assign(cur,v);else D[c][c==='berita'?'unshift':'push']({id:uid(),...v});
  if(c==='info')tab=v.kat;save(c,D[c]);renderAll();toast(cfg.t+(cur?' diperbarui.':' ditambahkan.'))})}
function del(c,id){const r=D[c].find(x=>x.id===id);if(!r||!confirm('Hapus "'+r[C[c].lab]+'"?'))return;D[c]=D[c].filter(x=>x.id!==id);save(c,D[c]);renderAll();closeM();toast('Data dihapus.')}
function view(c,id){const r=D[c].find(x=>x.id===id);if(!r)return;const cfg=C[c];
 modal(`<button class="modalclose" data-act="close" aria-label="Tutup">✕</button>${c==='dosen'?av(r,1):''}${r.gambar?`<img class="dimg" src="${esc(r.gambar)}" alt="" onerror="this.remove()">`:''}<h3>${esc(r[cfg.lab])}</h3>`+cfg.v.map(([k,l])=>{let x=r[k];if(!x)return'';x=k==='email'?`<a href="mailto:${esc(x)}">${esc(x)}</a>`:k==='tanggal'?esc(fmtDate(x)):nl(x);return`<p><b>${l}</b><br>${x}</p>`}).join('')+`<div class="dbtn"><button class="btn primary" data-act="close">Tutup</button><span class="mg"><button class="mini" data-act="edit" data-c="${c}" data-id="${id}">Ubah</button><button class="mini dng" data-act="del" data-c="${c}" data-id="${id}">Hapus</button></span></div>`)}
function setManage(on){ST.manage=on;save('set',ST);document.body.classList.toggle('manage',on);const b=$('#mgBtn');b.setAttribute('aria-pressed',on);b.querySelector('span').textContent=on?'Mode Kelola ON':'Kelola';rc()}
const rc=()=>{$('#rcWrap').hidden=!!ST.recipient&&!ST.manage;$('#recipientEmail').value=ST.recipient||$('#recipientEmail').value};
/* ===== EVENT UTAMA ===== */
document.addEventListener('click',e=>{
 const ts=e.target.closest('[data-tabset]');if(ts){tab=ts.dataset.tabset;rInfo();return}
 const tl=e.target.closest('a[data-tab]');if(tl){e.preventDefault();tab=tl.dataset.tab;rInfo();$('#nav').classList.remove('mobileopen');$('#info').scrollIntoView({behavior:'smooth'});return}
 const a=e.target.closest('[data-act]');
 if(a){const {act,c,id}=a.dataset;e.preventDefault();
  if(act==='close')closeM();
  else if(act==='view'){$('#searchpanel').classList.remove('open');view(c,id)}
  else if(act==='add')edit(c);else if(act==='edit')edit(c,id);else if(act==='del')del(c,id);
  else if(act==='addmg'){setManage(true);edit(c)}
  else if(act==='stats')form('Ubah angka prestasi',[{k:'prestasi',l:'Prestasi Mahasiswa'},{k:'alumni',l:'Alumni dan Karier'},{k:'publikasi',l:'Publikasi Ilmiah'},{k:'kerjasama',l:'Kerja Sama Industri'}],S,v=>{Object.keys(v).forEach(k=>v[k]=v[k]||'—');S=v;save('stats',S);rStats();toast('Angka diperbarui.')});
  else if(act==='export'){const o={};Object.keys(C).forEach(k=>o[k]=D[k]);o.stats=S;o.set={recipient:ST.recipient,video:ST.video};const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([JSON.stringify(o,null,2)],{type:'application/json'}));l.download='data-jtk-polmed.json';l.click();toast('Data diekspor.')}
  else if(act==='import')$('#impFile').click();
  else if(act==='reset'&&confirm('Hapus SEMUA data yang tersimpan dan kembali ke data awal?')){Object.keys(localStorage).filter(k=>k.startsWith(P)).forEach(k=>localStorage.removeItem(k));location.reload()}
  return}
 if(!e.target.closest('.dropdown'))$$('.dropdown').forEach(d=>{d.classList.remove('open');d.querySelector('.dropbtn').setAttribute('aria-expanded','false')});
 if(!e.target.closest('#searchpanel,#searchToggle'))$('#searchpanel').classList.remove('open');
 if(e.target.closest('.nav a'))$('#nav').classList.remove('mobileopen');
 if(e.target.id==='m')closeM()});
$('#impFile').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!Object.keys(C).every(k=>Array.isArray(o[k])))throw 0;Object.keys(C).forEach(k=>{D[k]=o[k];save(k,D[k])});if(o.stats){S=o.stats;save('stats',S)}if(o.set){ST={...ST,...o.set};save('set',ST)}renderAll();rc();toast('Data berhasil diimpor.')}catch(x){toast('File tidak valid.')}};r.readAsText(f);e.target.value=''});
$('#mgBtn').addEventListener('click',()=>{setManage(!ST.manage);toast(ST.manage?'Mode kelola aktif: tombol tambah/ubah/hapus muncul.':'Mode kelola dimatikan.')});
$('#dsQ').addEventListener('input',rDosen);$('#dsP').addEventListener('change',rDosen);
/* Menu & dropdown */
$('#hamb').addEventListener('click',()=>{const n=$('#nav');n.classList.toggle('mobileopen');$('#hamb').setAttribute('aria-expanded',n.classList.contains('mobileopen'))});
$$('.dropbtn').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const cur=b.closest('.dropdown');$$('.dropdown').forEach(d=>{if(d!==cur){d.classList.remove('open');d.querySelector('.dropbtn').setAttribute('aria-expanded','false')}});cur.classList.toggle('open');b.setAttribute('aria-expanded',cur.classList.contains('open'))}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeM();$('#searchpanel').classList.remove('open');$$('.dropdown').forEach(d=>d.classList.remove('open'))}});
/* Pencarian (mencakup data dinamis) */
const SEC=[['Beranda','#beranda'],['Tentang Jurusan','#tentang'],['Program Studi','#program'],['Dosen','#dosen'],['Fasilitas, Riset & Informasi','#info'],['Berita & Kegiatan','#berita'],['Prestasi dan Capaian','#prestasi'],['Akses Cepat','#layanan'],['Hubungi Jurusan','#kontak']];
$('#searchToggle').addEventListener('click',()=>{$('#searchpanel').classList.toggle('open');if($('#searchpanel').classList.contains('open')){$('#searchInput').focus();doSearch()}});
function doSearch(){const q=$('#searchInput').value.toLowerCase().trim(),out=$('#searchresults');let h=SEC.filter(s=>s[0].toLowerCase().includes(q)).map(s=>`<a href="${s[1]}">${esc(s[0])} →</a>`).join('');
 if(q)Object.keys(C).forEach(c=>D[c].filter(r=>Object.values(r).join(' ').toLowerCase().includes(q)).slice(0,6).forEach(r=>h+=`<a href="#" data-act="view" data-c="${c}" data-id="${r.id}">${esc(r[C[c].lab])} <small>(${C[c].t})</small></a>`));
 out.innerHTML=h||'Tidak ada hasil. Coba kata kunci lain.';$$('#searchresults a[href^="#"]:not([data-act])').forEach(a=>a.addEventListener('click',()=>$('#searchpanel').classList.remove('open')))}
$('#searchInput').addEventListener('input',doSearch);
/* Video profil */
const vid=u=>{u=u.trim();if(/^[\w-]{11}$/.test(u))return u;const m=u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);return m&&m[1]};
function play(id){const f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id);f.title='Video profil jurusan';f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;f.loading='lazy';const w=document.createElement('div');w.className='videoembed';w.appendChild(f);$('#videoFrame').replaceChildren(w)}
$('#videoBtn').addEventListener('click',e=>{e.preventDefault();$('#video').hidden=false;if(ST.video){$('#videoId').value=ST.video;play(ST.video)}$('#video').scrollIntoView({behavior:'smooth',block:'center'});$('#videoId').focus()});
$('#closeVideo').addEventListener('click',()=>{$('#video').hidden=true;$('#videoFrame').replaceChildren()});
$('#videoForm').addEventListener('submit',e=>{e.preventDefault();const id=vid($('#videoId').value);if(!id)return toast('Masukkan ID (11 karakter) atau link YouTube yang valid.');ST.video=id;save('set',ST);play(id)});
/* Formulir kontak */
function mailData(){const n=$('#contactName').value.trim(),m=$('#contactEmail').value.trim(),p=$('#contactMessage').value.trim(),r=($('#recipientEmail').value||ST.recipient||'').trim();
 if(!n||!m||!p)return toast('Lengkapi nama, email, dan pesan.');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m))return toast('Format email Anda tidak valid.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)){$('#rcWrap').hidden=false;return toast('Masukkan email tujuan jurusan yang valid.')}
 return{r,n,m,p}}
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const d=mailData();if(!d)return;ST.recipient=d.r;save('set',ST);rc();toast('Membuka aplikasi email Anda...');
 location.href='mailto:'+d.r+'?subject='+encodeURIComponent('Pesan dari website JTK POLMED - '+d.n)+'&body='+encodeURIComponent('Nama: '+d.n+'\nEmail: '+d.m+'\n\nPesan:\n'+d.p)});
$('#copyMsg').addEventListener('click',()=>{const d=mailData();if(!d)return;const t='Kepada: '+d.r+'\nNama: '+d.n+'\nEmail: '+d.m+'\n\nPesan:\n'+d.p;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Pesan disalin.'),()=>toast('Gagal menyalin. Salin teks secara manual.'))});
/* Navigasi aktif */
if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const links=$$('.nav > a'),hit=links.some(l=>l.getAttribute('href')==='#'+en.target.id);if(hit)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id))}),{rootMargin:'-25% 0px -65% 0px'});$$('main section[id],footer#kontak').forEach(s=>ob.observe(s))}
renderAll();setManage(!!ST.manage);doSearch();
})();
