import React,{useEffect,useState}from'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import'./style.css';

const SUPABASE_URL=import.meta.env.VITE_SUPABASE_URL||'https://rjfgfdgrqficffbyqvlf.supabase.co';
const SUPABASE_KEY=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_G3lGu7INXtIGmjum8nj7_A_opGtO3B2';
const db=createClient(SUPABASE_URL,SUPABASE_KEY);

const topics=['इतिहास','भूगोल','राज्यशास्त्र','अर्थशास्त्र','विज्ञान','पर्यावरण','महाराष्ट्र विशेष','चालू घडामोडी'].flatMap(s=>[1,2,3].map(i=>({subject:s,topic:s+' — Topic '+i})));
const tiles=[['📚','Notes','अभ्यास साहित्य','Study'],['📄','PYQ','मागील प्रश्नपत्रिका','Study'],['📊','Portion','अभ्यास नियोजन','Study'],['🎯','Practice','सराव प्रश्न','Practice'],['👥','Student Group','विद्यार्थी चर्चा','Group'],['📰','Updates','चालू घडामोडी','Practice']];
const subjects=[['📖','इतिहास','इतिहास व आधुनिक भारत'],['🏛️','राज्यशास्त्र','घटना, शासनव्यवस्था'],['🌍','भूगोल','भारत व महाराष्ट्र भूगोल'],['📈','अर्थशास्त्र','संकल्पना व नोट्स'],['🔬','विज्ञान','महत्त्वाचे मुद्दे'],['🌱','पर्यावरण','पर्यावरण व शाश्वत विकास'],['⚖️','महाराष्ट्र विशेष','महाराष्ट्र सामान्य ज्ञान'],['📰','चालू घडामोडी','राष्ट्रीय व आंतरराष्ट्रीय']];

function Logo({large=false}){return <div className={'brand '+(large?'brand-large':'')}><div className="logo-mark"><span>📘</span></div><div><b>MPSC <em>Study</em></b>{large&&<small>स्पर्धा परीक्षेची स्मार्ट तयारी</small>}</div></div>}

function Auth({set}){const[e,se]=useState(''),[p,sp]=useState(''),[newA,sn]=useState(false),[m,sm]=useState('');async function go(){sm('');const r=newA?await db.auth.signUp({email:e,password:p}):await db.auth.signInWithPassword({email:e,password:p});r.error?sm(r.error.message):set(r.data.session)}return <div className="auth"><section><Logo large/><p className="auth-sub">Notes • PYQ • Portion • Student Group</p><div className="input-wrap"><span>✉️</span><input placeholder="Email ID" value={e} onChange={x=>se(x.target.value)}/></div><div className="input-wrap"><span>🔒</span><input type="password" placeholder="Password" value={p} onChange={x=>sp(x.target.value)}/></div><button className="primary big-btn" onClick={go}>{newA?'Account तयार करा':'Login'}</button><div className="or"><i/>किंवा<i/></div><button className="outline-btn" onClick={()=>sn(!newA)}>{newA?'↩️ Login':'👤 नवीन Account तयार करा'}</button>{m&&<small className="error">{m}</small>}<p className="auth-note">MPSC अभ्यास, सराव आणि प्रगती — एकाच ठिकाणी.</p></section></div>}

function App(){const[s,setS]=useState(null),[tab,setTab]=useState('Home'),[prog,setProg]=useState([]),[posts,setPosts]=useState([]),[msg,setMsg]=useState('');
useEffect(()=>{db.auth.getSession().then(r=>setS(r.data.session));const x=db.auth.onAuthStateChange((_,v)=>setS(v));return()=>x.data.subscription.unsubscribe()},[]);
useEffect(()=>{if(!s)return;load();const c=db.channel('group').on('postgres_changes',{event:'INSERT',schema:'public',table:'study_group_posts'},loadPosts).subscribe();return()=>db.removeChannel(c)},[s]);
async function load(){const p=await db.from('portion_progress').select('*').eq('user_id',s.user.id);setProg(p.data||[]);loadPosts()}
async function loadPosts(){const p=await db.from('study_group_posts').select('*').order('created_at',{ascending:false}).limit(50);setPosts(p.data||[])}
async function toggle(t){const o=prog.find(x=>x.topic===t.topic);o?await db.from('portion_progress').update({status:o.status==='completed'?'not_started':'completed'}).eq('id',o.id):await db.from('portion_progress').insert({user_id:s.user.id,subject:t.subject,topic:t.topic,status:'completed'});load()}
async function post(){if(!msg.trim())return;await db.from('study_group_posts').insert({user_id:s.user.id,post_type:'update',content:msg});setMsg('');loadPosts()}
if(!s)return <Auth set={setS}/>;
const pct=Math.round(prog.filter(x=>x.status==='completed').length/topics.length*100);
const goTab=t=>setTab(t);
return <div className="app">
<header><button className="icon-btn">☰</button><Logo/><button className="bell">🔔<sup>3</sup></button></header>
<main>
{tab==='Home'&&<><div className="welcome"><div><span>नमस्कार विद्यार्थी 👋</span><h1>आजची तयारी सुरू करूया!</h1><p>तुमचा अभ्यास, सराव आणि प्रगती एकाच ठिकाणी.</p></div><div className="avatar">👤</div></div><div className="hero"><div><span>MPSC</span><h2>स्वप्न तुमचे<br/>साथ आमची</h2></div><div className="hero-icon">🏛️</div></div><div className="progress-card"><div><b>माझी अभ्यास प्रगती</b><small>{pct}% पूर्ण</small></div><div className="progress-track"><i style={{width:pct+'%'}}/></div></div><h2 className="section-title">जलद प्रवेश</h2><div className="grid">{tiles.map(([ic,title,sub,target])=><button className="card" key={title} onClick={()=>goTab(target)}><span className="tile-icon">{ic}</span><b>{title}</b><small>{sub}</small></button>)}</div></>}
{tab==='Study'&&<><div className="page-head"><button onClick={()=>goTab('Home')}>←</button><div><h2>अभ्यास साहित्य</h2><small>Notes • PYQ • Portion</small></div></div><div className="search">🔎 <input placeholder="विषय शोधा..."/></div><div className="subject-list">{subjects.map(([ic,title,sub])=><button key={title} className="subject-card"><span>{ic}</span><div><b>{title}</b><small>{sub}</small></div><strong>›</strong></button>)}</div><h2 className="section-title">📊 Portion Tracker</h2><div className="topics">{topics.map(t=><button key={t.topic} className={prog.some(x=>x.topic===t.topic&&x.status==='completed')?'done':''} onClick={()=>toggle(t)}>{prog.some(x=>x.topic===t.topic&&x.status==='completed')?'✅':'⭕'} {t.topic}</button>)}</div></>}
{tab==='Practice'&&<><div className="page-head"><button onClick={()=>goTab('Home')}>←</button><div><h2>सराव व चालू घडामोडी</h2><small>दररोज स्वतःची चाचणी घ्या</small></div></div><div className="practice-grid"><button className="practice-card">🎯<b>Daily Quiz</b><small>दररोजचे प्रश्न</small></button><button className="practice-card">🏆<b>Mock Test</b><small>पूर्ण सराव परीक्षा</small></button><button className="practice-card">📰<b>Current Affairs</b><small>चालू घडामोडी</small></button><button className="practice-card">🔄<b>Revision</b><small>पुन्हा उजळणी</small></button></div></>}
{tab==='Group'&&<><div className="page-head"><button onClick={()=>goTab('Home')}>←</button><div><h2>विद्यार्थी चर्चा</h2><small>Student Group</small></div></div><div className="pin">📌 Notes, PYQ आणि अभ्यासाचे Updates इथे शेअर करा.</div><textarea value={msg} onChange={x=>setMsg(x.target.value)} placeholder="तुमचा Update / प्रश्न / Plan लिहा..."/><button className="primary post" onClick={post}>📢 Post करा</button>{posts.map(x=><article key={x.id}><b>👤 Student Update</b><p>{x.content}</p><small>{new Date(x.created_at).toLocaleString('mr-IN')}</small></article>)}</>}
{tab==='Profile'&&<><div className="page-head"><div><h2>माझे Profile</h2><small>तुमची अभ्यास माहिती</small></div></div><div className="profile-card"><div className="profile-avatar">👤</div><h3>{s.user.email}</h3><div className="profile-stat"><b>{pct}%</b><span>अभ्यास पूर्ण</span></div><button className="outline-btn" onClick={()=>db.auth.signOut()}>Logout</button></div></>}
</main>
<nav>{[['🏠','Home'],['📚','Study'],['🎯','Practice'],['👥','Group'],['👤','Profile']].map(x=><button key={x[1]} className={tab===x[1]?'active':''} onClick={()=>setTab(x[1])}><span>{x[0]}</span><small>{x[1]}</small></button>)}</nav>
</div>}
createRoot(document.getElementById('root')).render(<App/>);