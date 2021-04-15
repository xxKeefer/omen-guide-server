import { model, Schema, Query } from 'mongoose'
import ArticleDocument from '../interface/article'
import Section from './section'
import paramerise from '../lib/paramerise'

const ArticleSchema = new Schema<ArticleDocument>(
  {
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    title: { type: String, unique: true, required: true },
    param: {
      type: String,
      default: function (this: ArticleDocument) {
        return paramerise(this.title)
      }
    },
    desc: {
      type: String,
      default: function (this: ArticleDocument) {
        return `This Article is about ${this.title}`
      }
    },
    contents: {
      type: String,
      default: function () {
        return 'To Be Written...'
      }
    }
  },
  { timestamps: true }
)

ArticleSchema.post('save', async (article) => {
  await Section.findByIdAndUpdate(article.section, {
    $push: { articles: article._id }
  })
})

export default model<ArticleDocument>('Article', ArticleSchema)
