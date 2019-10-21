import { OnInit, Component, Input } from '@angular/core';
import MicroModal from 'micromodal';
import { errorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  @Input() errorText: string;

  public error;
  constructor() {}

  ngOnInit() {
    if (this.errorText) {
      MicroModal.show('modal-1');
    }
  }
}
