import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { BuscaEntPage } from '../buscaEnt/buscaEnt';
import { BuscaUnPage } from '../buscaUN/buscaUN';
import { BuscaItemPage } from '../buscaItem/buscaItem';
import { ConsultaVendaPage } from '../consultaVenda/consultaVenda';



@Component({
  selector: 'page-novaVenda',
  templateUrl: 'novaVenda.html',
  providers: [
    DadosProvider
  ]
})

export class NovaVendaPage {

  /* --------- Variáveis ---------- */

  public products: any[] = [];
  public selectedProduct: any;
  public productFound:boolean = false;
  public jsonString:string;
  public numComanda:string;
  public codItem:string;
  public arrayItem: any[] = [];
  public arrayAuxiliarItem: any[] = [];
  public arrayAuxiliar: any[] = [];
  public tamanhoArrayItem:number;
  public tamanhoArray:number;

  public eanItem: string;
  public venda:any;
  public qtd:number = 0.00;
  public total:number = 0.00;
  public subtotal:number = 0.00;
  public desconto:number = 0.00;
  public vlrUnit:number = 0.00;
  public descrItem:any;
  public numero:any;
  public novaComanda:any[] =[];
  public descrEntidade:any;
  public descrUnidade:any;
  public codEntidade:any;
  public codUnidade:any;
  public token:number;
  public usuario:string;


 /* --------- Construtor ---------- */

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private dadosProvider: DadosProvider,
    public storage: Storage,
    public platform: Platform
  ){

    //Impede voltar pelo botao do Aparelho
    platform.registerBackButtonAction(() => {},1);

    let descrEntidade = navParams.get('descrEntidade');
    if(descrEntidade != null){
      this.descrEntidade = descrEntidade;
      this.storage.set('descrEntidadeAnterior', this.descrEntidade);
    }else{
      this.storage.get('descrEntidadeAnterior').then((val) => {
        console.log('Your age is', val);
        this.descrEntidade = val;
      });
    }

    let codEntidade = navParams.get('codEntidade');
    if(codEntidade != null){
      this.codEntidade = codEntidade;
      this.storage.set('codEntidadeAnterior', this.codEntidade);
    }else{
      this.storage.get('codEntidadeAnterior').then((val) => {
        console.log('Your age is', val);
        this.codEntidade = val;
      });
    }

    let descrUnidade = navParams.get('descrUnidade');
    if(descrUnidade != null){
      this.descrUnidade = descrUnidade;
      this.storage.set('descrUnidadeAnterior', this.descrUnidade);
    }else{
      this.storage.get('descrUnidadeAnterior').then((val) => {
        console.log('Your age is', val);
        this.descrUnidade = val;
      });
    }

    let codUnidade = navParams.get('codUnidade');
    if(codUnidade != null){
      this.codUnidade = codUnidade;
      this.storage.set('codUnidadeAnterior', this.codUnidade);
    }else{
      this.storage.get('codUnidadeAnterior').then((val) => {
        console.log('Your age is', val);
        this.codUnidade = val;
      });
    }

    let numComanda = navParams.get('numero');
    let numComandaReabertura = navParams.get('comanda');
    if(numComanda != null){
      this.numComanda = numComanda;
      this.storage.set('comandaAnterior', this.numComanda);
      console.log('Entrou')
    }
    else if(numComandaReabertura != null){
      this.buscaDadosComanda(numComandaReabertura);
    }else{
      this.storage.get('comandaAnterior').then((val) => {
        console.log('Your age is', val);
        this.numComanda = val;
      });
    }


    let codItem = navParams.get('codItem');
    if(codItem != null){
      this.codItem = codItem;
      this.storage.set('codItemAnterior', this.codItem);
    }else{
      this.storage.get('codItemAnterior').then((val) => {
        console.log('Your age is', val);
        this.codItem = val;
      });
    }

    let descrItem = navParams.get('descrItem');
    if(descrItem != null){
      this.descrItem = descrItem;
      this.storage.set('descrItemAnterior', this.descrItem);
    }else{
      this.storage.get('descrItemAnterior').then((val) => {
        console.log('Your age is', val);
        this.descrItem = val;
      });
    }

    this.storage.get('tokenAnterior').then((val) => {
      console.log('Your age is', val);
      this.token = val;
    });

    this.storage.get('usuarioAnterior').then((val) => {
      console.log('Your age is', val);
      this.usuario = val;
    });

    let vlrUnit = navParams.get('vlrUnit');
    if(vlrUnit != null){
      this.vlrUnit = vlrUnit;
      this.storage.set('vlrUnitlAnterior', this.vlrUnit);
    }else{
      this.storage.get('vlrUnitAnterior').then((val) => {
        console.log('Your age is', val);
        this.vlrUnit = (val == "" ? null : val);
        if(this.vlrUnit == null){
          this.vlrUnit = 0.00;
        }
      });
    }

    let desconto = navParams.get('vlrDesconto');
    if(desconto != null){
      this.desconto = desconto;
      this.storage.set('descontoAnterior', this.desconto);
    }else{
      this.storage.get('descontoAnterior').then((val) => {
        console.log('Your age is', val);
        this.desconto = (val == "" ? null : val) ;
        console.log('retorno',this.desconto)
     if(this.desconto == null){
          this.desconto = 0.00;
        }
      });
    }
 }



 /* --------- Banco de dados Local Storage ---------- */


 eliminarDadoAnterior(){
    this.storage.set('comandaAnterior', '');
    this.storage.set('codUnidadeAnterior', '');
    this.storage.set('descrUnidadeAnterior', '');
    this.storage.set('codEntidadeAnterior', '');
    this.storage.set('descrEntidadeAnterior', '');
    this.storage.set('codItemAnterior', '');
    this.storage.set('descrItemAnterior', '');
    this.storage.set('vlrUnitAnterior', '');
    this.storage.set('descontoAnterior', '');
    this.storage.set('agenteAnterior', '');
 }



 /* --------- Metodos Diversos ---------- */

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        this.eanItem = barcodeData.text;
      } else {
        this.productFound = false;
        this.eanItem = barcodeData.text;
        this.getItem(this.eanItem);
        this.toast.show(this.selectedProduct, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


  getItem(ean:string){
    this.dadosProvider.getItem(ean).subscribe(
      (data) => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.arrayAuxiliarItem = objeto_retorno.item;
        this.tamanhoArrayItem = this.arrayAuxiliar.length;
          if(this.tamanhoArrayItem > 1){
            this.arrayItem = objeto_retorno.item;
          }else{
            this.arrayItem = [objeto_retorno.item];
          }
          this.codItem = this.arrayItem[0].codigo;
          this.descrItem = this.arrayItem[0].descr;
          this.vlrUnit = this.arrayItem[0].valor;
      },
      error => {
        console.log(error);
      })
    }


    fecharTransacaoSAM(){
    
      this.dadosProvider.getFecharTransacaoSAM(this.usuario.toUpperCase()).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          console.log("Transação Fechada");
        },
        error => {
          console.log(error);
        }
      )
    }


    buscaDadosComanda(comanda:any){
      this.dadosProvider.getListaDadosComanda(comanda).subscribe(
        (data) => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.arrayAuxiliarItem = objeto_retorno.comanda;
          this.tamanhoArrayItem = this.arrayAuxiliar.length;
            if(this.tamanhoArrayItem > 1){
              this.arrayItem = objeto_retorno.comanda;
            }else{
              this.arrayItem = [objeto_retorno.comanda];
            }
            this.numComanda = this.arrayItem[0].numero;
            this.codEntidade = this.arrayItem[0].codEntidade;
            this.descrEntidade = this.arrayItem[0].descrEntidade;
            this.codUnidade = this.arrayItem[0].codUnidade;
            this.descrUnidade = this.arrayItem[0].descrUnidade;


            this.storage.set('comandaAnterior', this.numComanda);
            this.storage.set('codEntidadeAnterior', this.codEntidade);
            this.storage.set('descrEntidadeAnterior', this.descrEntidade);
            this.storage.set('codUnidadeAnterior', this.codUnidade);
            this.storage.set('descrUnidadeAnterior', this.descrUnidade);

          console.log("ITEM FUNCIONANDO :" + this.codItem);
        },
        error => {
          console.log(error);
        })
      }
    

  getUltimoNumeroComanda(){
    
        console.log('NUMERO DA COMANDA É',this.numComanda);

        if(this.numComanda == "NOVA VENDA"){
        this.dadosProvider.getUltimoNumeroComanda().subscribe(
          (data) => {
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.arrayAuxiliar = objeto_retorno.comanda;
            if(this.arrayAuxiliar == null){
               this.numComanda = "1";
            }else{
              this.tamanhoArray = this.arrayAuxiliar.length;
              if(this.tamanhoArray > 1){
                this.novaComanda = objeto_retorno.comanda;
              }else{
                this.novaComanda = [objeto_retorno.comanda];
              }
              this.numComanda = this.novaComanda[0].numero;
            }
            console.log(this.novaComanda);
            this.gravarDados();
          },
          error => {
            console.log(error);
          }
        )
      }else{
        this.gravarDados();
      }
    }

    

    gravarLancamento(){

      this.getUltimoNumeroComanda();

    }
      
    gravarDados(){

      this.venda = {
        "comanda": this.numComanda,
        "codUN": this.codUnidade,
        "codItem": this.codItem,
        "idEmpresa": "1075098",
        "codEnt": this.codEntidade,
        "idCC": "67660",
        "codNat": "050101024",
        "idCadDiversos": "255333",
        "codElemento:": "25335623",
        "codTabPreco": "001",
        "codFormPgto": "001",
        "qtd" : this.qtd.toString(),
        "vlrUnit" : this.vlrUnit,
        "usuario" : this.usuario,
        "desconto" : (this.subtotal * this.desconto / 100)
      }
      console.log(this.venda);
      this.dadosProvider.setGravarLancamento(this.venda);
      this.numero = null;
      this.storage.set('codItemAnterior', '');
      this.storage.set('descrItemAnterior', '');
      this.storage.set('vlrUnitAnterior', '');
      this.storage.set('comandaAnterior', this.numComanda);
      this.navCtrl.push(NovaVendaPage);
    }




    somarQuantidade(){
      this.qtd = this.qtd + 1;
      this.subtotal = this.vlrUnit * this.qtd;
      this.total  = this.subtotal - (this.subtotal * this.desconto / 100);
      console.log(this.desconto);
    }

    subtrairQuantidade(){
        this.qtd = this.qtd - 1;
        this.subtotal = this.vlrUnit * this.qtd;
        this.total  = this.subtotal - (this.subtotal * this.desconto / 100);
    }


 /* --------- Abrir Tela Push ---------- */

  consultarVendas(){
    this.navCtrl.push(ConsultaVendaPage);
  }

  goToHome(){
    this.fecharTransacaoSAM();
    this.eliminarDadoAnterior();
    this.navCtrl.push(MenuPage);
  }

  goToBuscaEntidade(descr:string){
    this.navCtrl.push(BuscaEntPage,{ descrEntidade: descr });
  }

  goToBuscaUnidade(descr:string){
    this.navCtrl.push(BuscaUnPage,{ descrUnidade: descr });
  }

  goToBuscaItem(descr:string){
    this.navCtrl.push(BuscaItemPage,{ descrItem: descr });
  }


}
