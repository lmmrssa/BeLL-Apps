var couchapp = require('couchapp'),
    path = require('path');

ddoc = {
    _id: '_design/bell'
}

ddoc.views = {
    MembersByLogin: {
        map: function(doc) {
            if (doc.kind == 'Member') {
                emit(doc.login, true)
            }
        }
    },
    MembersById: {
        map: function(doc) {
            if (doc.kind == 'Member' && doc._id) {
                emit(doc._id, doc)
            }
        }
    },
    FemaleCount: {
        map: function(doc) {
            if (doc.Gender == "Female") {
                emit(doc._id, 1);
            }
        },
        reduce: function(keys, values, rereduce) {
            return sum(values);
        }
    },
    MaleCount: {
        map: function(doc) {
            if (doc.Gender == "Male") {
                emit(doc._id, 1);
            }
        },
        reduce: function(keys, values, rereduce) {
            return sum(values);
        }
    },
    Members: {
        map: function(doc) {
            if (doc && doc.kind == 'Member') {
                emit(doc._id, true)
            }
        }
    },
    count: {
        map: function(doc) {
            emit(doc._id, 1);
        },
        reduce: function(keys, values, rereduce) {
            return sum(values);
        }
    },
    search: {
        map: function(doc) {
            var txt = doc.lastName;
            var words = txt.replace(/[!.,;]+/g, "").toLowerCase().split(" ");
            for (var word in words) {
                emit(words[word], doc._id);
            }
        }
    },
    MaleCountByCommunity: {
        map: function(doc) {
            if (doc.community && doc.Gender == "Male") {
                emit(doc.community, 1)
            }
        },
        reduce: function(keys, values, rereduce) {
            return sum(values);
        }

    },
    FemaleCountByCommunity: {
        map: function(doc) {
            if (doc.community && doc.Gender == "Female") {
                emit(doc.community, 1)
            }
        },
        reduce: function(keys, values, rereduce) {
            return sum(values);
        }

    },
    MemberByGender: {
        map: function(doc) {
            if (doc.Gender && doc.kind == 'Member') {
                emit(doc.Gender, doc)
            }
        }
    },
    MembersByCommunity: {
        map: function(doc) {
            if (doc.community && doc.kind == 'Member') {
                emit(doc.community, doc)
            }
        }
    },
    allMembers: {
        map: function(doc) {
            if (doc && doc.kind == 'Member') {
                emit(doc._id, doc)
            }
        }
    }
}
ddoc.filters = {
    adminFilter: function(doc, req) {
        if (doc.firstName == "Default" && doc.lastName == "Admin") {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = ddoc;