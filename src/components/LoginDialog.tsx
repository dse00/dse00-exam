import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks"
import services from "@/services"
import { useAppStore } from "@/store"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Cookies from 'js-cookie';
import { useState } from "react"




export function LoginDialog() {
    const { loginDialogOpen, setLoginDialogOpen } = useAppStore()
    const pathname = usePathname()

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const { loginUser } = useUser()


    // 2. Define a submit handler.
    async function onSubmit() {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.


        loginUser(credentials)
    }


    const onCredentialsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const index = e.target.dataset.index as any
        setCredentials({ ...credentials, [index]: value })
    }




    return (
        <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle></DialogTitle>


                <div className="grid gap-4">
                    <Input
                        placeholder="電郵"
                        value={credentials.email}
                        onChange={onCredentialsInput}
                        data-index='email'
                    />
                    <Input
                        placeholder="密碼"
                        type="password"
                        value={credentials.password}
                        data-index='password'
                        onChange={onCredentialsInput}
                    />
                </div>


                <div className="flex justify-between items-center">
                    <Link href={`https://www.dse00.com/p/login.html?origin=${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + pathname}`} target="_blank" className="text-sm"> 返回 DSE00 登入</Link>
                    <Button onClick={onSubmit}>快速登入</Button>
                </div>

            </DialogContent>

        </Dialog>
    )
}

