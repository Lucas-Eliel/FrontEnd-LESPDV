import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DadosProvider } from '../../providers/dados/dados';
import { AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { ConfigPage } from '../config/config';
import { BuscaEntPage } from '../buscaEnt/buscaEnt';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    DadosProvider
  ]
})
export class LoginPage {

  public login = new Array<any>();
  public usuario: string;
  public senha: string;
  public token: number;
  public serial: string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dadosProvider: DadosProvider,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {

   this.gerarToken();
    let token = this.token;
    if(token != null){
      this.token = token;
      this.storage.set('tokenAnterior', this.token);
    }else{
      this.storage.get('tokenAnterior').then((val) => {
        console.log('Your age is', val);
        this.token = val;
      });
    }

  }


  analisaAcesso() {
     this.dadosProvider.getLogin(this.usuario.toUpperCase(),this.senha).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        if(objeto_retorno.login[0].status == "true"){
          this.showAlertTrue()
        }else{
          this.showAlertFalse();
        }
        console.log(objeto_retorno.login[0].status);
      },
      error => {
        console.log(error);
      }
    )
    this.storage.set('usuarioAnterior', this.usuario.toUpperCase());
    this.gravarToken();
    console.log(this.token.toString() + this.usuario);
  }


  gravarToken(){

    this.dadosProvider.setLicenca(this.token.toString() ,this.usuario.toUpperCase()).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
      },
      error => {
        console.log(error);
      }
    )

  }



  gerarToken(){

    let data = new Date();
    let hora = data.getHours();
    let minutos = data.getMinutes();
    let segundos = data.getSeconds();
    let milisegundos = data.getMilliseconds();
    this.token = hora + minutos + segundos + milisegundos;
    console.log(this.token);

  }

  
  showAlertTrue() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Bem vindo!',
      buttons: ['OK']
    });
    alert.present();
    this.goToMenu();
  }

  showAlertFalse() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Usuário e senha incorretos!',
      buttons: ['OK']
    });
    alert.present();
  }

  goToMenu(){
    this.navCtrl.push(MenuPage, { usuario: this.usuario, serial: this.serial });
  }

  goToConfiguracao(){
    this.navCtrl.push(ConfigPage);
  }
}