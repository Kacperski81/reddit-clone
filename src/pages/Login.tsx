import Form from "../components/shared/form/Form";
import Input from "../components/shared/form/Input";
import InputWrapper from "../components/shared/form/InputWrapper";
import Label from "../components/shared/form/Label";
import SubmitButton from "../components/shared/form/SubmitButton";
import { loginUser } from "../lib/firebase";
import { useForm } from "react-hook-form";
// import styled from "styled-components";
// import { fade, smallFont } from "../components/shared/helpers";
import Error from "../components/shared/form/Error";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FirebaseError } from "@firebase/app";
import { useNavigate } from "react-router-dom";
import useStore from "../store";

type FormValues = {
    username: string,
    email: string,
    password: string,
    confirm: string,
}

export default function Login() {
    const setUser = useStore(state => state.setUser);
    const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({ mode: "onBlur" });
    const navigate = useNavigate();
    const mutation = useMutation({mutationFn: loginUser, 
        onSuccess: () => {
            toast.success("Login in successfully");
            if(mutation.variables?.email) {
                setUser({email: mutation.variables.email.split('@')[0]});
            }
            // setUser(mutation.data?.email);
            navigate("/"); 
        },
        onError: (error: unknown) => {
            if(error instanceof FirebaseError) {
                let message = error.code;
                switch (message) {
                    case "auth/invalid-credential":
                        message = "Invalid credentials";
                        break;
                    default:
                        message = "An error occurred"
                        break;
                }
                toast.error(message)
            }
        }
        });
    function onSubmit(data: FormValues) {
        const { email, password } = data;
        const variables = { email, password };
        // await signupUser({ username, email, password});
        mutation.mutate(variables);
    }
    // console.log(errors);
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            
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
            
            <SubmitButton>Login</SubmitButton>
        </Form>
    )
}