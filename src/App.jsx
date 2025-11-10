import { useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import SearchFilter from './components/SearchFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import Cart from './components/Cart.jsx';

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Kemeja Linen Minimalis',
    price: 299000,
    category: 'Fashion',
    description:
      'Kemeja linen ringan dan breathable dengan potongan modern minimalis. Cocok untuk aktivitas sehari-hari.',
    image:
      'https://images.unsplash.com/photo-1520975682031-a8c8fddc3d84?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'Sneakers Putih Classic',
    price: 449000,
    category: 'Fashion',
    description:
      'Sneakers serbaguna dengan desain clean. Nyaman digunakan sepanjang hari.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p3',
    name: 'Jam Tangan Minimal',
    price: 799000,
    category: 'Aksesoris',
    description:
      'Jam tangan dengan dial sederhana dan strap kulit. Elegan dan timeless.',
    image:
      'https://images.unsplash.com/photo-1518081461904-9ac3d0e4e367?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p4',
    name: 'Kursi Kayu Scandinavian',
    price: 1299000,
    category: 'Rumah',
    description:
      'Kursi kayu solid dengan finishing matte. Desain skandinavia yang hangat.',
    image:
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p5',
    name: 'Botol Air Insulasi 1L',
    price: 199000,
    category: 'Lifestyle',
    description:
      'Menjaga minuman tetap dingin hingga 24 jam. Material bebas BPA.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'p6',
    name: 'Headphone Wireless',
    price: 999000,
    category: 'Elektronik',
    description:
      'Suara jernih dengan bass seimbang. Daya tahan baterai hingga 30 jam.',
    image:
      'https://images.unsplash.com/photo-1518441982127-5c03f6478e8b?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [cart, setCart] = useState({}); // { [id]: { product, qty } }
  const [openCart, setOpenCart] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['Semua', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchSearch = !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      const matchCategory = category === 'Semua' || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      const qty = existing ? existing.qty + 1 : 1;
      return { ...prev, [product.id]: { product, qty } };
    });
    setOpenCart(true);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const newQty = Math.max(1, qty);
      return { ...prev, [id]: { ...prev[id], qty: newQty } };
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearCart = () => setCart({});

  const total = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cart]);

  const handleCheckout = (order) => {
    // For now, simulate success
    alert(`Pesanan berhasil!\n\nNama: ${order.name}\nHP: ${order.phone}\nAlamat: ${order.address}\nPengiriman: ${order.shipping}\nTotal: Rp ${total.toLocaleString('id-ID')}`);
    clearCart();
    setOpenCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <Hero onCTAClick={() => {
        const el = document.getElementById('products');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }} onCartClick={() => setOpenCart(true)} cartCount={Object.keys(cart).length} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <SearchFilter
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          categories={categories}
        />

        <section id="products" className="mt-8">
          <ProductGrid products={filtered} onAdd={addToCart} />
        </section>
      </main>

      <Cart
        open={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        onQty={updateQty}
        onRemove={removeFromCart}
        total={total}
        onCheckout={handleCheckout}
      />

      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Minimal Mart</p>
          <p className="hidden sm:block">Didesain dengan gaya minimalis berwarna putih, abu, dan biru lembut.</p>
        </div>
      </footer>
    </div>
  );
}
