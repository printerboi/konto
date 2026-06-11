const rows = [
  { account: "Operating", type: "Checking", status: "Active" },
  { account: "Reserve", type: "Savings", status: "Review" },
  { account: "Taxes", type: "Vault", status: "Active" }
];

function TablePage() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
          <tr>
            <th className="px-5 py-4 font-bold">Account</th>
            <th className="px-5 py-4 font-bold">Type</th>
            <th className="px-5 py-4 font-bold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.account}>
              <td className="px-5 py-4 font-bold text-slate-950">
                {row.account}
              </td>
              <td className="px-5 py-4 text-slate-600">{row.type}</td>
              <td className="px-5 py-4">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TablePage;
