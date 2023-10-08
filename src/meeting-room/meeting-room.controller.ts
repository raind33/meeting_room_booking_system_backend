import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';
import { Repository } from 'typeorm';
import { generateParseIntPipe } from 'src/utils';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}
  @InjectRepository(MeetingRoom)
  private repository: Repository<MeetingRoom>;

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('name') name: string,
    @Query('capacity') capacity: number,
    @Query('equipment') equipment: string,
  ) {
    return await this.meetingRoomService.find(
      pageNo,
      pageSize,
      name,
      capacity,
      equipment,
    );
  }

  @Post('create')
  async create(@Body() meetingRoomDto: CreateMeetingRoomDto) {
    console.log(2323);
    return await this.meetingRoomService.create(meetingRoomDto);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.meetingRoomService.findById(id);
  }

  @Put('update')
  async update(@Body() meetingRoomDto: UpdateMeetingRoomDto) {
    return await this.meetingRoomService.update(meetingRoomDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.meetingRoomService.delete(id);
  }
}
