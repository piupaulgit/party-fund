import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private toasterCtrl: ToastController) { }

  // toaster service
  async showToaster(message, type){
    const toast = await this.toasterCtrl.create({
      color: type,
      duration: 2000,
      message: message,
      showCloseButton: true,
      animated: true
    })
    await toast.present()
  }
  // ===================================

}
