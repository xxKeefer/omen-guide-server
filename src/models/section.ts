import mongoose, { Document } from 'mongoose'
import SectionInterface from '../interface/section'

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    desc: {
      type: String,
      default: function (this: SectionInterface) {
        return `This section is about ${this.title}`
      }
    },
    link: String
  },
  { timestamps: true }
)

interface SectionModel<T extends Document> {}

const Section: SectionModel<SectionInterface> = mongoose.model(
  'Section',
  sectionSchema
)
export default Section
