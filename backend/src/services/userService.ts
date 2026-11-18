import { UserDto } from "../dto/userDto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginDto } from "../dto/loginDto";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/jwt.config";
import { editProfileDto } from "../dto/editProfileDto";
import { isUniqueViolation } from "../db.js";
import { UserRepository } from "../repositories/userRepository.js";
import type { User } from "../generated/prisma/client.js";

const SALT_ROUNDS = 10;
const DUPLICATE_EMAIL = 'User with this email already exists';

const hashPassword = (password: string) => bcrypt.hash(password, SALT_ROUNDS);

export class userService {

    constructor(private readonly userRepository = new UserRepository()) {}

    async save(input: UserDto) {

        if (await this.userRepository.existsByEmail(input.email)) {
            throw new Error(DUPLICATE_EMAIL);
        }

        try {
            await this.userRepository.create({
                email: input.email,
                username: input.username,
                passwordHash: await hashPassword(input.password),
                profilePictureUrl: input.profilePictureURL,
            });
        } catch (error) {
            if (isUniqueViolation(error)) throw new Error(DUPLICATE_EMAIL);
            throw error;
        }
        return;
    }

    async login(input: LoginDto) {

        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return this.toLoginResponse(user);
    }

    async dummyLogin() {

        try {
            const dummyEmail = "dummy@test.com";

            let user = await this.userRepository.findByEmail(dummyEmail);

            if (!user) {
                user = await this.userRepository.create({
                    email: dummyEmail,
                    username: "DummyUser",
                    passwordHash: await hashPassword("password123"),
                    profilePictureUrl: "https://img.icons8.com/?size=100&id=7820&format=png&color=000000",
                });
            }

            return this.toLoginResponse(user);

        } catch (error) {
            throw new Error(`Dummy login failed: ${error.message}`);
        }
    }

    async editProfile(updateData: editProfileDto, userId: string) {
        try {

            const existingUser = await this.userRepository.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }

            if (updateData.email && updateData.email !== existingUser.email) {
                if (await this.userRepository.existsByEmail(updateData.email, userId)) {
                    throw new Error('Email is already taken by another user');
                }
            }

            const isCurrentPasswordValid = await bcrypt.compare(updateData.currentPassword, existingUser.password);
            if (!isCurrentPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const updatedUser = await this.userRepository.update(userId, {
                username: updateData.username,
                email: updateData.email,
                passwordHash: updateData.newPassword ? await hashPassword(updateData.newPassword) : undefined,
                profilePictureUrl: updateData.profilePictureURL,
            });

            return {
                _id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                profilePictureURL: updatedUser.profilePictureUrl,
            };

        } catch (error) {
            if (isUniqueViolation(error)) {
                throw new Error('Failed to update profile: Email is already taken by another user');
            }
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }

    private toLoginResponse(user: User) {
        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
        );

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            profilePictureURL: user.profilePictureUrl,
            token
        };
    }
}
