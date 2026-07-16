'use client';

import { useEffect, useRef } from 'react';

import { MagnifyingGlassMini } from '@medusajs/icons';
import { useRouter } from 'next/navigation';
import { Configure, ConfigureProps, Hits, InstantSearch } from 'react-instantsearch';

import { SEARCH_INDEX_NAME, searchClient } from '@/lib/data/search';

import { SearchBox, SearchHit, SearchHits } from '../../components';

export default function SearchModal() {
  const configureProps: ConfigureProps = {
    hitsPerPage: 8
  } as ConfigureProps;
  const router = useRouter();
  const searchRef = useRef(null);
  // close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    // cleanup
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleEsc);

    // cleanup
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative z-[75]"
      data-testid="search-container"
    >
      <div className="fixed inset-0 h-screen w-screen bg-white bg-opacity-75 opacity-100 backdrop-blur-md" />
      <div
        className="fixed inset-0 sm:p-0"
        ref={searchRef}
      >
        <div className="flex h-fit max-h-full w-full transform flex-col items-center justify-start bg-brand_grey p-5 text-left align-middle shadow-none transition-all">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <Configure {...configureProps} />
            <div
              className="md:w-75 flex w-full flex-col overflow-auto"
              data-testid="search-modal-container"
            >
              <div className="flex w-full items-center gap-x-2 rounded-sm bg-[rgba(3,7,18,0.5)] p-4 text-white backdrop-blur-2xl">
                <MagnifyingGlassMini />
                <SearchBox />
              </div>
              <div className="mt-4 flex">
                <SearchHits hitComponent={SearchHit} />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  );
}
