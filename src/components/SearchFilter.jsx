import { useId } from 'react';
import { Filter, Search } from 'lucide-react';

export default function SearchFilter({ search, onSearch, category, onCategory, categories }) {
  const searchId = useId();
  const catId = useId();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">Cari produk</label>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id={searchId}
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Cari nama produk atau deskripsi..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div className="relative">
          <label htmlFor={catId} className="sr-only">Kategori</label>
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            id={catId}
            value={category}
            onChange={(e) => onCategory(e.target.value)}
            className="w-full md:w-60 appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </section>
  );
}
