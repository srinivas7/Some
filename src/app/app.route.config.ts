// Import all the required dependencies
import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Import all the local components for configuring the routes

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
import { PscReportsComponent } from './DMCSReports/psc-reports/psc-reports.component';
import { PscUserReportsComponent } from './psc-user-reports/psc-user-reports.component';
import {PscAuthGuardService} from '../assets/PSCAuth/psc-auth-guard.service';
import { DmcsDailyComponent } from './DMCSReports/dmcs-daily/dmcs-daily.component';
import { DmcsWeeklyComponent } from './DMCSReports/dmcs-weekly/dmcs-weekly.component';
import { DmcsreportsNavigationComponent } from './dmcsreports-navigation/dmcsreports-navigation.component';
import { DmcsreportsMonthlyComponent } from './DMCSReports/dmcsreports-monthly/dmcsreports-monthly.component';
import { DmcsreportsQuarterlyComponent } from './DMCSReports/dmcsreports-quarterly/dmcsreports-quarterly.component';
import { DmcsTreasuryOffsetProgramComponent } from './DMCSReports/dmcs-treasury-offset-program/dmcs-treasury-offset-program.component';
import { DmcsCrossServicingComponent } from './DMCSReports/dmcs-cross-servicing/dmcs-cross-servicing.component';
import { DmcsInboundFilesComponent } from './DMCSReports/dmcs-inbound-files/dmcs-inbound-files.component';
import { DmcsOutboundFilesComponent } from './DMCSReports/dmcs-outbound-files/dmcs-outbound-files.component';
import { DmcsAdhocFilesComponent } from './DMCSReports/dmcs-adhoc-files/dmcs-adhoc-files.component';
import { SystemAdministrationComponent } from './system-administration/system-administration.component';
import { PieChartParentComponent } from './pie-chart-parent/pie-chart-parent.component';
import { PieChartParentComponentComponent } from './pie-chart-parent-component/pie-chart-parent-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceivablesComponent } from './receivables/receivables.component';
import { MultiChartComponent } from './multi-chart/multi-chart.component';
import { RederComponent } from './reder/reder.component';


// Creating a route const with all the route configuration

const PSCRouteConfig: Routes = [ { path:'NavigationPage', component:PscnavigationComponent,
                               
                                  children:[
                                            {path:'', redirectTo:'Home', pathMatch:'prefix'},
                                            { path: 'Home',  component: HomeContentComponent},
                                            { path: 'casehistory', component: CaseHistoryParentComponent},
                                            {path: 'Inquiry', component: InquiryParentComponent},
                                            {path: 'UserIdUnlockComponent', component:UserIdUnlockComponent},
                                            {path: 'Reports', component:PscReportsComponent},
                                            {path:'UserReports', component:PscUserReportsComponent},
                                            {path:'systemadministration', component: SystemAdministrationComponent},
                                            {path:'graphRepresentation', component: PieChartParentComponentComponent},
                                            {path:'dashBoard', component: DashboardComponent},
                                            {path:'receivables', component: ReceivablesComponent },
                                            {path:'multiChart', component: MultiChartComponent },
                                            {path:'render', component: RederComponent },
                                            
                                            
                                            
                                            
                                           ]},
                                           {path:'DMCSReports', component: DmcsreportsNavigationComponent,
                                            
                                             children:[
                                            {path:'', redirectTo:'dmcsdaily/1', pathMatch:'prefix'},
                                            {path:'PSCReports', component:PscReportsComponent},
                                            {path:'dmcsdaily/:Pid', component:DmcsDailyComponent},
                                            {path:'dmcsweekly/:Pid', component:DmcsWeeklyComponent}, 
                                            {path:'dmcsmonthly/:Pid', component:DmcsreportsMonthlyComponent},
                                            {path:'dmcsquarterly/:Pid', component:DmcsreportsQuarterlyComponent},
                                            {path:'dmcstreasuryoffset/:Pid', component:DmcsTreasuryOffsetProgramComponent},
                                            {path:'dmcscrossservicing/:Pid', component:DmcsCrossServicingComponent},
                                            {path:'dmcsinboundfiles', component:DmcsInboundFilesComponent},
                                            {path:'dmcsoutboundfiles', component:DmcsOutboundFilesComponent},
                                            {path:'dmcsadhocfiles', component:DmcsAdhocFilesComponent}
                                            ]},
                                           {path: 'Login', component: LoginComponent },
                                           { path : '**', redirectTo: 'Login'}
];

@NgModule({
 imports: [ RouterModule.forRoot(PSCRouteConfig,{useHash:true})],

 exports: [ RouterModule ]
})
export class PSCRouteConfiguration { }
