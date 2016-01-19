/**
 * Copyright 2016 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import jasmineRequire from 'jasmine-core/lib/jasmine-core/jasmine';

window.jasmineRequire = jasmineRequire;

const JASMINE_CORE = 'jasmine-core/lib/jasmine-core/';

System.import( `${JASMINE_CORE}jasmine.css!` );
System.import( 'jasmine-core/images/jasmine_favicon.png!image' )
   .then( ( { src } ) => {
      const faviconElement = document.createElement( 'link' );
      faviconElement.href = src;
      faviconElement.type = 'image/png';
      faviconElement.rel = 'shortcut icon';
      document.querySelector( 'head' ).appendChild( faviconElement );
   } );

System.import( `${JASMINE_CORE}jasmine-html` )
   .then( () => System.import( `${JASMINE_CORE}boot` ) )
   .then( () => {
      const executeJasmineSpecs = window.onload;
      window.onload = () => {};
      return System.import( './spec_runner' )
         .then( ( { title, tests } ) => {
            document.title = title;
            return Promise.all( tests.map( test => System.import( `./${test}` ) ) );
         } )
         .then( () => executeJasmineSpecs() );
   } )
   .catch( err => console.error( err ) );
