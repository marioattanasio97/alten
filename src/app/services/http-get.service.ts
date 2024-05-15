import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpGetService {

  basePath = 'https://jsonplaceholder.typicode.com';
  endPointPosts = 'posts';
  endPointUsers = 'users';
  endPointUser = 'users/:id';
  isOpenCard = false;
  authorPostSelected?: User;

  constructor(
    private http: HttpClient
  ) { }


 getPosts(){
    return this.http.get<Post[]>(`${this.basePath}/${this.endPointPosts}`);
 }

 getUsers(){
  return this.http.get<User[]>(`${this.basePath}/${this.endPointUsers}`);
 }

 getUser(id: string){
  return this.http.get<User>(`${this.basePath}/${this.endPointUser.replace(':id',id)}`);
 }


}

