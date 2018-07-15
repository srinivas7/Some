import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-reports-errormessage',
  templateUrl: './reports-errormessage.component.html',
  styleUrls: ['./reports-errormessage.component.css']
})
export class ReportsErrormessageComponent implements OnInit {

  constructor(private reportErrorRef:MatDialogRef<ReportsErrormessageComponent>) { }
  public ErrorReport:{ErrorMessageTitle:string, ErrorMessage:string, responseType:string};
  ngOnInit() {
     const ErrorElement = document.getElementById('errorMsg');    
  }
onClose(){
  this.reportErrorRef.close();
  }
}
