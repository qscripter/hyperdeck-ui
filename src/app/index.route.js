(function() {
  'use strict';

  angular
    .module('hyperdeckUi')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('hyperdecks', {
        url: '/',
        templateUrl: 'app/components/hyperdecks/hyperdecks.html',
        controller: 'HyperdecksCtrl',
        controllerAs: 'vm',
        resolve: {
          hyperdecks: function (Hyperdeck) {
            return Hyperdeck.getAll();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
