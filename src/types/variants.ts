export interface SearchVariant {
  calculated_price: number;
  description: string;
  handle: string;
  id: string;
  product: {
    categories: {
      name: string;
      handle: string;
    }[];
  };
  sku: string;
  thumbnail?: string;
  title: string;
}
interface SearchResultVariant {
  calculated_price: SearchResult;
  description: SearchResult;
  handle: SearchResult;
  id: SearchResult;
  product: {
    categories: {
      name: SearchResult;
      handle: SearchResult;
    }[];
  };
  sku: SearchResult;
  thumbnail?: SearchResult;
  title: SearchResult;
}
interface SearchResult {
  value: string;
}
export interface VariantsSearchResponse extends SearchVariant {
  __position: number;
  _highlightResults: SearchResultVariant;
  _snippetResult: SearchResultVariant;
}
