import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {ErreurComponent} from './layout/erreur/erreur.component';
import {LoginComponent} from './layout/login/login.component';
import {TopComponent} from './layout/template/top/top.component';
import {SidebarComponent} from './layout/template/sidebar/sidebar.component';
import {FooterComponent} from './layout/template/footer/footer.component';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {ListUserComponent} from './layout/user/list-user/list-user.component';
import {DetailUserComponent} from './layout/user/detail-user/detail-user.component';
import {AddUserComponent} from './layout/user/add-user/add-user.component';
import {ListAppelComponent} from './layout/appel/list-appel/list-appel.component';
import { AddAppelComponent } from './layout/appel/add-appel/add-appel.component';
import {DetailAppelComponent} from './layout/appel/detail-appel/detail-appel.component';
import {ExportService} from './services/export.service';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { EditPasswordComponent } from './layout/user/edit-password/edit-password.component';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErreurComponent,
    LoginComponent,
    TopComponent,
    SidebarComponent,
    FooterComponent,
    ListUserComponent,
    DetailUserComponent,
    AddUserComponent,
    ListAppelComponent,
    DetailAppelComponent,
    AddAppelComponent,
    EditPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [authInterceptorProviders, ExportService, DatePipe, {provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
