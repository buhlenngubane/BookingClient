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
// tslint:disable-next-line:class-name
export interface changeLayout {
    load: boolean;
    error: boolean;
    errorMessage: string;
}

// export interface Flight {
//     flightId: number;
//     locale: string;
//     avFlights: number;
// }

// export interface FlightPic {
//     cid: number;
//     companyName: string;
//     picture: string;
// }

export interface ChangeNav {
    nav: boolean;
}

export interface Success {
  success: boolean;
}
