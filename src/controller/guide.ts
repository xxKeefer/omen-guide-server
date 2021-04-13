import { Request, Response } from 'express'
import Respond from '../lib/Respond'
import Section from '../models/section'

export const createSection = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return Respond(res, 400, 'Bad Request.')
  const { title, desc } = req!.body
  try {
    const existingSection = await Section.findOne({ title })
    if (existingSection) return Respond(res, 409, 'Section already exists.')

    const newSection = await Section.create({ title, desc })
    return res
      .status(201)
      .json({ _id: newSection._id, title: newSection.title })
  } catch (error) {
    return Respond(res, 500, 'Ooops, something went wrong.')
  }
}

export const readSection = () => {}

export const allSections = () => {}

export const updateSection = () => {}

export const deleteSection = () => {}
