import type { LatLng } from '@/interfaces/map/location.interface'
import polyline from '@mapbox/polyline'

export function decodePolyline(encodedPolyline: string): LatLng[] {
   try {
      const decoded = polyline.decode(encodedPolyline)
      return decoded.map(([latitude, longitude]: number[]) => ({
         latitude,
         longitude,
      }))
   } catch (error) {
      return []
   }
}
