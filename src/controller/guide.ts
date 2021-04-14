import { Request, Response } from 'express'
import Section from '../models/section'

export const createSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title, desc } = req!.body
  try {
    const existingSection = await Section.findOne({ title })
    if (existingSection)
      return res.status(409).json({ error: 'Section already exists.' })

    const newSection = await Section.create({ title, desc })
    return res
      .status(201)
      .json({ _id: newSection._id, title: newSection.title })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const readSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title } = req!.body
  try {
    const section = await Section.findOne({ title })
    if (!section) return res.status(404).json({ message: 'Section not found.' })
    return res.status(200).json({ section })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const allSections = async (res: Response): Promise<Response> => {
  try {
    const sections = await Section.find({})
    return res.status(200).json({ sections })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title, desc } = req!.body
  const description = !desc ? null : desc
  try {
    const sectionUpdate = await Section.findOneAndUpdate(
      { title },
      { title, desc: description },
      { new: true }
    )
    //TODO:validation????
    return res.status(200).json({ sectionUpdate })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deleteSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title } = req!.body
  try {
    const sectionDeleted = await Section.findOneAndDelete(
      { title },
      { new: true }
    )
    //TODO:validation??????
    return res.status(200).json({ sectionDeleted })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
