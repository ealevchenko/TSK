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
                    message: ''
                };
                if (ozm === "" || ozm === null) {
                    message = "Ошибка получения данных из САП по коду дебитора. Неопределен код ОЗМ.";
                }
                if (debitor === "" || debitor === null) {
                    message = "Ошибка получения данных из САП по коду дебитора. Неопределен код Дебитора.";
                }
                if (mass === "" || mass === null) {
                    message = "Ошибка получения данных из САП по коду дебитора. Неопределена Масса выдачи.";
                }
                if (valume === "" || valume === null) {
                    message = "Ошибка получения данных из САП по коду дебитора. Неопределен Объем выдачи.";
                }
                if (typeof callback === 'function') {
                    error['message'] = message;
                    callback(error);
                }
            }
        },
        complete: function () {
            AJAXComplete();
        }
    });
};