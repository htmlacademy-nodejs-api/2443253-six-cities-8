import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ADULDS = 1;
const MAX_ADULTS = 10;
const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;
const MIN_RATING = 10;
const MAX_RATING = 50;
const MIN_REVIEWS_COUNT = 0;
const MAX_REVIEWS_COUNT = 100;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getRandomItem<string>(this.mockData.postDates);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(this.mockData.booleanValues);
    const isFavorite = getRandomItem<string>(this.mockData.booleanValues);
    const rating = (generateRandomValue(MIN_RATING, MAX_RATING) / 10).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULDS, MAX_ADULTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const firstname = getRandomItem<string>(this.mockData.firstnames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatarPaths);
    const typeUser = getRandomItem<string>(this.mockData.typeUsers);
    const reviewsCount = generateRandomValue(MIN_REVIEWS_COUNT, MAX_REVIEWS_COUNT).toString();
    const location = getRandomItem<string>(this.mockData.locations);

    return [
      title, description, postDate,city,previewImage,images,isPremium,isFavorite,
      rating,type,bedrooms,maxAdults,price,goods,firstname,email,avatarPath,typeUser,reviewsCount,location
    ].join('\t');
  }
}
