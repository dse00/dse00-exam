import { useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';


export const useToken = () => {
    const query = useSearchParams();
    const tokenInUrl = query.get('token');

    if (tokenInUrl) {
        Cookies.set('token', tokenInUrl);
    }

    const token = Cookies.get('token');

    return { token };
}