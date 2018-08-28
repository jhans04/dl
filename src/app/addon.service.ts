import {
  Injectable,
  Injector,
  Compiler,
  ComponentRef,
  NgModuleRef
 
} from '@angular/core';

import { NgModule } from '../../node_modules/@angular/compiler/src/core';


import * as AngularCommon from '@angular/common';
import * as AngularCore from '@angular/core';
import * as RouterModule from '@angular/router';
import { Router, Route } from '@angular/router';


declare const SystemJS;

@Injectable()
export class AddonService {
  constructor(
    private routes: Router,
    private compiler: Compiler,
    private injector: Injector,
    private moduleRef: NgModuleRef<any>
    
  ) {}


  private loadSystemJs(addonPath: string) {
    SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
    SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
    SystemJS.set('@angular/router', SystemJS.newModule(RouterModule));
    return SystemJS.load(addonPath);
  }

  loadAddon(addon: string): Promise<ComponentRef<any>> {
    return this.loadSystemJs(addon)
      .then(pkg => pkg.LinApp1Module)
      .then(ngModule => this.compile(ngModule))
      .then(cmpRef => {
        console.groupEnd();
        return cmpRef;
      }).catch(e => {
        console.groupEnd();
        throw e;
      });
  }
  private compile(ngModule): Promise<ComponentRef<any>> {
    console.log('Loading Module',ngModule);

   // this.moduleRef.componentFactoryResolver.resolveComponentFactory
    return this.compiler
      .compileModuleAndAllComponentsAsync(ngModule)
      .then(factories => {
        console.log(factories);
        let moduleRefChild:NgModuleRef<NgModule> = factories.ngModuleFactory.create(this.injector);
        this.moduleRef.instance
        console.log(moduleRefChild);
        /*
        factories.componentFactories.forEach(f => {
           const cf = this.moduleRef.componentFactoryResolver.resolveComponentFactory(ngModule);
           ReflectiveInjector.resolveAndCreate([{provide:cf,useValue:cf}],this.injector)
        });
        */
        //moduleRef.componentFactoryResolver.resolveComponentFactory()
        factories.componentFactories.forEach(f => {
          f.create(this.injector,[] ,null,this.moduleRef);
        });
        const factory = factories.componentFactories.find(
          componentFactory =>
            ngModule.getViewComponent().name ===
            componentFactory.componentType.name
        );
        if (factory) {
          //let modRef = ngModule.create(this.viewRef.parentInjector)
          console.log('Found Factor',factory);
          const cmpRef = factory.create(
            this.injector,
            [],
            null,
            moduleRefChild
          );
          return cmpRef;
        } else {
          console.log('Factory Not Found');
        }
      });
  }
}
