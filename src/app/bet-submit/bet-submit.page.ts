import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OddsService } from '../services/odds.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-bet-submit',
  templateUrl: './bet-submit.page.html',
  styleUrls: ['./bet-submit.page.scss'],
})
export class BetSubmitPage implements OnInit {
  matchID: string;
  matchURL: string;
  fetchedData: any;
  homeTeam: string;
  awayTeam: string;

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public odds: OddsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (!id){
      this.navCtrl.navigateRoot('/home');
    }
    this.matchID = id;
    this.matchURL = 'https://api.football-data.org/v2/matches/' + id;
    this.bet();
  }

  bet(){
    this.odds.getData(this.matchURL).subscribe ( data => {
      console.log(data);
      this.fetchedData = data;
      this.homeTeam = this.fetchedData.match.homeTeam.name;
      this.awayTeam = this.fetchedData.match.awayTeam.name;
    });
  }

  submit(form: NgForm){
    const data = {
      choice: form.value.team,
      amount: form.value.amount
    };
    console.log(data);
    if (form.invalid){
      console.log('Invalid input');
    }
  }
};


