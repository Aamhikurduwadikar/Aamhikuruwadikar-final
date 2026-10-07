import React,{useEffect,useState}from'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import'./style.css';

const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL||'https://rjfgfdgrqficffbyqvlf.supabase.co';
const SUPABASE_KEY=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_G3lGu7INXtIGmjum8nj7_A_opGtO3B2';
const db=createClient(SUPABASE_URL,SUPABASE_KEY);

const subjects=[['📖','इतिहास','इतिहास व आधुनिक भारत'],['🏛️','राज्यशास्त्र','घटना, शासनव्यवस्था'],['🌍','भूगोल','भारत व महाराष्ट्र भूगोल'],['📈','अर्थशास्त्र','संकल्पना व नोट्स'],['🔬','विज्ञान','महत्त्वाचे मुद्दे'],['🌱','पर्यावरण','पर्यावरण व शाश्वत विकास'],['⚖️','महाराष्ट्र विशेष','महाराष्ट्र सामान्य ज्ञान'],['📰','चालू घडामोडी','राष्ट्रीय व आंतरराष्ट्रीय']];
const syllabus=[
{icon:'📖',name:'इतिहास',topics:['प्राचीन भारत','मध्ययुगीन भारत','आधुनिक भारत','भारतीय स्वातंत्र्य चळवळ','महाराष्ट्राचा इतिहास']},
{icon:'🏛️',name:'राज्यशास्त्र',topics:['भारतीय संविधान','मूलभूत हक्क व कर्तव्ये','केंद्र व राज्य शासन','स्थानिक स्वराज्य संस्था','घटनात्मक संस्था']},
{icon:'🌍',name:'भूगोल',topics:['भारताचा भूगोल','महाराष्ट्राचा भूगोल','नद्या व जलसंपदा','हवामान व मृदा','कृषी व खनिज संपत्ती']},
{icon:'📈',name:'अर्थशास्त्र',topics:['अर्थव्यवस्थेच्या मूलभूत संकल्पना','भारतीय अर्थव्यवस्था','बँकिंग व वित्त','अर्थसंकल्प व करव्यवस्था','महाराष्ट्राची अर्थव्यवस्था']},
{icon:'🔬',name:'विज्ञान',topics:['भौतिकशास्त्र मूलभूत संकल्पना','रसायनशास्त्र मूलभूत संकल्पना','जीवशास्त्र','मानवी आरोग्य','तंत्रज्ञान व दैनंदिन विज्ञान']},
{icon:'🌱',name:'पर्यावरण',topics:['पर्यावरणाच्या मूलभूत संकल्पना','जैवविविधता','प्रदूषण','हवामान बदल','संवर्धन व शाश्वत विकास']},
{icon:'⚖️',name:'महाराष्ट्र विशेष',topics:['महाराष्ट्र सामान्य ज्ञान','प्रशासकीय रचना','जिल्हे व विभाग','सामाजिक व सांस्कृतिक वारसा','महत्त्वाच्या योजना']},
{icon:'📝',name:'मराठी',topics:['व्याकरण','शब्दसंपदा','संधी व समास','वाक्प्रचार व म्हणी','आकलन व लेखन']},
{icon:'🔤',name:'English',topics:['Grammar','Vocabulary','Synonyms & Antonyms','Comprehension','Sentence Correction']},
{icon:'🧠',name:'बुद्धिमत्ता व तर्कशक्ती',topics:['संख्या व अक्षर मालिका','साम्य व वर्गीकरण','कोडिंग-डिकोडिंग','दिशा व नातेसंबंध','तर्कशक्ती व आकृत्या']},
{icon:'📰',name:'चालू घडामोडी',topics:['राष्ट्रीय घडामोडी','आंतरराष्ट्रीय घडामोडी','महाराष्ट्र चालू घडामोडी','शासकीय योजना व निर्णय','पुरस्कार, क्रीडा व महत्त्वाच्या घटना']}
];
const topics=syllabus.flatMap(s=>s.topics.map(topic=>({subject:s.name,topic})));
const pyq=[
['2025','पूर्व परीक्षा','MPSC Group C 2025','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/'],
['2024','पूर्व परीक्षा','MPSC Group C 2024','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/'],
['2023','पूर्व + मुख्य','MPSC Group B & C 2023','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/'],
['2022','पूर्व + मुख्य','MPSC Group C 2022','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/'],
['2021','पूर्व + मुख्य','MPSC Group C 2021','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/'],
['2020','पूर्व परीक्षा','MPSC Group C 2020','https://mpscpoint.in/mpsc-combine-group-c-previous-year-papers-pdf/'],
['2019','पूर्व + मुख्य','MPSC Group C 2019','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/'],
['2018','पूर्व + मुख्य','MPSC Group C 2018','https://marathi.net/mpsc-group-c-previous-year-papers-pdf-download/']
]import React,{useEffect,useState}from'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import'./style.css';

const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL||'https://rjfgfdgrqficffbyqvlf.supabase.co';
const SUPABASE_KEY=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_G3lGu7INXtIGmjum8nj7_A_opGtO3B2';
const db=createClient(SUPABASE_URL,SUPABASE_KEY);

const subjects=[['📖','इतिहास','इतिहास व आधुनिक भारत'],['🏛️','राज्यशास्त्र','घटना, शासनव्यवस्था'],['🌍','भूगोल','भारत व महाराष्ट्र भूगोल'],['📈','अर्थशास्त्र','संकल्पना व नोट्स'],['🔬','विज्ञान','महत्त्वाचे मुद्दे'],['🌱','पर्यावरण','पर्यावरण व शाश्वत विकास'],['⚖️','महाराष्ट्र विशेष','महाराष्ट्र सामान्य ज्ञान'],['📰','चालू घडामोडी','राष्ट्रीय व आंतरराष्ट्रीय']];
const syllabus=[
{icon:'📖',name:'इतिहास',topics:['प्राचीन भारत','मध्ययुगीन भारत','आधुनिक भारत','भारतीय स्वातंत्र्य चळवळ','महाराष्ट्राचा इतिहास']},
{icon:'🏛️',name:'राज्यशास्त्र',topics:['भारतीय संविधान','मूलभूत हक्क व कर्तव्ये','केंद्र व राज्य शासन','स्थानिक स्वराज्य संस्था','घटनात्मक संस्था']},
{icon:'🌍',name:'भूगोल',topics:['भारताचा भूगोल','महाराष्ट्राचा भूगोल','नद्या व जलसंपदा','हवामान व मृदा','कृषी व खनिज संपत्ती']},
{icon:'📈',name:'अर्थशास्त्र',topics:['अर्थव्यवस्थेच्या मूलभूत संकल्पना','भारतीय अर्थव्यवस्था','बँकिंग व वित्त','अर्थसंकल्प व करव्यवस्था','महाराष्ट्राची अर्थव्यवस्था']},
{icon:'🔬',name:'विज्ञान',topics:['भौतिकशास्त्र मूलभूत संकल्पना','रसायनशास्त्र मूलभूत संकल्पना','जीवशास्त्र','मानवी आरोग्य','तंत्रज्ञान व दैनंदिन विज्ञान']},
{icon:'🌱',name:'पर्यावरण',topics:['पर्यावरणाच्या मूलभूत संकल्पना','जैवविविधता','प्रदूषण','हवामान बदल','संवर्धन व शाश्वत विकास']},
{icon:'⚖️',name:'महाराष्ट्र विशेष',topics:['महाराष्ट्र सामान्य ज्ञान','प्रशासकीय रचना','जिल्हे व विभाग','सामाजिक व सांस्कृतिक वारसा','महत्त्वाच्या योजना']},
{icon:'📝',name:'मराठी',topics:['व्याकरण','शब्दसंपदा','संधी व समास','वाक्प्रचार व म्हणी','आकलन व लेखन']},
{icon:'🔤',name:'English',topics:['Grammar','Vocabulary','Synonyms & Antonyms','Comprehension','Sentence Correction']},
{icon:'🧠',name:'बुद्धिमत्ता व तर्कशक्ती',topics:['संख्या व अक्षर मालिका','साम्य व वर्गीकरण','कोडिंग-डिकोडिंग','दिशा व नातेसंबंध','तर्कशक्ती व आकृत्या']},
{icon:'📰',name:'चालू घडामोडी',topics:['राष्ट्रीय घडामोडी','आंतरराष्ट्रीय घडामोडी','महाराष्ट्र चालू घडामोडी','शासकीय योजना व निर्णय','पुरस्कार, क्रीडा व महत्त्वाच्या घटना']}
];
const topics=syllabus.flatMap(s=>s.topics.map(topic=>({subject:s.name,topic})));
const pyq=[['2025','पूर्व परीक्षा','MPSC Group C 2025'],['2024','पूर्व परीक्षा','MPSC Group C 2024'],['2023','पूर्व + मुख्य','MPSC Group C 2023'],['2022','पूर्व + मुख्य','MPSC Group C 2022'],['2021','पूर्व + मुख्य','MPSC Group C 2021'],['2020','पूर्व परीक्षा','MPSC Group C 2020'],['2019','पूर्व परीक्षा','MPSC Group C 2019'],['2018','पूर्व परीक्षा','MPSC Group C 2018']];
const pyqSources={
2025:'https://mpscpoint.in/mpsc-combine-group-c-previous-year-papers-pdf/',
2024:'https://mpscpoint.in/mpsc-combine-group-c-previous-year-papers-pdf/',
2023:'https://mpscpoint.in/mpsc-combine-group-c-previous-year-papers-pdf/',
2022:'https://www.adda247.com/jobs/wp-content/uploads/sites/11/2022/11/05134803/MPSC-Group-C-Combine-Paper-2022.pdf',
2021:'https://www.adda247.com/jobs/wp-content/uploads/sites/11/2022/07/24100332/MPSC-Group-C-Combine-Prelims-Exam-2021-Question-Paper-1.pdf',
2020:'https://mpscpoint.in/mpsc-combine-group-c-previous-year-papers-pdf/',
2019:'https://www.adda247.com/jobs/wp-content/uploads/sites/11/2021/10/18105119/MPSC-Group-C-Combine-Prelims-Exam-2019-Question-Paper-1.pdf',
2018:'https://www.adda247.com/jobs/wp-content/uploads/sites/11/2021/10/16154634/MPSC-Group-C-Combine-Prelims-Exam-2018-Question-Paper.pdf'
}
const tiles=[['📚','Notes','माझे PDF Notes','Notes'],['📄','PYQ','मागील प्रश्नपत्रिका','PYQ'],['📊','Portion','अभ्यास नियोजन','Study'],['🎯','Practice','सराव प्रश्न','Practice'],['👥','Student Group','विद्यार्थी चर्चा','Group'],['📰','Updates','चालू घडामोडी','Practice']];
const quiz=[['भारतीय संविधानाचे शिल्पकार म्हणून कोणाला ओळखले जाते?',['डॉ. बाबासाहेब आंबेडकर','महात्मा गांधी','लोकमान्य टिळक','पंडित नेहरू'],0],['महाराष्ट्राची राजधानी कोणती?',['मुंबई','पुणे','नागपूर','नाशिक'],0],['भारताचे राष्ट्रीय फूल कोणते?',['कमळ','गुलाब','जाई','चाफा'],0]];

function Logo({large=false}){const[f,setF]=useState(false);return <div className={'brand '+(large?'brand-large':'')}>{f?<div className="logo-fallback">MPSC</div>:<img className="mpsc-logo" src="/logo.svg" alt="MPSC logo" onError={()=>setF(true)}/>}<div><b>MPSC <em>Study</em></b>{large&&<small>स्पर्धा परीक्षेची स्मार्ट तयारी</small>}</div></div>}

function Auth({set,onClose}){const[e,se]=useState(''),[p,sp]=useState(''),[newA,sn]=useState(false),[reset,sr]=useState(false),[m,sm]=useState('');async function go(){sm('');if(!e){sm('Email ID भरा.');return}if(reset){const r=await db.auth.resetPasswordForEmail(e,{redirectTo:window.location.origin});r.error?sm(r.error.message):sm('Password reset link तुमच्या Email वर पाठवला आहे.');return}if(!p){sm('Password भरा.');return}const r=newA?await db.auth.signUp({email:e,password:p}):await db.auth.signInWithPassword({email:e,password:p});r.error?sm(r.error.message):set(r.data.session)}return <div className="auth auth-overlay"><section><button className="close-auth" onClick={onClose}>✕</button><Logo large/><p className="auth-sub">Notes • PYQ • Portion • Student Group</p><div className="input-wrap"><span>✉️</span><input placeholder="Email ID" value={e} onChange={x=>se(x.target.value)}/></div>{!reset&&<div className="input-wrap"><span>🔒</span><input type="password" placeholder="Password" value={p} onChange={x=>sp(x.target.value)}/></div>}<button className="primary big-btn" onClick={go}>{reset?'Reset Link पाठवा':newA?'Account तयार करा':'Login'}</button>{!reset&&!newA&&<button className="link-btn" onClick={()=>sr(true)}>🔑 Password विसरलात?</button>}<div className="or"><i/>किंवा<i/></div><button className="outline-btn" onClick={()=>{sr(false);sn(!newA)}}>{newA||reset?'↩️ Login':'👤 नवीन Account तयार करा'}</button>{m&&<small className={m.includes('पाठवला')?'success':'error'}>{m}</small>}<p className="auth-note">अभ्यासासाठी Login आवश्यक नाही. Student Group आणि Profile साठी Free Login करा.</p></section></div>}

function App(){const[s,setS]=useState(null),[auth,setAuth]=useState(false),[menu,setMenu]=useState(false),[tab,setTab]=useState('Home'),[prog,setProg]=useState(()=>JSON.parse(localStorage.getItem('mpsc_guest_progress')||'[]')),[posts,setPosts]=useState([]),[notes,setNotes]=useState([]),[msg,setMsg]=useState(''),[q,setQ]=useState(0),[score,setScore]=useState(0),[answered,setAnswered]=useState(false),[search,setSearch]=useState(''),[uploading,setUploading]=useState(false);
useEffect(()=>{db.auth.getSession().then(r=>setS(r.data.session));const x=db.auth.onAuthStateChange((_,v)=>setS(v));return()=>x.data.subscription.unsubscribe()},[]);
useEffect(()=>{if(!s)return;load();loadNotes();const c=db.channel('group').on('postgres_changes',{event:'INSERT',schema:'public',table:'study_group_posts'},loadPosts).subscribe();return()=>db.removeChannel(c)},[s]);
async function load(){const p=await db.from('portion_progress').select('*').eq('user_id',s.user.id);setProg(p.data||[]);loadPosts()}
async function loadPosts(){const p=await db.from('study_group_posts').select('*').order('created_at',{ascending:false}).limit(50);setPosts(p.data||[])}
async function loadNotes(){if(!s)return;const r=await db.from('user_notes').select('*').order('created_at',{ascending:false});setNotes(r.data||[])}
async function uploadNote(file){if(!s){setAuth(true);return}if(!file||file.type!=='application/pdf'){alert('फक्त PDF file निवडा.');return}if(file.size>20*1024*1024){alert('PDF 20 MB पेक्षा कमी असावा.');return}setUploading(true);const path=s.user.id+'/'+Date.now()+'-'+file.name.replace(/[^a-zA-Z0-9._-]/g,'_');const u=await db.storage.from('study-notes').upload(path,file,{contentType:'application/pdf',upsert:false});if(u.error){alert(u.error.message);setUploading(false);return}const r=await db.from('user_notes').insert({user_id:s.user.id,title:file.name,file_path:path});if(r.error){await db.storage.from('study-notes').remove([path]);alert(r.error.message)}else await loadNotes();setUploading(false)}
async function openNote(n){const r=await db.storage.from('study-notes').createSignedUrl(n.file_path,3600);if(r.error)alert(r.error.message);else window.open(r.data.signedUrl,'_blank')}
async function deleteNote(n){if(!confirm('ही PDF delete करायची का?'))return;await db.storage.from('study-notes').remove([n.file_path]);await db.from('user_notes').delete().eq('id',n.id);loadNotes()}
async function toggle(t){const done=prog.some(x=>x.topic===t.topic&&x.status==='completed');if(s){const o=prog.find(x=>x.topic===t.topic);if(o)await db.from('portion_progress').update({status:done?'not_started':'completed'}).eq('id',o.id);else await db.from('portion_progress').insert({user_id:s.user.id,subject:t.subject,topic:t.topic,status:'completed'});await load()}else{const n=done?prog.filter(x=>x.topic!==t.topic):[...prog,{topic:t.topic,subject:t.subject,status:'completed'}];setProg(n);localStorage.setItem('mpsc_guest_progress',JSON.stringify(n))}}
async function post(){if(!s){setAuth(true);return}if(!msg.trim())return;await db.from('study_group_posts').insert({user_id:s.user.id,post_type:'update',content:msg});setMsg('');loadPosts()}
function needLogin(){setAuth(true)}
const pct=Math.round(prog.filter(x=>x.status==='completed').length/topics.length*100);
const filtered=subjects.filter(x=>(x[1]+' '+x[2]).toLowerCase().includes(search.toLowerCase()));
const answer=i=>{if(answered)return;setAnswered(true);if(i===quiz[q][2])setScore(score+1)};
const nextQ=()=>{setAnswered(false);setQ((q+1)%quiz.length)};
const goTab=t=>{setTab(t);setMenu(false)};
return <div className="app">
<header><button className="icon-btn" onClick={()=>setMenu(true)}>☰</button><Logo/>{s?<button className="bell">🔔<sup>3</sup></button>:<button className="login-top" onClick={()=>setAuth(true)}>Login</button>}</header>
{menu&&<><div className="menu-backdrop" onClick={()=>setMenu(false)}/><aside className="sidebar"><div className="sidebar-head"><Logo/><button className="close-menu" onClick={()=>setMenu(false)}>✕</button></div><div className="menu-user">{s?"👤 "+s.user.email:"👤 विद्यार्थी"}<small>{s?"Logged in":"Guest Mode"}</small></div>{[["🏠","Home"],["📚","Study"],["📄","PYQ"],["🗂️","Notes"],["🎯","Practice"],["👥","Group"],["👤","Profile"]].map(x=><button className={"menu-item "+(tab===x[1]?"active-menu":"")} key={x[1]} onClick={()=>goTab(x[1])}><span>{x[0]}</span>{x[1]}</button>)}<div className="menu-line"/>{s?<button className="menu-item" onClick={()=>{db.auth.signOut();setMenu(false)}}><span>🚪</span>Logout</button>:<button className="menu-item" onClick={()=>{setAuth(true);setMenu(false)}}><span>🔐</span>Login</button>}</aside></>}
<main>
{tab==='Home'&&<><div className="welcome"><div><span>नमस्कार विद्यार्थी 👋</span><h1>आजची तयारी सुरू करूया!</h1><p>तुमचा अभ्यास, सराव आणि प्रगती एकाच ठिकाणी.</p></div><div className="avatar">👤</div></div><div className="hero"><div><span>MPSC</span><h2>स्वप्न तुमचे<br/>साथ आमची</h2></div><div className="hero-icon">🏛️</div></div><div className="progress-card"><div><b>माझी अभ्यास प्रगती</b><small>{pct}% पूर्ण</small></div><div className="progress-track"><i style={{width:pct+'%'}}/></div></div><h2 className="section-title">जलद प्रवेश</h2><div className="grid">{tiles.map(([ic,title,sub,target])=><button className="card" key={title} onClick={()=>goTab(target)}><span className="tile-icon">{ic}</span><b>{title}</b><small>{sub}</small></button>)}</div></>}
{tab==='PYQ'&&<><div className="page-head"><button onClick={()=>goTab('Home')}>←</button><div><h2>📄 MPSC मागील प्रश्नपत्रिका</h2><small>Group C • वर्षानुसार Papers</small></div></div><div className="pyq-note">📌 Group C चे Prelims आणि उपलब्ध Mains papers वर्षानुसार दिले आहेत. <b>Paper पाहा</b> दाबल्यावर PDF collection उघडेल.</div><div className="pyq-list">{pyq.map(([year,type,title,url])=><article className="pyq-card" key={year}><div><span>📄</span><div><b>{title}</b><small>{year} • {type}</small></div></div><button className="primary small-btn" onClick={()=>window.open(url,'_blank')}>PDF पाहा ↗</button></article>)}</div></>}
{tab==='Notes'&&<><div className="page-head"><button onClick={()=>goTab('Home')}>←</button><div><h2>📄 माझ्या Notes</h2><small>तुमचे PDF Notes सुरक्षितपणे जतन करा</small></div></div>{!s?<div className="login-required"><h2>PDF Notes Upload</h2><p>तुमची PDF Notes जतन करण्यासाठी Free Login करा.</p><button className="primary big-btn" onClick={()=>setAuth(true)}>Login / Account तयार करा</button></div>:<><label className="upload-box"><input type="file" accept="application/pdf,.pdf" onChange={e=>uploadNote(e.target.files?.[0])}/><span>📤</span><b>{uploading?'Uploading...':'PDF Notes Add करा'}</b><small>फक्त PDF • कमाल 20 MB</small></label><div className="note-list">{notes.length?notes.map(n=><article key={n.id}><b>📄 {n.title}</b><div className="note-actions"><button className="primary" onClick={()=>openNote(n)}>Open PDF</button><button className="outline-btn small-btn" onClick={()=>deleteNote(n)}>Delete</button></div></article>):<div className="pin">अजून कोणतीही PDF Notes जोडलेली नाहीत.</div>}</div></>}</>}
{tab==='Study'&&<><div className="page-head"><button onClick={()=>goTab('Home')}>←</button><div><h2>अभ्यास साहित्य</h2><small>विषयवार Syllabus Tracker</small></div></div><div className="search">🔎 <input value={search} onChange={x=>setSearch(x.target.value)} placeholder="विषय शोधा..."/></div><div className="tracker-summary"><div><b>{prog.filter(x=>x.status==='completed').length}</b><small>पूर्ण Topics</small></div><div><b>{topics.length}</b><small>एकूण Topics</small></div><div><b>{pct}%</b><small>एकूण प्रगती</small></div></div><div className="tracker-progress"><div><b>एकूण Syllabus</b><span>{pct}%</span></div><div className="progress-track"><i style={{width:pct+'%'}}/></div></div><div className="syllabus-list">{syllabus.filter(x=>(x.name+' '+x.topics.join(' ')).toLowerCase().includes(search.toLowerCase())).map(sub=>{const done=sub.topics.filter(topic=>prog.some(x=>x.topic===topic&&x.status==='completed')).length;const sp=Math.round(done/sub.topics.length*100);return <section className="syllabus-card" key={sub.name}><div className="syllabus-head"><span>{sub.icon}</span><div><b>{sub.name}</b><small>{done}/{sub.topics.length} Topics पूर्ण</small></div><strong>{sp}%</strong></div><div className="mini-progress"><i style={{width:sp+'%'}}/></div><div className="syllabus-topics">{sub.topics.map(topic=>{const isDone=prog.some(x=>x.topic===topic&&x.status==='completed');return <button key={topic} className={isDone?'done':''} onClick={()=>toggle({subject:sub.name,topic})}><span>{isDone?'✅':'⭕'}</span>{topic}<em>{isDone?'पूर्ण':'बाकी'}</em></button>})}</div></section>})}</div></>}
{tab==='Practice'&&<><div className="page-head"><button onClick={()=>setTab('Home')}>←</button><div><h2>सराव व चालू घडामोडी</h2><small>दररोज स्वतःची चाचणी घ्या</small></div></div><div className="quiz-card"><span>प्रश्न {q+1}/{quiz.length}</span><h3>{quiz[q][0]}</h3>{quiz[q][1].map((a,i)=><button key={a} className={answered?(i===quiz[q][2]?'correct': 'quiz-option'):'quiz-option'} onClick={()=>answer(i)}>{String.fromCharCode(65+i)}. {a}</button>)}{answered&&<><p className={score>0?'quiz-score':''}>आत्तापर्यंत गुण: {score}/{q+1}</p><button className="primary post" onClick={nextQ}>पुढील प्रश्न →</button></>} </div><div className="practice-grid"><button className="practice-card">🎯<b>Daily Quiz</b><small>दररोजचे प्रश्न</small></button><button className="practice-card">🏆<b>Mock Test</b><small>पूर्ण सराव परीक्षा</small></button><button className="practice-card">📰<b>Current Affairs</b><small>चालू घडामोडी</small></button><button className="practice-card">🔄<b>Revision</b><small>पुन्हा उजळणी</small></button></div></>}
{tab==='Group'&&<>{s?<><div className="page-head"><button onClick={()=>setTab('Home')}>←</button><div><h2>विद्यार्थी चर्चा</h2><small>Student Group</small></div></div><div className="pin">📌 Notes, PYQ आणि अभ्यासाचे Updates इथे शेअर करा.</div><textarea value={msg} onChange={x=>setMsg(x.target.value)} placeholder="तुमचा Update / प्रश्न / Plan लिहा..."/><button className="primary post" onClick={post}>📢 Post करा</button>{posts.map(x=><article key={x.id}><b>👤 Student Update</b><p>{x.content}</p><small>{new Date(x.created_at).toLocaleString('mr-IN')}</small></article>)}</>:<div className="login-required"><h2>👥 Student Group</h2><p>विद्यार्थी चर्चा पाहण्यासाठी Free Login करा.</p><button className="primary big-btn" onClick={needLogin}>Login / Account तयार करा</button></div>}</>}
{tab==='Profile'&&<>{s?<><div className="page-head"><div><h2>माझे Profile</h2><small>तुमची अभ्यास माहिती</small></div></div><div className="profile-card"><div className="profile-avatar">👤</div><h3>{s.user.email}</h3><div className="profile-stat"><b>{pct}%</b><span>अभ्यास पूर्ण</span></div><button className="outline-btn" onClick={()=>db.auth.signOut()}>Logout</button></div></>:<div className="login-required"><h2>👤 माझे Profile</h2><p>तुमची प्रगती Cloud मध्ये जतन करण्यासाठी Free Login करा.</p><button className="primary big-btn" onClick={needLogin}>Login / Account तयार करा</button></div>}</>}
</main>
<nav>{[['🏠','Home'],['📚','Study'],['📄','PYQ'],['🗂️','Notes'],['🎯','Practice'],['👥','Group'],['👤','Profile']].map(x=><button key={x[1]} className={tab===x[1]?'active':''} onClick={()=>setTab(x[1])}><span>{x[0]}</span><small>{x[1]}</small></button>)}</nav>
{auth&&<Auth set={v=>{setS(v);setAuth(false)}} onClose={()=>setAuth(false)}/>}
</div>}
createRoot(document.getElementById('root')).render(<App/>);