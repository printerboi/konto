function SettingsPage() {
  return (
    <section className="grid max-w-2xl gap-4">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <label
          className="text-sm font-bold text-slate-950"
          htmlFor="workspace-name"
        >
          Workspace name
        </label>
        <input
          className="mt-3 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-slate-950 focus:bg-white"
          defaultValue="Konto"
          id="workspace-name"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-950">
              Email summaries
            </h2>
            <p className="mt-1 text-sm text-slate-500">Weekly digest enabled</p>
          </div>
          <input
            className="h-5 w-5 accent-slate-950"
            defaultChecked
            type="checkbox"
          />
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
