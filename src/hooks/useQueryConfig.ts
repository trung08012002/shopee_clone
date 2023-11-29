import { isUndefined, omitBy } from "lodash";
import { QueryConfig } from "../components/ProductList/ProductList";
import useQueryParams from "./useQueryParams";

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclute: queryParams.exclute,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category,
    },
    isUndefined
  );
  return { queryConfig };
}
