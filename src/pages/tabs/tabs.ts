import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ListPage } from '../list/list';
import { AddPage } from '../add/add';
import { SettingsPage } from '../settings/settings';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = AddPage;
  tab3Root = SettingsPage;
  tab4Root = AboutPage;
  
  constructor() {

  }
}
