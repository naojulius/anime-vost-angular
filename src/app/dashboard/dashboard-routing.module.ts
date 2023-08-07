import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from 'src/@cores/services/guards/auth.guard';

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
                canActivate: [AuthGuardService],
                path: 'anime-list',
                loadChildren: () => import('../dashboard/anime-list/anime-list.module').then(m => m.AnimeListModule),
                
              },
              {
                canActivate: [AuthGuardService],
                path: 'anime-detail',
                loadChildren: () => import('../dashboard/anime-detail/anime-detail.module').then(m => m.AnimeDetailModule),
                
              },
              {
                canActivate: [AuthGuardService],
                path: 'add-anime',
                loadChildren: () => import('../dashboard/add-anime/add-anime.module').then(m => m.AddAnimeModule),
              },
              {
                canActivate: [AuthGuardService],
                path: 'admin',
                loadChildren: () => import('../dashboard/admin/admin.module').then(m => m.AdminModule),
              },
              {
                canActivate: [AuthGuardService],
                path: 'profile',
                loadChildren: () => import('../dashboard/profile/profile.module').then(m => m.ProfileModule),
              },
              {
                canActivate: [AuthGuardService],
                path: 'events',
                loadChildren: () => import('../dashboard/events/events.module').then(m => m.EventsModule),
              },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
