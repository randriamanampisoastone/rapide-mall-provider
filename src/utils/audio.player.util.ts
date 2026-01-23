import successAudio from '@/assets/audio/success_audio.mp3'
import errorAudio from '@/assets/audio/error_audio.mp3'
import realtimeDisconnectedAudio from '@/assets/audio/realtime_disconnected_audio.mp3'
import welcomeAudio from '@/assets/audio/welcome_audio.mp3'
import findingDriverAudio from '@/assets/audio/finding_driver.mp3'
import infoAudio from '@/assets/audio/info.mp3'
import infoErrorAudio from '@/assets/audio/error.mp3'
import otpIncomming from '@/assets/audio/otp-notification.mp3'
import booked from '@/assets/audio/booked.mp3'
import bookedAlert from '@/assets/audio/booked_alert.mp3'

import { Howl } from 'howler'

export const successSound = new Howl({
   src: [successAudio],
   volume: 1,
})

export const infoSound = new Howl({
   src: [infoAudio],
   volume: 1,
})

export const infoErrorSound = new Howl({
   src: [infoErrorAudio],
   volume: 1,
})

export const findingDriverSound = new Howl({
   src: [findingDriverAudio],
   volume: 1,
})

export const errorSound = new Howl({
   src: [errorAudio],
   volume: 1,
})

export const welcomeSound = new Howl({
   src: [welcomeAudio],
   volume: 1,
})

export const realtimeDisconnectedSound = new Howl({
   src: [realtimeDisconnectedAudio],
   volume: 1,
   loop: true,
})

export const otpIncomingSound = new Howl({
   src: [otpIncomming],
   volume: 1,
})

export const bookedSound = new Howl({
   src: [booked],
   volume: 1,
})

export const bookedAlertSound = new Howl({
   src: [bookedAlert],
   volume: 1,
})
