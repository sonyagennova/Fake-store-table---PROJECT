import React, { useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import FiltersBar from "./components/FiltersBar";
import ProductTable from "./components/ProductTable";
import Cart from "./components/Cart";
import { filterProducts, getCategories, sortProducts } from "./utils/productHelpers";

export default function App() {
  const { products, loading } = useProducts();

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("none");

  const [cart, setCart] = useState({});

  const categories = useMemo(() => getCategories(products), [products]);

  const shown = useMemo(() => {
    const filtered = filterProducts(products, { category, search });
    return sortProducts(filtered, sortBy);
  }, [products, category, search, sortBy]);

  function addToCart(productId) {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }

  function setQty(productId, qty) {
    const q = Math.max(0, Math.floor(Number(qty) || 0));
    setCart((prev) => {
      const next = { ...prev };
      if (q <= 0) delete next[productId];
      else next[productId] = q;
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  return (
    <div className="container">
      <FiltersBar
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showSorting={true}
      />

      <div className="layout">
        <div>
          <ProductTable products={shown} loading={loading} onAddToCart={addToCart} />
        </div>

        <Cart cart={cart} setQty={setQty} clearCart={clearCart} products={products} />
      </div>
    </div>
  );
}