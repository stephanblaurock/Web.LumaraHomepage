import { Component, OnInit } from '@angular/core';
import { RezepteGroupItem } from 'src/app/models/rezepte';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rezepte',
  templateUrl: './rezepte.component.html',
  styles: []
})
export class RezepteComponent implements OnInit {
  rezepteGroupItems: RezepteGroupItem[];
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.reloadRezeptGallery();
  }

  reloadRezeptGallery() {
      // const url = 'https://portal.lumara.de/forms/forms.json';
      const url = 'https://portal.lumara.de/images/rezepte/rezepte.json';
      this.http.get<RezepteGroupItem[]>(url).subscribe(data => {
        // console.log(data);
        this.rezepteGroupItems = data;
      });
  }
}
