import { defaultClasses, getModelForClass, modelOptions, prop, Ref, } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { City, Amenity, PlaceCoordinates, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
export class OfferEntity extends defaultClasses.TimeStamps implements defaultClasses.Base {
  _id: Types.ObjectId;
  id: string;

  @prop({
    required: true,
    validate: {
      validator: (v) => v.length >= 10 && v.length <= 100
    },
  })
  public title: string;

  @prop({
    required: true,
    validate: {
      validator: (v) => v.length >= 20 && v.length <= 1024
    },
  })
  public description: string;

  @prop({ required: true })
  public publicationDate: Date;

  @prop({ required: true, type: () => String, enum: City })
  public city: City;

  @prop({
    required: true,
    validate: {
      validator: (v) => v.length === 6
    },
  })
  public photos: string[];

  @prop({ required: true })
  public previewPhotoPath: string;

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({
    required: true,
    validate: {
      validator: (v) => v >= 1 && v <= 5
    },
  })
  public rating: number;

  @prop({ required: true, type: () => String, enum: HousingType })
  public housingType: HousingType;

  @prop({ required: true, type: () => Array<string> })
  public amenities: Amenity[];

  @prop({
    required: true,
    validate: {
      validator: (v) => v >= 1 && v <= 8
    },
  })
  public roomCount: number;

  @prop({
    required: true,
    validate: {
      validator: (v) => v >= 1 && v <= 10
    },
  })
  public guestCount: number;

  @prop({
    required: true,
    validate: {
      validator: (v) => v >= 100 && v <= 100_000
    },
  })
  public cost: number;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public authorId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount: number;

  @prop()
  public coordinates: PlaceCoordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
