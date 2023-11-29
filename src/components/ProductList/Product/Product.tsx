import React from "react"
import { Link } from "react-router-dom";
import { Product as ProductType } from "../../../types/product.type";
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from "../../../utils/utils";
import ProductRating from "../../ProductRating/ProductRating";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Link to={`/${generateNameId({ name: product.name, id: product._id })}`}>
      <div className="bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform">
        <div className="pt-[100%] w-full relative">
          <img src={product.image} alt="" className="absolute top-0 left-0 bg-white w-full h-full object-cover" />
        </div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[1.75rem] line-clamp-2 text-sm">
            {product.name}
          </div>
          <div className="flex items-center my-3">
            <div className="line-through max-w-[50%] text-gray-500 truncate">
              <span className="text-xs">đ</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className=" text-orange truncate ml-1">
              <span className="text-xs">đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <ProductRating rating={product.rating} />
          <div className="ml-2 text-sm">
            <span>{formatNumberToSocialStyle(product.sold)}</span>
            <span className="ml-1">Đã bán</span>
          </div>
        </div>
      </div>
    </Link>
  )
};

export default Product;
