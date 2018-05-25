import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: "Abbreviation" })
export class Abbreviation implements PipeTransform {
    transform(value: string) {
        return value.split(" ")[0];
    }
}