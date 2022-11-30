export interface IRoom {
  id: string
  imageUrl: string
  normalDayPrice: number
  holidayPrice: number
  name: string
}

export interface IRoomDetails extends Omit<IRoom, 'imageUrl'> {
  imageUrl: string[]
  descriptionShort: {
    [key: string]: any
    Bed: String[]
  }
  description: string
  checkInAndOut: {
    [key: string]: string
  }
  amenities: {
    [key: string]: boolean
  }
}

export interface IApiRoomsResponse {
  success: boolean
  items: Array<IRoom>
  booking: Array<string>
}

export interface IApiRoomDetailResponse {
  success: boolean
  room: IRoomDetails
  booking: Array<string>
}
