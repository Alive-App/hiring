const axios = require('axios')
const Stock = require('../models/Stock')

module.exports = {
    async index(req, res){
        const  name  = req.params.stock
        if(!name) return res.status(401).send()

        console.log(name)
        var price = 0
        var priceAt = '00-00-00'

        await axios.get('https://www.alphavantage.co/query', {
            params: {
                apikey: 'VV42OKJYPYCI2268.',
                function: 'TIME_SERIES_DAILY',
                symbol: name,
                interval:'60min'
            }
        }).then(r => {
            var prices = new Array()
            var pricesAt = new Array()
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            for(k in r.data['Time Series (Daily)']){
                pricesAt.push(k)
                prices.push(r.data['Time Series (Daily)'][k.toString()])
            }
            price = prices[0]['1. open']
            priceAt = pricesAt[0]
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })


        return res.json({
            name,
            price,
            priceAt
        })
    },




    async compare(req, res){
        const  name  = req.params.stock
        const { stocks } = req.body
        if(!name) return res.status(401).send()

        console.log(name)
        var lastPrices = []

        await axios.get('https://www.alphavantage.co/query', {
            params: {
                apikey: 'VV42OKJYPYCI2268.',
                function: 'TIME_SERIES_DAILY',
                symbol: name,
                interval:'60min'
            }
        }).then(r => {
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            var prices = new Array()
            var pricesAt = new Array()
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            for(k in r.data['Time Series (Daily)']){
                pricesAt.push(k)
                prices.push(r.data['Time Series (Daily)'][k.toString()])
            }
            lastPrices.push({
                lastPrice: prices[0]['1. open'],
                name,
                priceAt: pricesAt[0]
            })
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })

        for(stock of stocks){
            await axios.get('https://www.alphavantage.co/query', {
            params: {
                apikey: 'VV42OKJYPYCI2268.',
                function: 'TIME_SERIES_DAILY',
                symbol: stock,
                interval:'60min'
            }
        }).then(r => {
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            var prices = new Array()
            var pricesAt = new Array()
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            for(k in r.data['Time Series (Daily)']){
                pricesAt.push(k)
                prices.push(r.data['Time Series (Daily)'][k.toString()])
            }
            lastPrices.push({
                lastPrice: prices[0]['1. open'],
                name: stock,
                priceAt: pricesAt[0]
            })
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })
            
        }


        return res.json({
            lastPrices
        })
    },


    async getHistory(req, res){
        const  name  = req.params.stock
        const {from, to} = req.query
        if(!name) return res.status(401).send()

        console.log(name)
        var prices = []

        await axios.get('https://www.alphavantage.co/query', {
            params: {
                apikey: 'VV42OKJYPYCI2268.',
                function: 'TIME_SERIES_DAILY',
                symbol: name,
                interval:'60min'
            }
        }).then(r => {
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            var datesValidate = false
            for(k in r.data['Time Series (Daily)']){
                if(k === from) {
                    prices.push({
                        openning: r.data['Time Series (Daily)'][k]['1. open'],
                        low: r.data['Time Series (Daily)'][k]['3. low'],
                        high: r.data['Time Series (Daily)'][k]['2. high'],
                        closing: r.data['Time Series (Daily)'][k]['4. close'],
                        pricedAt: k
                    })
                }
                if(k === to){
                    prices.push({
                        openning: r.data['Time Series (Daily)'][k]['1. open'],
                        low: r.data['Time Series (Daily)'][k]['3. low'],
                        high: r.data['Time Series (Daily)'][k]['2. high'],
                        closing: r.data['Time Series (Daily)'][k]['4. close'],
                        pricedAt: k
                    })
                }
            }
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })


        return res.json({
            name,
            prices
        })
    },

    async gains(req, res){
        const  name  = req.params.stock
        const {purchaseAmont, purchasedAt} = req.query
        if(!name) return res.status(401).send()

        console.log(name)
        var priceAtDate = 0
        var lastPrice = 0

        await axios.get('https://www.alphavantage.co/query', {
            params: {
                apikey: 'VV42OKJYPYCI2268.',
                function: 'TIME_SERIES_DAILY',
                symbol: name,
                interval:'60min'
            }
        }).then(r => {
            var prices = new Array()
            var pricesAt = new Array()
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            for(k in r.data['Time Series (Daily)']){
                
                if(k == purchasedAt){
                    priceAtDate = r.data['Time Series (Daily)'][k.toString()]["1. open"]
                }
                pricesAt.push(k)
                prices.push(r.data['Time Series (Daily)'][k.toString()])
            }
            lastPrice = prices[0]['1. open']
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })

        var capitalGains = ((parseFloat(lastPrice)* purchaseAmont)-(parseFloat(priceAtDate) * purchaseAmont)).toFixed(2)


        return res.json({
            name,
            purchaseAmont,
            purchasedAt,
            priceAtDate,
            lastPrice,
            capitalGains
        })
    },


    async create(req, res){
        const userId = req.headers.user_id
        const {stockName} = req.body
        const {amount} = req.body
        console.log(req.body)
        if(!userId || !stockName || !amount) return res.status(400)

        Stock.create({
            userId,
            name: stockName,
            amount
        }).then((r) => {
            return res.json(r)
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })

    },

    async getStocks(req, res){
        const userId = req.headers.user_id
        if(!userId ) return res.status(400)
        
        const stocks = await Stock.find({
            userId
        })

        return res.json({
            stocks
        })
    }
}