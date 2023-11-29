import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import productApi from "../../apis/product.api";
import ProductRating from "../ProductRating/ProductRating";
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from "../../utils/utils";
import InputNumber from "../InputNumber/InputNumber";
import DOMPurify from 'dompurify';
import { Product as ProductType, ProductListConfig } from "../../types/product.type";
import Product from "../ProductList/Product";
import QUantityController from "../QuantityController";


const ProductDetail = () => {
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);

  const { data: productDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState('');
  const product = productDetailData?.data.data;

  const currentImages = useMemo(() => product?.images.slice(...currentIndexImages) || [], [product, currentIndexImages])
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const [buyCount, setBuyCount] = useState(1);

  const queryConfig: ProductListConfig = { limit: 20, page: 1, category: product?.category._id }
  const { data: productData } = useQuery(
    {
      queryKey: ['products', queryConfig],
      queryFn: () => { return productApi.getProducts(queryConfig) },
      enabled: Boolean(product),
      staleTime: 3 * 60 * 1000
    },
  )



  const handleActiveImage = (img: string) => {
    if (img != activeImage) {
      setActiveImage(img);
    }

  }

  const next = () => {

    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const imageRef = useRef<HTMLImageElement>(null);
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;
    // cách 1: Lấy offsetX ,offsetY đơn giản khi chúng ta xử lý được buble event
    // const { offsetX, offsetY } = event.nativeEvent;

    // các 2: lất offsetX ,offsetY khi chúng ta không thể xử lý được buble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalHeight / rect.width)


    image.style.width = naturalWidth + 'px';
    image.style.height = naturalHeight + 'px';
    image.style.maxWidth = 'unset';

    image.style.top = top + 'px';
    image.style.left = left + 'px';
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style")
  }
  if (!product) return null;
  return (
    <div className="bg-gray-200 py-6">
      <div className="bg-white p-4 shadow">
        <div className="container">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-5">
              <div className="relative w-full pt-[100%] overflow-hidden cursor-zoom-in shadow" onMouseMove={handleZoom} onMouseLeave={handleRemoveZoom}>
                <img ref={imageRef} src={activeImage} alt={product.name} className="pointer-events-none cursor-zoom-in absolute top-0 left-0 bg-white w-full h-full object-cover" />
              </div>
              <div className="relative mt-4 grid grid-cols-5 gap-1">
                <button onClick={() => prev()} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>

                </button>
                {currentImages.map((img, index) => {
                  const isActive = img === activeImage
                  return <div className="relative pt-[100%] w-full" key={index} onMouseEnter={() => handleActiveImage(img)}>
                    <img src={img} className="absolute top-0 left-0 bg-white w-full h-full object-cover " />
                    {isActive && <div className="absolute inset-0 border-2 border-orange" />}
                  </div>
                })}
                <button onClick={() => next()} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-5 bg-black/20 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>


                </button>
              </div>
            </div>
            <div className="col-span-7">
              <h1 className="text-xl font-medium uppercase">{product.name}</h1>
              <div className="mt-8 flex items-center">
                <span className="mr-1 border-b-orange border-b text-orange">{product.rating}</span>
                <ProductRating rating={product.rating} activeClassName="fill-orange text-orange h-4 w-4" nonActiveClassName="fill-orange text-gray-400 h-4 w-4" />
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div>
                  <span className="border-b-gray-500 border-b ">{formatNumberToSocialStyle(product.sold)}</span>
                  <span className="ml-1 text-gray-500">Đã bán</span>
                </div>
              </div>
              <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
                <div className="text-gray-500 line-through">đ{formatCurrency(product.price_before_discount)}</div>
                <div className="ml-3 text-3xl text-orange">đ{formatCurrency(product.price)}</div>
                <div className="ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white">{rateSale(product.price_before_discount, product.price)} giảm</div>

              </div>
              <div className="mt-8 flex items-center">
                <div className="capitalize text-gray-500">
                  Số lượng
                </div>
                <QUantityController max={product.quantity} onDecrease={handleBuyCount} onIncrease={handleBuyCount} onType={handleBuyCount} value={buyCount} />
                <div className="ml-6 text-sm text-gray-500">
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>
              <div className="mt-8 flex items-center">
                <button className="flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize shadow-sm hover:bg-orange/5 text-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    className="w-5 h-5 mr-[10px] stroke-orange text-orange">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087
.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className="ml-4 flex h-12 min-w-[5rem] text-white bg-orange items-center justify-center px-3 rounded-sm">Mua ngay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-4 shadow">
        <div className="cotainer">
          <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
            Mô tả sản phẩm
          </div>
          <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="container">
          <div className="uppercase text-gray-400">Có thể bạn cũng thích</div>
          {
            productData && (<div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {productData.data.data.products.map((product) => <Product product={product} />)}
            </div>)
          }
        </div>
      </div>
    </div>
  )
};

export default ProductDetail;
