import { ShoppingBag } from 'lucide-react';

function formatIDR(n) {
  return `Rp ${n.toLocaleString('id-ID')}`;
}

export default function ProductGrid({ products, onAdd }) {
  if (!products.length) {
    return (
      <div className="text-center py-20 rounded-2xl border border-dashed border-slate-200 bg-white/60">
        <p className="text-slate-600">Produk tidak ditemukan. Coba ubah kata kunci atau kategori.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <article key={p.id} className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="aspect-[4/3] overflow-hidden">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-slate-900 line-clamp-1">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.description}</p>
            <p className="mt-3 font-semibold text-sky-700">{formatIDR(p.price)}</p>
          </div>
          <div className="p-4 pt-0">
            <button
              onClick={() => onAdd(p)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-white font-medium shadow-sm hover:bg-sky-700 transition"
            >
              <ShoppingBag className="h-4 w-4" /> Tambah ke Keranjang
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
