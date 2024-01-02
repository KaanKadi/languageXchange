import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ErrorInterface } from 'src/app/models/types/errors/error.interface';

import { verifyEmailConfirmationRequestInterface } from 'src/app/models/types/requests/verifyEmailConfirmationRequest.interface';
import { verifyEmailConfirmationAction } from 'src/app/store/actions/auth.action';
import {
  verifyEmailErrorSelector,
  verifyEmailConfirmationSuccessSelector,
} from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  subscription: Subscription;
  second: number = 3;

  verified: boolean = null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {}

  async ngOnInit() {}

  ionViewWillEnter() {
    this.subscription = new Subscription();

    // Present Toast if error
    this.subscription.add(
      this.store
        .pipe(select(verifyEmailErrorSelector))
        .subscribe((error: ErrorInterface) => {
          if (error) {
            this.presentToast(error.message, 'danger');
            this.verified = false;
          }
        })
    );

    // Present Toast if verifyEmailConfirmationSuccess
    this.subscription.add(
      this.store
        .pipe(select(verifyEmailConfirmationSuccessSelector))
        .subscribe((verifyEmailConfirmationSuccess: boolean) => {
          if (verifyEmailConfirmationSuccess) {
            this.presentToast(
              'Email has been successfully verified!',
              'success'
            );
            this.verified = true;
          }
        })
    );
  }

  ionViewWillLeave() {
    // Unsubscribe from all subscriptions
    this.subscription.unsubscribe();
  }

  ionViewDidEnter() {
    this.initValues();
    this.countDown();
  }

  initValues() {
    const params = this.route.snapshot.queryParamMap;

    if (!params.get('userId') || !params.get('secret')) {
      // Present Toast if error
      this.presentToast('Invalid URL', 'danger');
      setTimeout(() => {
        window.location.href = '/home';
      }, 3000);
      return;
    }

    const request: verifyEmailConfirmationRequestInterface = {
      userId: params.get('userId'),
      secret: params.get('secret'),
    };

    this.store.dispatch(verifyEmailConfirmationAction({ request }));
  }

  //
  // Count Down
  //

  countDown() {
    const interval = setInterval(() => {
      this.second--;

      if (this.second === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  //
  // Present Toast
  //

  async presentToast(msg: string, color?: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color || 'primary',
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }
}