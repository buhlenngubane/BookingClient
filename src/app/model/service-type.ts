export class Accommodations {
    'accId': number;
    'country': string;
    'location': string;
    'picture': string;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class Properties {
    'propId': number;
    'accId': number;
    'propName': string;
    'picture': string;
    'accDetail': [
        {
          'detailId': number;
          'propId': number;
          'pricePerNight': number;
          'availableRooms': number;
          'dateAvailable': Date;
        }
      ];

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class Flights {
    'flightId': number;
    'locale': string;
    'avFlights': number;
    'destination': [
        {
            'destId': number,
            'flightId': number,
            'destination1': string,
            'flightDetail': [
                {
                    'detailId': number,
                    'destId': number,
                    'cid': number,
                    'departure': Date,
                    'returnTrip': Date,
                    'path': string,
                    'price': number,
                    'c': {
                        'cid': number,
                        'companyName': string,
                        'picture': string,
                        'flightDetail': [
                            null
                        ]
                    }
                }
            ]
        }
    ];

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class Destinations {
    'destId': 0;
    'flightId': number;

    'destination1': string;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class FlightDetails {
    'detailId': number;
    'destId': number;
    'cid': number;
    'departure': Date;
    'returnTrip': Date;
    'path': string;
    'price': number;
    'c': {
        'cid': number;
        'companyName': string;
        'picture': string;
    };
    'dest': {
        'destId': number;
        'flightId': number;
        'destination1': string;
        'flight': {
            'flightId': number;
            'locale': string;
            'avFlights': number;
            'destination': [
                null
            ];
        };
    };

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class CarRentals {
    'cRentId': number;
    'location': string;
    'physicalAddress': string;
    'numOfSuppliers': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class Cars {
    'ctypeId': number;
    'name': string;
    'type': string;
    'numOfSeats': number;
    'numOfDoors': number;
    'numOfAirbags': number;
    'transmission': string;
    'picture': string;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class CarRentalDetails {
    'carId': number;
    'cmpId': number;
    'ctypeId': number;
    'price': number;
    'cmp': {
        'cmpId': number;
        'crentId': number;
        'companyName': string;
        'fuelPolicy': string;
        'mileage': string;
        'carCount': number;
        'picture': string;
        'crent': {
            'crentId': number,
            'location': string,
            'physicalAddress': string,
            'numOfSuppliers': number,
          };
    };
    'ctype': {
        'ctypeId': number;
        'name': string;
        'type': string;
        'numOfSeats': number;
        'numOfDoors': number;
        'numOfAirbags': number;
        'transmission': string;
        'picture': string;
    };

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class PickUps {
    'pickUpId': number;
    'pickUp': string;
    'numOfDrops': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

// tslint:disable-next-line:class-name
export class dropOffs {
    'dropOffId': number;
    'pickUpId': number;
    'dropOff': string;
    'taxiCount': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class AirDetails {
    'airDetailId': number;
    'dropOffId': number;
    'taxiId': number;
    'driverPolicy': string;
    'price': number;
    'dropOff': {
        'dropOffId': number,
        'pickUpId': number,
        'dropOff': string,
        'taxiCount': number,
        'pickUp': {
            'pickUpId': number,
            'pickUp': string,
            'numOfDrops': number
        }
    };
    'taxi': {
        'taxiId': number;
        'name': string;
        'type': string;
        'numOfSeats': number;
        'numOfBaggage': number;
        'driverPolicy': string;
        'airDetail': [null]
    };

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class AccBooking {

    'userId': number;
    'propId': number;
    'numOfNights': number;
    'bookDate': Date;
    'payType': string;
    'payStatus': boolean;
    'total': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class FlBooking {
    'userId': number;
    'detailId': number;
    'flightType': string;
    'travellers': number;
    'bookDate': Date;
    'payType': string;
    'payStatus': boolean;
    'total': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class CarBooking {
    'userId': number;
    'carId': number;
    'returnDate': Date;
    'bookDate': Date;
    'payType': string;
    'payStatus': boolean;
    'total': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class AirBooking {
    'userId': number;
    'airDetailId': number;
    'returnJourney': Date;
    'passengers': number;
    'bookDate': Date;
    'payType': string;
    'payStatus': boolean;
    'total': number;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class Loading {
    load: boolean;
    error: boolean;
    errorMessage: string;

    constructor(data?: any) {
        Object.assign(this, data);
        return this;
    }
}

export class ChangeNav {
    nav: boolean;
}
