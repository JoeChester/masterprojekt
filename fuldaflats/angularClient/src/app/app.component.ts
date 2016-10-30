import { Component } from "@angular/core";

import '../css/style.css'; //global css

//root Component
@Component({
    selector: 'my-app', //component tag name / css selector
    styleUrls: ['./app.component.css'], // component css
    // component template
    templateUrl: './app.component.html' 
})
export class AppComponent {
    title: string = "Fulda Flats"
}