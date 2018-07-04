export interface Users {
    userId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
        admin: false;
}

// tslint:disable-next-line:class-name
export interface changeLayout {
    load: boolean;
    error: boolean;
    errorMessage: string;
}

export interface CarRentalStorage {
    search: string;
    dateFrom: Date;
    dateTo: Date;
    timeFrom: string;
    timeTo: string;
}

export interface AirTaxiStorage {
    pickUp: '';
    dropOff: '';
    dateFrom: Date;
    returnDate: Date;
    passengers: 1;
}

export interface ChangeNav {
    nav: boolean;
}

export interface Success {
  success: boolean;
}
