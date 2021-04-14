import { model, Schema, Query } from 'mongoose'
import ArticleDocument from '../interface/article'
import Section from './section'

const ArticleSchema = new Schema<ArticleDocument>(
  {
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    title: { type: String, unique: true, required: true },
    desc: {
      type: String,
      default: function (this: ArticleDocument) {
        return `This Article is about ${this.title}`
      }
    }
  },
  { timestamps: true }
)

// ithink this actually should be save not update one
ArticleSchema.post('save', async (article) => {
  const articleLinked = await Section.findByIdAndUpdate(article.section, {
    $push: { articles: article._id }
  })
  if (!articleLinked) return console.log('article not linked!')
  return console.log({ articleLinked })
})

export default model<ArticleDocument>('Article', ArticleSchema)
