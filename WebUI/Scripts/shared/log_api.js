
var LOG_API = function () {

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
LOG_API.prototype.logInfo = function (user, message) {
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
LOG_API.prototype.logWarn = function (user, message) {
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
LOG_API.prototype.logError = function (user, message) {
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
LOG_API.prototype.logDebug = function (user, message) {
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
LOG_API.prototype.logEvent = function (user, message) {
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