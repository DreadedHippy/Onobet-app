import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OddsService {
  options = {
    url: environment.api,
    dataType: 'json',
    type: 'GET',
    headers: { 'x-auth-token': environment.xAuthToken }
  };

  picsOptions = {
    url: 'http://api.football-data.org/v2/teams/709',
    dataType: 'json',
    type: 'GET',
    headers: { 'x-auth-token': '440244150fc84a82b3174d238d6d6659' }
  };

  url = environment.pics;

  constructor(
    private http: HttpClient
  ) { }

  getData(url) {
    return this.http.get(url, this.options);
  }
  getHomeTeamPic(homeID) {
    return this.http.get(environment.pics+homeID, this.picsOptions);
  }
  getAwayTeamPic( awayID) {
    return this.http.get(environment.pics+awayID, this.picsOptions);
  }
}
