import {Deserializable} from './deserialization';

export class User implements Deserializable<User> {
    userId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    admin: boolean;
    constructor(input?: any) {
        this.userId = 0;
        this.name = 'string';
        this.surname = 'string';
        this.email = 'string';
        this.password = 'unauthorized';
        this.phone = 'string';
        this.admin = false;
        Object.assign(this, input);
        return this;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
