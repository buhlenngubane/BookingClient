import {Deserializable} from './deserialization';

export class User implements Deserializable<User> {
    userId: number;
    name = 'string';
    surname = 'string';
    email = 'string';
    password = 'unauthorized';
    phone = 'string';
    admin = false;
    constructor(input?: any) {
        Object.assign(this, input);
        return this;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
