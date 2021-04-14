import { Request, Response } from 'express'
import Article from '../models/article'
import Section from '../models/section'

export const createArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body || !req?.params)
    return res.status(400).json({ error: 'Bad Request.' })
  const { title, desc } = req!.body
  const param = req!.params.section
  console.log({ param }, req.params)

  try {
    const section = await Section.findOne({ param })
    if (!section) return res.status(404).json({ error: 'Section not found.' })

    const existingArticle = await Article.findOne({ title })
    if (existingArticle)
      return res.status(409).json({ error: 'Article already exists.' })

    const newArticle = await Article.create({
      title,
      desc,
      section: section._id
    })
    return res
      .status(201)
      .json({ _id: newArticle._id, title: newArticle.title })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const readArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title } = req!.body
  try {
    const article = await Article.findOne({ title })
    if (!article) return res.status(404).json({ message: 'Article not found.' })
    return res.status(200).json({ article })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const allArticles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const articles = await Article.find({})
    return res.status(200).json({ articles })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title, desc } = req!.body
  try {
    const articleUpdate = await Article.findOneAndUpdate(
      { title },
      { title, desc: desc ?? null },
      { new: true }
    )
    if (!articleUpdate)
      return res.status(404).json({ message: 'Article not found.' })
    return res.status(200).json({ articleUpdate })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deleteArticle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req?.body) return res.status(400).json({ error: 'Bad Request.' })
  const { title } = req!.body
  try {
    const articleDeleted = await Article.findOneAndDelete({ title })
    if (!articleDeleted)
      return res.status(404).json({ message: 'Article not found.' })
    return res.status(200).json({ articleDeleted })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
