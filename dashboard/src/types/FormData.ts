export interface SignInFormData {
    email: string;
    password: string;
    remember?: string;
}

export interface SignUpFormData {
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    confirm_password: string;
    agree: boolean;
}

export interface VerifyEmailFormData {
    id: string;
    hash: string;
}

export interface ForgotPasswordFormData {
    email: string;
}

export interface NewPasswordFormData {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export interface AccountSettingsFormData {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    password?: string;
    confirm_password?: string;
    meta: {
        mobile: string;
        bio: string;
    }
}
