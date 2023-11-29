import * as yup from "yup";

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as {
    price_max: string;
    price_min: string;
  };
  if (price_max != "" && price_min != "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min != "" || price_max != "";
}

export const schema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng")
    .min(5, "Độ dài từ 5-160 ký tự")
    .max(160, "Độ dài từ 5-160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(5, "Độ dài từ 5-160 ký tự")
    .max(160, "Độ dài từ 5-160 ký tự"),
  confirm_passowrd: yup
    .string()
    .required("Confirm Passowrd là bắt buộc")
    .min(5, "Độ dài từ 5-160 ký tự")
    .max(160, "Độ dài từ 5-160 ký tự")
    .oneOf([yup.ref("password")], "Nhập lại password không khớp"),
  price_min: yup
    .string()
    .test({
      name: "price-not-allowed",
      message: "Giá không phù hợp",
      test: testPriceMinMax,
    })
    .default(""),
  price_max: yup
    .string()
    .test({
      name: "price-not-allowed",
      message: "Giá không phù hợp",
      test: testPriceMinMax,
    })
    .default(""),
  name: yup.string().trim().required("Cần nhập từ để search"),
});

export const loginSchema = schema.pick(["email", "password"]);
export type LoginSchema = yup.InferType<typeof loginSchema>;
export type Schema = yup.InferType<typeof schema>;
