import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../services/validator.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { OddsService } from '../services/odds.service';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';


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
  teampics = environment.pics;
  fetchedData: any;
  fetchedPics: any;
  id: string;
  homeTeamID: string;
  awayTeamID: string;
  team: any;
  homeTeamInfo: any;
  awayTeamInfo: any;
  homeImages = [];
  awayImages = [];
  date: string;



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
    this.odds
      .getData(this.api)// getting data
      .subscribe(data => {
        console.log(data);
        this.fetchedData = data;
        console.log(this.fetchedData.matches); //getting all matches for a specific league
        this.id = this.fetchedData.matches.forEach(item => {
          this.homeTeamID = item.homeTeam.id; this.awayTeamID = item.awayTeam.id;// getting ID of hometeam and away team
          this.odds.getHomeTeamPic(this.homeTeamID).subscribe(dataHome => { //getting hometeam info
            this.homeTeamInfo = dataHome;  // Assiging Hometeam info to variable
            console.log(this.homeTeamInfo.crestUrl);
            this.homeImages.push(this.homeTeamInfo.crestUrl);// Getting hometeam emblem and adding to array of all hometeam emblem
          });
          this.odds.getAwayTeamPic(this.awayTeamID).subscribe(dataAway => {
            this.awayTeamInfo = dataAway; //Assigning awayTeam info to a variable
            console.log(this.awayTeamInfo.crestUrl);
            this.awayImages.push(this.awayTeamInfo.crestUrl); //Getting away team emblem and adding to array of all awayTeam emblem
          });
        });
      }
    );
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
}
