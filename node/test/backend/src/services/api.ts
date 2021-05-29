import axios from 'axios'

export default axios.create({
  baseURL: process.env.ALPHAVANTAGE_BASEURL,
  params: {
    apikey: process.env.ALPHAVANTAGE_KEY
  }
})
