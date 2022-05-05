export const getTime = (time: number) => {
  const date = new Date(time * 1000)

  return `${date.getHours()}:${date.getMinutes()}`
}
