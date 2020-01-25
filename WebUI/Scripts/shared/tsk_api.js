
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
// Вернуть значение строку "Catalog Depots" по ID
TSK_API.prototype.getCat_DepotsOfID = function (id) {
    if (this.list_catalog_depots !== null) {
        var depots = getObjects(this.list_catalog_depots, 'id', id);
        if (depots !== null && depots.length > 0) {
            return depots[0];
        }
        return null;
    }

};

TSK_API.prototype.getCat_DepotsOfWerks = function (werks) {
    if (this.list_catalog_depots !== null) {
        return getObjects(this.list_catalog_depots, 'parent_id', werks);
        }
        return null;
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
//======= FuelSale ==========================================
// Получить открытую строку из базы данных
TSK_API.prototype.getOpenFuelSale = function (num, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/fuel_sale/open/num/' + num,
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
//Добавить FuelSale
TSK_API.prototype.postFuelSale = function (fuel_sale, callback) {
    $.ajax({
        url: '../../api/tsk/fuel_sale',
        type: 'POST',
        data: JSON.stringify(fuel_sale),
        contentType: "application/json;charset=utf-8",
        async: true,
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
        },
        error: function (x, y, z) {
            LockScreenOff();
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Получить выдачи за период
TSK_API.prototype.getFuelSaleOfDateTime = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/fuel_sale/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXErrorMetod("TSK_API.getFuelSaleOfDateTime", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Daily_Accounting_Report ==========================================
// Получить выдачи за период
TSK_API.prototype.getDailyAccountingReportOfDateTime = function (start, stop, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/daily_accounting_report/start/' + toISOStringTZ(start).substring(0, 19) + '/stop/' + toISOStringTZ(stop).substring(0, 19),
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
            OnAJAXErrorMetod("TSK_API.getDailyAccountingReportOfDateTime", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
//======= Daily_Accounting_Detali_Report ==========================================
// Получить выдачи за период
TSK_API.prototype.getDailyAccountingDetaliReportOfDateTime = function (date, fuel_type, callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/daily_accounting_detaly_report/date/' + toISOStringTZ(date).substring(0, 19) + '/fuel_type/' + fuel_type,
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
            OnAJAXErrorMetod("TSK_API.getDailyAccountingDetaliReportOfDateTime", x, y, z);
        },
        complete: function () {
            AJAXComplete();
        },
    });
};