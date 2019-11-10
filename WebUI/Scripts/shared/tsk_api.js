
var TSK_API = function () {

};

TSK_API.list_users_changes = [];

TSK_API.prototype.load = function (list, callback) {
    var count = list.length;
    var obj = this;
    $.each(list, function (i, el) {
        if (el === 'users_changes') {
            TSK_API.prototype.getUsersChanges(function (result_users_changes) {
                obj.list_users_changes = result_users_changes;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        };
    });
};
/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= UsersChanges ======================================
// Вернуть все записи
TSK_API.prototype.getUsersChanges = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/users_changes/all',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Вернуть последнюю запись
TSK_API.prototype.getLastUsersChanges = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/users_changes/last',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};