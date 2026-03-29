"use client";

import { useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";

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
};

export default function ProductVariantSelector({
  options,
  variants,
}: Props) {
  const initialSelections = Object.fromEntries(
    options.map((option) => [option.name, option.values[0]])
  );

  const [selections, setSelections] = useState<Record<string, string>>(
    initialSelections
  );

  const selectedVariant = useMemo(() => {
    return (
      variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selections[opt.name] === opt.value
        )
      ) ?? null
    );
  }, [variants, selections]);

  function handleOptionChange(optionName: string, value: string) {
    setSelections((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  }

  return (
    <div>
      {options.map((option) => (
        <div key={option.name} style={{ marginBottom: "1rem" }}>
          <p style={{ marginBottom: ".5rem" }}>{option.name}</p>

          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {option.values.map((value) => {
              const active = selections[option.name] === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleOptionChange(option.name, value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "999px",
                    border: active ? "2px solid white" : "1px solid gray",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedVariant && (
        <>
          <p>
            {selectedVariant.price.currencyCode} {selectedVariant.price.amount}
          </p>

          <AddToCartButton variantId={selectedVariant.id} />
        </>
      )}

      {!selectedVariant && <p>This option combination is unavailable.</p>}
    </div>
  );
}