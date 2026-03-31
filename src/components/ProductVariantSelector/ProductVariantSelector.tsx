"use client";

import { useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import styles from "./ProductVariantSelector.module.css";

type ProductOption = {
  name: string;
  values: string[];
};

type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: {
    amount: string;
    currencyCode: string;
  };
};

type Props = {
  options: ProductOption[];
  variants: ProductVariant[];
  className?: string;
};

export default function ProductVariantSelector({
  options,
  variants,
  className,
}: Props) {
  const realOptions = useMemo(() => {
    return options.filter((option) => {
      const isDefaultTitleOnly =
        option.name === "Title" &&
        option.values.length === 1 &&
        option.values[0] === "Default Title";

      const hasRealChoices = option.values.length > 1;

      return !isDefaultTitleOnly && hasRealChoices;
    });
  }, [options]);

  const initialSelections = useMemo(() => {
    return Object.fromEntries(
      realOptions.map((option) => [option.name, option.values[0]])
    );
  }, [realOptions]);

  const [selections, setSelections] = useState<Record<string, string>>(
    initialSelections
  );

  const selectedVariant = useMemo(() => {
    if (realOptions.length === 0) {
      return variants[0] ?? null;
    }

    return (
      variants.find((variant) =>
        realOptions.every((option) => {
          const selected = variant.selectedOptions.find(
            (opt) => opt.name === option.name
          );

          return selected?.value === selections[option.name];
        })
      ) ?? null
    );
  }, [variants, realOptions, selections]);

  function handleOptionChange(optionName: string, value: string) {
    setSelections((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  }

  if (realOptions.length === 0) {
    return selectedVariant ? (
      <div className={className}>
        <AddToCartButton
          variantId={selectedVariant.id}
          price={selectedVariant.price.amount}
        />
      </div>
    ) : null;
  }

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      {realOptions.map((option) => (
        <div key={option.name} className={styles.optionGroup}>


          <select
            id={option.name}
            className={styles.select}
            value={selections[option.name]}
            onChange={(e) => handleOptionChange(option.name, e.target.value)}
          >
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}

      {selectedVariant ? (
        <AddToCartButton
          variantId={selectedVariant.id}
          price={selectedVariant.price.amount}
        />
      ) : (
        <p className={styles.unavailable}>
          This option combination is unavailable.
        </p>
      )}
    </div>
  );
}