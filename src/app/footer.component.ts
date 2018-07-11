import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['app.component.css']
})
export class FooterComponent {
    IniPics = ['./assets/images/3d4f6ca8a45a376f2193f1e88d1ac8369f585e76.png',
     './assets/images/6bc5ec89d870111592a378bbe7a2086f0b01abc4.png',
      './assets/images/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0 (1).png',
       './assets/images/83ef7122074473a6566094e957ff834badb58ce6 (1).png',
        './assets/images/a4b50503eda6c15773d6e61c238230eb42fb050d (1).png'];
    constructor() {
    }
}
