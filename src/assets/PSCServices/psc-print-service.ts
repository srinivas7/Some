import {Injectable} from '@angular/core';

@Injectable()
export class PscPrintService {
  constructor() {}
  getPSCPrint(elementRef, delayTimer1, delayTimer2, delayTimer3) {
    if (elementRef) {
      let printContents, printWindow;
      setTimeout(() => {printContents = elementRef;}, delayTimer1);

      setTimeout(() => {
        printWindow = window.open('', 'width=800px, height= 100%');
        printWindow.document.write(`<html><head>
            <script  src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
            <script  src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <style>
            .CaseHistoryTableFormHeader{
            text-align: center !important;
            font-weight: bold !important;}
            #iByCaseno
            {
            font-size:large !important;
            font-weight: bolder !important;
            color: grey;
            }
            #PSCLogo
            {
            top:0px !important;
            left:0px !important;
            }
            .NameSpacer{
              margin-left:5px !important;
            }
.InquiryTableHeader, .InquiryTable{
    text-align: center !important;
}

.InquiryTableFormHeader{
    text-align: center !important;
    font-weight: bold !important; 
}
.header{
text-align: center !important;
font-weight: bold ; 
}
.report{
margin-left: -30% !important;
table-layout: auto;
} 
</style></head>`);
        printWindow.document.write(`<body>
            <header class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <img id="PSCLogo" src="https://dmcspatch.psc.gov/assets/images/psc.png" alt="alt test if needed"/>
            </div></header>`);
        printWindow.document.write(printContents.innerHTML);
        printWindow.document.write(`/<body></html>`);
        printWindow.document.close();
        printWindow.focus();
      }, delayTimer2);

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, delayTimer3);
    }

  }
}
