import jasmineRequire from 'jasmine/lib/jasmine-core/jasmine';

window.jasmineRequire = jasmineRequire;

System.import( 'jasmine/lib/jasmine-core/jasmine-html' )
   .then( () => System.import( 'jasmine/lib/jasmine-core/boot' ) )
   .then( () => {
      const executeJasmineSpecs = window.onload;
      window.onload = () => {};
      return System.import( './spec_runner' )
         .then( ( specRunner ) => {
            document.title = specRunner.title;
            const tests = specRunner.tests;
            return Promise.all( tests.map( test => System.import( `./${test}` ) ) );
         } )
         .then( () => executeJasmineSpecs() );
   } )
   .catch( err => console.error( err ) );
