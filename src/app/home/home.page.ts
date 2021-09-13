import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../services/validator.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OddsService } from '../services/odds.service';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Team } from '../interfaces/team.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  picsOptions = {
    url: environment.pics,
    dataType: 'json',
    type: 'GET',
    headers: { 'x-auth-token': '440244150fc84a82b3174d238d6d6659' }
  };
  user: boolean;
  client = this.validatorService.client;
  api = environment.api;
  fetchedData: any;
  id: string;
  clubs: any;
  homeTeamInfo: any;
  awayTeamInfo: any;
  homeImages = [];
  awayImages = [];



  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    public fireAuth: AngularFireAuth,
    private odds: OddsService
  ) {
    this.fireAuth.authState.subscribe((client) => {
      this.client = client ? client : null;
    });
  }


  ngOnInit() {
    this.teamEmblemRetreival();
  }


  async signup() { //SIgn up
    try {
      const validate = await this.validatorService.signup();
      this.user = true;
    } catch(err){
      console.log('Error', err);
    }
    console.log('homeList: ', this.homeImages);
    console.log('awayList: ',this.awayImages);
  }

  async login() { //Login
    try {
      const validate = await this.validatorService.login();
      this.user = true;
    } catch(err){
      console.log('Error', err);
    }
  }

  async logout() { //Logout
    try {
      const disvalidate = await this.validatorService.logout();
      this.user = false;
    } catch(err){
      console.log('Error', err);
    }
  }

  teamInfoCollection(){
    this.odds.getTeams().subscribe(response => {
      const infoUrl = 'http://localhost:3000/teams';
      console.log(response);
      this.clubs = response;
      console.log('Teams: ', this.clubs.teams);
      this.teamInfoPush();
    });
  }

  teamInfoPush(){
    this.clubs.teams.forEach(item => {
      const data: Team = {
        teamID: item.id,
        teamCrest: item.crestUrl
      };
      this.odds.pushTeams(data);
    });
  }

  teamEmblemRetreival(){
    this.odds.getData(this.api)// getting data
      .subscribe(data => {
        console.log(data);
        this.fetchedData = data;
        console.log(this.fetchedData.matches); //getting all matches for a specific league
        this.id = this.fetchedData.matches.forEach(item => {
          const homePicInfo: Team = {
          teamID: item.homeTeam.id, // getting ID of hometeam
          teamCrest: ' '
          };
          const awayPicInfo: Team = {
          teamID: item.awayTeam.id, // getting ID of awayteam
          teamCrest: ' '
          };
          this.odds.getHomeTeamPic(homePicInfo).subscribe(dataHome => { //getting hometeam info
            this.homeTeamInfo = dataHome;  // Assiging Hometeam info to variable
            // console.log(this.homeTeamInfo.crest);
            this.homeImages.push(this.homeTeamInfo.crest);// Getting hometeam emblem and adding to array of all hometeam emblem
          });
          this.odds.getAwayTeamPic(awayPicInfo).subscribe(dataAway => {
            this.awayTeamInfo = dataAway; //Assigning awayTeam info to a variable
            // console.log(this.awayTeamInfo.crest);
            this.awayImages.push(this.awayTeamInfo.crest); //Getting away team emblem and adding to array of all awayTeam emblem
          });
        });
      }
    );
  }
}
