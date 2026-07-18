import React, { use, useContext } from 'react';

import { InstantSearchRSCContext, useInstantSearch } from 'react-instantsearch';

export function SearchQueryId() {
  const { results } = useInstantSearch();
  const { waitForResultsRef } = useContext(InstantSearchRSCContext);

  const promise = waitForResultsRef?.current;
  if (promise) {
    use(promise);
    use(promise);
  }

  return <div id="query-id">{results.queryID}</div>;
}
