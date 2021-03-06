﻿var OPC_API = function () {

};

OPC_API.tank_out = { "dens": 842.2, "mass": 137.443755, "level": 2864.3, "temp": 1.65, "volume": 163.1961, "water_level": 0.0, "water_volume": 0.0 };

OPC_API.rfid_out = {
    //"part1": 39, "part2": 11623, "card": { "Id": 920, "Active": true, "AutoNumber": "АЕ 0457 ЕР - Тест", "Number": "039,11623", "Debitor": 101487 }
    "part1": 39, "part2": 11623, "card": null
};


OPC_API.prototype.getTagsRFID = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/opc/rfid',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                if (run_mode === 0) {
                    callback(data);
                }
                // TODO:!!!ТЕСТ УБРАТЬ
                if (run_mode === 1) {
                    callback(OPC_API.rfid_out);
                }
            }

        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
            if (typeof callback === 'function') {
                callback(null);
            }
        },
        complete: function () {
            AJAXComplete();
        },
    });
};

OPC_API.prototype.getTagsTank = function (callback) {
    $.ajax({
        type: 'GET',
        url: '../../api/tsk/opc/tank',
        async: true,
        dataType: 'json',
        beforeSend: function () {
            AJAXBeforeSend();
        },
        success: function (data) {
            if (typeof callback === 'function') {
                if (typeof callback === 'function') {
                    if (run_mode === 0) {
                        callback(data);
                    }
                    // TODO:!!!ТЕСТ УБРАТЬ
                    if (run_mode === 1) {
                        callback(OPC_API.tank_out);
                    }
                }
            }
        },
        error: function (x, y, z) {
            OnAJAXError(x, y, z);
            if (typeof callback === 'function') {
                callback(null);
            }
        },
        complete: function () {
            AJAXComplete();
        },
    });
};