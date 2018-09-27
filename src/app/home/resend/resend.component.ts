import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {
  mode: string;

  constructor(private route: ActivatedRoute) {
    this. mode = this.route.snapshot.paramMap.get('mode');
    this.route.paramMap.subscribe(
      (params: Params) => {
        this.mode = params.get('mode');
      }
    );
  }

  ngOnInit() {
  }

}
