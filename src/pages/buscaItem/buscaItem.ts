import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NovaVendaPage } from '../novaVenda/novaVenda';
import { ConfigPage } from '../config/config';
import { InfoPage } from '../info/info';
import { DadosProvider } from '../../providers/dados/dados';
import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-buscaItem',
  templateUrl: 'buscaItem.html',
  providers: [
    DadosProvider
  ]
})

export class BuscaItemPage {

  public items:any[] =[];
  public arrayAuxiliar:any[] =[];
  public tamanhoArray:number;
  public jsonString:string;
  public numero:string;
  public arrayTotalAuxiliar: any[] = [];
  public tamanhoTotalArray:number;
  public totais: any[] = [];
  public descrItem:any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private dadosProvider: DadosProvider,
    ) {

      let descrItem = navParams.get('descrItem');
      this.descrItem = descrItem;
      console.log(descrItem);


    this.dadosProvider.getListaItem(descrItem).subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.arrayAuxiliar = objeto_retorno.item;
        this.tamanhoArray = this.arrayAuxiliar.length;
        if(this.tamanhoArray > 1){
          this.items = objeto_retorno.item;
        }else{
          this.items = [objeto_retorno.item];
        }
        console.log(this.items);
        console.log(this.arrayAuxiliar.length);

      },
      error => {
        console.log(error);
      })

  }

  itemSelecionado(codItem:string,descrItem:string,vlrUnit:string){
    this.navCtrl.push(NovaVendaPage,{ codItem: codItem, descrItem: descrItem, vlrUnit: vlrUnit});
  }

}
