export interface SearchStats {
  hitsPerPage: number;
  index: string;
  nbHits: number;
  nbPages: number;
  page: number;
  processingTimeMS: number;
  query: string;
}
