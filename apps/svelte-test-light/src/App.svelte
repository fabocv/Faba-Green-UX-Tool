<script>
  import { onMount, onDestroy } from 'svelte';
  import usuariosData from './assets/users.json';

  // Svelte 5 Rune: Reactividad ultra eficiente
  let usuarios = $state([]);
  let intervalId;
  let observer;

  const finalizeBenchmark = (endTime) => {
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(r => r.initiatorType === 'script' || r.name.endsWith('.js'));
    
    window.fabaRawMetrics = {
      network: {
        totalTransferredKB: resources.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024,
        jsBundleKB: jsResources.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024,
        requests: resources.length
      },
      performance: {
        FCPms: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        FTTSms: endTime 
      },
      memory: {
        jsHeapUsedMB: (performance.memory?.usedJSHeapSize || 0) / (1024 * 1024)
      }
    };
    console.log("📊 Svelte 5 Benchmark Complete", window.fabaRawMetrics);
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
  <h1>Usuarios Svelte ({usuarios.length})</h1>
  
  <div class="container">
    {#each usuarios as user, i (user.id?.value || i)}
      <div class="card">
        <div class="avatar">
          {user.name.first[0]}{user.name.last[0]}
        </div>
        <div class="info">
          <h3>{user.name.title} {user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
          <p>{user.cell}</p>
        </div>
      </div>
    {/each}
  </div>
</div>