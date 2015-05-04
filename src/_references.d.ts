///// <reference path="../declarations/angular2.d.ts" />

interface List<T> extends Array<T> {
}
interface Type {}

declare module "angular2/angular2" {
  function bootstrap(appComponentType: any): void;
  function Component({
    selector,
    properties,
    hostListeners,
    injectables,
    lifecycle,
    changeDetection,
    services
    }:{
      selector:string,
      properties?:Object,
      hostListeners?:Object,
      injectables?:List<any>,
      services?:List<any>,
      lifecycle?:List<any>,
      changeDetection?:string
    });

  function View({
      templateUrl,
      template,
      directives,
      formatters,
      source,
      locale,
      device
    }: {
      templateUrl?: string,
      template?: string,
      directives?: List<any>,
      formatters?: List<Type>,
      source?: List<any>,
      locale?: string,
      device?: string
    });

  function For();
  function If();
  function Foreach();
  function Switch();
  function SwitchWhen();
  
  function SwitchDefault();
}