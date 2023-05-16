export const getUserAuthCode = (): string[] => {
  return ['0003']
}

export const isHavePermission = (code: string): boolean => {
  // return getUserAuthCode().includes(code)
  return true
}
