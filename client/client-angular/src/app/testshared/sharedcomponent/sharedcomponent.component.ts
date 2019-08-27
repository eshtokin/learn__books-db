import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sharedcomponent',
  templateUrl: './sharedcomponent.component.html',
  styleUrls: ['./sharedcomponent.component.scss']
})
export class SharedcomponentComponent implements OnInit {
  @Input () component;
  constructor() { }

  ngOnInit() {
  }

}
