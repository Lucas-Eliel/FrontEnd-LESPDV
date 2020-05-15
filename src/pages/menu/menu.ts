import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NovaVendaPage } from '../novaVenda/novaVenda';
import { ConfigPage } from '../config/config';
import { InfoPage } from '../info/info';
import { DadosProvider } from '../../providers/dados/dados';
import { ConsultaVendaPage } from '../consultaVenda/consultaVenda';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [
    DadosProvider
  ]
})

export class MenuPage {

  public arrayAuxiliar:any[] =[];
  public tamanhoArray:number;
  public novaComanda:any[] =[];
  public numComanda:string;
  public token: number;
  public usuario: string;
  public status = "NOVA VENDA";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dadosProvider: DadosProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
  ){

    this.storage.get('tokenAnterior').then((val) => {
      console.log('Your age is', val);
      this.token = val;
    });

    this.storage.get('usuarioAnterior').then((val) => {
      console.log('Your age is', val);
      this.usuario = val;
    });
  }

  
  verificaToken(){
    
    this.dadosProvider.getVerificaToken(this.token.toString(),this.usuario.toUpperCase()).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        if(objeto_retorno.token[0].status == "false"){
          this.showAlertFalse();
        }
      },
      error => {
        console.log(error);
      }
    )

  }

  fecharTransacaoSAM(){
    
    this.dadosProvider.getFecharTransacaoSAM(this.usuario.toUpperCase()).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
      },
      error => {
        console.log(error);
      }
    )
  }

  showAlertFalse() {
    let alert = this.alertCtrl.create({
      title: 'Licença',
      subTitle: 'Verifique sua Licença ! Está sendo acessada por outro usuário!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(LoginPage);
  }

  goToInfo(){
    this.navCtrl.push(InfoPage);
    this.verificaToken();
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToConfig(){
    this.navCtrl.push(ConfigPage);
    this.verificaToken();
  }

  goToNovaVenda(){
    this.navCtrl.push(NovaVendaPage,{numero : this.status});
    this.verificaToken();
    this.fecharTransacaoSAM();
  }

  goToConsultaVenda(){
    this.navCtrl.push(ConsultaVendaPage);
    this.verificaToken();
  }

}
