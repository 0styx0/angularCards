import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  moveToTop(e: Event, i: number) {

    const cardToMove = this.cards.splice(i, 1)[0];
    this.cards.push(cardToMove);
  }
}
