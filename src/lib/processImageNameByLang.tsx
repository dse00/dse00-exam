import { LanguageEnum } from "@/components/LanguageButton";

export const processImageNameByLang = (imageName: string, lang: LanguageEnum | null) => {

    if (lang === LanguageEnum.TC) {
        return imageName.replace('.png', '_tc.png');
    }
    return imageName.replace('.png', '_en.png');;
}