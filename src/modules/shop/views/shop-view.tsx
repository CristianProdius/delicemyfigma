"use client";

import { ShopHero } from "../components/shop-hero";
import { FeaturedProducts } from "../components/featured-products";
import { ShopPreview } from "../components/shop-preview";
import { ShopCTA } from "../components/shop-redirect-cta";

export const ShopView = () => {
  return (
    <>
      <ShopHero />
      <FeaturedProducts />
      <ShopPreview />
      <ShopCTA />
    </>
  );
};