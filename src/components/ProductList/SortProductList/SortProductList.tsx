import React, { useMemo } from "react"
import { QueryConfig } from "../ProductList";
import { sortBy, order as orderConstant } from "../../../constants/product.constants";
import { ProductListConfig } from "../../../types/product.type";
import classNames from "classnames";
import { createSearchParams, useNavigate } from "react-router-dom";
import { omit } from "lodash";

interface Props {
    queryConfig: QueryConfig,
    pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
    const page = useMemo(() => queryConfig.page ?? "1", [queryConfig.page])
    const { sort_by = sortBy.createdAt, order } = queryConfig;
    const navigate = useNavigate();
    const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        return sortByValue === sort_by
    }

    const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        navigate({
            pathname: '',
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue
                    }, ['order']
                )
            ).toString()
        })
    }
    const handlePriceOrder = (orderByValue: Exclude<ProductListConfig['order'], undefined>) => {
        navigate({
            pathname: '',
            search: createSearchParams(
                {
                    ...queryConfig,
                    order: orderByValue
                }
            ).toString()
        })
    }
    return (
        <div className="bg-gray-300/40 py-4 px-3 w-full">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex-wrap gap-2 items-center flex">
                    <div>Sắp xếp theo</div>
                    <button
                        onClick={() => handleSort(sortBy.view)}
                        className={classNames("h-8 px-4 capitalize text-sm  text-center", {
                            ' bg-orange text-white  hover:bg-orange/80 ': isActiveSortBy(sortBy.view),
                            ' bg-white text-black text-sm hover:bg-white/80': !isActiveSortBy(sortBy.view)
                        })
                        }>Phổ biến</button>
                    <button
                        onClick={() => handleSort(sortBy.createdAt)}
                        className={classNames("h-8 px-4 capitalize text-sm  text-center", {
                            ' bg-orange text-white  hover:bg-orange/80 ': isActiveSortBy(sortBy.createdAt),
                            ' bg-white text-black text-sm hover:bg-white/80': !isActiveSortBy(sortBy.createdAt)
                        })
                        }>Mới nhất</button>
                    <button
                        onClick={() => handleSort(sortBy.sold)}
                        className={classNames("h-8 px-4 capitalize text-sm  text-center", {
                            ' bg-orange text-white  hover:bg-orange/80 ': isActiveSortBy(sortBy.sold),
                            ' bg-white text-black text-sm hover:bg-white/80': !isActiveSortBy(sortBy.sold)
                        })
                        }>Bán chạy</button>
                    <select className={
                        classNames("h-8 px-4 capitalize text-sm  text-start", {
                            ' bg-orange text-white  hover:bg-orange/80 ': isActiveSortBy(sortBy.price),
                            'bg-white text-black  hover:bg-white/80': !isActiveSortBy(sortBy.price)
                        })
                    }
                        value={order ?? ""}
                        onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
                    >
                        <option value="" disabled>Giá</option>
                        <option value={orderConstant.asc} >Giá: Thấp đến cao</option>
                        <option value={orderConstant.desc} >Giá: Cao đến thấp</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <div>
                        <span className="text-orange">{page}</span>
                        <span>/</span>
                        <span>{pageSize}</span>
                    </div>
                    <div className="ml-2">
                        <button className="px-3 h-8 rounded-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed" >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>

                        </button>
                        <button className="px-3 h-8 rounded-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed" >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
};

export default SortProductList;
