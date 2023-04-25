import {Component} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  _opened = false;

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }

}
