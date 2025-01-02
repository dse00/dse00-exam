import { UserType } from "@/types/user"

const tutorAPI = process.env.NEXT_PUBLIC_TUTOR_API_URL

export default {
    getUserProfile: async (token: string): Promise<UserType> => {
        const data = await fetch(tutorAPI + '/auth/' + token + '/getUserByToken')
        return data.json()
    }
}