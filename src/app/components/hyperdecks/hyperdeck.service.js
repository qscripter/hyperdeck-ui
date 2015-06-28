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
    getEvents: getEvents
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

  function returnData(response) {
    return response.data;
  }
}
})();
