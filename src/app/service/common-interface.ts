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
// tslint:disable-next-line:class-name
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
    flightId: number;
    locale: string;
    avFlights: number;

    detailId: number;
    destId: number;
    cid: number;
    departure: Date; // "2018-05-23T13:50:54.840Z",
    returnTrip: Date;
    path: string;
    price: number;
}

export interface Destination {
    destId: 0;
    flightId: number;
    destination1: string;
}

export interface FlightPic {
    cid: number;
    companyName: string;
    picture: string;
}

export interface ChangeNav {
    nav: boolean;
}

export interface FlightDetail {
    'detailId': number;
    'destId': number;
    'cid': number;
    'departure': Date;
    'returnTrip': Date;
    'path': string;
    'price': number;
    'c': {
        'cid': number,
        'companyName': string,
        'picture': string
    };

}

export interface CarRental {
    cRentId: number;
    location: string;
    physicalAddress: string;
    numOfSuppliers: number;
}

export interface Car {
    ctypeId: number;
    name: string;
    type: string;
    numOfSeats: number;
    numOfDoors: number;
    numOfAirbags: number;
    transmission: string;
    picture: string;
}

export interface CarRentalDetail {
    'carId': number;
    'cmpId': number;
    'ctypeId': number;
    'price': number;
    'cmp': {
        'cmpId': number,
        'crentId': number,
        'companyName': string,
        'fuelPolicy': string,
        'mileage': string,
        'carCount': number,
        'picture': string,
        'car': [
            null
        ]
    };
    'ctype': {
        'ctypeId': number,
        'name': string,
        'type': string,
        'numOfSeats': number,
        'numOfDoors': number,
        'numOfAirbags': number,
        'transmission': string,
        'picture': string,
        'car': [
            null
        ]
    };
}

export interface PickUp {
    'pickUpId': number;
    'pickUp': string;
    'numOfDrops': number;
}

// tslint:disable-next-line:class-name
export interface dropOff {
    'dropOffId': number;
    'pickUpId': number;
    'dropOff': string;
    'taxiCount': number;
}

export interface AirDetail {
    'airDetailId': number;
    'dropOffId': number;
    'taxiId': number;
    'driverPolicy': string;
    'price': number;
    'dropOff': null;
    'taxi': {
        'taxiId': number,
        'name': string,
        'type': string,
        'numOfSeats': number,
        'numOfBaggage': number,
        'driverPolicy': string,
        'airDetail': [null]
    };
}

export interface Success {
  success: boolean;
}
