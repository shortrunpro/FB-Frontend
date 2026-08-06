export const getVariantOptions = (variants: any[]) => {
  const sizes = [
    ...new Set(
      variants?.map(m => {
        if (m?.size) {
          return m?.size;
        }
        if (m.options && m.options.length > 0) {
          return m.options.filter((f: any) => f.option.title === 'size')?.[0]?.value;
        }
      })
    )
  ];
  const finishes = [
    ...new Set(
      variants?.map(m => {
        if (m?.finish) {
          return m?.finish;
        }
        if (m.options && m.options.length > 0) {
          return m?.options?.filter((f: any) => f?.option?.title === 'finish')?.[0]?.value;
        }
      })
    )
  ];

  return {
    sizes,
    finishes
  };
};

export const getVariantPrices = (variant: any[]) => {
  const price = variant.map(m => {
    if (m?.calculated_price?.calculated_amount) {
      return m?.calculated_price?.calculated_amount as number;
    }
    if (m?.prices && m.prices.length > 0) {
      return m?.prices?.[0].amount as number;
    }
    return 0;
  }) as number[];

  return {
    highestPrice: price.sort((a, b) => b - a)[0],
    cheapestPrice: price.sort((a, b) => a - b)[0]
  };
};
