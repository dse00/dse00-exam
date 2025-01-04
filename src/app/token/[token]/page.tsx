'use client'
import { useParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useEffect } from "react";

const TokenPage = () => {
    const params = useParams();

    const router = useRouter();

    useEffect(() => {
        const token = params.token;

        if (token) {
            Cookies.set('token', token as string);
            router.push('/');
        }
    }, [params]);
    return (

        <></>

    )
}

export default TokenPage