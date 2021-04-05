export default interface VersionNumberInterface {
  edition: number
  dev: number
  edit: number
  version(edition: number, dev: number, edit: number): string
}
