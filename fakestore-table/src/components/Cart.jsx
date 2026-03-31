import React, { useMemo } from "react";

export default function Cart({ cart, setQty, clearCart, products }) {
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  const items = useMemo(() => {
    return Object.entries(cart)
      .map(([idStr, qty]) => {
        const id = Number(idStr);
        const p = byId.get(id);
        return p ? { product: p, qty: Number(qty) } : null;
      })
      .filter(Boolean);
  }, [cart, byId]);

  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + Number(it.product.price ?? 0) * it.qty, 0);
  }, [items]);

  return (
    <div className="cart">
      <div className="cartHeader">
        <strong>Cart</strong>
        <button className="mutedBtn" onClick={clearCart} disabled={items.length === 0}>
          Clear
        </button>
      </div>

      {items.length === 0 ? (
        <div className="small">No items yet.</div>
      ) : (
        <>
          {items.map(({ product, qty }) => (
            <div className="cartItem" key={product.id}>
              <img className="thumb" src={product.image} alt={product.title} loading="lazy" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{product.title}</div>
                <div className="small">${Number(product.price ?? 0).toFixed(2)}</div>
              </div>
              <div style={{ display: "grid", gap: 6, justifyItems: "end" }}>
                <input
                  className="qtyInput"
                  type="number"
                  min="0"
                  step="1"
                  value={qty}
                  onChange={(e) => setQty(product.id, e.target.value)}
                />
                <div className="small">
                  ${(Number(product.price ?? 0) * qty).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

          <div className="cartTotal">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}