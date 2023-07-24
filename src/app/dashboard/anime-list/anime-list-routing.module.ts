import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './anime-list.component';

const routes: Routes = [
    {
        path: '',
        component: AnimeListComponent,
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'staff-list',
        //         pathMatch: 'full',
        //        // canActivate: [UserGuardService],
        //       },
        //       {
        //         path: 'staff-list',
        //         canActivate: [PagesGuardService],
        //         component: StaffListComponent,
                
        //       },
        //       {
        //         path: 'new-staff',
        //         component: NewStaffComponent,
        //       //canActivate: [PagesGuardService],
        //       },
        //       {
        //         path: 'staff-detail',
        //         component: StaffDetailComponent,
        //         //canActivate: [PagesGuardService],0
        //       },
        // ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeListRoutingModule { }
