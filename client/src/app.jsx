import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RestaurantsContextProvider } from './context/RestaurantsContext'
import Home from './routes/Home'
import RestaurantDetail from './routes/RestaurantDetail'
import UpdatePage from './routes/UpdatePage'

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className='container'>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route
              exact
              path='/restaurants/:id/update'
              element={<UpdatePage />}
            />
            <Route
              exact
              path='/restaurants/:id'
              element={<RestaurantDetail />}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  )
}

export default App
