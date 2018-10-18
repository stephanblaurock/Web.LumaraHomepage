import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LumaraService } from 'src/app/service/lumara_service';

@Component({
  selector: 'app-rezept',
  templateUrl: './rezept.component.html',
  styles: []
})
export class RezeptComponent implements OnInit {
  currentPostID = -1;
  constructor(
    private lumaraService: LumaraService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentPostID = this.route.snapshot.queryParams.blogpostid;
  }

}
