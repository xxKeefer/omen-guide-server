import { Document } from 'mongoose'

export interface SectionInterface {
  title: string
  desc?: string
  //articles: <ArticleInterface>[]
}

export default interface SectionDocument extends SectionInterface, Document {
  title: string
  desc?: string
}
