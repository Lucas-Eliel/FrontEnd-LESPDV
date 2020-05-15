import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [
    DadosProvider
  ]
})
export class ConfigPage {

  public codEnt: string;
  public idEmpresa: string;
  public codUN: string;
  public codItem: string;
  public idCC: string;
  public codNat: string;
  public idCadDiversos: string;
  public codElemento: string;
  public codTabPreco: string;
  public codFormPgto: string;    

  //Utilizados
  public ipLocal:string = 'ipLocal';
  public inputIpLocal:string;     
  public portaLocal:string = 'portaLocal';
  public inputPortaLocal:string;   
  public serialLocal:string = 'serialLocal';
  public inputSerialLocal:string;   
  public tamanhoArray:number;
  public token:number;
  public usuario:string;        

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dadosProvider: DadosProvider,
    public storage: Storage
  ){
    this.consultarConfig();

    this.storage.get('tokenAnterior').then((val) => {
      console.log('Your age is', val);
      this.token = val;
    });

    this.storage.get('usuarioAnterior').then((val) => {
      console.log('Your age is', val);
      this.usuario = val;
    });
  }


  gravarConfig(){
      this.storage.set(this.ipLocal, this.inputIpLocal);
      this.storage.set(this.portaLocal, this.inputPortaLocal);
      this.storage.set(this.serialLocal, this.inputSerialLocal);
   }
    
   consultarConfig(){

      this.storage.get(this.ipLocal).then((val) => {
        console.log('Your age is', val);
        this.inputIpLocal = val;
      });
      this.storage.get(this.portaLocal).then((val) => {
        console.log('Your age is', val);
        this.inputPortaLocal = val;
      });
      this.storage.get(this.serialLocal).then((val) => {
        console.log('Your age is', val);
        this.inputSerialLocal = val;
      });

   }

}
