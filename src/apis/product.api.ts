import { Product, ProductList, ProductListConfig } from "../types/product.type";
import { ResponseApi } from "../types/utils.type";
import http from "../utils/http";
const URL = "products";
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<ResponseApi<ProductList>>(URL, {
      params,
    });
  },
  getProductDetail(id: string) {
    return http.get<ResponseApi<Product>>(`${URL}/${id}`);
  },
};
export default productApi;
