require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())

// get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    //const results = await db.query('SELECT * FROM restaurants')

    const restaurantsRatingsData = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurants_id, COUNT(*), TRUNC(Avg(rating),1) AS average_rating FROM reviews GROUP BY restaurants_id) reviews ON restaurants.id=reviews.restaurants_id;'
    )
    //console.log('results', results)
    console.log('restaurant data', restaurantsRatingsData)

    res.status(200).json({
      status: 'success',
      results: restaurantsRatingsData.rows.length,
      data: {
        restaurants: restaurantsRatingsData.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

// get individual restaurants
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params)

  try {
    const restaurants = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurants_id, COUNT(*), TRUNC(Avg(rating),1) AS average_rating FROM reviews GROUP BY restaurants_id) reviews ON restaurants.id=reviews.restaurants_id WHERE id=$1;',
      [req.params.id]
    )

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurants_id = $1',
      [req.params.id]
    )

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurants.rows[0],
        review: reviews.rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

// create restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body)
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    )
    res.status(201).json({
      status: 'success',
      data: {
        restaurants: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

// update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    )
    console.log(results.rows)
    res.status(200).json({
      data: {
        restaurants: results.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

// delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM restaurants WHERE id=$1', [
      req.params.id,
    ])
    res.status(204).json({
      status: 'success',
    })
  } catch (err) {
    console.log(err)
  }
})

// create review
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const newReview = await db.query(
      'INSERT INTO reviews (restaurants_id, name, review, rating) values ($1, $2, $3, $4) returning *;',
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0],
      },
    })
  } catch (err) {
    console.log(err)
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})
