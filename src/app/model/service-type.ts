export class Accommodations
{
    accId:number;
    country:string;
    location:string;
    picture:string;

    constructor()
    {
        /*this.accId=accId;
        this.country=country;
        this.location=location;
        this.picture=picture;*/
    }

    deserialize(input:any)
    {
        Object.assign(this, input);
        return this;
    }
}

export class Properties
{
    propId:number;
    accId:number;
    propName:string;
    pricePerNight:number;
    availableRooms:number;
    picture:string;

    deserialize(input:any)
    {
        Object.assign(this, input);
        return this;
    }
}

export class Flight
{
    deserialize(input:any)
    {
        Object.assign(this, input);
        return this;
    }
}
