import { Component, Input, Injectable } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NovaVendaPage } from '../novaVenda/novaVenda';
import { ConfigPage } from '../config/config';
import { InfoPage } from '../info/info';
import { DadosProvider } from '../../providers/dados/dados';
import { MenuPage } from '../menu/menu';
import { ConsultaVendaPage } from '../consultaVenda/consultaVenda';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-detalhamentoLct',
  templateUrl: 'detalhamentoLct.html',
  providers: [
    DadosProvider
  ]
})


export class DetalhamentoLctPage {

  @Input('titulo') titulo:string;
  public items:any[] =[];
  public dados:any[] =[];
  public arrayAuxiliar:any[] =[];
  public tamanhoArray:number;
  public jsonString:string;
  public numero:string;
  public arrayTotalAuxiliar: any[] = [];
  public tamanhoTotalArray:number;
  public totais: any[] = [];
  public token:number;
  public usuario:string;
  public status = "REABERTURA COMANDA Nº "+ this.numero;


  constructor(
    public navCtrl: NavController,
    private dadosProvider: DadosProvider,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController
  ){

    let numero = navParams.get('numero');
    this.numero = numero;
    console.log(numero);


    this.dadosProvider.getListaLancamentos(numero).subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.arrayAuxiliar = objeto_retorno.lancamento;
        this.tamanhoArray = this.arrayAuxiliar.length;
        if(this.tamanhoArray > 1){
          this.items = objeto_retorno.lancamento;
        }else{
          this.items = [objeto_retorno.lancamento];
        }
        console.log(this.items);
        console.log(this.arrayAuxiliar.length);

      },
      error => {
        console.log(error);
      })


      this.dadosProvider.getListaDadosComanda(numero).subscribe(
        (data) => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.arrayAuxiliar = objeto_retorno.comanda;
          this.tamanhoArray = this.arrayAuxiliar.length;
            if(this.tamanhoArray > 1){
              this.dados = objeto_retorno.comanda;
            }else{
              this.dados = [objeto_retorno.comanda];
            }
          console.log("ITEM FUNCIONANDO :" + this.dados);
        },
        error => {
          console.log(error);
        })
        

      this.dadosProvider.getTotalLancamentos(numero).subscribe(
        (data) => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.arrayTotalAuxiliar = objeto_retorno.lancamento;
          this.tamanhoTotalArray = this.arrayTotalAuxiliar.length;
          if(this.tamanhoTotalArray > 1){
            this.totais = objeto_retorno.lancamento;
          }else{
            this.totais = [objeto_retorno.lancamento];
          }
          console.log(this.totais);
          console.log(this.arrayTotalAuxiliar.length);
  
        },
        error => {
          console.log(error);
        })

        this.storage.get('tokenAnterior').then((val) => {
          console.log('Your age is', val);
          this.token = val;
        });
    
        this.storage.get('usuarioAnterior').then((val) => {
          console.log('Your age is', val);
          this.usuario = val;
        });

  }

  excluirLancamento(numLancamento:string, usuario:string){
    this.dadosProvider.setExcluirLancamento(numLancamento,usuario);
    this.navCtrl.pop();
    this.navCtrl.pop();
  }


  goToVenda(comanda,vlrDesconto){

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
              this.navCtrl.push(NovaVendaPage,{comanda : comanda});
            }
          },
          {
            text: 'Aplicar',
            handler: data => {
              console.log([data][0].desconto);
              if([data][0].desconto == ""){
                this.navCtrl.push(NovaVendaPage,{ comanda: comanda, vlrDesconto: vlrDesconto});
                console.log(vlrDesconto);  
              }else{
                this.navCtrl.push(NovaVendaPage,{ comanda: comanda, vlrDesconto: [data][0].desconto});
                console.log([data][0].desconto);
              }
            }
          }
        ]
      });
      prompt.present();
    }else{
      this.navCtrl.push(NovaVendaPage,{ comanda: comanda});
    }
  }

}
