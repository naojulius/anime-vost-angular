import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'anime-list',
                pathMatch: 'full',
              },
              {
                path: 'anime-list',
                loadChildren: () => import('../dashboard/anime-list/anime-list.module').then(m => m.AnimeListModule),
                
              },
              {
                path: 'anime-detail',
                loadChildren: () => import('../dashboard/anime-detail/anime-detail.module').then(m => m.AnimeDetailModule),
                
              },
              {
                path: 'add-anime',
                loadChildren: () => import('../dashboard/add-anime/add-anime.module').then(m => m.AddAnimeModule),
              },
              {
                path: 'admin',
                loadChildren: () => import('../dashboard/admin/admin.module').then(m => m.AdminModule),
              },
              {
                path: 'profile',
                loadChildren: () => import('../dashboard/profile/profile.module').then(m => m.ProfileModule),
              },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
