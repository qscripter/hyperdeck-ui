(function() {
  'use strict';

  angular
    .module('hyperdeckUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
