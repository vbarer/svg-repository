import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css']
})
export class SvgIconComponent implements OnInit {

  @ViewChild('svgIcon', { static: true }) svgIcon: ElementRef;
  _name: string;

  @Input()
  set name(value: string) {
    if (value) {
      // do some logic
      this._name = value;
    } else {
      this._name = 'close';
    }
  }

  get absUrl(): any {
    return window.location.href;
  }

  constructor() {}

  ngOnInit(): void {
  }

}
