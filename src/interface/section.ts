import { Document } from 'mongoose'
import { ArticleInterface } from './article'

export interface SectionInterface {
  title: string
  desc?: string
  param: string
  articles: ArticleInterface[]
}

export default interface SectionDocument extends SectionInterface, Document {
  title: string
  desc?: string
  param: string
  articles: ArticleInterface[]
}
