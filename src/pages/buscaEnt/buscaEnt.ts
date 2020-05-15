import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NovaVendaPage } from '../novaVenda/novaVenda';
import { ConfigPage } from '../config/config';
import { InfoPage } from '../info/info';
import { DadosProvider } from '../../providers/dados/dados';
import { MenuPage } from '../menu/menu';
import { ValueTransformer } from '@angular/compiler/src/util';


@Component({
  selector: 'page-buscaEnt',
  templateUrl: 'buscaEnt.html',
  providers: [
    DadosProvider
  ]
})

export class BuscaEntPage {

  public items:any[] =[];
  public arrayAuxiliar:any[] =[];
  public tamanhoArray:number;
  public jsonString:string;
  public numero:string;
  public arrayTotalAuxiliar: any[] = [];
  public tamanhoTotalArray:number;
  public totais: any[] = [];
  public descrEntidade:any;
  public vlrDesconto:string;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private dadosProvider: DadosProvider,
      public alertCtrl: AlertController
    ) {

      let descrEntidade = navParams.get('descrEntidade');
      this.descrEntidade = descrEntidade;
      console.log(descrEntidade);


    this.dadosProvider.getListaEntidades(descrEntidade).subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.arrayAuxiliar = objeto_retorno.entidade;
        this.tamanhoArray = this.arrayAuxiliar.length;
        if(this.tamanhoArray > 1){
          this.items = objeto_retorno.entidade;
        }else{
          this.items = [objeto_retorno.entidade];
        }
        console.log(this.items);
        console.log(this.arrayAuxiliar.length);

      },
      error => {
        console.log(error);
      })

  }


  entidadeSelecionada(codEnt:string,nomeEnt:string,vlrDesconto:string){

    if(vlrDesconto != "0.00"){

      const prompt = this.alertCtrl.create({
        title: 'Desconto',
        message: "Existe Desconto de "+vlrDesconto+" % para o Cliente, deseja aplicar ? Caso queira utilizar uma taxa diferente, digite o valor no campo abaixo:"
,
        inputs: [
          {
            name: 'desconto',
            placeholder: 'Digite aqui o desconto manualmente'

          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              this.navCtrl.push(NovaVendaPage,{ codEntidade: codEnt, descrEntidade: nomeEnt});
            }
          },
          {
            text: 'Aplicar',
            handler: data => {
              console.log([data][0].desconto);
              if([data][0].desconto == ""){
                this.navCtrl.push(NovaVendaPage,{ codEntidade: codEnt, descrEntidade: nomeEnt, vlrDesconto: vlrDesconto});
                console.log(vlrDesconto);  
              }else{
                this.navCtrl.push(NovaVendaPage,{ codEntidade: codEnt, descrEntidade: nomeEnt, vlrDesconto: [data][0].desconto});
                console.log([data][0].desconto);
              }
            }
          }
        ]
      });
      prompt.present();
    }else{
      this.navCtrl.push(NovaVendaPage,{ codEntidade: codEnt, descrEntidade: nomeEnt});
    }
  }

}

