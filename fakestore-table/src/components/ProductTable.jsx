import React from "react";
import RatingStars from "./RatingStars";

export default function ProductTable({ products, loading, onAddToCart }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th style={{ width: 60 }}>Image</th>
            <th style={{ width: "34%" }}>Title</th>
            <th style={{ width: 140 }}>Category</th>
            <th>Description</th>
            <th style={{ width: 120 }}>Rating</th>
            <th style={{ width: 90 }}>Ratings</th>
            <th style={{ width: 120 }}>Price (USD)</th>
            <th style={{ width: 120 }}> </th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={8} style={{ padding: 12 }}>
                Loading...
              </td>
            </tr>
          )}

          {!loading &&
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img className="thumb" src={p.image} alt={p.title} loading="lazy" />
                </td>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>
                  {String(p.description ?? "").length > 95
                    ? String(p.description).slice(0, 95) + "…"
                    : p.description}
                </td>
                <td>
                  <span className="badge">
                    <RatingStars rate={p?.rating?.rate} />
                    <span className="small">{Number(p?.rating?.rate ?? 0).toFixed(1)}</span>
                  </span>
                </td>
                <td>{Number(p?.rating?.count ?? 0)}</td>
                <td>{Number(p.price ?? 0).toFixed(2)}</td>
                <td className="actions">
                  <button type="button" onClick={() => onAddToCart(p.id)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}

          {!loading && (
            <tr className="footerRow">
              <td colSpan={7}>Total shown</td>
              <td colSpan={1}>{products.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}