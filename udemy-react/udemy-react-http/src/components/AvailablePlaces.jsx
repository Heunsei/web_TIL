import { useEffect, useState } from 'react';

import { fetchAvailablePlaces } from '../https.js'
import { sortPlacesByDistance } from './../loc.js'
import Places from './Places.jsx';
import Error from './Error.jsx'

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchPlage() {
      setIsFetching(true)
      try {
        const places = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places,
            position.coords.latitude,
            position.coords.longitude
          )
          setAvailablePlaces(places)
          setIsFetching(false)
        });

        setAvailablePlaces(places)
      } catch (error) {
        setError({
          message:
            error.message || 'could not fetch places, please try again'
        })
        setIsFetching(false)
      }
    }
    fetchPlage()
  }, [])

  if (error) {
    return <Error title="An error occurred!"
      message={error.message}
    />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
