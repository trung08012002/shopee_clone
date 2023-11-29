import { yupResolver } from "@hookform/resolvers/yup";
import React from "react"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Schema, schema } from "../../utils/rules";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";
import { omit } from 'lodash';

import { isAxiosUnprocessableEntityError } from "../../utils/utils";
import { ErrorResponse } from "../../types/utils.type";
import Button from "../../components/Button";
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_passowrd'>;
const formData = schema.pick(['email', 'password', 'confirm_passowrd'])
const Register = () => {
    const {
        register,
        handleSubmit,
        setError,

        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(formData)
    })
    const registerAccountMutation = useMutation({
        mutationFn: (body: Pick<Schema, 'email' | 'password'>) => authApi.registerAccount(body)
    });

    const onSubmit = handleSubmit((data) => {
        const body = omit(data, 'confirm_password');
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<Schema, 'confirm_password'>>>(error)) {
                    const formError = error.response?.data.data
                    if (formError) {
                        Object.keys(formError).forEach(key => setError(key as keyof FormData, {
                            message: formError[key as keyof Omit<Schema, 'confirm_password'>],
                            type: "Server"
                        }))
                    }
                }

            }
        })
    },

    )
    return (
        <div className="bg-orange">
            <div className="max-w-7xl mx-auto-px-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg-py-32 lg:pr-10">
                    <div className="lg:col-start-4 col-span-2">
                        <form className="p-10 rounded bg-white shadow-sm " onSubmit={onSubmit} noValidate>
                            <div className="text-2xl">Đăng ký</div>
                            <Input className="mt-8" name={"email"} register={register} type={"email"} placeholder="Email" errorMessage={errors.email?.message} />
                            <Input className="mt-2" name={"password"} register={register} type={"password"} placeholder="password" errorMessage={errors.password?.message} />
                            <Input className="mt-2" name={"confirm_passowrd"} register={register} type={"password"} placeholder="Confirm Password" errorMessage={errors.confirm_passowrd?.message} />



                            <div className="mt-2">
                                <Button className="flex justify-center items-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 " disabled={registerAccountMutation.isPending} isLoading={registerAccountMutation.isPending}>Đăng ký</Button>
                            </div>
                            <div className='flex items-center justify-center mt-10'>
                                <span className="text-gray-400">Bạn đã có tài khoản ? </span>
                                <Link to='/login' className="text-red-400 ml-1">Đăng nhập</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;
