// Importing all the requires Angular and thirdparty dependencies
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {SelectModule} from 'ng2-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2TableModule} from 'ng2-table/ng2-table';
import { NgTableComponent,NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {CdkTableModule} from '@angular/cdk/table';
import { ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {Ng2DeviceDetectorModule} from 'ng2-device-detector';
import 'hammerjs';
import { CarouselModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import {Ng2Webstorage} from 'ngx-webstorage';
import { CookieService} from 'ngx-cookie-service';
// Importing Components from Angular Material
// tslint:disable-next-line:max-line-length
import { MatInputModule, MatCardModule,MatTableModule, MatChipsModule, MatPaginatorModule, MatSelectModule,MatDatepickerModule, 
         MatNativeDateModule, MatTabsModule, MatDialogModule,MatExpansionModule } from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload';
// Importing Route Configuration for PSC project for attaining Single page application
import {PSCRouteConfiguration} from './app.route.config';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import {AccordionModule} from "ngx-bootstrap"
import { ChartsModule } from 'ng2-charts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';




// importing the local components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { HelpComponent } from './help/help.component';
import { CaseHistoryComponent } from './case-history/case-history.component';
import { CaseHistoryParentComponent } from './case-history/case-history-parent.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { InquiryParentComponent } from './inquiry/inquiry-parent.component';
import { UserIdUnlockComponent } from './user-id-unlock/user-id-unlock.component';
import { LoginComponent } from './login/login.component';
import { PscnavigationComponent } from './pscnavigation/pscnavigation.component';
import { PscloginHeaderComponent } from './psclogin-header/psclogin-header.component';
import { PscReportsComponent } from './DMCSReports/psc-reports/psc-reports.component';
import { PscUserReportsComponent } from './psc-user-reports/psc-user-reports.component';
import { DmcsDailyComponent } from './DMCSReports/dmcs-daily/dmcs-daily.component';
import { DmcsWeeklyComponent } from './DMCSReports/dmcs-weekly/dmcs-weekly.component';
import { ReportsLeftNavComponent } from './reports-left-nav/reports-left-nav.component';
import { DmcsreportsNavigationComponent } from './dmcsreports-navigation/dmcsreports-navigation.component';
import { DmcsreportsMonthlyComponent } from './DMCSReports/dmcsreports-monthly/dmcsreports-monthly.component';
import { DmcsreportsQuarterlyComponent } from './DMCSReports/dmcsreports-quarterly/dmcsreports-quarterly.component';
import { DmcsTreasuryOffsetProgramComponent } from './DMCSReports/dmcs-treasury-offset-program/dmcs-treasury-offset-program.component';
import { DmcsCrossServicingComponent } from './DMCSReports/dmcs-cross-servicing/dmcs-cross-servicing.component';
import { DmcsInboundFilesComponent } from './DMCSReports/dmcs-inbound-files/dmcs-inbound-files.component';
import { DmcsOutboundFilesComponent } from './DMCSReports/dmcs-outbound-files/dmcs-outbound-files.component';
import { DmcsAdhocFilesComponent } from './DMCSReports/dmcs-adhoc-files/dmcs-adhoc-files.component';
import { SystemAdministrationComponent } from './system-administration/system-administration.component';
import { DmcsfileuploaderComponent } from './DMCSReports/dmcsfileuploader/dmcsfileuploader.component';

// Importing and registering services
import { PscService } from '../assets/PSCServices/psc-service';
// Importing and register PSCXLSX Service for generating excel reports;
import { PsXlsxService } from '../assets/PSCServices/ps-xlsx-service';
// Importing and registering PSC-Pirnt-Service;
import {PscPrintService} from '../assets/PSCServices/psc-print-service';
// Importing and registering Interceptors
import { PscInterceptors } from '../assets/PSCInterceptors/Psc-Interceptor';
// import { InquiryComponent } from './inquiry/inquiry.component';

// Registering Custom Pipe
import { PscCurrenyCustomPipePipe } from '../assets/PscCustomPipes/psc-curreny-custom-pipe.pipe';
import { PscAuthService} from '../assets/PSCAuth/psc-auth.service';
import { PscAuthGuardService} from '../assets/PSCAuth/psc-auth-guard.service';
import {PSCReportService} from'../assets/PSCServices/psc-reports-service';
import {PscUniqueIdentifierPipe} from '../assets/PscCustomPipes/psc-unique-identifier.pipe';
import { ReportsErrormessageComponent } from './DMCSReports/reports-errormessage/reports-errormessage.component';
import { DmcsalertComponent } from './DMCSReports/dmcsalert/dmcsalert.component';
import {PsExcelService} from '../assets/PSCServices/ps-excel.service';
import { ArraySortPipe } from '../assets/PscCustomPipes/array-sort.pipe';
import {FileComponent} from './multi-file-upload/multi-file-upload.component';
import { GraphComponent } from './graph/graph.component';
import { Graph2Component } from './graph2/graph2.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartParentComponent } from './pie-chart-parent/pie-chart-parent.component';
import { DmcsdashboradComponent } from './dmcsdashborad/dmcsdashborad.component';
import { PieChartParentComponentComponent } from './pie-chart-parent-component/pie-chart-parent-component.component';
import { PieChartComponentComponent } from './pie-chart-component/pie-chart-component.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HighChartComponent } from './high-chart/high-chart.component';
import { Fusion3dChartComponent } from './fusion-3d-chart/fusion-3d-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceivablesComponent } from './receivables/receivables.component';
import { MultiChartComponent } from './multi-chart/multi-chart.component';
import { RederComponent } from './reder/reder.component';
import { RederChildComponent } from './reder-child/reder-child.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopNavComponent,
    LeftNavComponent,
    FooterComponent,
    HomeContentComponent,   
    HelpComponent,  
    PscCurrenyCustomPipePipe,   
    CaseHistoryComponent,
    CaseHistoryParentComponent,
    InquiryComponent,
    InquiryParentComponent,
    UserIdUnlockComponent,
    LoginComponent,
    PscnavigationComponent,
    PscloginHeaderComponent,
    PscReportsComponent,
    PscUserReportsComponent,
    DmcsWeeklyComponent,
    ReportsLeftNavComponent,
    DmcsreportsNavigationComponent,
    DmcsreportsMonthlyComponent,
    DmcsreportsQuarterlyComponent,
    DmcsTreasuryOffsetProgramComponent,
    DmcsCrossServicingComponent,
    DmcsInboundFilesComponent,
    DmcsOutboundFilesComponent,
    DmcsAdhocFilesComponent,
    SystemAdministrationComponent,
    DmcsDailyComponent,
    DmcsfileuploaderComponent,
    PscUniqueIdentifierPipe,
    ReportsErrormessageComponent,
    DmcsalertComponent,
    ArraySortPipe,
    FileComponent,
    GraphComponent,
    Graph2Component,
    PieChartComponent,
    PieChartParentComponent,
    DmcsdashboradComponent,
    PieChartComponentComponent,
    PieChartParentComponentComponent,
    BarChartComponent,
    HighChartComponent,
    Fusion3dChartComponent,
    DashboardComponent,
    ReceivablesComponent,
    MultiChartComponent,
    RederComponent,
    RederChildComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PSCRouteConfiguration,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatPaginatorModule, 
    CdkTableModule,
    MatTableModule,
    MatSelectModule, 
    MatDatepickerModule,
    MatTabsModule,
    MatNativeDateModule,
    MatExpansionModule,
    CarouselModule.forRoot(),
    CommonModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    SelectModule,
    NgbModule.forRoot(),
    AsyncLocalStorageModule,
    Ng2Webstorage,     
    Ng2TableModule,
    ScrollToModule.forRoot(),
    Ng2DeviceDetectorModule.forRoot(),
    MatDialogModule,
    FileUploadModule,
    AccordionModule.forRoot(),
    ChartsModule,
    FusionChartsModule
  ],
  providers: [PscService, PscCurrenyCustomPipePipe, {provide: HTTP_INTERCEPTORS, useClass: PscInterceptors, multi: true},
              PsXlsxService, PscPrintService, PscAuthService, PscAuthGuardService, CookieService, PSCReportService,PsExcelService],
  entryComponents:[DmcsfileuploaderComponent,ReportsErrormessageComponent,DmcsalertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
