import { useId, useMemo, useState } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';

function formatIDR(n) {
  return `Rp ${n.toLocaleString('id-ID')}`;
}

export default function Cart({ open, onClose, cart, onQty, onRemove, total, onCheckout }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [shipping, setShipping] = useState('Reguler');

  const nameId = useId();
  const phoneId = useId();
  const addressId = useId();

  const items = useMemo(() => Object.values(cart), [cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) return;
    onCheckout({ name, phone, address, shipping });
    setName('');
    setPhone('');
    setAddress('');
    setShipping('Reguler');
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Keranjang Belanja</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-50">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="grid grid-rows-[1fr_auto] h-[calc(100%-57px)]">
          <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <p className="text-slate-600">Belum ada produk di keranjang.</p>
            ) : (
              items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4 border border-slate-200 rounded-xl p-3">
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 line-clamp-1">{product.name}</h4>
                    <p className="text-sm text-slate-600">{formatIDR(product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50"
                        onClick={() => onQty(product.id, qty - 1)}
                        aria-label="Kurangi"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={qty}
                        min={1}
                        onChange={(e) => onQty(product.id, Number(e.target.value))}
                        className="w-16 text-center rounded-lg border border-slate-200 py-1"
                      />
                      <button
                        className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50"
                        onClick={() => onQty(product.id, qty + 1)}
                        aria-label="Tambah"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button className="p-2 self-start rounded-lg hover:bg-red-50" onClick={() => onRemove(product.id)} aria-label="Hapus">
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-200 p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between font-semibold text-slate-900">
              <span>Total</span>
              <span>{formatIDR(total)}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor={nameId} className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <input id={nameId} type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
              </div>
              <div>
                <label htmlFor={phoneId} className="block text-sm font-medium text-slate-700">No. HP</label>
                <input id={phoneId} type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
              </div>
              <div>
                <label htmlFor={addressId} className="block text-sm font-medium text-slate-700">Alamat Lengkap</label>
                <textarea id={addressId} required rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Pengiriman</label>
                <div className="mt-2 flex gap-3">
                  {['Reguler', 'Express', 'Hemat'].map((opt) => (
                    <label key={opt} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${shipping === opt ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-700'}`}>
                      <input type="radio" name="shipping" value={opt} checked={shipping === opt} onChange={() => setShipping(opt)} className="accent-sky-600" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full rounded-xl bg-sky-600 px-4 py-3 text-white font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Pesan Sekarang
              </button>
            </form>
          </div>
        </div>
      </aside>
    </div>
  );
}
