import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyAnimeListComponent } from './my-anime-list/my-anime-list.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: '',
                redirectTo: 'my-profile',
                pathMatch: 'full',
              },
              {
                path: 'my-profile',
                component: MyProfileComponent
                
              },
              {
                path: 'my-anime-list',
                component: MyAnimeListComponent
                
              },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
