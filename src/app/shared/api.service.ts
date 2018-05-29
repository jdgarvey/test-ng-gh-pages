import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
  endpoint = 'https://wind-bow.glitch.me/twitch-api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return combineLatest(this.users.map(user => this.http.get(`${this.endpoint}/users/${user}`)));
  }

  getChannel(user) {
    return this.http.get(`${this.endpoint}/channels/${user}`);
  }

  getStream(user) {
    return this.http.get(`${this.endpoint}/streams/${user}`);
  }

}
