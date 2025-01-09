'use client'
import { useAppStore } from "@/store"
import { Button } from "./ui/button"
import Cookies from 'js-cookie'
import { useEffect } from "react"

export enum LanguageEnum {
    TC = 'tc',
    EN = 'en'
}

const LanguageButton = () => {

    const { setLanguage, language } = useAppStore()

    const toChangeLanguage = () => {
        const nextLanguage = language === LanguageEnum.TC ? LanguageEnum.EN : LanguageEnum.TC
        setLanguage(nextLanguage)
        Cookies.set('language', nextLanguage, { expires: 365 })
    }


    useEffect(() => {
        const lang = Cookies.get('language')
        if (lang) {
            setLanguage(lang as LanguageEnum)
        } else {
            setLanguage(LanguageEnum.EN)
        }
    }, [])

    if (!language) return null;
    return (
        <div className="container flex justify-end w-full">
            <Button
                onClick={toChangeLanguage}
                variant={null}
                className={
                    LanguageEnum.TC === language ? 'bg-blue-400 text-white' : 'bg-red-400 text-white'
                }
            >
                {language === LanguageEnum.TC ? '中文' : 'English'}
            </Button >
        </div>
    )
}

export default LanguageButton