import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public names: string[] = ['folder', 'phone', 'left-arrow', 'user', 'computer'];

}
