import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { log } from 'util';
import { CanComponentDeactivate } from './can-deactivate-guard.service';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  
  paramSubscription: Subscription;
  queryParamSubscription: Subscription;
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changedSaved = false;

  constructor(private serversService: ServersService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      console.log('QueryParams: ', queryParams, 'Allow Edit: ', this.allowEdit);
    });
    this.activatedRoute.fragment.subscribe();
    let id = +this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe((params: Params) => {
      id = +params['id'];
    });
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changedSaved = true;
    console.log('@edit-server.comp: @onUpdateServer: current activedRoute: =>',this.activatedRoute)
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.allowEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changedSaved){
      return confirm('Do you want to discard the changes?');
    }else {
      return true;
    }
  }

}

