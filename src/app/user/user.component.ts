import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpGetService } from '../services/http-get.service';
import { User } from '../interfaces/user.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  user?: User;
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpGetService
  ) { }

  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('id')?.toString();
    idUser && this.httpService.getUser(idUser)
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => this.user = user)

  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }

}
