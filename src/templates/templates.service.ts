import { Injectable } from '@nestjs/common';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { json } from 'express';
import { Model } from 'mongoose';
import { FindTemplateDto } from './dto/find-template';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name)
    private templateEntityModel: Model<Template>,
  ) {}

  //--------------------   Listar    ------------------------
  async getAll() {
    return await this.templateEntityModel.find();
  }

  //--------------------   Borrado    ------------------------
  async deleteTemplate(idTemplate: any) {
    return await this.templateEntityModel.findByIdAndDelete(idTemplate);
  }

  //--------------------   Alta en MongoDB    ------------------------//

  async createDefaultTemplates(data: CreateTemplateDto) {
    const newDefaultTemplate = new this.templateEntityModel(data);
    return newDefaultTemplate.save();
  }

  //--------------------   Actualizar    ------------------------
  async updateTemplate(
    idTemplate: number,
    createTemplateDto: CreateTemplateDto,
  ) {
    return this.templateEntityModel
      .findByIdAndUpdate(idTemplate, { $set: createTemplateDto }, { new: true })
      .exec();
  }

  async getOperation(operation: string): Promise<Template[]> {
    return this.templateEntityModel.find({
      operation: operation,
    });

    //   .populate('name')
    // .populate('date')
    // .populate('operation')
    // .exec();
  }

  async findOne(id: string) {
    return this.templateEntityModel.findById(id);
  }

  async getTemplateByName(name: string): Promise<FindTemplateDto> {
    return await this.templateEntityModel.findOne({ name: name });
  }
}
