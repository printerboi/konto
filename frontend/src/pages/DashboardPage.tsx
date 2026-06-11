function DashboardPage() {
  return (
    <section className="grid gap-4 sm:grid-cols-3" aria-label="Dashboard cards">
      {[
        ["Frontend", "Vite", "bg-emerald-100 text-emerald-800"],
        ["Language", "TypeScript", "bg-sky-100 text-sky-800"],
        ["Backend", "FastAPI", "bg-rose-100 text-rose-800"]
      ].map(([label, value, tone]) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          key={label}
        >
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-2xl font-black text-slate-950">{value}</p>
            <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${tone}`}>
              Ready
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default DashboardPage;
