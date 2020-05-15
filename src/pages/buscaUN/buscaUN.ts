import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NovaVendaPage } from '../novaVenda/novaVenda';
import { ConfigPage } from '../config/config';
import { InfoPage } from '../info/info';
import { DadosProvider } from '../../providers/dados/dados';
import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-buscaUN',
  templateUrl: 'buscaUN.html',
  providers: [
    DadosProvider
  ]
})

export class BuscaUnPage {

  public items:any[] =[];
  public arrayAuxiliar:any[] =[];
  public tamanhoArray:number;
  public jsonString:string;
  public numero:string;
  public arrayTotalAuxiliar: any[] = [];
  public tamanhoTotalArray:number;
  public totais: any[] = [];
  public descrUnidade:any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private dadosProvider: DadosProvider,
    ) {

      let descrUnidade = navParams.get('descrUnidade');
      this.descrUnidade = descrUnidade;
      console.log(descrUnidade);


    this.dadosProvider.getListaUnidades(descrUnidade).subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.arrayAuxiliar = objeto_retorno.unidade;
        this.tamanhoArray = this.arrayAuxiliar.length;
        if(this.tamanhoArray > 1){
          this.items = objeto_retorno.unidade;
        }else{
          this.items = [objeto_retorno.unidade];
        }
        console.log(this.items);
        console.log(this.arrayAuxiliar.length);

      },
      error => {
        console.log(error);
      })

  }

  unidadeSelecionada(codigoUn:string,descrUn:string,codigoEnt:string,descrEnt:string){
    this.navCtrl.push(NovaVendaPage,{ codUnidade: codigoUn, descrUnidade: descrUn, codEntidade: codigoEnt,descrEntidade:descrEnt});
  }

}
