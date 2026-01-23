import { Input } from '@/components/ui/input'
import { GOOGLE_MAP_API_KEY } from '@/constants/liveTracking/liveTracking.constant'
import type { LatLng } from '@/interfaces/map/location.interface'
import {
   GoogleMap,
   MarkerF,
   StandaloneSearchBox,
   useLoadScript,
} from '@react-google-maps/api'
import type React from 'react'
import { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'

interface EditProviderLocationMapProps {
   location: LatLng
   setLocation: React.Dispatch<React.SetStateAction<LatLng>>
}

function EditProviderLocationMap({
   location,
   setLocation,
}: EditProviderLocationMapProps) {
   const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)
   const [searchBox, setSearchBox] =
      useState<google.maps.places.SearchBox | null>(null)

   const { isLoaded } = useLoadScript({
      googleMapsApiKey: GOOGLE_MAP_API_KEY,
      libraries: ['places'],
   })
   const handleLoad = (ref: google.maps.places.SearchBox) => {
      setSearchBox(ref)
   }

   const handlePlacesChanged = () => {
      if (searchBox) {
         const places = searchBox.getPlaces()
         if (places && places.length > 0) {
            const location = places[0].geometry?.location
            if (location) {
               setLocation({
                  latitude: location.lat(),
                  longitude: location.lng(),
               })
            }
         }
      }
   }

   useEffect(() => {
      if (mapRef) {
         mapRef.panTo({ lat: location.latitude, lng: location.longitude })
      }
   }, [mapRef, location])

   if (!isLoaded) {
      return (
         <div className='w-[400px] flex items-center justify-center h-40 rounded-md border'>
            <ScaleLoader color='var(--green)' />
         </div>
      )
   }

   return (
      <div className='h-80 w-full m-auto my-4 overflow-hidden rounded-md'>
         <StandaloneSearchBox
            onLoad={handleLoad}
            onPlacesChanged={handlePlacesChanged}
         >
            <Input type='search' placeholder={'Search...'} className='w-full rounded-b-none' />
         </StandaloneSearchBox>
         <GoogleMap
            zoom={15}
            onLoad={(map) => setMapRef(map)}
            center={{ lat: location.latitude, lng: location.longitude }}
            mapContainerStyle={{
               width: '100%',
               height: '100%',
            }}
            onClick={({ latLng }) => {
               if (latLng) {
                  setLocation({
                     latitude: latLng.lat(),
                     longitude: latLng.lng(),
                  })
               }
            }}
         >
            <MarkerF
               position={{
                  lat: location.latitude,
                  lng: location.longitude,
               }}
            />
         </GoogleMap>
      </div>
   )
}

export default EditProviderLocationMap
