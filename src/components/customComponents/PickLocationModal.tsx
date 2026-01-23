import type { LatLng } from '@/interfaces/map/location.interface'
import { ResponsiveDialog } from '../ResponsiveDialog'
import langue from '@/data/language/customComponents/PickLocationModal.json'
import useTranslate from '@/hooks/useTranslate'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import {
   GoogleMap,
   MarkerF,
   StandaloneSearchBox,
   useLoadScript,
} from '@react-google-maps/api'
import {
   centerAntananarivo,
   GOOGLE_MAP_API_KEY,
} from '@/constants/liveTracking/liveTracking.constant'
import { setCenterMap } from '@/redux/slices/center.map.slice'
import { HashLoader } from 'react-spinners'
import { Input } from '../ui/input'
import { getIconUrlFromComponent } from '@/utils/get.icon.url.from.component.util'
import { PickupIcon } from '../customIcons/RideIcons'

interface PickLocationModalProps {
   isOpen: boolean
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
   location: LatLng | undefined
   setLocation: React.Dispatch<React.SetStateAction<LatLng | undefined>>
}

function PickLocationModal({
   isOpen,
   setIsOpen,
   location,
   setLocation,
}: PickLocationModalProps) {
   const translate = useTranslate(langue)

   const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)
   const centerMap = useSelector((state: RootState) => state.centerMap)
   const [searchBox, setSearchBox] =
      useState<google.maps.places.SearchBox | null>(null)

   const { isLoaded } = useLoadScript({
      googleMapsApiKey: GOOGLE_MAP_API_KEY,
      libraries: ['places'],
   })

   const dispatch = useDispatch()

   const handleLoad = (ref: google.maps.places.SearchBox) => {
      setSearchBox(ref)
   }

   const handlePlaceChanged = () => {
      if (searchBox) {
         const places = searchBox.getPlaces()
         if (places && places.length > 0) {
            const locationData = places[0].geometry?.location
            if (locationData) {
               dispatch(
                  setCenterMap({
                     lat: locationData.lat(),
                     lng: locationData.lng(),
                  }),
               )
               setLocation({
                  latitude: locationData.lat(),
                  longitude: locationData.lng(),
               })
            }
         }
      }
   }

   useEffect(() => {
      if (mapRef) {
         mapRef.panTo(centerAntananarivo)
      }
   }, [mapRef])

   return (
      <ResponsiveDialog
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         title={translate('pick_a_location')}
      >
         {isLoaded ? (
            <div className='space-y-2'>
               <div className='w-full'>
                  <StandaloneSearchBox
                     onLoad={handleLoad}
                     onPlacesChanged={handlePlaceChanged}
                  >
                     <Input
                        type='search'
                        placeholder={translate('search_place') + '...'}
                     />
                  </StandaloneSearchBox>
               </div>

               <div className='h-90 m-auto overflow-hidden rounded-md'>
                  <GoogleMap
                     zoom={15}
                     onLoad={(map) => setMapRef(map)}
                     center={centerMap}
                     mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                     }}
                     onClick={({ latLng }) => {
                        if (!latLng) return
                        dispatch(
                           setCenterMap({
                              lat: latLng.lat(),
                              lng: latLng.lng(),
                           }),
                        )
                        setLocation({
                           latitude: latLng.lat(),
                           longitude: latLng.lng(),
                        })
                     }}
                  >
                     {location && (
                        <MarkerF
                           position={{
                              lat: location.latitude,
                              lng: location.longitude,
                           }}
                           icon={{
                              url: getIconUrlFromComponent(
                                 <PickupIcon color='#0c0' />,
                              ),
                              scaledSize: new google.maps.Size(30, 45),
                           }}
                        />
                     )}
                  </GoogleMap>
               </div>
            </div>
         ) : (
            <div className='w-90 h-90 m-auto flex items-center justify-center'>
               <HashLoader color='#0c0' />
            </div>
         )}
      </ResponsiveDialog>
   )
}

export default PickLocationModal
