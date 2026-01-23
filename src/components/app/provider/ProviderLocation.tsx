import { GOOGLE_MAP_API_KEY } from '@/constants/liveTracking/liveTracking.constant'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'

interface ProviderLocationMap {
   latitude: number
   longitude: number
}

function ProviderLocation({ latitude, longitude }: ProviderLocationMap) {
   const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)

   const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAP_API_KEY })

   useEffect(() => {
      if (mapRef) {
         mapRef.panTo({ lat: latitude, lng: longitude })
      }
   }, [mapRef])

   if (!isLoaded) {
      return (
         <div className='h-100 overflow-hidden rounded-xl flex items-center justify-center'>
            <ScaleLoader color='#0c0' />
         </div>
      )
   }

   return (
      <div className='h-100 overflow-hidden rounded-xl'>
         <GoogleMap
            zoom={15}
            onLoad={(map) => setMapRef(map)}
            center={{ lat: latitude, lng: longitude }}
            mapContainerStyle={{
               width: '100%',
               height: '100%',
            }}
         >
            <MarkerF
               position={{
                  lat: latitude,
                  lng: longitude,
               }}
            />
         </GoogleMap>
      </div>
   )
}

export default ProviderLocation
