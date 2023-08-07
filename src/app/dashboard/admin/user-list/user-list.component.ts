import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataTable } from 'src/@cores/entity/data-table';
import { DataTableReq } from 'src/@cores/entity/service/data-table-req';
import { LoadingService } from 'src/@cores/services/loading.service';
import { TostService } from 'src/@cores/services/toast.service';
import { UserService } from 'src/@cores/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  loading: boolean = true;
  tablereq: DataTableReq = new DataTableReq();
  table: DataTable = new DataTable();

  constructor(
    private loadingService: LoadingService,
    private userService: UserService,
    private toastService: TostService
  ){
    this.tablereq.page = 0;
    this.tablereq.resultsPerPage = 20;
  }

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.loadingService.startLoading();
    this.loading = true;
    this.userService.GetTable(true, this.tablereq).subscribe((response: HttpResponse<DataTable>)=>{
      this.table = response.body as DataTable;
      this.loading = false;
      this.loadingService.stopLoading();
    }, error=>{
      this.loading = false;
      this.loadingService.stopLoading();
    });
  };
  PageChange(event: any){
    this.tablereq.page = event - 1;
    this.getUsers();
  }
}
