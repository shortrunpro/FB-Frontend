import { ReadonlyURLSearchParams } from 'next/navigation';

export const filteredParams = [
  'fbclid',
  'msclkid',
  'srsltid',
  'nxtPhandle',
  'nxtPcategory',
  'gbraid',
  'gclid'
];

const getOption = (label: string | null) => {
  switch (label) {
    case 'size':
      return 'variants.size';
    case 'variants.finish':
      return 'variants.finish';
    case 'condition':
      return 'variants.condition';
    case 'rating':
      return 'average_rating';
    default:
      return null;
  }
};

export const getFacedFilters = (filters: ReadonlyURLSearchParams): string => {
  let facet = '';

  let minPrice = null;
  let maxPrice = null;

  let query = '';
  let rating = '';

  for (const [key, value] of filters.entries()) {
    if (
      key.includes('utm') ||
      key.includes('_rsc') ||
      key.includes('gad') ||
      filteredParams.includes(key)
    ) {
      continue;
    }
    if (
      key !== 'min_price' &&
      key !== 'max_price' &&
      key !== 'sale' &&
      key !== 'query' &&
      key !== 'page' &&
      key !== 'products[page]' &&
      key !== 'sortBy' &&
      key !== 'rating'
    ) {
      let values = '';
      const splittedSize = value.split(',');
      if (splittedSize.length > 1) {
        splittedSize.map((value, index) => {
          if (!getOption(key)) {
            return;
          }
          return (values += `${getOption(key)}="${value}" ${
            index + 1 < splittedSize.length ? 'OR ' : ''
          }`);
        });
      } else {
        if (getOption(key)) {
          values += `${getOption(key)}="${splittedSize[0]}"`;
        }
      }
      facet += `${values}`;
    } else {
      if (key === 'min_price') minPrice = value;
      if (key === 'max_price') maxPrice = value;

      if (key === 'query') query = ` AND products.title:"${value}"`;

      if (key === 'rating') {
        let values = '';
        const splited = value.split(',');
        if (splited.length > 1) {
          splited.map(
            (value, index) =>
              (values += `${getOption(key)} >= ${value} ${index + 1 < splited.length ? 'OR ' : ''}`)
          );
        } else {
          values += `${getOption(key)} >= ${splited[0]}`;
        }
        rating += ` AND ${values}`;
      }
    }
  }
  const conditionalAnd = (value: string) => {
    return value.length ? ' AND ' : '';
  };
  const priceFilter =
    minPrice && maxPrice
      ? `variants.price ${minPrice} TO ${maxPrice}`
      : minPrice
        ? `variants.price >= ${minPrice}`
        : maxPrice
          ? `variants.price <= ${maxPrice}`
          : '';

  return facet + conditionalAnd(facet) + priceFilter + rating;
};
