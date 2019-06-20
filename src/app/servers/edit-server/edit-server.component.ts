import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ServersService } from '../servers.service';
import { log } from 'util';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  paramSubscription: Subscription;
  queryParamSubscription: Subscription;
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams);
    console.log(this.activatedRoute.snapshot.fragment);

    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      console.log('QueryParams: ', queryParams, 'Allow Edit: ', this.allowEdit);
    });
    this.activatedRoute.fragment.subscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}

//=======
//http://localhost:4200/servers/5/edit?allowEdit=1#loading

//=======
//routing by navigation method: more inside method
// this.router.navigate(['servers', id, 'edit'], {relativeTo: this.activatedRoute, queryParams: {'allowEdit': '1'}, fragment: 'loading'})
// //get active route parameters, query parameters, fragment
// this.activatedRoute.snapshot.params['id']
// this.activatedRoute.snapshot.queryParams
// this.activatedRoute.snapshot.fragment
// //get active route parameters with observeble subscription

// paramSubscription: Subscription;
// this.paramSubscription = this.activatedRoute.params.subscribe((params: Params ) =>{
//   this.user.id = params.id;
//   this.user.name = params.name;
// })
// //get active route Query parameters with observeble subscription
// import { Subscription } from 'rxjs/Subscription';
// queryParamSubscription: Subscription;
// this.queryParamSubscription = this.activatedRoute.queryParams.subscribe((params: Params ) =>{
//   this.user.id = params.id;
//   this.user.name = params.name;
// })
// ngOnDestroy(): void {this.paramSubscription.unsubscribe();}
