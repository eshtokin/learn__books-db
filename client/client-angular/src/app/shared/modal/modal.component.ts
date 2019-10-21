import { Component, OnInit, OnDestroy } from '@angular/core';
import { errorService } from 'src/app/services/error.service';
import { Subscription } from 'rxjs';
import MicroModal from 'micromodal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  public errorText;
  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = errorService.getMessage()
    .subscribe(mymessage => {
      if (mymessage) {
        this.errorText = mymessage;
      }
    });
  }

  ngOnDestroy() {
    errorService.clearMessage();
    this.subscription.unsubscribe();
  }
}
