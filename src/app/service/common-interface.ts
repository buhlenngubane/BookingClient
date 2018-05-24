export interface Users {
    userId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
}

export interface Accommodation {
    accId: number;
    country: string;
    location: string;
    picture: string;
}
export interface Property {
    propId: number;
    accId: number;
    propName: string;
    pricePerNight: number;
    availableRooms: number;
    picture: string;
}
export interface changeLayout {
    load: boolean;
    error: boolean;
    errorMessage: string;
}
export interface CheckAccommodation {
    load: boolean;
    error: boolean;
    message: string;
    bookingId: number;
    userId: number;
    accId: number;
    numOfNights: number;
    bookDate: Date;
    payType: string;
    payStatus: true;
    total: number;
}

export interface Flight {
    flightId: number,
    locale: string,
    avFlights: number,
    
    detailId: number,
    destId: number,
    cid: number,
    departure: Date,//"2018-05-23T13:50:54.840Z",
    returnTrip: Date,
    path: string,
    price: number
}

export interface Destination
{
    destId: 0,
    flightId: number,
    destination1: string
}

export interface FlightPic
{
    cid: number,
    companyName: string,
    picture: string
}