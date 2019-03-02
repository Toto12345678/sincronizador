import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  ref = firebase.database().ref();
  connected : boolean = false;
  data = []
  constructor(
    private network: Network,
    private platform: Platform,
    public toastCtrl: ToastController,
    private nativeStorage: NativeStorage
  ){}

  async ngOnInit() {
    await this.platform.ready()
    await this.initializeNetworkEvents()
  }

  public initializeNetworkEvents() {
    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      if(this.nativeStorage.getItem('datosList')){
        this.showToast('Se estan actualizando datos');
        this.nativeStorage.getItem('datosList')
        .then(
          data => this.data = JSON.parse(data)
        );
        this.data.forEach(item => {
          let insert = this.ref.push();
          insert.set(item);
        });
        console.log("Toto arreglo data: "+this.data);
        console.log('LOcal'+localStorage);
        this.nativeStorage.remove('datosList');
        this.data = [];
      }
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "bottom"
    });

    toast.present();
  }
}
