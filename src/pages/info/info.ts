import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NovaVendaPage } from '../novaVenda/novaVenda';
import { ConfigPage } from '../config/config';


@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})


export class InfoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ){
  }

  goToConfig(){
    this.navCtrl.push(ConfigPage);
  }

  goToVenda(){
    this.navCtrl.push(NovaVendaPage);
  }

}
