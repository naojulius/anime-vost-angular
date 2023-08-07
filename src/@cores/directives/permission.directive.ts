import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "../services/user.service";

@Directive({
    selector: '[userHasPermission]'
})
export class HasPermissionDirective implements OnInit {
    @Input() "userHasPermission": Array<string>;
    userDataSub: Subscription | undefined;
    roles: Array<string> = [];
    isVisible = false;
    viewCondition = false;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private authService: UserService,

    ) { }
    ngOnInit() {
        this.getPermissionList();
    }
    getPermissionList() {
        const permissions = this.authService.getParam("roles") as unknown as Array<any>;
        this.viewCondition = permissions.some(el => this.userHasPermission.includes(el));  //this.hasAny(permissions, this.userHasPermission);
   
        if (this.viewCondition) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else{
            this.viewContainerRef.clear();
        }
    }

    hasAll(permissionArray: Array<string>, neededPermissionsArray: Array<string>) {
        var hasAllPermission = true;
        var j = 1;
        while (hasAllPermission && j < neededPermissionsArray.length) {
            if (permissionArray.includes(neededPermissionsArray[j])) {
             j++;
            } else {
                hasAllPermission = false;
            }
        }

        return hasAllPermission;
    }

    hasAny(permissionArray: Array<string>, neededPermissionsArray: Array<string>) {
        var hasAnyPermission = false;
        var j = 1;
        while (!hasAnyPermission && j < neededPermissionsArray.length) {
            if (permissionArray.includes(neededPermissionsArray[j])) {
                hasAnyPermission = true;
            } else {
                j++;
            }
        }
        return hasAnyPermission;
    }
}