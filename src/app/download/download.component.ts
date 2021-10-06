import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileService } from '../_Services/file.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @Input() public fileUrl!: string;

  message!: string;
  progress!: number;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {}

  download() {
      this.fileService.download(this.fileUrl).subscribe((response: any) => {
          this.downloadFile(response);
      });
  }

  private downloadFile(data: Blob) {
    const downloadedFile = new Blob([data], { type: data.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = this.fileUrl.split('\\').slice(-1)[0];
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }
}
