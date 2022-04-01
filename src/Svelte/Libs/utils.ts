// returns path separator
export const getPathSeparator = () => {
  if (navigator.userAgent.indexOf('Win') != -1) {
    return '\\'
  }
  return '/'
}
