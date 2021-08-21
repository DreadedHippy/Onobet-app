import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    // { title: 'Spam', url: '/Spam', icon: 'warning' },
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Top', url: '/top', icon: 'trending-up' },
    { title: 'Account', url: '/account', icon: 'person' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    { title: 'Earnings', url: '/earnings', icon: 'cash' },
    { title: 'History', url: '/history', icon: 'time' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
