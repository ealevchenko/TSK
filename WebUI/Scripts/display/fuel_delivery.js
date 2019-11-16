//=========== ЗАГРУЗКА СТРАНИЦЫ СТАРТ ПРОЕКТА ====================================================
$(function () {

    var vars = $.getUrlVars(),
        tsk = new TSK_API(),
        log = new LOG_API(),
        user_tsk = null,
        num_card = $('input#num-card'),
        num_car = $('input#num-car'),
        debitor = $('input#debitor'),
        fio = $('input#fio'),
        volume = $('input#volume'),
        dens = $('input#dens'),
        mass = $('input#mass'),
        // тех-пролив
        deliver = $('input#deliver').on("change", function (event) {
            event.preventDefault();
            var res = $(this).prop('checked');
            //if (res) {
            //    confirm_df.select_variant.val(-1).selectmenu("refresh");
            //    confirm_df.clear();
            //    confirm_df.select_variant.selectmenu("disable");
            //} else {
            //    confirm_df.select_variant.selectmenu("enable");
            //}
        }),

        variant_sap = initSelect(
            $('select#variant-sap'),
            { width: 300 },
            [
                { value: 2, text: 'По резервированию' },
                { value: 3, text: 'По исходящей поставке' },
                { value: 4, text: 'По требованию (самовывоз)' },
                { value: 5, text: 'Заправка в баки ТС' },
                { value: 6, text: 'Выдача в топливозаправщик (супер-маршрут).' }
            ],
            null,
            -1,
            function (event, ui) {
                event.preventDefault();

            },
            null
        ),
        button_sap_debitor = $('button#button-sap-debitor'),
        button_sap_ndopusk = $('button#button-sap-ndopusk'),
        button_sap = $('button#button-sap'),
        label_sap_num = $('th#label-sap-num'),
        sap_num = $('input#sap-num'),
        label_sap_num_pos = $('th#label-sap-num-pos'),
        sap_num_pos = $('input#sap-num-pos'),
        // Номер позиции для запроса в сап по поставкам
        sap_num_pos_select = initSelect(
            $('select#sap-num-pos'),
            { width: 150 },
            null,
            null,
            -1,
            function (event, ui) {
                event.preventDefault();
                //confirm_df.input_sap_ozm.val('');
                //confirm_df.input_sap_ozm_amount.val('');
                //confirm_df.input_sap_stock_recipient.val('');
                //var sup = confirm_df.getPosSupply(ui.item.value);
                //if (sup) {
                //    confirm_df.input_sap_ozm.val(sup.MATNR);
                //    confirm_df.input_sap_ozm_amount.val(sup.LFIMG);
                //    confirm_df.input_sap_stock_recipient.val(sup.KUNNR);
                //    confirm_df.sap_ozm_amount_multiplier = ($.trim(sup.MEINS) === "TO" ? 1000 : 1);
                //    $('#label-sap-ozm-amount').text('Количество ' + sup.MEINS + ':');
                //    // Уточнить добавить WERKS (завод)
                //};
            },
            null),
        sap_num_pos_reserv_select = initSelect(
            $('select#sap-num-pos-reserv'),
            { width: 150 },
            null,
            null,
            -1,
            function (event, ui) {
                event.preventDefault();
                //confirm_df.input_sap_ozm.val('');
                //confirm_df.input_sap_ozm_amount.val('');
                //confirm_df.input_sap_factory_recipient.val('');
                //confirm_df.input_sap_stock_recipient.val('');
                //var reserv = confirm_df.getPosReserv(ui.item.value);
                //if (reserv !== null) {

                //    if (reserv.BWART !== "X01") {
                //        OnAJAXErrorOfMessage("Вид движения BWART =" + result.BWART + " (В режиме 2, BWART должен содержать X01)");
                //    } else {
                //        //if (Number($.trim(reserv.UMLGO)) !== 435 && Number($.trim(reserv.UMLGO)) !== confirm_df.card.House) {
                //        //    OnAJAXErrorOfMessage("Шифр цеха "+confirm_df.card.House+" RFID карты, не совпадает с шифром цеха "+reserv.UMLGO+" резервирования.");
                //        //} else {
                //        //UMLGO = "163 "
                //        confirm_df.input_sap_num.val(reserv.RSNUM);
                //        confirm_df.input_sap_ozm.val(reserv.MATNR);
                //        confirm_df.input_sap_ozm_amount.val(reserv.BDMNG);
                //        confirm_df.input_sap_factory_recipient.val(reserv.WERKS);
                //        confirm_df.sap_ozm_amount_multiplier = ($.trim(reserv.MEINS) === "TO" ? 1000 : 1);
                //        $('#label-sap-ozm-amount').text('Количество ' + reserv.MEINS + ':');
                //        var depots = catalog_depots.get($.trim(reserv.UMLGO));
                //        if (depots) {
                //            confirm_df.input_sap_stock_recipient.val('(' + depots.id + ') ' + depots.name);
                //        }
                //        //}

                //    }
                //} else {
                //    OnAJAXErrorOfMessage("По указанной позиции нет данных");
                //}
            },
            null),
        label_sap_num_ts = $('th#label-sap-num-ts'),
        sap_num_ts = $('input#sap-num-ts'),
        label_sap_num_kpp = $('th#label-sap-num-kpp'),
        sap_num_kpp = $('input#sap-num-kpp'),
        label_sap_name_forwarder = $('th#label-sap-name-forwarder'),
        sap_name_forwarder = $('input#sap-name-forwarder'),

        button_sap_tr = $('tr#button-sap'),
        sap_num_tr = $('tr#sap-num'),
        sap_num_pos_tr = $('tr#sap-num-pos'),
        sap_num_ts_tr = $('tr#sap-num-ts'),
        sap_num_kpp_tr = $('tr#sap-num-kpp'),
        sap_name_forwarder_tr = $('tr#sap-name-forwarder'),

        sap_ozm_tr = $('tr#sap-ozm'),
        label_sap_ozm = $('th#label-sap-ozm'),
        sap_ozm = $('input#sap-ozm'),
        sap_ozmselect_ = initSelect(
            $('select#sap-ozm'),
            { width: 280 },
            null,//catalog_ozm.list,
            null,
            //function (row) {
            //    return { value: Number(row.id), text: row.name };
            //},
            -1,
            function (event, ui) {
                event.preventDefault();
            },
            null),

        sap_ozm_bak_tr = $('tr#sap-ozm-bak'),
        label_sap_ozm_bak = $('th#label-sap-ozm-bak'),
        sap_ozm_bak = $('textarea#sap-ozm-bak'),

        sap_ozm_amount_tr = $('tr#sap-ozm-amount'),
        label_sap_ozm_amount = $('th#label-sap-ozm-amount'),
        sap_ozm_amount = $('input#sap-ozm-amount'),

        sap_stock_recipient_tr = $('tr#sap-stock-recipient'),
        label_sap_stock_recipient = $('th#label-sap-stock-recipient'),
        sap_stock_recipient = $('textarea#sap-stock-recipient'),
        sap_stock_recipient_select = initSelect(
            $('select#sap-stock-recipient'),
            { width: 280 },
            //catalog_depots.list,
            [],
            function (row) {
                return { value: row.id, text: row.name };
            },
            -1,
            function (event, ui) {
                event.preventDefault();
            },
            null),

        sap_factory_recipient_tr = $('tr#sap-factory-recipient'),
        label_sap_factory_recipient = $('th#label-sap-factory-recipient'),
        sap_factory_recipient = $('input#sap-factory-recipient'),
        sap_factory_recipient_select = initSelect(
            $('select#sap-factory-recipient'),
            { width: 280 },
            null,//catalog_werks.list,
            function (row) {
                return { value: Number(row.id), text: row.name };
            },
            -1,
            function (event, ui) {
                event.preventDefault();
                //confirm_df.select_sap_stock_recipient.selectmenu("enable");
                //var kod = "000" + ui.item.value;
                ////kod.length - 4;
                ////var kd = kod.substring(kod.length - 4);
                ////var list = catalog_depots.getOfWerks(kod.substring(kod.length - 4));
                //updateOptionSelect(
                //    confirm_df.select_sap_stock_recipient,
                //    catalog_depots.getOfWerks(kod.substring(kod.length - 4)),
                //    function (row) {
                //        return { value: row.id, text: row.name };
                //    },
                //    -1,
                //    null);
            },
            null),

        sap_id_card_tr = $('tr#sap-id-card'),
        label_sap_id_card = $('th#label-sap-id-card'),
        sap_id_card = $('input#sap-id-card'),

        // Загрузка библиотек
        loadReference = function (callback) {
            //LockScreen('Инициализация данных');
            var count = 2;
            tsk.load(['users_changes'], function () {
                count -= 1;
                if (count <= 0) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            });
            // Определим пользователя и смену
            tsk.getLastUsersChanges(
                function (result_user_tsk) {
                    user_tsk = result_user_tsk;
                    count -= 1;
                    if (count <= 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
        };


    // Загрузка библиотек
    loadReference(function (result) {
        var num_trk = (vars !== null && vars.num !== null ? Number(vars.num) : 0);
        var title = "Выдача неопределена";
        var fio_title = "";
        switch (num_trk) {
            case 1:
                title = "Выдача на тепловоз (К-1)";
                fio_title = "ФИО машиниста :";
                break;
            case 2:
                title = "Выдача на бензовоз (К-2)";
                fio_title = "ФИО водителя :";
                break;
            default:
                break;
        }
        tsk.putSettingDisplay_fd(num_trk,
            function (result) {

            });
        $('legend#title-fuel-delivery').text(title);
        $('th#fio-title').text(fio_title);
        log.logInfo(user_tsk !== null ? user_tsk.UserName : '?', 'Панель оператора "' + title + '" - ОТКРЫТА');
        //    // Загрузка документа
        //    $(document).ready(function () {

        //    });
    });
});