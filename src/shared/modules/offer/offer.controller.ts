import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, DocumentExistsMiddleware, HttpMethod, PrivateRouteMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { City, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './types/param-offer-id.type.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentService } from '../comment/index.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { CreateOfferDto } from './index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getOffers,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getSingleOffer,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateOffer,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremiumOffers,
    });
  }

  public async getOffers(_req: Request, res: Response): Promise<void> {
    const allOffers = await this.offerService.find();
    this.ok(res, allOffers);
  }

  public createOffer(_req: Request, _res: Response): void {
  }

  public async getSingleOffer(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, offer);
  }

  public updateOffer(_req: Request, _res: Response): void {
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    await this.offerService.deleteById(offerId);
    this.noContent(res, {});
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const city = req.params.city;
    const cityType = this.parseCityType(city);

    if (!cityType) {
      throw new Error('Invalid cityType');
    }

    const offers = await this.offerService.findPremiumOffersByCity(cityType);
    this.ok(res, offers);
  }

  private parseCityType(city: string): City | null {
    if (city in City) {
      return city as City;
    }
    return null;
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, offer);
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
