import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  api = 'https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED';
  url = 'http://api.football-data.org/v2/teams/';
  xAuthToken = '440244150fc84a82b3174d238d6d6659';

  options = {
    url: this.api,
    dataType: 'json',
    type: 'GET',
    headers: { 'x-auth-token': this.xAuthToken }
  };

  picsOptions = {
    url: 'http://api.football-data.org/v2/teams/709',
    dataType: 'json',
    type: 'GET',
    headers: { 'x-auth-token': this.xAuthToken }
  };

  constructor(
    private http: HttpClient
  ) { }

  //Get list of matches
  getData(url) {
    return this.http.get(url, this.options);
  }

  //Get home team emblem
  getHomeTeamPic(homeID) {
    return this.http.get(environment.pics+homeID, this.picsOptions);
  }

  //Get away team emblem
  getAwayTeamPic( awayID) {
    return this.http.get(environment.pics+awayID, this.picsOptions);
  }
}
