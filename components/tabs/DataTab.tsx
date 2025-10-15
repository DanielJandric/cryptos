export default function DataTab() {
  return (
    <section className="grid gap-4">
      <div className="card p-4">
        <h3 className="text-lg font-semibold mb-2">Data</h3>
        <p className="text-sm text-slate-300/90">Historicals and spot are refreshed via yfinance. JSON outputs are served from public/data/.</p>
      </div>
      <div className="card p-4">
        <ul className="text-sm list-disc list-inside text-slate-300/90">
          <li><a className="underline" href="/data/btc-history.json" target="_blank" rel="noreferrer">/data/btc-history.json</a></li>
          <li><a className="underline" href="/data/spot.json" target="_blank" rel="noreferrer">/data/spot.json</a></li>
          <li><a className="underline" href="/data/nasdaq-history.json" target="_blank" rel="noreferrer">/data/nasdaq-history.json</a></li>
        </ul>
      </div>
    </section>
  );
}
