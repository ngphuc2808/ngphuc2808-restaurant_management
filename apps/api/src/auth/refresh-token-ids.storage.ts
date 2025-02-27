import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(private prismaService: PrismaService) {}

  async insert(
    userId: number,
    tokenId: string,
    expiresAt: Date,
  ): Promise<void> {
    await this.prismaService.refreshToken.create({
      data: {
        token: tokenId,
        accountId: userId,
        expiresAt,
      },
    });
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedToken = await this.prismaService.refreshToken.findUnique({
      where: { token: tokenId },
    });

    if (!storedToken || storedToken.accountId !== userId) {
      return false;
    }

    if (storedToken.expiresAt < new Date()) {
      await this.invalidate(userId, tokenId);
      return false;
    }

    return true;
  }

  async invalidate(userId: number, tokenId: string): Promise<void> {
    await this.prismaService.refreshToken
      .delete({ where: { token: tokenId } })
      .catch(() => {});
  }

  async invalidateAll(userId: number): Promise<void> {
    await this.prismaService.refreshToken.deleteMany({
      where: { accountId: userId },
    });
  }
}
