import { CommonModel } from './commonModel';

export interface BookModel extends CommonModel {
  id: string
  title: string,
  pageCount: string,
  publishedDate: string,
  thumbnailUrl: string,
  shortDescription: string,
  longDescription: string,
  published: boolean,
  author: string,
  genre: string,
  pricePerDay: number,
  price: number,
}