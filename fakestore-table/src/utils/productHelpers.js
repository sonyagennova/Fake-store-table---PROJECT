export function getCategories(products) {
  const set = new Set(products.map((p) => p.category).filter(Boolean));
  return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

export function matchesSearch(product, search) {
  if (!search) return true;
  const s = search.trim().toLowerCase();
  const title = String(product.title ?? "").toLowerCase();
  const desc = String(product.description ?? "").toLowerCase();
  return title.includes(s) || desc.includes(s);
}

export function filterProducts(products, { category, search }) {
  return products.filter((p) => {
    const categoryOk = category === "All" ? true : p.category === category;
    const searchOk = matchesSearch(p, search);
    return categoryOk && searchOk;
  });
}

export function sortProducts(products, sortBy) {
  const list = products.slice();

  switch (sortBy) {
    case "price-asc":
      return list.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return list.sort((a, b) => Number(b.price) - Number(a.price));
    case "rating-desc":
      return list.sort(
        (a, b) => Number(b?.rating?.rate ?? 0) - Number(a?.rating?.rate ?? 0)
      );
    case "title-asc":
      return list.sort((a, b) => String(a.title ?? "").localeCompare(String(b.title ?? "")));
    case "title-desc":
      return list.sort((a, b) => String(b.title ?? "").localeCompare(String(a.title ?? "")));
    default:
      return list; // none
  }
}

export function roundStars(rate) {
  const r = Number(rate ?? 0);
  return Math.max(0, Math.min(5, Math.round(r)));
}