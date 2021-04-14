const paramerise = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, '-')
}

export default paramerise
