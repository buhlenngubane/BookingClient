import {Deserializable} from "./deserialization";

export class User implements Deserializable<User> {
    userId:number;
    name:string;
    surname:string;
    email:string;
    password:string;
    phone:string;
    constructor()
    {}
    
    deserialize(input:any)
    {
        Object.assign(this, input);
        return this;
    }
}
