import { Component,Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
 
// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
 
@Component({
  selector: 'file-upload',
  templateUrl: './multi-file-upload.component.html'
})
export class FileComponent {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  filesToUpload: Array<File> = [];
  public currentDate = new Date();
  @Output() fileUploadToSDD: EventEmitter<object> = new EventEmitter<object>();

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
upload() {
  const formData: any = new FormData();
  const files: Array<File> = this.filesToUpload;
  console.log(files);

  for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
  }
  console.log('form data variable :   '+ formData.toString());
  // formData.append("uploads[]", files[0], files[0]['name']);

}
showSDD(){
  this.fileUploadToSDD.emit();
}
}