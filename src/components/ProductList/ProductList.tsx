
import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import productApi from "../../apis/product.api";
import Pagination from "./Pagination";
import { ProductListConfig } from "../../types/product.type";

import categoryApi from "../../apis/category.api";

import useQueryConfig from "../../hooks/useQueryConfig";
export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}

const ProductList = () => {
    const { queryConfig } = useQueryConfig();
    const { data: categories } = useQuery(
        {
            queryKey: ["categories"],
            queryFn: () => categoryApi.getCategories()
        }
    )
    const { data: productData } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
        placeholderData: keepPreviousData
    })

    return (
        <div className="bg-gray-200 py-6 px-2">
            <div className="container">
                {productData && <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <AsideFilter queryConfig={queryConfig} categories={categories?.data.data || []} />
                    </div>
                    <div className="col-span-9">
                        <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {productData.data.data.products.map((product) => <Product product={product} />)}
                        </div>
                        <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
                    </div>

                </div>
                }
            </div>
        </div>
    )
};

export default ProductList;
