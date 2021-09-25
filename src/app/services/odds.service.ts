import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../interfaces/team.model';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  api = 'https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED';
  url = 'http://api.football-data.org/v2/teams/';
  teamsUrl = 'http://api.football-data.org/v2/competitions/CL/teams';
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

  getTeams() {
    return this.http.get(this.teamsUrl, this.options);
  };

  pushTeams(teamData) {
    const url = environment.baseUrl + '/team';
    this.http.post<{team: Team[]}>(url , teamData)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
      return;
    });
  };

  //Get home team emblem
  getHomeTeamPic(homeInfo) {
    const url = environment.baseUrl + '/teamPic';
    return this.http.post<{crest: string}>(url , homeInfo);
  };

  //Get away team emblem
  getAwayTeamPic(awayInfo) {
    const url = environment.baseUrl + '/teamPic';
    return this.http.post<{crest: string}>(url , awayInfo);
  };
}
