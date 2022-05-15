export const getTime = (time: number) => {
  const date = new Date(time * 1000)

  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}
