import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  ngAfterViewInit() {

    this.addPositioning();
  }

  addPositioning() {

      const cards = document.getElementsByClassName('card') as any; // as any so can use for-of

      const left = 5;
      const top = 5;

      let i = 0;

      for (const card of cards) {

        // card.style.top = `${top * i}%`;
        card.style.left = `${left * i}%`;

        i++;
      }
  }

  moveToTop(e: Event, i: number) {

    const cardToMove = this.cards.splice(i, 1)[0];
    this.cards.push(cardToMove);

    this.addPositioning();
  }
}
