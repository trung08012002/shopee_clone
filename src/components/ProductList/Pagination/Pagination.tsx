import React, { useMemo } from "react";
import classNames from 'classnames';
import { QueryConfig } from "../ProductList";
import { Link, createSearchParams } from "react-router-dom";
interface Props {
    queryConfig: QueryConfig,
    pageSize: number;
}
const RANGE = 2;
const Pagination = ({ queryConfig, pageSize }: Props) => {
    const page = useMemo(() => Number(queryConfig.page), [queryConfig.page])
    const renderPagination = () => {
        let dotAfter = false;
        let doBefore = false;

        const dotAfterRender = (pageNumber: number) => {
            if (!dotAfter) {
                dotAfter = true;
                return (
                    <span
                        key={pageNumber}
                        className="bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-pointer border"
                    >
                        ...
                    </span>
                );
            }
        };
        const dotBeforeRender = (pageNumber: number) => {
            if (!doBefore) {
                doBefore = true;
                return (
                    <span
                        key={pageNumber}
                        className="bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-pointer border"
                    >
                        ...
                    </span>
                );
            }
        };
        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1;
                if (
                    page <= RANGE * 2 + 1 &&
                    pageNumber > page + RANGE &&
                    pageNumber < pageSize + 1 - RANGE
                ) {
                    return dotAfterRender(index);
                } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
                    if (pageNumber > RANGE && pageNumber < page - RANGE) {
                        return dotAfterRender(index);
                    } else if (
                        pageNumber > page + RANGE &&
                        pageNumber < pageSize - RANGE + 1
                    ) {
                        return dotBeforeRender(index);
                    }
                } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {

                    return dotBeforeRender(index);

                }
                return (
                    <Link to=
                        {{
                            pathname: "/",
                            search: createSearchParams(
                                {
                                    ...queryConfig,
                                    page: pageNumber.toString()
                                }
                            ).toString()
                        }}
                        key={index}
                        className={classNames("bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-pointer border", {
                            'border-cyan-500': pageNumber === page,
                            'border-transparent': pageNumber !== page
                        })}

                    >
                        {pageNumber}
                    </Link>
                );
            });
    };
    return (
        <div className="flex flex-wrap mt-6 justify-center">
            {
                page == 1 ? (
                    <span className="bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-not-allowed border">
                        Prev
                    </span>
                ) : (<Link to={{
                    pathname: "/",
                    search: createSearchParams(
                        {
                            ...queryConfig,
                            page: (page - 1).toString()
                        }
                    ).toString()
                }} className="bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-pointer border">
                    Prev
                </Link>)
            }
            {renderPagination()}
            {
                page == pageSize ? (
                    <span className="bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-not-allowed border">
                        Next
                    </span>
                ) : (
                    <Link to={{
                        pathname: "/",
                        search: createSearchParams(
                            {
                                ...queryConfig,
                                page: (page + 1).toString()
                            }
                        ).toString()
                    }} className="bg-white rounded px-3 py-4 shadow-sm mx-2 cursor-pointer border">
                        Next
                    </Link>
                )
            }
        </div>
    );
};

export default Pagination;
