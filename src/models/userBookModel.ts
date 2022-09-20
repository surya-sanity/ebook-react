import { CommonModel } from "./commonModel";

export interface MyBook extends CommonModel {
  id: string,
  startDate: string,
  endDate: string,
  userId: string,
  bookId: string
} 