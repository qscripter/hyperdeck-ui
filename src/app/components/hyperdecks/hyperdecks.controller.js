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
  vm.connect = connect;
  vm.getConfiguration = getConfiguration;
  vm.getTransportInfo = getTransportInfo;

  function init() {
    vm.hyperdecks = hyperdecks;
    _.map(vm.hyperdecks, getEvents);
    _.map(vm.hyperdecks, getConfiguration);
    _.map(vm.hyperdecks, getTransportInfo);
  }

  function connect(hyperdeck) {
    Hyperdeck.connect(hyperdeck._id);
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

  function getConfiguration(hyperdeck) {
    Hyperdeck.getConfiguration(hyperdeck._id).then(function (configuration) {
      hyperdeck.configuration = configuration;
    });
  }

  function getTransportInfo(hyperdeck) {
    Hyperdeck.getTransportInfo(hyperdeck._id).then(function (transportInfo) {
      hyperdeck.transportInfo = transportInfo;
    });
  }
}
})();
