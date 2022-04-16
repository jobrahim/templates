import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  HttpStatus,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TemplatesService } from './templates.service';
import { Template } from './entities/template.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('templates')
export class TemplatesController {
  constructor(
    private templatesServices: TemplatesService,
    @InjectModel(Template.name)
    private templateEntityModel: Model<Template>,
  ) {}

  //--------------------   lista    ------------------------
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getAll(@Res() response) {
    this.templatesServices
      .getAll()
      .then((templatesList) => {
        response.status(HttpStatus.OK).json(templatesList);
      })
      .catch((e) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la optencion de leer los mensajes' });
      });
  }

  //--------------------   Borrado    ------------------------
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Res() response, @Param('id') idTemplate) {
    const id = this.templatesServices.findOne(idTemplate);
    if (!id) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'id no encontrado' });
    } else {
      this.templatesServices
        .deleteTemplate(idTemplate)
        .then((date) => {
          response
            .status(HttpStatus.OK)
            .json({ success: true, message: 'Borrado' });
        })
        .catch(() => {
          return response
            .status(HttpStatus.FORBIDDEN)
            .json({ mensaje: 'Error en Delete' });
        });
    }
  }

  //--------------------   Actualizar    ------------------------
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  update(
    @Param('id') idTemplate,
    @Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto,
    @Res() response,
  ) {
    this.templatesServices
      .updateTemplate(idTemplate, createTemplateDto)
      .then((mensaje) => {
        if (mensaje == null) {
          return response
            .status(HttpStatus.NO_CONTENT)
            .json({ success: false, message: 'No encontrado' });
        } else {
          return response
            .status(HttpStatus.OK)
            .json({ success: true, message: 'Actualizado' });
        }
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error en la actualizacion del Template' });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createDefaultTemplate(
    @Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto,
    @Res() response,
  ) {
    this.templatesServices
      .createDefaultTemplates(createTemplateDto)
      .then((mensaje) => {
        response.status(HttpStatus.OK).json({
          success: true,
          message: 'Created and save in MongoDB',
          result: mensaje,
        });
      })
      .catch((e) => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensaje: 'Error trying to create template' });
      });
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/')
  // async getOp(@Query() param, @Res() response) {
  //   await this.templatesServices
  //     .getOperation(param.operation)
  //     .then((templatesList) => {
  //       response.status(HttpStatus.OK).json(templatesList);
  //     })
  //     .catch(() => {
  //       response
  //         .status(HttpStatus.FORBIDDEN)
  //         .json({ mensaje: 'Error al obtener el mensaje' });
  //     });
  // }
}
