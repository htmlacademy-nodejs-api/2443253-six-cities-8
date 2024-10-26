import { Expose } from 'class-transformer';
import { City, OfferType } from '../../../types/index.js';

export class PreviewOfferRdo {

   @Expose()
  public title: string;//название

  @Expose()
   public postDate: Date;//дата публикации

  @Expose()
  public city: City;//город

  @Expose()
  public previewImage: string;//превью

  @Expose()
  public isPremium: boolean;//принадлежность к премиальным

  @Expose()
  public isFavorite: boolean; //принадлежность к избранным

  @Expose()
  public rating: number;//рейтинг

  @Expose()
  public type: OfferType; //тип жилья

  @Expose()
  public price: number;//Стоимость аренды

  @Expose()
  public commentsCount: number;//количество комментариев

}
