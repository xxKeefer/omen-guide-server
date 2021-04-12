import { Document } from 'mongoose'

export default interface SectionInterface extends Document {
  title: string
  desc: string
  link: string
  //articles: <ArticleInterface>[]
}
export interface DatabaseSectionInterface extends SectionInterface {
  title: string
  desc: string
  link: string
  //articles: <ArticleInterface>[]
  _id: string
}
