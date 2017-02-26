'use strict';

module.exports = function(Patient) {
    Patient.query = function(term, cb) {
        var condition = new RegExp('.*' + term + '.*');
        Patient.find(
            {
                where: {
                    or: [
                        {name: condition},
                        {fileId: condition}
                    ]
                },
                limit: 50
            },
            function(err, patients) {
                cb(null, patients);
            }
        );
    };

    Patient.remoteMethod (
        'query',
        {
            http: {path: '/query', verb: 'get'},
            accepts: {arg: 'term', type: 'string', http: {source: 'query'}},
            returns: {arg: 'results', type: 'array'}
        }
    );

    /*Patient.redirect = function(req, resp, cb) {
        resp.redirect('/api/Patients');
    };

    Patient.remoteMethod (
        'redirect',
        {
            http: {path: '/redirect', verb: 'get'},
            accepts: [
                {arg: 'req', type: 'object', http: {source: 'req'}},
                {arg: 'res', type: 'object', http: {source: 'res'}}
            ]
        }
    );*/
};
