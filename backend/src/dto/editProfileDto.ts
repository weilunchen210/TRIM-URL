export interface editProfileDto {
    email: string;
    currentPassword: string;
    newPassword?: string;
    username: string;
    profilePictureURL?: string;
}
