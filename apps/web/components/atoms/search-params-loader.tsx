"use client";

import { type ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React from "react";
import { LoaderCircle } from "lucide-react";

type SearchParamsLoaderProps = {
  onParamsReceived: (params: ReadonlyURLSearchParams) => void;
};

function Suspender(props: SearchParamsLoaderProps) {
  return (
    <React.Suspense
      fallback={<LoaderCircle size={28} className="animate-spin m-auto" />}
    >
      <Suspendend {...props} />
    </React.Suspense>
  );
}

function Suspendend({ onParamsReceived }: SearchParamsLoaderProps) {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    onParamsReceived(searchParams);
  });

  return null;
}

const SearchParamsLoader = React.memo(Suspender);
export default SearchParamsLoader;

export const useSearchParamsLoader = () => {
  const [searchParams, setSearchParams] =
    React.useState<ReadonlyURLSearchParams | null>(null);

  return {
    searchParams,
    setSearchParams,
  };
};
