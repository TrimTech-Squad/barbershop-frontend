import { useMemo } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  console.log("search", search);
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;
