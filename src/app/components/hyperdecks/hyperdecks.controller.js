(function () {
'use strict';

angular
  .module('hyperdeckUi')
  .controller('HyperdecksCtrl', controller);

/* @ngInject */
function controller(hyperdecks, Hyperdeck, $websocket) {
  var vm = this;

  init();

  vm.updateRemote = updateRemote;
  vm.sendTransportCommand = sendTransportCommand;
  vm.getEvents = getEvents;
  vm.connect = connect;
  vm.getConfiguration = getConfiguration;
  vm.getTransportInfo = getTransportInfo;
  vm.getSlotInfo = getSlotInfo;

  function init() {
    var dataStream = $websocket('ws://localhost:8888');
    dataStream.onMessage(function(message) {
        var data = JSON.parse(message.data);
        var deck;
        if (_.has(data, 'connectionStatus')) {
          deck = findDeck(data._id);
          if (deck) {
            deck.connectionStatus = data.connectionStatus;
          }
        } else if (_.has(data, 'event')) {
          deck = findDeck(data._id);
          if (deck) {
            deck.events.unshift(data.event);
          }
        }
      });

    vm.hyperdecks = hyperdecks;
    _.map(vm.hyperdecks, getEvents);
    _.map(vm.hyperdecks, getConfiguration);
    _.map(vm.hyperdecks, getTransportInfo);
  }

  function findDeck(id) {
    return _.findWhere(vm.hyperdecks, {'_id': id});
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
    if (hyperdeck.connectionStatus === 'Connected') {
      Hyperdeck.getConfiguration(hyperdeck._id).then(function (configuration) {
        hyperdeck.configuration = configuration;
      });
    }
  }

  function getTransportInfo(hyperdeck) {
    if (hyperdeck.connectionStatus === 'Connected') {
      Hyperdeck.getTransportInfo(hyperdeck._id).then(function (transportInfo) {
        hyperdeck.transportInfo = transportInfo;
      });
    }
  }

  function getSlotInfo(hyperdeck, slot) {
    if (hyperdeck.connectionStatus === 'Connected') {
      Hyperdeck.getSlotInfo(hyperdeck._id, slot).then(function (slotInfo) {
        if (!_.has(hyperdeck, 'slotInfo')) {
          hyperdeck.slotInfo = {};
        }
        hyperdeck.slotInfo[slot] = slotInfo;
      });
    }
  }
}
})();
