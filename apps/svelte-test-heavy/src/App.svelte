<script>
  import { onMount, onDestroy } from 'svelte';
  import Card, { Content } from '@smui/card';
  import usuariosData from './assets/users.json';

  let usuarios = $state([]);
  let intervalId;
  let observer;

  const finalizeBenchmark = (endTime) => {
    window.fabaRawMetrics = {
      network: {
        totalTransferredKB: performance.getEntriesByType('resource').reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024,
        jsBundleKB: performance.getEntriesByType('resource').filter(r => r.name.endsWith('.js')).reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024,
        requests: performance.getEntriesByType('resource').length
      },
      performance: {
        FCPms: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        FTTSms: endTime 
      },
      memory: {
        jsHeapUsedMB: (performance.memory?.usedJSHeapSize || 0) / (1024 * 1024)
      }
    };
    console.log("📊 Svelte 5 Heavy (SMUI) Complete", window.fabaRawMetrics);
  };

  onMount(() => {
    usuarios = usuariosData['results'];
    let lastLongTaskEnd = performance.now();
    
    observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const taskEnd = entry.startTime + entry.duration;
        if (taskEnd > lastLongTaskEnd) lastLongTaskEnd = taskEnd;
      }
    });
    try { observer.observe({ type: 'longtask', buffered: true }); } catch (e) {}

    intervalId = setInterval(() => {
      const now = performance.now();
      if (now - lastLongTaskEnd >= 300) {
        clearInterval(intervalId);
        observer.disconnect();
        finalizeBenchmark(now);
      }
    }, 100);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
    if (observer) observer.disconnect();
  });
</script>

<div class="bg"></div>
<div class="content">
  <h1>Svelte Heavy (SMUI) - {usuarios.length}</h1>
  
  <div class="container">
    {#each usuarios as user, i (user.id?.value || i)}
      <Card class="card smui-card-custom">
        <div class="avatar">
          {user.name.first[0]}{user.name.last[0]}
        </div>
        <Content class="info">
          <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
          <p>{user.cell}</p>
        </Content>
      </Card>
    {/each}
  </div>
</div>

<style>
  /* Tu CSS Base (El que me pasaste) */
  .bg {
    background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
    bottom:0; left:-50%; opacity:.5; position:fixed; right:-50%; top:0; z-index:-1;
  }
  .container {
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1em;
  }
  .content {
    background-color: rgba(255, 255, 255, .8); border-radius: .25em;
    padding: 2rem; text-align: center; margin: 2% 10% 0 10%;
  }

  /* Forzamos el estilo Light sobre los componentes Heavy */
  :global(.smui-card-custom) {
    background-color: azure !important;
    border-top: 6px solid #09f !important;
    border-radius: 8px !important;
    border-bottom-right-radius: 20% !important;
    padding: 1.5rem !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .avatar {
    display: flex; height: 120px; width: 120px; border-radius: 100%;
    font-size: xx-large; justify-content: center; align-items: center;
    font-weight: bold; background-color: #6c3; color: white;
  }
  
  h3, p { font-family: monospace; margin: 5px 0; }
  p { font-size: small; }
</style>