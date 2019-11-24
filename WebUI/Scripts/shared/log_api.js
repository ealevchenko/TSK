
var LOG_API = function (enabled, user) {
    this.enabled = enabled;
    this.user = user;
};



/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= Log ======================================
LOG_API.prototype.postLog = function (log, callback) {
    $.ajax({
        url: '../../api/log/add',
        type: 'POST',
        data: JSON.stringify(log),
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
            OnAJAXError(x, y, z);
        },
        complete: function () {
            AJAXComplete();
        }
    });
};

// Лог информация
LOG_API.prototype.SavelogInfo = function (user, message) {
    var log = {
        ID: 0,
        DateTime: toISOStringTZ(new Date()),
        UserName: user,
        Level: 0,
        Log: message
    };
    LOG_API.prototype.postLog(log,
        function (result) {

        }
    );
};
// Лог внимание
LOG_API.prototype.SavelogWarn = function (user, message) {
    var log = {
        ID: 0,
        DateTime: toISOStringTZ(new Date()),
        UserName: user,
        Level: 1,
        Log: message
    };
    LOG_API.prototype.postLog(log,
        function (result) {

        }
    );
};
// Лог ошибка
LOG_API.prototype.SavelogError = function (user, message) {
    var log = {
        ID: 0,
        DateTime: toISOStringTZ(new Date()),
        UserName: user,
        Level: 2,
        Log: message
    };
    LOG_API.prototype.postLog(log,
        function (result) {

        }
    );
};
// Лог отладка
LOG_API.prototype.SavelogDebug = function (user, message) {
    var log = {
        ID: 0,
        DateTime: toISOStringTZ(new Date()),
        UserName: user,
        Level: 3,
        Log: message
    };
    LOG_API.prototype.postLog(log,
        function (result) {

        }
    );
};
// Лог события системы
LOG_API.prototype.SavelogEvent = function (user, message) {
    var log = {
        ID: 0,
        DateTime: toISOStringTZ(new Date()),
        UserName: user,
        Level: 4,
        Log: message
    };
    LOG_API.prototype.postLog(log,
        function (result) {

        }
    );
};
// Лог информация
LOG_API.prototype.logInfo = function (message) {
    if (this.enabled) { LOG_API.prototype.SavelogInfo(this.user, message); }
};
//
LOG_API.prototype.logWarn = function (message) {
    if (this.enabled) { LOG_API.prototype.SavelogWarn(this.user, message); }
};
//
LOG_API.prototype.logError = function (message) {
    if (this.enabled) { LOG_API.prototype.SavelogError(this.user, message); }
};
//
LOG_API.prototype.logDebug = function (message) {
    if (this.enabled) { LOG_API.prototype.SavelogDebug(this.user, message); }
};
//
LOG_API.prototype.logEvent = function (message) {
    if (this.enabled) { LOG_API.prototype.SavelogEvent(this.user, message); }
};