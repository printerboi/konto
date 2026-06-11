import { useEffect, useState } from "react";
import DashboardPage from "./DashboardPage";
import SettingsPage from "./SettingsPage";
import TablePage from "./TablePage";

type HealthResponse = {
  status: string;
  message: string;
};

type PageId = "dashboard" | "table" | "settings";

type IconName = "dashboard" | "table" | "settings" | "activity";

const navigation: Array<{ id: PageId; label: string; icon: IconName }> = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "table", label: "Table", icon: "table" },
  { id: "settings", label: "Settings", icon: "settings" }
];

function Icon({ name }: { name: IconName }) {
  const shared = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24"
  };

  if (name === "dashboard") {
    return (
      <svg {...shared} aria-hidden="true">
        <rect height="7" rx="1.5" width="7" x="3" y="3" />
        <rect height="7" rx="1.5" width="7" x="14" y="3" />
        <rect height="7" rx="1.5" width="7" x="14" y="14" />
        <rect height="7" rx="1.5" width="7" x="3" y="14" />
      </svg>
    );
  }

  if (name === "table") {
    return (
      <svg {...shared} aria-hidden="true">
        <rect height="16" rx="2" width="18" x="3" y="4" />
        <path d="M3 10h18M9 4v16" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...shared} aria-hidden="true">
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="M3 12h2m14 0h2M12 3v2m0 14v2m-6.36-3.36 1.42-1.42m9.88-9.88 1.42-1.42m0 12.72-1.42-1.42M7.06 7.06 5.64 5.64" />
      </svg>
    );
  }

  return (
    <svg {...shared} aria-hidden="true">
      <path d="M4 14h4l2-8 4 12 2-8h4" />
    </svg>
  );
}

function TestPage() {
  const [activePage, setActivePage] = useState<PageId>("dashboard");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Backend responded with ${response.status}`);
        }

        return response.json() as Promise<HealthResponse>;
      })
      .then(setHealth)
      .catch((requestError: Error) => {
        setError(requestError.message);
      });
  }, []);

  const activeLabel =
    navigation.find((item) => item.id === activePage)?.label ?? "Dashboard";
  const statusText =
    health?.message ?? error ?? "Waiting for the FastAPI health endpoint...";

  return (
    <main className="min-h-screen bg-[#f6f2ea] text-slate-900">
      <div className="flex min-h-screen w-full flex-col md:flex-row">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/80 px-4 py-5 shadow-xl shadow-slate-900/5 md:flex md:flex-col">
          <div className="flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-white">
              <Icon name="activity" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.08em] text-rose-700">
                Konto
              </p>
              <p className="text-xs font-medium text-slate-500">Boilerplate</p>
            </div>
          </div>

          <nav className="mt-8 grid gap-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive = item.id === activePage;

              return (
                <button
                  className={[
                    "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold transition",
                    isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  ].join(" ")}
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  type="button"
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white/70 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-rose-700">
                  Tailwind app shell
                </p>
                <h1 className="mt-1 text-2xl font-black text-slate-950">
                  {activeLabel}
                </h1>
              </div>

              <nav className="flex gap-1 md:hidden" aria-label="Mobile pages">
                {navigation.map((item) => (
                  <button
                    className={[
                      "grid h-10 w-10 place-items-center rounded-lg border transition",
                      item.id === activePage
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-600"
                    ].join(" ")}
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    type="button"
                  >
                    <span className="sr-only">{item.label}</span>
                    <Icon name={item.icon} />
                  </button>
                ))}
              </nav>
            </div>
          </header>

          <div className="grid w-full flex-1 content-start gap-6 px-4 py-6 sm:px-6 md:px-8">
            <StatusPanel text={statusText} isConnected={Boolean(health)} />

            {activePage === "dashboard" && <DashboardPage />}
            {activePage === "table" && <TablePage />}
            {activePage === "settings" && <SettingsPage />}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusPanel({
  isConnected,
  text
}: {
  isConnected: boolean;
  text: string;
}) {
  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5"
      aria-label="Backend status"
    >
      <div className="flex items-start gap-4">
        <span
          className={[
            "mt-1 h-3 w-3 flex-none rounded-full shadow-[0_0_0_6px]",
            isConnected
              ? "bg-emerald-600 shadow-emerald-600/15"
              : "bg-amber-500 shadow-amber-500/15"
          ].join(" ")}
        />
        <div>
          <h2 className="text-base font-bold text-slate-950">Backend status</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
    </section>
  );
}

export default TestPage;
