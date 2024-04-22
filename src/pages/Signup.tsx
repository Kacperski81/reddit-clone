import Form from "../components/shared/form/Form";
import Input from "../components/shared/form/Input";
import InputWrapper from "../components/shared/form/InputWrapper";
import Label from "../components/shared/form/Label";
import SubmitButton from "../components/shared/form/SubmitButton";
import { checkIfUsernameTaken, signupUser } from "../lib/firebase";
import { useForm } from "react-hook-form";
// import styled from "styled-components";
// import { fade, smallFont } from "../components/shared/helpers";
import Error from "../components/shared/form/Error";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FirebaseError } from "@firebase/app";
import { useNavigate } from "react-router-dom";

type FormValues = {
    username: string,
    email: string,
    password: string,
    confirm: string,
}

export default function Signup() {
    const { register, formState: { errors }, getValues, handleSubmit } = useForm<FormValues>({ mode: "onBlur" });
    // const mutation = useMutation(signupUser, {
    //     onSuccess: () => {
    //       // on success, go to the home route
    //       toast.success("Sign up successfully");
    //     },
    //     onError: (error: unknown) => {
    //       if(error instanceof Error) {
    //         toast.error((error as Error).message);
    //       }
    //     },
    //   })
    const navigate = useNavigate();
    const mutation = useMutation({mutationFn: signupUser, 
        onSuccess: () => {
            toast.success("Sign up successfully");
            navigate("/");
        },
        onError: (error: unknown) => {
            if(error instanceof FirebaseError) {
                toast.error((error as Error).message)
            }
        }
        });
    function onSubmit(data: FormValues) {
        // event.preventDefault();
        // const form = event.target as HTMLFormElement;
        // const username = form.elements.namedItem("username") as HTMLInputElement;
        // const email = form.elements.namedItem("email") as HTMLInputElement;
        // const password = form.elements.namedItem("password") as HTMLInputElement;
        // // const confirm = form.elements.namedItem("confirm") as HTMLInputElement;
        // console.log(username.value);
        const { username, email, password } = data;
        const variables = { username, email, password };
        // await signupUser({ username, email, password});
        mutation.mutate(variables);
    }
    // console.log(errors);
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
                <Label>username</Label>
                <Input
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 5,
                            message: "Username must be at least 5 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Username must be less than 20 characters",
                        },
                        validate: checkIfUsernameTaken,
                    })}
                    type="text"
                />
                <Error>{errors.username ? errors.username.message : ''}</Error>
            </InputWrapper>
            <InputWrapper>
                <Label>email</Label>
                <Input
                    {...register("email", {
                        required: "Email is required",
                        maxLength: {
                            value: 30,
                            message: "Email must be less than 30 characters",
                        }
                    })}
                    type="email"
                />
                <Error>{errors.email ? errors.email.message : ''}</Error>
            </InputWrapper>
            <InputWrapper>
                <Label>password</Label>
                <Input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        maxLength: {
                            value: 30,
                            message: "Password must be less than 30 characters",
                        }
                    })}
                    type="password"
                    autoComplete="off"
                />
                <Error>{errors.password ? errors.password.message : ''}</Error>
            </InputWrapper>
            <InputWrapper>
                <Label>confirm password</Label>
                <Input
                    {...register("confirm", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                        maxLength: {
                            value: 30,
                            message: "Password must be less than 30 characters",
                        },
                        validate: (value) => {
                            const { password } = getValues();
                            return password === value || "Passwords do not match";
                        }
                    })}
                    type="password"
                    autoComplete="off"
                />
                <Error>{errors.confirm ? errors.confirm.message : ''}</Error>
            </InputWrapper>
            <SubmitButton>SIGN UP</SubmitButton>
        </Form>
    )
}