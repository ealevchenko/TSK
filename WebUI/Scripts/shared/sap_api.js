var SAP_API = function () {

};
// тест
SAP_API.reservation_vd_debitor_out =
    {
        "RSNUM": "0004622423",
        "RSPOS": "0001",
        "MATNR": "000000000107000024",
        "WERKS": "0010",
        "LGORT": "435 ",
        "UMLGO": "163 ",
        "UMWRK": "0010",
        "BDMNG": "46221.695",
        "ENMNG": null,
        "LGOBE": "Запр.стан.УСХиПП",
        "MEINS": "KG ",
        "BWART": "X01"
    };

SAP_API.supply_out =
    [
        {
            "vbeln": "8000000020",
            "posnr": "000001",
            "MATNR": "000000000000000259",
            "WERKS": "0010",
            "LGORT": "706G",
            "KUNNR": "4000000600",
            "LFIMG": "3542.01",
            "LGOBE": "",
            "MEINS": "TO",
            "BWART": null
        },
        {
            "vbeln": "8000000020",
            "posnr": "000011",
            "MATNR": "000000000000000122",
            "WERKS": "0010",
            "LGORT": "",
            "KUNNR": "4000000600",
            "LFIMG": "3542.01",
            "LGOBE": "",
            "MEINS": "TO",
            "BWART": null
        },
        {
            "vbeln": "8000000020",
            "posnr": "000021",
            "MATNR": "000000000000000123",
            "WERKS": "0010",
            "LGORT": "",
            "KUNNR": "4000000600",
            "LFIMG": "3542.01",
            "LGOBE": "",
            "MEINS": "TO",
            "BWART": null
        }
    ];

SAP_API.reservation_out = [
    {
        "RSNUM": "0004364606",
        "RSPOS": "0002",
        "MATNR": "000000000107000024",
        "WERKS": "0010",
        "LGORT": "435 ",
        "UMLGO": "163 ",
        "UMWRK": "0010",
        "BDMNG": "3.9279999999998836",
        "ENMNG": null,
        "LGOBE": "Запр.стан.УСХиПП",
        "MEINS": "KG ",
        "BWART": "X01"
    },
    {
        "RSNUM": "0004364606",
        "RSPOS": "0003",
        "MATNR": "000000000107000024",
        "WERKS": "0010",
        "LGORT": "435 ",
        "UMLGO": "163 ",
        "UMWRK": "0010",
        "BDMNG": "3.8209999999962747",
        "ENMNG": null,
        "LGOBE": "Запр.стан.УСХиПП",
        "MEINS": "KG ",
        "BWART": "X01"
    }
];

SAP_API.reservation_ndopusk =
    { "RSNUM": "0004074757", "RSPOS": "0002", "MATNR": "000000000107000024", "WERKS": "0010", "LGORT": "435 ", "UMLGO": "162 ", "UMWRK": "", "BDMNG": "9.0", "ENMNG": null, "LGOBE": "", "MEINS": "", "BWART": "X01" }

/* ----------------------------------------------------------
AJAX функции
-------------------------------------------------------------*/
//======= SAP ======================================
// Резервирование по объему, массе и дебитору
SAP_API.prototype.getReservationOfVolumeMassDebitor = function (valume, mass, debitor, ozm, mode, callback) {
    $.ajax({
        type: 'GET',
        url: '/api/sap/reservation/value/' + valume + '/mass/' + mass + '/debitor/' + debitor + '/ozm/' + ozm + '/mode/' + mode,
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
            // TODO:!!!ТЕСТ УБРАТЬ
            if (run_mode === 1) {
                if (typeof callback === 'function') {
                    callback(SAP_API.reservation_vd_debitor_out);
                }
            } else {
                var error = {
                    message: 'Ошибка ' + x.status
                };
                if (ozm === "" || ozm === null) {
                    error['message'] = "Ошибка получения данных из САП по коду дебитора. Неопределен код ОЗМ.";
                }
                if (debitor === "" || debitor === null) {
                    error['message'] = "Ошибка получения данных из САП по коду дебитора. Неопределен код Дебитора.";
                }
                if (mass === "" || mass === null) {
                    error['message'] = "Ошибка получения данных из САП по коду дебитора. Неопределена Масса выдачи.";
                }
                if (valume === "" || valume === null) {
                    error['message'] = "Ошибка получения данных из САП по коду дебитора. Неопределен Объем выдачи.";
                }
                if (typeof callback === 'function') {
                    callback(error);
                }
            }
        },
        complete: function () {
            AJAXComplete();
        }
    });
};
// Поставки
SAP_API.prototype.getSupply = function (post, callback) {
    $.ajax({
        type: 'GET',
        url: '/api/sap/supply/post/' + post,
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
            // TODO:!!!ТЕСТ УБРАТЬ
            if (run_mode === 1) {
                if (typeof callback === 'function') {
                    callback(SAP_API.supply_out);
                }
            } else {
                var error = {
                    message: 'Ошибка ' + x.status
                };
                if (post === "") {
                    error['message'] = "Ошибка получения данных из САП по ИП. Укажите номер ИП.";
                }
                if (typeof callback === 'function') {
                    callback(error);
                }
            }

        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Резервирование с уточнением ozm
SAP_API.prototype.getReservationMatrn = function (num, matrn, mode, callback) {
    $.ajax({
        type: 'GET',
        url: '/api/sap/reservation_matrn/num/' + num + '/matrn/' + matrn + '/mode/' + mode,
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
            // TODO:!!!ТЕСТ УБРАТЬ
            if (run_mode === 1) {
                if (typeof callback === 'function') {
                    callback(SAP_API.reservation_out);
                }
            } else {
                var error = {
                    message: 'Ошибка ' + x.status
                };
                if (num === "" || num === null) {
                    error['message'] = "Ошибка получения данных из САП по резервированию. Укажите номер резервирования.";
                }
                if (typeof callback === 'function') {
                    callback(error);
                }
            }
        },
        complete: function () {
            AJAXComplete();
        },
    });
};
// Резервирование по наряд-допуску
SAP_API.prototype.getReservationOfNDopusk = function (num, mode, callback) {
    $.ajax({
        type: 'GET',
        url: '/api/sap/reservation/num_dopusk/' + num + '/mode/' + mode,
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
            // TODO:!!!ТЕСТ УБРАТЬ
            if (run_mode === 1) {
                if (typeof callback === 'function') {
                    callback(SAP_API.reservation_ndopusk);
                }
            } else {
                var error = {
                    message: 'Ошибка ' + x.status
                };
                if (num === "" || num === null) {
                    error['message'] = "Ошибка получения данных из САП по резервированию. Укажите номер резервирования.";
                }
                if (typeof callback === 'function') {
                    callback(error);
                }
            }
        },
        complete: function () {
            AJAXComplete();
        },
    });
};