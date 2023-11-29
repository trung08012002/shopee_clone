import React from "react"
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { QueryConfig } from "../ProductList/ProductList";

const RatingStars = ({ queryConfig }: { queryConfig: QueryConfig }) => {
    const navigate = useNavigate();
    const handleFilterStar = (star: number) => {
        navigate({
            pathname: "",
            search: createSearchParams(
                {
                    ...queryConfig,
                    rating_filter: String(star)
                }
            ).toString()
        })
    }

    return (
        <ul className="my-3">
            {
                Array(5).fill(0).map((_, index) => (
                    <li className="py-1 pl-2" key={index}>
                        <div onClick={() => handleFilterStar(5 - index)} className="flex items-center text-sm" tabIndex={0} role="button" aria-hidden="true">
                            {Array(5).fill(0).map((_, indexStart) => (
                                indexStart < 5 - index ? (<svg key={indexStart} className="w-4 h-4 mr-1 fill-[#ffca11] stroke-[#ffca11]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>) :

                                    <svg key={indexStart} className="w-4 h-4 mr-1 fill-gray stroke-[#ffca11]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                            )

                            )}
                            {index != 0 ? <span>Trở lên</span> : null}
                        </div>

                    </li>
                )
                )
            }

        </ul>
    )
};

export default RatingStars;
