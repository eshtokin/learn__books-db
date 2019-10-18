import { Component, OnInit, OnDestroy } from '@angular/core';
import {ErrorService} from 'src/app/services/error.service';
import MicroModal from 'micromodal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  public errorText;
  subscription: Subscription;

  constructor(private messageService: ErrorService) {}

  ngOnInit() {
    this.subscription = this.messageService.getMessage()
    .subscribe(mymessage => {
      if (mymessage) {
        this.errorText = mymessage;
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
