export type LoginUserDetails = {
    username: string;
    password: string;
};

export type SignupUserDetails = LoginUserDetails & {
    email: string;
}

export type AuthContextType = {
    authUserDetails: LoginUserDetails | SignupUserDetails;
    setAuthUserDetails: React.Dispatch<React.SetStateAction<LoginUserDetails | SignupUserDetails>>;
}