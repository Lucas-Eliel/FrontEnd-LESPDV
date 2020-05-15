import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { DadosProvider } from '../providers/dados/dados';
import { HttpModule } from '@angular/http';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { ConfigPage } from '../pages/config/config';
import { NovaVendaPage } from '../pages/novaVenda/novaVenda';
import { InfoPage } from '../pages/info/info';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DetalhamentoLctPage } from '../pages/detalhamentoLct/detalhamentoLct';
import { IonicStorageModule } from '@ionic/storage';
import { BuscaEntPage } from '../pages/buscaEnt/buscaEnt';
import { BuscaUnPage } from '../pages/buscaUN/buscaUN';
import { BuscaItemPage } from '../pages/buscaItem/buscaItem';
import { ConsultaVendaPage } from '../pages/consultaVenda/consultaVenda';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MenuPage,
    ConfigPage,
    NovaVendaPage,
    ConsultaVendaPage,
    InfoPage,
    DetalhamentoLctPage,
    BuscaEntPage,
    BuscaUnPage,
    BuscaItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    ConfigPage,
    NovaVendaPage,
    ConsultaVendaPage,
    InfoPage,
    DetalhamentoLctPage,
    BuscaEntPage,
    BuscaUnPage,
    BuscaItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast
  ]
})
export class AppModule {}
