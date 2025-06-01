import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment.message.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: CreateCommentMessages.text.lengthField })
  public text!: string;

  @IsNumber()
  @Min(1, { message: CreateCommentMessages.rating.invalidFormat })
  @Max(5, { message: CreateCommentMessages.rating.invalidFormat })
  public rating!: number;

  public publicationDate!: Date;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;

  public userId!: string;
}
