import React from "react"
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Input from "../../Input";
import Button from "../../Button";
import { Category } from "../../../types/category.type";
import { QueryConfig } from "../ProductList";
import classNames from "classnames";
import InputNumber from "../../InputNumber/InputNumber";
import { Controller, useForm } from "react-hook-form";
import { Schema, schema } from "../../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { NoUndefinedField } from "../../../types/utils.type";
import RatingStars from "../../RatingStars";
import { omit } from "lodash";

interface Props {
    queryConfig: QueryConfig
    categories: Category[]
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])
const AsideFilter = ({ categories, queryConfig }: Props) => {
    function isActiveCategory(id: string) {
        return id === queryConfig.category
    }
    const { control, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
        defaultValues: { price_min: '', price_max: '' },
        resolver: yupResolver(priceSchema)
    })
    const navigate = useNavigate();
    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: "",
            search: createSearchParams({
                ...queryConfig,
                price_max: data.price_max,
                price_min: data.price_min,
            }).toString()
        })
    })
    const handleRemoveAll = () => {
        navigate({
            pathname: "",
            search: createSearchParams(
                omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])
            ).toString()
        })
    }
    return (
        <div className="py-4">
            <Link to="/" className={classNames("flex items-center font-bold", {
                'text-orange': !queryConfig.category
            })}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                <span className="uppercase  whitespace-nowrap"> Tất cả danh mục</span>
            </Link>
            <div className="bg-gray-300 h-[1px] my-4" />
            <ul>
                {
                    categories.map(category =>
                    (<li className="py-2 pl-2 " key={category._id}>
                        <Link to={
                            {
                                pathname: "/",
                                search: createSearchParams(
                                    {
                                        ...queryConfig,
                                        category: category._id
                                    }
                                ).toString()
                            }
                        } className={classNames("relative px-2 font-semibold", {
                            "text-orange ": isActiveCategory(category._id)
                        })}>
                            {
                                isActiveCategory(category._id) ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    className="w-2 h-2 fill-orange absolute top-1 left-[-10px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg> : null
                            }
                            <span className=" whitespace-nowrap">{category.name}</span>
                        </Link>

                    </li>
                    ))

                }
            </ul>
            <Link to="/" className="font-bold flex mt-2">
                <svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="w-6 h-6 fill-gray-300 stroke-current"><g><polyline points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10"></polyline></g></svg>
                <span className="uppercase">Bộ lọc tìm kiếm</span>
            </Link>
            <div className="bg-gray-300 h-[1px] my-4" />
            <div className="my-5">
                <div>Khoảng giá</div>
                <form className="mt-2" onSubmit={onSubmit}>
                    <div className="flex items-start justify-center">
                        <Controller
                            control={control}
                            name="price_min"
                            render={({ field }) => {
                                return <InputNumber type="text" className="grow"
                                    placeholder="đ Từ"
                                    {...field}
                                    onChange={() => {
                                        field.onChange();
                                        trigger('price_max')
                                    }}

                                    classNameError="hidden"
                                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rouded-sm focus:shadow-sm" />
                            }}
                        />

                        <div className="mx-2 mt-1 shrink-0">-</div>
                        <Controller
                            control={control}
                            name="price_max"

                            render={({ field }) => {
                                return <InputNumber type="text" className="grow"
                                    placeholder="đ Đến"
                                    {...field}
                                    onChange={() => {
                                        field.onChange();
                                        trigger("price_min")
                                    }}

                                    classNameError="hidden"
                                    classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rouded-sm focus:shadow-sm" />
                            }}
                        />
                    </div>
                    <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm text-center">{errors.price_min?.message}</div>
                    <Button className="w-full py-2 px-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center">Áp dụng</Button>
                </form>
            </div>
            <div className="bg-gray-300 h-[1px] my-4" />
            <div className="my-5">
                <div className="text-sm">Đánh giá</div>
                <RatingStars queryConfig={queryConfig} />
                <Button onClick={handleRemoveAll} className="w-full py-2 px-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center">Xóa tất cả</Button>
            </div>
        </div>
    )
};

export default AsideFilter;
