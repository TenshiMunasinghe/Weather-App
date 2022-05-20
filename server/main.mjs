import axios from 'axios'
import dotenv from 'dotenv'
import express from 'express'
import _ from 'lodash'

dotenv.config()

const app = express()

app.use(express.json())

app.use(express.static('dist'))

app.listen(8000)

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
  console.log(req)

  if (!lat || !lon) {
    handleError(res)
  }

  try {
    const response = await axios.get(url('forecast', lat, lon))

    const formattedData = response.data.list.map(weather => ({
      ...weather,
      date: weather.dt_txt.split(' ')[0],
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

app.get('/week', async (req, res) => {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    handleError(res)
  }

  try {
    const response = await axios.get(
      url('onecall', lat, lon) + '&exclude=current,minutely,hourly,alerts'
    )
    const [today, ...daily] = response.data.daily
    res.json({ ...response.data, daily })
  } catch (e) {
    console.error(e)
    res.json(e)
  }
})

app.get('/location', async (req, res) => {
  const { name } = req.query
  if (!name) {
    res.status(400).send('Provide location name')
    res.end()
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${process.env.API_KEY}`
    )
    res.json(response.data)
  } catch (e) {
    console.error(e)
    res.json(e)
  }
})
