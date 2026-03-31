import React from "react";
import { roundStars } from "../utils/productHelpers";

export default function RatingStars({ rate }) {
  const filled = roundStars(rate);
  const empty = 5 - filled;

  return (
    <span className="stars" title={`${Number(rate ?? 0).toFixed(1)} / 5`}>
      {"★".repeat(filled)}
      {"☆".repeat(empty)}
    </span>
  );
}