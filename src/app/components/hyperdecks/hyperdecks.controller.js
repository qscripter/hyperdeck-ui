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
  vm.getEvents = getEvents;

  function init() {
    vm.hyperdecks = hyperdecks;
    _.map(vm.hyperdecks, getEvents);
  }

  function updateRemote(hyperdeck) {
    Hyperdeck.setRemote(hyperdeck._id, hyperdeck.remoteEnabled);
  }

  function sendTransportCommand(id, command) {
    Hyperdeck.sendTransportCommand(id, command);
  }

  function getEvents(hyperdeck) {
    Hyperdeck.getEvents(hyperdeck._id).then(function (events) {
      hyperdeck.events = events;
    });
  }
}
})();
