import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

function AddRestaurant() {
  const { addRestaurants } = useContext(RestaurantsContext)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('Price Range')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange,
      })
      addRestaurants(response.data.data.restaurants)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='mb-4'>
      <form className='form-inline' action=''>
        <div className='form-row'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Name'
          ></input>
        </div>
        <div className='form-row'>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Location'
          ></input>
        </div>
        <div className='form-row'>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className='custom-select my-1 mr-sm-2'
          >
            <option disabled>Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
          className='btn btn-primary'
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddRestaurant
