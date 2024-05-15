import { Component, Input, OnInit } from '@angular/core';

import { Post } from '../interfaces/post.interface';
import { HttpGetService } from '../services/http-get.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input() post?: Post;

  constructor(
    public httpService: HttpGetService
  ) { }

  ngOnInit(): void {
  }

  closeCard(){
    this.httpService.isOpenCard = false;
  }

}
