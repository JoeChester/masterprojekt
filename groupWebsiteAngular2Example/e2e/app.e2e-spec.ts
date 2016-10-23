import { GroupWebsiteAngular2ExamplePage } from './app.po';

describe('group-website-angular2-example App', function() {
  let page: GroupWebsiteAngular2ExamplePage;

  beforeEach(() => {
    page = new GroupWebsiteAngular2ExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
