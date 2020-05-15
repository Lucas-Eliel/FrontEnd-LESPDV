import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigPage } from '../../pages/config/config';
import { Storage } from '@ionic/storage';


@Injectable()
export class DadosProvider {


  public url:string = "http://lessistemas.com.br/APILESPDV/dados";
  public ip:string;
  public porta:string;
  public arrayAuxiliar: any[]= [];
  public tamanhoArray:number;

  constructor(
          public http: Http,
          public storage: Storage
  ) {
    console.log('Hello DadosRequestProvider Provider');
  }


 /* gerarURL(ip:string,porta:string){
    console.log(this.url);
    this.url = "http://"+ip+":"+porta+"/LESPDV/dados";
  }


  getIpAPI(){
    this.storage.get('ipLocal').then((val) => {
        this.ip = val;
        return this.ip;
    });
  }

  getPortaAPI(){
    this.storage.get('portaLocal').then((val) => {
      this.porta = val;
      return this.porta;
    });
  }*/




  /* ---------- @GET ---------- */

  getLogin(usuario:string,senha:string){
    return this.http.get("http://lessistemas.com.br/APISITELES/dados/validaLicenca/"+usuario+"/"+senha);
  }

  getLicencaAtiva(){
    return this.http.get("http://lessistemas.com.br/APISITELES/dados/listarLicenca");
  }

  setLicenca(token:string,usuario:string){
    return this.http.get("http://lessistemas.com.br/APISITELES/dados/setLicenca/"+token+"/"+usuario);
  }

  getVerificaToken(token:string,usuario:string){
    return this.http.get("http://lessistemas.com.br/APISITELES/dados/validaToken/"+token+"/"+usuario);
  }

  getListaNumLancamentos(){
    return this.http.get(this.url + "/listarNumLancamentos");
  }

  getListaLancamentos(comanda:string){
    return this.http.get(this.url + "/listarLancamentos/"+comanda);
  }

  getTotalLancamentos(comanda:string){
    return this.http.get(this.url + "/listarTotalLancamentos/"+comanda);
  }

  getUltimoNumeroComanda(){
    return this.http.get(this.url + "/ultimoNumeroComanda");
  }

  getListaDadosComanda(comanda:string){
    return this.http.get(this.url + "/listarDadosComanda/"+comanda);
  }

  getItem(ean:string){
    return this.http.get(this.url + "/listarItemEan/"+ean);
  }

  getListaItem(descr:string){
    return this.http.get(this.url + "/listarItemDescr/"+descr);
  }

  getListaEntidades(descrEntidade:string){
    return this.http.get(this.url + "/listarEntidades/"+descrEntidade);
  }

  getListaUnidades(descrUnidade:string){
    return this.http.get(this.url + "/listarUnidades/"+descrUnidade);
  }

  getFecharTransacaoSAM(usuario:string){
    return this.http.get(this.url + "/fecharTransacaoSAM/"+usuario);
  }

  

  /* --------- @POST ---------- */

  setGravarLancamento(venda:any){
    let headers = new Headers();
        headers.append('Content-Type','application/json');

    let options = new RequestOptions({headers : headers});

    console.log(venda);
    this.http.post(this.url + "/novaVenda",venda,options)
             .map(res => { res.json() })
             .subscribe(data => console.log(data));
  }



  /* --------- @DELETE ---------- */

  setExcluirLancamento(numLancamento:string, usuario:string){
    let headers = new Headers();
        headers.append('Content-Type','application/json');

    let options = new RequestOptions({headers : headers});

    console.log(numLancamento);
    this.http.delete(this.url + "/excluiVenda/"+numLancamento+"/"+usuario,options)
             .map(res => { res.json() })
             .subscribe(data => console.log(data));
  }

}
