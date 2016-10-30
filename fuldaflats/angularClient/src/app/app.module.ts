import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

//NgModule entry point for our application
@NgModule({
    // BrowserModule registers critical application service providers. 
    // It also includes common directives like NgIf and NgFor which become immediately visible and usable in any of this modules component templates.
    imports: [BrowserModule],
    declarations: [AppComponent], // -> AppComponent is as directive available
    bootstrap: [AppComponent] // -> When Angular launches the app, it places the HTML rendering of AppComponent in the DOM, inside the <my-app> element tags of the index.html
})
export class AppModule {

}