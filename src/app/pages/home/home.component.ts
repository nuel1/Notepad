import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/core/globals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private globals: GlobalsService) {
    this.globals.currentRoute = this.route.snapshot.data['title'];
  }
  ngOnInit(): void {}
}
