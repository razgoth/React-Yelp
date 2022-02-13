import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

function Home() {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  )
}

export default Home
