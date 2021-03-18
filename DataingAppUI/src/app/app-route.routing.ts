import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'lists', component: ListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

// export const AppRouteRoutes = RouterModule.forChild(routes);
