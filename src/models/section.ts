import { model, Schema } from 'mongoose'
import SectionDocument from '../interface/section'

const SectionSchema = new Schema<SectionDocument>(
  {
    title: { type: String, unique: true, required: true },
    desc: {
      type: String,
      default: function (this: SectionDocument) {
        return `This section is about ${this.title}`
      }
    }
  },
  { timestamps: true }
)

export default model<SectionDocument>('Section', SectionSchema)
