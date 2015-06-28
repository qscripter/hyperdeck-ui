(function () {
'use strict';

angular
  .module('hyperdeckUi')
  .controller('HyperdecksCtrl', controller);

/* @ngInject */
function controller(hyperdecks, Hyperdeck) {
  var vm = this;

  init();

  vm.updateRemote = updateRemote;
  vm.sendTransportCommand = sendTransportCommand;

  function init() {
    vm.hyperdecks = hyperdecks;
  }

  function updateRemote(hyperdeck) {
    Hyperdeck.setRemote(hyperdeck._id, hyperdeck.remoteEnabled);
  }

  function sendTransportCommand(id, command) {
    Hyperdeck.sendTransportCommand(id, command);
  }
}
})();
