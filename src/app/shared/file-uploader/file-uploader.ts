import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

// const URL = '/api/';
// const URL = '/api/files';

@Component({
  selector: 'file-uploader',
  template: `
            URL: {{url}}
            <input type="file" ng2FileSelect [uploader]="uploader" />
            <button type="button" class="btn btn-success btn-s"
                       (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
                   <span class="glyphicon glyphicon-upload"></span> Upload all
            </button>
            <img [src]="">
            <table class="table">
                <thead>
                <tr>
                    <th width="50%">Name</th>
                    <th>Size</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let item of uploader.queue">
                    <td><strong>{{ item?.file?.name }}</strong></td>
                    <td *ngIf="uploader.isHTML5" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>
                    <td *ngIf="uploader.isHTML5">
                        <div class="progress" style="margin-bottom: 0;">
                            <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': item.progress + '%' }"></div>
                        </div>
                    </td>
                    <td class="text-center">
                        <span *ngIf="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                        <span *ngIf="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                        <span *ngIf="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                    </td>
                    <td nowrap>
                        <button type="button" class="btn btn-success btn-xs"
                                (click)="item.upload()" [disabled]="item.isReady || item.isUploading || item.isSuccess">
                            <span class="glyphicon glyphicon-upload"></span> Upload
                        </button>
                        <button type="button" class="btn btn-warning btn-xs"
                                (click)="item.cancel()" [disabled]="!item.isUploading">
                            <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                        </button>
                        <button type="button" class="btn btn-danger btn-xs"
                                (click)="item.remove()">
                            <span class="glyphicon glyphicon-trash"></span> Remove
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            `,
  directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class FileUploaderComponent {
  public uploader:FileUploader = new FileUploader({url: '/api/audio-files'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  @Input() url: String;

  constructor() {
    //  alert(this.url);
    //  this.uploader =
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
