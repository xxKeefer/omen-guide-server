import { Document } from 'mongoose'

export interface ArticleInterface {
  title: string
  desc?: string
  //contents: ContentInterface[]
}

export default interface ArticleDocument extends ArticleInterface, Document {
  title: string
  desc?: string
  //contents: ContentInterface[]
}
