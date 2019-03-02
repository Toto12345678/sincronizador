import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  formNewRegister : FormGroup
  cities = {"Chiapas":["Acacoyagua","Acala","Acapetahua","Altamirano","Amatán","Amatenango de la Frontera","Amatenango del Valle","Angel Albino Corzo","Jaltenango de la Paz (Angel Albino Corzo)","Arriaga","Bejucal de Ocampo","Bella Vista","Berriozábal","Bochil","El Bosque","Cacahoatán","Catazajá","Cintalapa","Cintalapa de Figueroa","Coapilla","Comitán de Domínguez","La Concordia","Copainalá","Chalchihuitán","Chamula","Chanal","Chapultenango","Chenalhó","Chiapa de Corzo","Chiapilla","Chicoasén","Chicomuselo","Chilón","Escuintla","Francisco León","Rivera el Viejo Carmen","Frontera Comalapa","Frontera Hidalgo","La Grandeza","Huehuetán","Huixtán","Huitiupán","Huixtla","La Independencia","Ixhuatán","Ixtacomitán","Ixtapa","Ixtapangajoya","Jiquipilas","Jitotol","Juárez","Larráinzar","La Libertad","Mapastepec","Las Margaritas","Mazapa de Madero","Mazatán","Metapa","Metapa de Domínguez","Mitontic","Motozintla","Motozintla de Mendoza","Nicolás Ruíz","Ocosingo","Ocotepec","Ocozocoautla de Espinosa","Ostuacán","Osumacinta","Oxchuc","Palenque","Pantelhó","Pantepec","Pichucalco","Pijijiapan","El Porvenir","El Porvenir de Velasco Suárez","Villa Comaltitlán","Pueblo Nuevo Solistahuacán","Rayón","Reforma","Las Rosas","Sabanilla","Salto de Agua","San Cristóbal de las Casas","San Fernando","Siltepec","Simojovel","Simojovel de Allende","Sitalá","Socoltenango","Solosuchiapa","Soyaló","Suchiapa","Suchiate","Ciudad Hidalgo","Sunuapa","Tapachula","Tapachula de Córdova y Ordóñez","Tapalapa","Tapilula","Tecpatán","Tenejapa","Teopisca","Tila","Tonalá","Totolapa","La Trinitaria","Tumbalá","Tuxtla Gutiérrez","Tuxtla Chico","Tuzantán","Tzimol","Unión Juárez","Venustiano Carranza","Villa Corzo","Villaflores","Yajalón","San Lucas","Zinacantán","San Juan Cancuc","Aldama","Benemérito de las Américas","Maravilla Tenejapa","Marqués de Comillas","Zamora Pico de Oro","Montecristo de Guerrero","San Andrés Duraznal","Santiago el Pinar"]}
  connected : boolean = false;
  ref = firebase.database().ref()
  data = []

  constructor(
    private formBuilder : FormBuilder,
    private network: Network,
    private platform: Platform,
    public toastCtrl: ToastController,
    private nativeStorage: NativeStorage
  ) { }

  async ngOnInit() {
    this.formNewRegister = this.formBuilder.group({
      'name' : ['', Validators.required],
      'edad' : ['', Validators.required],
      'sexo' : ['', Validators.required],
      'ocupacion' : ['', Validators.required],
      'ciudad' : ['', Validators.required],
    });
    await this.platform.ready()
    await this.initializeNetworkEvents()
  }

  public initializeNetworkEvents() {
    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      this.connected = false;
      this.showToast('Se ha deconectado de la red :-(');
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      this.connected = true;
      this.showToast('Se há conectado a la red');
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

  createRegister () {
    if (this.connected) {
      this.showToast('Se sube');
      let insert = this.ref.push();
      insert.set({
        name: this.formNewRegister.value.name,
        edad: this.formNewRegister.value.edad,
        sexo: this.formNewRegister.value.sexo,
        ocupacion: this.formNewRegister.value.ocupacion,
        ciudad: this.formNewRegister.value.ciudad
      });
    } else {
      this.showToast('no se sube y se guarda');
      this.nativeStorage.getItem('datosList')
      .then(
        data => this.data = JSON.parse(data),
        error => console.error(error)
      );
      this.data.push(this.formNewRegister.value)
      this.nativeStorage.setItem('datosList', JSON.stringify(this.data))
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    }
  }

}
