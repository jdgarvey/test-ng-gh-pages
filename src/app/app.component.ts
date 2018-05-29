import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/api.service';
import { MatDialog } from '@angular/material';
import { StreamComponent } from './stream/stream.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users = [];
  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.api.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  getChannel(user) {
    this.api.getChannel(user.display_name)
      .subscribe(channel => {
        user.channel = channel;
      });
  }

  getStream(user) {
    this.api.getStream(user.display_name)
      .subscribe((stream: any) => {
        if (stream.stream) {
          this.dialog.open(StreamComponent, {
            data: { ...stream }
          });
        } else {
          alert('Sorry, no active stream was found.');
        }
      });
  }
}
