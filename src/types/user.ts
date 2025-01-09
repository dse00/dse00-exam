type UserStatus = "A" | "B" | "C"; // Example, customize based on actual values

type StudentFile = {
    _id: string;
    user: string;
    avator: string;
    electives: (string | null)[]; // Array of strings or null
    createdAt: string;
    updatedAt: string;
    form: number;
    gender: string; // Use an enum or literal type if possible, e.g., "M" | "F"
    introduction: string;
    name: string;
    school: string;
    tel: string;
}

type UserSetting = {
    _id: string;
    user: string;
    auto_reply_message: string | null;
    match_notification: boolean;
    updatedAt: string;
    hide_contact: boolean;
}

export type UserType = {
    _id: string;
    email: string;
    roles: string[]; // Array of roles, e.g., ["tutor"]
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
    premieres: string; // Use a specific literal type if applicable
    lastOnline: string;
    studentfiles: StudentFile[]; // Array of StudentFile
    setting: UserSetting;
    user: string;
    avator: string;
    electives: (string | null)[]; // Array of strings or null
    form: number;
    gender: string; // Use an enum or literal type, e.g., "M" | "F"
    introduction: string;
    name: string;
    school: string;
    tel: string;
    estimatedAge: number;
}


export type CommentUserType = {
    avatar: string;
    name: string;
    user: string;
}