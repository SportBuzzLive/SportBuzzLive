const matches = document.querySelector("#matches");
const status = document.querySelector("#status");
document.querySelector("#refresh").onclick = load;

function esc(v){return String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

function scoreText(m){
  if(!Array.isArray(m.score) || !m.score.length) return "Score not available";
  return m.score.map(s => `${esc(s.inning || s.team || "")}: ${esc(s.r || s.runs || 0)}/${esc(s.w || s.wickets || 0)} (${esc(s.o || s.overs || 0)})`).join("<br>");
}

async function load(){
  status.textContent="Updating live matches…";
  try{
    const r=await fetch("/api/current-matches");
    const data=await r.json();
    if(!r.ok) throw new Error(data.error || "API error");
    const list=data.data || [];
    matches.innerHTML=list.length ? list.map(m=>`
      <article class="card">
        <span class="badge">${esc(m.matchType || "CRICKET").toUpperCase()}</span>
        <div class="teams">${esc(m.teams?.[0] || "Team 1")}<br>vs<br>${esc(m.teams?.[1] || "Team 2")}</div>
        <div class="score">${scoreText(m)}</div>
        <div class="meta">${esc(m.status || "Live data")} • ${esc(m.venue || "")}</div>
      </article>`).join("") :
      `<div class="card">No current matches found.</div>`;
    status.textContent=`${list.length} match(es) loaded • ${new Date().toLocaleTimeString()}`;
  }catch(e){status.textContent="Could not load live data: "+e.message}
}
load();
setInterval(load, 60000);
