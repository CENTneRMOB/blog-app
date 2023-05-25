import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecordDto } from './dto';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async getRecords(query: {
    page: string;
    limit?: string;
  }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const start = page * limit - limit;

    const postsSelect =
      await this.prisma.record.findMany({
        skip: start,
        take: limit,
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          user: {
            select: {
              nickname: true,
            },
          },
        },
      });

    const postsCount =
      await this.prisma.record.findMany();

    return {
      posts: postsSelect,
      pages: Math.ceil(postsCount.length / limit),
      currentPage: page,
      pageCount: Math.ceil(
        postsCount.length / limit,
      ),
    };
  }

  async getRecord(id: string) {
    const post =
      await this.prisma.record.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: {
            select: {
              nickname: true,
            },
          },
        },
      });

    return {
      post,
    };
  }

  async updateRecord(id: string, dto: RecordDto) {
    try {
      await this.prisma.record.update({
        where: {
          id: Number(id),
        },
        data: {
          title: dto.title,
          text: dto.text,
        },
      });

      return this.getRecords({
        page: '1',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPost(dto: RecordDto) {
    return;
  }

  async deletePost(id: string) {
    try {
      await this.prisma.record.delete({
        where: {
          id: Number(id),
        },
      });

      return this.getRecords({
        page: '1',
      }); 
    } catch (error) {
      throw new Error(error);
    }
  }
}
