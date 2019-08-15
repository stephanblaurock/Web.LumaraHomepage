import { FlyerInfo } from './models/flyer';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  flyerinfos: FlyerInfo[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.reloadFlyerInfos();
  }

  reloadFlyerInfos() {
    const url = 'https://portal.lumara.de/flyer/flyer.json';
    this.http.get<FlyerInfo[]>(url).subscribe(data => {
      this.flyerinfos = data;
    });
  }

  getThumbnailUrl(myurl: string, pageno: number) {
    if (pageno === 1) {
      return myurl.replace('.pdf', '_01.jpg');
    } else if (pageno === 2) {
      return myurl.replace('.pdf', '_02.jpg');
    }
  }
}
