"use client";

import SearchLoading from "@/components/search/search-loading";
import React, { Suspense } from "react";
import SearchResultsContent from "@/components/search/search-results-content";

export default function SearchResultsPage() {
  
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResultsContent />
    </Suspense>
  );
}