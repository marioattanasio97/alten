import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, zip } from 'rxjs';

import { HttpGetService } from '../services/http-get.service'
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    public httpService: HttpGetService
  ) { }

  unsubscribe$ = new Subject<void>();
  posts: Post[]= [];
  users: User[]= [];
  temp: Post[]= [];
  postSelected?: Post;
  form = new FormGroup({
    inputSearch : new FormControl(),
  })

  ngOnInit(): void {
    const listPost = this.httpService.getPosts();
    const listUser = this.httpService.getUsers();
    zip(
      listPost,
      listUser
    )
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([listPost, listUser]) => {
      this.temp = listPost;
      this.posts = listPost;
      this.users = listUser;
    });
    this.form.valueChanges
      .subscribe(() => this.posts = this.posts.filter(post => post.id === this.form.get('inputSearch')?.value));
  }

  getUser (userId: number){
    const user = this.users.filter( user => user.id === userId );

    return user[0];
  }

  getUsername = (userId: number) => {

    return this.getUser(userId).username;
  }

  getIniziali = (userId: number) => {
    const user = this.getUser(userId);
    const dataUser = user.name.split(' ');
    const name = dataUser[0].charAt(0).toUpperCase();
    const surname = dataUser[1].charAt(0).toUpperCase();

    return name + surname;
  }

  itemSelected($event : Post){
    this.postSelected = $event;
    this.httpService.isOpenCard = true;
    this.httpService.authorPostSelected = this.getUser(this.postSelected.userId);
  }

  clear(){
    //si sarebbe potuto giocare con lodash(cloneDeep) ma in questo caso vabene gestirlo seplicemente con un sem'plice array di appoggio
    this.form.get('inputSearch')?.reset();
    this.posts = this.temp;
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
