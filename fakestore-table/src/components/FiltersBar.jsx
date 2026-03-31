import React from "react";

export default function FiltersBar({
  categories,
  category,
  onCategoryChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  showSorting = true,
}) {
  return (
    <div className="topbar">
      <div className="control">
        <strong>Category:</strong>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <strong>Search name:</strong>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
        />
      </div>

      {showSorting && (
        <div className="control" style={{ marginLeft: "auto" }}>
          <strong>Sort:</strong>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="none">None</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating-desc">Rating ↓</option>
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
          </select>
        </div>
      )}
    </div>
  );
}