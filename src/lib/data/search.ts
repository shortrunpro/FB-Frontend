import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const endpoint = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT || 'http://127.0.0.1:7700';
const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || 'test_key';
export const { searchClient } = instantMeiliSearch(endpoint, apiKey, {
  placeholderSearch: false,
  finitePagination: true
});
export const SEARCH_INDEX_NAME = process.env.NEXT_PUBLIC_INDEX_NAME || 'product';
