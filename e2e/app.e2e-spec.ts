import { CardsPage } from './app.po';

describe('cards App', () => {
  let page: CardsPage;

  beforeEach(() => {
    page = new CardsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
