import axios from 'axios'
import dotenv from 'dotenv'
import express from 'express'
import _ from 'lodash'

dotenv.config()

const app = express()

app.use(express.json())

app.listen(8000, () => console.log('working'))

const handleError = res => {
  res.status(400).send('Provide latitude and longitude as query params.')
}

const url = (route, lat, lon) =>
  `https://api.openweathermap.org/data/2.5/${route}?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`

app.get('/current', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    handleError(res)
  }

  try {
    const response = await axios.get(url('weather', lat, lon))
    res.json(response.data)
  } catch (e) {
    console.error(e)
    res.json(e)
  }
})

app.get('/today', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    handleError(res)
  }

  try {
    const response = await axios.get(url('forecast', lat, lon))

    const formattedData = response.data.list.map(weather => ({
      ...weather,
      date: weather.dt_txt.split(' ')[0],
      time: weather.dt_txt.split(' ')[1],
    }))

    const groupedData = _.groupBy(formattedData, 'date')

    const sortedData = Object.values(groupedData).map(value =>
      value.sort((a, b) => a.dt - b.dt)
    )

    res.json(sortedData[0])
  } catch (e) {
    console.error(e)
    res.json(e)
  }
})
