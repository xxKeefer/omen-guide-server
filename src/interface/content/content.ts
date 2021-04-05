import VersionNumberInterface from './versionNumber'

enum ContentType {
  Normal = 'NORMAL',
  Lore = 'LORE',
  Example = 'EXAMPLE',
  Mechanics = 'MECHANICS'
}

export default interface ContentInterface {
  body: string
  type: ContentType
  version: VersionNumberInterface
}

export interface DbContentInterface extends ContentInterface {
  _id: string
}
