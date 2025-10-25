// Minimal starter to confirm app runs
window.addEventListener('DOMContentLoaded',()=>{
  const root=document.getElementById('app-root');
  root.innerHTML=`
    <section class="dashboard-card">
      <h2>Dashboard Loaded ✅</h2>
      <p>Your Ji-bajeti Pro app is ready.</p>
    </section>`;
  console.log('[Main] Ji-bajeti Pro initialized');
});
