import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 8;

const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const previewPhoto = getRandomItem<string>(this.mockData.previewPhotos);
    const photos = getRandomItems<string>(this.mockData.photos).join(',');
    const isPremium = generateRandomValue(0, 1) === 0;
    const isFavorite = generateRandomValue(0, 1) === 0;
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const roomCount = generateRandomValue(MIN_ROOM_COUNT, MAX_ROOM_COUNT);
    const guestCount = generateRandomValue(MIN_GUEST_COUNT, MAX_GUEST_COUNT);
    const cost = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems<string>(this.mockData.amenities).join(',');
    const authorName = getRandomItem<string>(this.mockData.authorNames);
    const authorEmail = getRandomItem<string>(this.mockData.authorEmails);
    const authorAvatar = getRandomItem<string>(this.mockData.authorAvatars);
    const authorType = getRandomItem<string>(this.mockData.authorTypes);
    const commentCount = generateRandomValue(0, 10);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);
    const [latitude, longitude] = coordinates.split('; ');

    const publicationDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, publicationDate,
      city, previewPhoto, photos,
      isPremium, isFavorite, rating,
      housingType, roomCount, guestCount,
      cost, amenities, authorName,
      authorEmail, authorAvatar, authorType,
      commentCount, latitude, longitude
    ].join('\t');
  }
}
