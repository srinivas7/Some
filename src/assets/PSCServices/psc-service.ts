import {ReportsErrormessageComponent} from "../../app/DMCSReports/reports-errormessage/reports-errormessage.component";
import {Injectable} from '@angular/core';
import {HttpRequest, HttpClient, HttpEvent, HttpParams, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef, MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class PscService {

  private environment;
  constructor(private PSCHttp: HttpClient, private PSCLocalStorage: LocalStorageService, private PSCSessionStorage: SessionStorageService,
    private MatDiaLog: MatDialog, private PscRoute: Router) {
      this.environment = environment;
      console.log(this.environment.url);
    }

  getFName(FN: {firstName: string}, url) {
    const Prams = FN;

    const PSCHttpService = new HttpRequest(
      'GET',
      url,
      {
        params: new HttpParams().set('firstName', Prams.firstName || ''),

        observe: 'response.body',

        content: 'application/json'
      });

    return this.PSCHttp.request(PSCHttpService).map((data: HttpResponse<any>) => {
      return data;
    }).catch(this.PSCServiceErrorHandler);

  }
  getData(CasePram: {FirstName: any, LastName: any, SrCode: any, SSN: any, StatusCode: any, InvoiceNumber: any, CaseStatus: string}, UrlProp) {
    const Prams = CasePram;
    const PSCHttpService = new HttpRequest(
      'GET',
      UrlProp,
      {
        params: new HttpParams().set('firstName', Prams.FirstName || '').append('lastName', Prams.LastName || '')
          .append('srCode', Prams.SrCode || '').append('ssn', Prams.SSN || '').append('statusCode', Prams.StatusCode || '').append('invoice', Prams.InvoiceNumber || '').append('caseStatus', Prams.CaseStatus || ''),
        observe: 'response.body',
        content: 'application/json'
      });
    return this.PSCHttp.request(PSCHttpService).map((data: HttpResponse<any>) => {
      return data;
    }).catch(this.PSCServiceErrorHandler);
  }

  getCasNo(CasePram: {CaseNo: any, FirstName: string, LastName: string, SrCode: any, SSN: any, StatusCode: any, InvoiceNumber: any}, UrlProp) {
    //        console.log(CasePram);
    const Prams = CasePram;

    const PSCHttpService = new HttpRequest(
      'GET',
      UrlProp,
      {
        params: new HttpParams().set('caseNumber', Prams.CaseNo || '').append('firstName', Prams.FirstName || '').append('lastName', Prams.LastName || '')
          .append('SrCode', Prams.SrCode || '').append('SSN', Prams.SSN || '').append('DateRange', '').append('StatusCode', Prams.StatusCode || '').append('InvoiceNumber', Prams.InvoiceNumber || ''),

        observe: 'response.body',

        content: 'application/json'
      });

    return this.PSCHttp.request(PSCHttpService).map((data: HttpResponse<any>) => {
      return data;
    }).catch(this.PSCServiceErrorHandler);
  }
  
  getCaseHistoryCaseNo(CasePram: {CaseNo: any}, UrlProp) {
    const Prams = CasePram;

    const PSCHttpService = new HttpRequest(
      'GET',
      UrlProp,
      {
        params: new HttpParams().set('caseNumber', Prams.CaseNo || ''),
        observe: 'response.body',

        content: 'application/json'
      });

    return this.PSCHttp.request(PSCHttpService).map((data: HttpResponse<any>) => {
      return data;
    }).catch(this.PSCServiceErrorHandler);
  }
  // tslint:disable-next-line:one-line
  getTotalBalance(CasePram: {CaseNo: any, FirstName: any, LastName: String, SrCode: any, SSN: any, InvoiceNumber: any, DateRange: ''}, UrlProp) {
    //         console.log(CasePram);
    const Prams = CasePram;
    const PscBalanceService = new HttpRequest('GET', UrlProp, {
      params: new HttpParams().set('caseNumber', Prams.CaseNo || '').append('firstName', Prams.FirstName || '')
        .append('SrCode', Prams.SrCode || '').append('InvoiceNumber', Prams.InvoiceNumber || '')
        .append('SSN', Prams.SSN || '').append('DateRange', Prams.DateRange),
      observe: 'response.body',
      content: 'application/json'
    });
    return this.PSCHttp.request(PscBalanceService).catch(this.PSCServiceErrorHandler);
  }

  getStatusCode(Url) {
    const PscStatusCode = new HttpRequest('GET', Url, {
      observe: 'body',
      content: 'application/json'
    });
    return this.PSCHttp.request(PscStatusCode).catch(this.PSCServiceErrorHandler);
  }

  getUserUnlock(Url, UserId) {
    const Urlprop = Url;
    const UserID = UserId;
    const PSCUserUnlock = new HttpRequest('PUT', Urlprop, {
      //            params: new HttpParams().set('UserId', UserID),
      observe: 'response.body',
      responseType: "json",
      content: 'application/json'
    });
    return this.PSCHttp.request(PSCUserUnlock).catch(this.PSCServiceErrorHandler);
  }

  getUserDetails(Url) {
    const PSCUserDetail = new HttpRequest('GET', Url, {
      observe: 'response.body',
      content: 'application/json'
    });
    return this.PSCHttp.request(PSCUserDetail).catch(this.PSCServiceErrorHandler);
  }
  getISAdmin(Url) {
    const PSCIsAdmin = new HttpRequest('GET', Url, {
      observe: 'response.body',
      content: 'application/json'
    });
    return this.PSCHttp.request(PSCIsAdmin).catch(this.PSCServiceErrorHandler);
  }
  getFolderInfo(url) {
    const getFolderInformation = new HttpRequest('GET', url, {
      observe: 'response',
      content: 'application/json'
    });
    return this.PSCHttp.request(getFolderInformation).catch(this.PSCServiceErrorHandler);
  }

  PSCServiceErrorHandler(Error: Response) {
//    console.log(Error);
    return Observable.throw(Error);
  }
  PscErrorHandler(error) {
    const Error = error;
//    console.log(Error);
    if (Error.status === 401 && Error.statusText ==='401') {
      const SessionError: MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent, {
        width: '800px',
        height: '300px'
      });
      SessionError.componentInstance.ErrorReport = {
        ErrorMessageTitle: 'Session Expired',
        ErrorMessage: 'Your session has been expired', responseType: 'Error'
      };
      SessionError.afterClosed().subscribe(() => {
        this.PSCSessionStorage.clear();
        this.PscRoute.navigate(['Login'])
      })
    }
     else if(Error.status === 500 && Error.statusText === '500'){
       const InternalServer:MatDialogRef<ReportsErrormessageComponent> = this.MatDiaLog.open(ReportsErrormessageComponent, {
       width:'800px',
       height:'300px'
       });
       InternalServer.componentInstance.ErrorReport = {ErrorMessageTitle:'Internal Server Error', ErrorMessage:'Server Responded with a 500 internal server error',
                                                       responseType:'error'}
     }
  }

  getFirstDropDownData() {
    let UrlProp = './assets/PSCServices/data.json';
    const PSCHttpService = new HttpRequest('GET', UrlProp, {
        observe: 'response.body',
        content: 'application/json'
    });
    return this.PSCHttp.request(PSCHttpService);
  }
  getSecondDropDownData() {
      let UrlProp = './assets/PSCServices/data2.json';
      const PSCHttpService = new HttpRequest('GET', UrlProp, {
          observe: 'response.body',
          content: 'application/json'
      });
      return this.PSCHttp.request(PSCHttpService);
  }
  getChartData() {
    let UrlProp = './assets/PSCServices/maps.json';
    const PSCHttpService = new HttpRequest('GET', UrlProp, {
        observe: 'response.body',
        content: 'application/json'
    });
    return this.PSCHttp.request(PSCHttpService);
  }

  getDashboard(url) {

    const PSCDashboard = new HttpRequest('GET', url, {

      observe: 'response',

      content: 'application/json'

    });

    return this.PSCHttp.request(PSCDashboard).catch(this.PSCServiceErrorHandler);

  }

  getexcel(UrlProp) {
    const PSCHttpService = new HttpRequest('GET', UrlProp, {
        observe: 'response.body',
        content: 'application/json'
    });
    return this.PSCHttp.request(PSCHttpService);
  }

  getReceivables(UrlProp) {
    const PSCHttpService = new HttpRequest('GET', UrlProp, {
        observe: 'response.body',
        content: 'application/json'
    });
    return this.PSCHttp.request(PSCHttpService);
  }

  getReceivables1(UrlProp) {
    const PSCHttpService = new HttpRequest('GET', UrlProp, {
        observe: 'response.body',
        content: 'application/json'
    });
    return this.PSCHttp.request(PSCHttpService);
  }

  getCollectionsData() {
    //let UrlProp = "https://dmcspatch.psc.gov/dmcswebapp/managementReport/getCollectionsAndBillingsReportForDashBoard";
    const url = '../../assets/PSCServices/receivables1.json'
      const PSCHttpService = new HttpRequest('GET', url, {
          observe: 'response.body',
          content: 'application/json'
      });
      return this.PSCHttp.request(PSCHttpService);
    }
}



