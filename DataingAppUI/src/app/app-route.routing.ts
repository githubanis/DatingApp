import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { ListResolver } from './_resolvers/list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import {MessagesResolver} from './_resolvers/messages.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver },
      },
      {
        path: 'members/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges],
      },
      {
        path: 'members/:id',
        component: MemberDetailsComponent,
        resolve: { user: MemberDetailResolver },
      },
      { path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver}
      },
      {
        path: 'lists',
        component: ListComponent,
        resolve: { users: ListResolver },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
