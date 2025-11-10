import { ShoppingCart, Search } from 'lucide-react';

export default function Hero({ onCTAClick, onCartClick, cartCount }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-blue-50/40 to-transparent pointer-events-none" />

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-sky-600 text-white grid place-items-center font-bold">M</div>
          <span className="font-semibold tracking-tight text-slate-800">Minimal Mart</span>
        </div>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <ShoppingCart className="h-4 w-4" />
          Keranjang
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-sky-600 px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            <Search className="h-3.5 w-3.5" /> Temukan gaya minimalis favoritmu
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Belanja simple, rasa premium.
          </h1>
          <p className="mt-4 text-slate-600 max-w-prose">
            Koleksi produk pilihan dengan desain modern dan kualitas terbaik. Satu klik untuk tampilan yang lebih rapi dan elegan.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onCTAClick}
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 transition"
            >
              Belanja Sekarang
            </button>
            <a href="#products" className="text-sky-700 hover:text-sky-800 font-medium">Lihat produk</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop"
              alt="Etalase minimalis"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden sm:block">
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 p-4 shadow-sm">
              <p className="text-sm text-slate-600">
                Koleksi baru tiap minggu • Garansi 7 hari • Pengiriman cepat
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
