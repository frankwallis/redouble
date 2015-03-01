export class EnumSymbol {
   sym = Symbol.for(name);
   value: number;
   description: string;

   constructor(name: string, {value, description}) {

      if(!Object.is(value, undefined)) this.value  = value;
      if(description) this.description  = description;

      Object.freeze(this);
   }

   get display() {
      return this.description || Symbol.keyFor(this.sym);
   }

   toString() {
      return this.sym;
   }

   valueOf() {
      return this.value;
   }
}

export class Enum {
   constructor(enumLiterals) {
      for (let key in enumLiterals) {
         if(!enumLiterals[key]) throw new TypeError('each enum should have been initialized with atleast empty {} value');
         this[key] =  new EnumSymbol(key, enumLiterals[key]);
      }
      Object.freeze(this);
   }

   symbols() {
      return [for (key of Object.keys(this)) this[key] ];
   }

   keys() {
      return Object.keys(this);
   }

   contains(sym) {
      if (!(sym instanceof EnumSymbol)) return false;
      return this[Symbol.keyFor(sym.sym)] === sym;
   }
}

//now create your won Enum consts
// const  [INCREMENTAL, EXPONENTIAL, FIBONACCI] = [{},{},{}];
// export const BackoffStrategy = new Enum({INCREMENTAL, EXPONENTIAL, FIBONACCI});
//
// export const ReadyState = new Enum({
//     CONNECTING: {value: 0, description: 'Connecting'},
//     OPEN: {value: 1, description: 'Open'},
//     CLOSING: {value: 2, description: 'Closing'},
//     CLOSED: {value: 3, description: 'Closed'},
//     RECONNECT_ABORTED: {value: 4, description: 'Reconnect Aborted'}
// });
//
// assert.isTrue(ReadyState.OPEN > ReadyState.CONNECTING)
// assert.notEqual(ReadyState.OPEN, ReadyState.CLOSED)
// assert.equal(ReadyState.OPEN.description, 'Open')
// assert.equal(BackoffStrategy.INCREMENTAL.display, 'INCREMENTAL')
