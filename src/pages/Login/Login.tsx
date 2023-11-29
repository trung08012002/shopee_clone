import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";

import Input from "../../components/Input";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
import { ErrorResponse, ResponseApi } from "../../types/utils.type";
import { AppContext } from "../../contexts/app.context";
import Button from "../../components/Button/Button";


const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchema>(
    {
      resolver: yupResolver(loginSchema)
    }
  )
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const loginMutation = useMutation({
    mutationFn: (body: LoginSchema) => authApi.login(body)
  });
  const onSubmit = handleSubmit((data) => {

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user )
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach(key => setError(key as keyof LoginSchema, {
              message: formError[key as keyof LoginSchema],
              type: "Server"
            }))
          }
        }
      }
    })
  },)
  return (
    <div className="bg-orange">
      <div className="max-w-7xl mx-auto-px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg-py-32 lg:pr-10">
          <div className="lg:col-start-4 col-span-2">
            <form className="p-10 rounded bg-white shadow-sm " onSubmit={onSubmit} noValidate>
              <div className="text-2xl">Đăng nhập</div>
              <Input className="mt-8" name={"email"} register={register} type={"email"} placeholder="Email" errorMessage={errors.email?.message} />
              <Input className="mt-2" name={"password"} register={register} type={"password"} placeholder="password" errorMessage={errors.password?.message} />

              <div className="mt-2">
                <Button type="submit" isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  className="w-full text-center py-4 px-2 uppercase
                  bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center">
                  Đăng nhập</Button>
              </div>
              <div className='flex items-center justify-center mt-10'>
                <span className="text-gray-400">Bạn chưa có tài khoản ? </span>
                <Link to='/register' className="text-red-400 ml-1">Đăng ký</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
