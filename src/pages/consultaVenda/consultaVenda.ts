import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DetalhamentoLctPage } from '../detalhamentoLct/detalhamentoLct';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-consultaVenda',
  templateUrl: 'consultaVenda.html',
  providers: [
    DadosProvider
  ]
})

export class ConsultaVendaPage {

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
  public products: any[] = [];
  public selectedProduct: any;
  public productFound:boolean = false;
  public vendas = ["banaba","snasnxk","skxnasnxa"];
  public numComandas: any[] = [];
  public comanda:string;
  public arrayAuxiliar: any[] = [];
  public tamanhoArray:number;
  public token:number;
  public usuario:string;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private dadosProvider: DadosProvider,
    public storage: Storage
  ){

    this.dadosProvider.getListaNumLancamentos().subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.arrayAuxiliar = objeto_retorno.lancamento;
        this.tamanhoArray = this.arrayAuxiliar.length;
        if(this.tamanhoArray > 1){
          this.numComandas = objeto_retorno.lancamento;
        }else{
          this.numComandas = [objeto_retorno.lancamento];
        }
        console.log(this.numComandas);
        console.log(this.arrayAuxiliar.length);

      },
      error => {
        console.log(error);
      }
    )

    this.storage.get('tokenAnterior').then((val) => {
      console.log('Your age is', val);
      this.token = val;
    });

    this.storage.get('usuarioAnterior').then((val) => {
      console.log('Your age is', val);
      this.usuario = val;
    });
    
  }

  goToDetalhamentoLCT(comanda:string){
    this.navCtrl.push(DetalhamentoLctPage,{ numero: comanda });
  }
}
