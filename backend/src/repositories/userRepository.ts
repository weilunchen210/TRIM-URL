import { prisma } from '../db.js';
import type { User } from '../generated/prisma/client.js';

export interface CreateUserData {
    email: string;
    username: string;
    passwordHash: string;
    profilePictureUrl?: string | null;
}

export interface UpdateUserData {
    email?: string;
    username?: string;
    passwordHash?: string;
    profilePictureUrl?: string | null;
}

export class UserRepository {

    findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async existsByEmail(email: string, excludeUserId?: string): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: {
                email,
                ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
            },
            select: { id: true },
        });
        return user != null;
    }

    create(data: CreateUserData): Promise<User> {
        return prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: data.passwordHash,
                profilePictureUrl: data.profilePictureUrl,
            },
        });
    }

    update(id: string, data: UpdateUserData): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: {
                email: data.email,
                username: data.username,
                password: data.passwordHash,
                profilePictureUrl: data.profilePictureUrl,
            },
        });
    }
}
