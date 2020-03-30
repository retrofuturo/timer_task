import { Component } from '@angular/core';
import { interval, Subscription} from 'rxjs/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  interval: Subscription;
  timeLabel = '00:00:00';
  timer = 0;
  waitObservable: Subscription;

  startTimer() {
    if (!this.interval) {
      this.interval = interval(1000)
        .subscribe(() => {
          this.timer += 1;
          this.updateTime();
        });
    }
  }

  stopTimer() {
    if (this.interval) {
      this.interval.unsubscribe();
      this.interval = null;
    }
  }

  resetTimer() {
    this.stopTimer();
    this.timer = 0;
    this.updateTime();
  }

  wait() {
    if (this.waitObservable) {
      this.stopTimer();
    }
    if (!this.waitObservable) {
      this.waitObservable = interval(300)
        .subscribe(() => {
          this.waitObservable.unsubscribe();
          this.waitObservable = null;
        });
    }

  }

  updateTime() {
    const hours = Math.floor((this.timer / 3600) % 24 );
    const minutes = Math.floor((this.timer / 60) % 60 );
    const seconds = Math.floor(this.timer % 60);
    this.timeLabel = `${this.timeToString(hours)}:${this.timeToString(minutes)}:${this.timeToString(seconds)}`;
  }

  private timeToString(count) {
    return count < 10 ? `0${Math.floor(count)}` : Math.floor(count).toString();
  }
}
