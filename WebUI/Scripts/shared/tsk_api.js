
var TSK_API = function () {

};

TSK_API.list_users_changes = [];
TSK_API.list_catalog_ozm = [];
TSK_API.list_catalog_depots = [];
TSK_API.list_catalog_werks = [];

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
        }
        if (el === 'catalog_ozm') {
            TSK_API.prototype.getCat_OZM(function (result_catalog_ozm) {
                obj.list_catalog_ozm = result_catalog_ozm;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        }
        if (el === 'catalog_depots') {
            TSK_API.prototype.getCat_Depots(function (result_catalog_depots) {
                obj.list_catalog_depots = result_catalog_depots;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        }
        if (el === 'catalog_werks') {
            TSK_API.prototype.getCat_Werks(function (result_catalog_werks) {
                obj.list_catalog_werks = result_catalog_werks;
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                }
            });
        }
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
//======= Settings ==========================================
// Вернуть значение "Display_fd"
TSK_API.prototype.getSettingDisplay_fd = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/setting/display_fd',
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
// Сохранить значение
TSK_API.prototype.putSettingDisplay_fd = function (value, callback) {
    $.ajax({
        type: 'PUT',
        url: '../../api/tsk/setting/display_fd/' + value,
        async: true,
        //data: JSON.stringify(""),
        contentType: "application/json;charset=utf-8",
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
//======= Catalog ==========================================
// Вернуть значение "Catalog OZM"
TSK_API.prototype.getCat_OZM = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/catalog/ozm/all',
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
// Вернуть значение "Catalog Depots"
TSK_API.prototype.getCat_Depots = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/catalog/depots/all',
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
// Вернуть значение "Catalog Werks"
TSK_API.prototype.getCat_Werks = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/catalog/werks/all',
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
