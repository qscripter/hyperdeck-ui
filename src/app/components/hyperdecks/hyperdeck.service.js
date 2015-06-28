(function () {
'use strict';

angular
  .module('hyperdeckUi')
  .service('Hyperdeck', service);

/* @ngInject */
function service($http) {
  var svc = {
    getAll: getAll,
    setRemote: setRemote,
    sendTransportCommand: sendTransportCommand,
    getEvents: getEvents,
    connect: connect,
    getConfiguration: getConfiguration,
    getTransportInfo: getTransportInfo,
    getSlotInfo: getSlotInfo
  };

  var endpoint = '/api/hyperdecks';

  return svc;

  function getAll() {
    return $http.get(endpoint).then(returnData);
  }

  function setRemote(id, remote) {
    return $http.post(endpoint + '/' + id + '/command', {
      remote: remote
    });
  }

  function sendTransportCommand(id, command) {
    return $http.post(endpoint + '/' + id + '/command', {
      transportCommand: command
    });
  }

  function getEvents(id) {
    return $http.get('/api/events', {
      params: {
        hyperDeck: id
      }
    }).then(returnData);
  }

  function connect(id) {
    return $http.post(singleEndpoint(id) + '/command', {
      connect: true
    });
  }

  function getConfiguration(id) {
    return $http.get(singleEndpoint(id) + '/configuration')
      .then(returnData);
  }

  function getSlotInfo(id, slot) {
    return $http.get(singleEndpoint(id) + '/slot/' + slot)
      .then(returnData)
      .then(secondsToMinutes);
  }

  function getTransportInfo(id) {
    return $http.get(singleEndpoint(id) + '/transport-info')
      .then(returnData);
  }

  function singleEndpoint(id) {
    return endpoint + '/' + id;
  }

  function returnData(response) {
    return response.data;
  }

  function secondsToMinutes(slotInfo) {
    if(_.has(slotInfo.params, 'recording time')) {
      slotInfo.params['recording time'] = Math.floor(slotInfo.params['recording time']/60);
    }
    return slotInfo;
  }
}
})();
