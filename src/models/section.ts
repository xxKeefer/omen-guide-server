import { model, Schema } from 'mongoose'
import SectionDocument from '../interface/section'
import paramerise from '../lib/paramerise'

const SectionSchema = new Schema<SectionDocument>(
  {
    title: { type: String, unique: true, required: true },
    param: {
      type: String,
      default: function (this: SectionDocument) {
        return paramerise(this.title)
      }
    },
    desc: {
      type: String,
      default: function (this: SectionDocument) {
        return `This section is about ${this.title}`
      }
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: false
      }
    ]
  },
  { timestamps: true }
)

export default model<SectionDocument>('Section', SectionSchema)
