//=========== ЗАГРУЗКА СТРАНИЦЫ СТАРТ ПРОЕКТА ====================================================
$(function () {

    var vars = $.getUrlVars(),
        tsk = new TSK_API(),
        log = new LOG_API(),
        user_tsk = null,
        card = null,
        //-----------------------------------------------------------------------
        // поля
        //-----------------------------------------------------------------------
        title_fuel_delivery = null,
        button_ok = null,
        button_cancel = null,

        // RFID
        num_card = null,
        num_car = null,
        debitor = null,
        fio_title = null,
        fio = null,
        // Доза и режимы работы
        volume = null,
        dens = null,
        mass = null,
        deliver = null, // тех-пролив
        variant_sap = null,
        // SAP
        button_sap_tr = null,
        button_sap_debitor = null,
        button_sap_ndopusk = null,
        button_sap = null,

        sap_num_tr = null,
        label_sap_num = null,
        sap_num = null,

        sap_num_pos_tr = null,
        label_sap_num_pos = null,
        sap_num_pos = null, // Номер позиции для запроса в сап по поставкам
        sap_num_pos_select = null,
        sap_num_pos_reserv_select = null,

        sap_num_ts_tr = null,
        label_sap_num_ts = null,
        sap_num_ts = null,

        sap_num_kpp_tr = null,
        label_sap_num_kpp = null,
        sap_num_kpp = null,

        sap_name_forwarder_tr = null,
        label_sap_name_forwarder = null,
        sap_name_forwarder = null,

        // SAP отображение режимов
        sap_ozm_tr = null,
        label_sap_ozm = null,
        sap_ozm = null,
        sap_ozm_select = null,

        sap_ozm_bak_tr = null,
        label_sap_ozm_bak = null,
        sap_ozm_bak = null,

        sap_ozm_amount_tr = null,
        label_sap_ozm_amount = null,
        sap_ozm_amount = null,

        sap_stock_recipient_tr = null,
        label_sap_stock_recipient = null,
        sap_stock_recipient = null,
        sap_stock_recipient_select = null,

        sap_factory_recipient_tr = null,
        label_sap_factory_recipient = null,
        sap_factory_recipient = null,
        sap_factory_recipient_select = null,

        sap_id_card_tr = null,
        label_sap_id_card = null,
        sap_id_card = null,
        //-----------------------------------------------------------------------
        // методы
        //-----------------------------------------------------------------------
        // Инициализация
        init = function (num_trk, callback) {
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
            log.logInfo(user_tsk !== null ? user_tsk.UserName : '?', 'Панель оператора "' + title + '" - ОТКРЫТА');
            button_ok = $('button#button-ok').on('click', function () {
                event.preventDefault();
                LockScreen('Идет проверка...');

                tsk.putSettingDisplay_fd(0,
                    function (result) {
                        log.logInfo(user_tsk !== null ? user_tsk.UserName : '?', 'Панель оператора "' + title + '" - Нажата кнопка [Ок]');
                    });
            });
            button_cancel = $('button#button-cancel').on('click', function () {
                event.preventDefault();
                LockScreen('Форма закрывается...');
                tsk.putSettingDisplay_fd(0,
                    function (result) {
                        log.logInfo(user_tsk !== null ? user_tsk.UserName : '?', 'Панель оператора "' + title + '" - Нажата кнопка [Cancel]');
                    });
            });

            tsk.putSettingDisplay_fd(num_trk,
                function (result) {
                    // -----------------------------------------------------------------
                    title_fuel_delivery = $('legend#title-fuel-delivery').text(title);

                    num_card = $('input#num-card');
                    num_car = $('input#num-car');
                    debitor = $('input#debitor');
                    fio_title = $('th#fio-title').text(fio_title);
                    fio = $('input#fio');
                    volume = $('input#volume').addClass('input-edit');
                    dens = $('input#dens').addClass('input-view');
                    mass = $('input#mass').addClass('input-view');
                    // тех-пролив
                    deliver = $('input#deliver').prop('checked', false).on("change", function (event) {
                        event.preventDefault();
                        var res = $(this).prop('checked');
                        //if (res) {
                        //    variant_sap.val(-1).selectmenu("refresh");
                        //    clear();
                        //    variant_sap.selectmenu("disable");
                        //} else {
                        //    variant_sap.selectmenu("enable");
                        //}
                    });

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
                            viewVariant(ui.item.value);
                        },
                        null
                    );

                    button_sap_tr = $('tr#button-sap');
                    button_sap_debitor = $('button#button-sap-debitor');
                    button_sap_ndopusk = $('button#button-sap-ndopusk');
                    button_sap = $('button#button-sap');

                    sap_num_tr = $('tr#sap-num');
                    label_sap_num = $('th#label-sap-num');
                    sap_num = $('input#sap-num').addClass('input-edit');

                    sap_num_pos_tr = $('tr#sap-num-pos');
                    label_sap_num_pos = $('th#label-sap-num-pos');
                    sap_num_pos = $('input#sap-num-pos').addClass('input-edit');
                    // Номер позиции для запроса в сап по поставкам
                    sap_num_pos_select = initSelect(
                        $('select#sap-num-pos'),
                        { width: 150 },
                        null,
                        null,
                        -1,
                        function (event, ui) {
                            event.preventDefault();
                            //sap_ozm.val('');
                            //sap_ozm_amount.val('');
                            //sap_stock_recipient.val('');
                            //var sup = confirm_df.getPosSupply(ui.item.value);
                            //if (sup) {
                            //    sap_ozm.val(sup.MATNR);
                            //    sap_ozm_amount.val(sup.LFIMG);
                            //    sap_stock_recipient.val(sup.KUNNR);
                            //    confirm_df.sap_ozm_amount_multiplier = ($.trim(sup.MEINS) === "TO" ? 1000 : 1);
                            //    label_sap_ozm_amount.text('Количество ' + sup.MEINS + ':');
                            //    // Уточнить добавить WERKS (завод)
                            //};
                        },
                        null).addClass('input-edit');
                    sap_num_pos_reserv_select = initSelect(
                        $('select#sap-num-pos-reserv'),
                        { width: 150 },
                        null,
                        null,
                        -1,
                        function (event, ui) {
                            event.preventDefault();
                            //sap_ozm.val('');
                            //sap_ozm_amount.val('');
                            //sap_factory_recipient.val('');
                            //sap_stock_recipient.val('');
                            //var reserv = confirm_df.getPosReserv(ui.item.value);
                            //if (reserv !== null) {

                            //    if (reserv.BWART !== "X01") {
                            //        OnAJAXErrorOfMessage("Вид движения BWART =" + result.BWART + " (В режиме 2, BWART должен содержать X01)");
                            //    } else {
                            //        //if (Number($.trim(reserv.UMLGO)) !== 435 && Number($.trim(reserv.UMLGO)) !== card.House) {
                            //        //    OnAJAXErrorOfMessage("Шифр цеха "+card.House+" RFID карты, не совпадает с шифром цеха "+reserv.UMLGO+" резервирования.");
                            //        //} else {
                            //        //UMLGO = "163 "
                            //        sap_num.val(reserv.RSNUM);
                            //        sap_ozm.val(reserv.MATNR);
                            //        sap_ozm_amount.val(reserv.BDMNG);
                            //        sap_factory_recipient.val(reserv.WERKS);
                            //        confirm_df.sap_ozm_amount_multiplier = ($.trim(reserv.MEINS) === "TO" ? 1000 : 1);
                            //        label_sap_ozm_amount.text('Количество ' + reserv.MEINS + ':');
                            //        var depots = catalog_depots.get($.trim(reserv.UMLGO));
                            //        if (depots) {
                            //            sap_stock_recipient.val('(' + depots.id + ') ' + depots.name);
                            //        }
                            //        //}

                            //    }
                            //} else {
                            //    OnAJAXErrorOfMessage("По указанной позиции нет данных");
                            //}
                        },
                        null).addClass('input-edit');

                    sap_num_ts_tr = $('tr#sap-num-ts');
                    label_sap_num_ts = $('th#label-sap-num-ts');
                    sap_num_ts = $('input#sap-num-ts').addClass('input-edit');

                    sap_num_kpp_tr = $('tr#sap-num-kpp');
                    label_sap_num_kpp = $('th#label-sap-num-kpp');
                    sap_num_kpp = $('input#sap-num-kpp').addClass('input-edit');

                    sap_name_forwarder_tr = $('tr#sap-name-forwarder');
                    label_sap_name_forwarder = $('th#label-sap-name-forwarder');
                    sap_name_forwarder = $('input#sap-name-forwarder').addClass('input-edit');

                    sap_ozm_tr = $('tr#sap-ozm');
                    label_sap_ozm = $('th#label-sap-ozm');
                    sap_ozm = $('input#sap-ozm').addClass('input-view');
                    sap_ozm_select = initSelect(
                        $('select#sap-ozm'),
                        { width: 280 },
                        tsk.list_catalog_ozm,
                        function (row) {
                            return { value: Number(row.id), text: row.name };
                        },
                        -1,
                        function (event, ui) {
                            event.preventDefault();
                        },
                        null);

                    sap_ozm_bak_tr = $('tr#sap-ozm-bak');
                    label_sap_ozm_bak = $('th#label-sap-ozm-bak');
                    sap_ozm_bak = $('textarea#sap-ozm-bak').addClass('input-view');

                    sap_ozm_amount_tr = $('tr#sap-ozm-amount');
                    label_sap_ozm_amount = $('th#label-sap-ozm-amount');
                    sap_ozm_amount = $('input#sap-ozm-amount').addClass('input-view');

                    sap_stock_recipient_tr = $('tr#sap-stock-recipient');
                    label_sap_stock_recipient = $('th#label-sap-stock-recipient');
                    sap_stock_recipient = $('textarea#sap-stock-recipient').addClass('input-view');
                    sap_stock_recipient_select = initSelect(
                        $('select#sap-stock-recipient'),
                        { width: 280 },
                        //tsk.list_catalog_depots,
                        [],
                        function (row) {
                            return { value: row.id, text: row.name };
                        },
                        -1,
                        function (event, ui) {
                            event.preventDefault();
                        },
                        null);

                    sap_factory_recipient_tr = $('tr#sap-factory-recipient');
                    label_sap_factory_recipient = $('th#label-sap-factory-recipient');
                    sap_factory_recipient = $('input#sap-factory-recipient').addClass('input-view');
                    sap_factory_recipient_select = initSelect(
                        $('select#sap-factory-recipient'),
                        { width: 280 },
                        tsk.list_catalog_werks,
                        function (row) {
                            return { value: Number(row.id), text: row.name };
                        },
                        -1,
                        function (event, ui) {
                            event.preventDefault();
                            //sap_stock_recipient_select.selectmenu("enable");
                            //var kod = "000" + ui.item.value;
                            ////kod.length - 4;
                            ////var kd = kod.substring(kod.length - 4);
                            ////var list = catalog_depots.getOfWerks(kod.substring(kod.length - 4));
                            //updateOptionSelect(
                            //    sap_stock_recipient_select,
                            //    catalog_depots.getOfWerks(kod.substring(kod.length - 4)),
                            //    function (row) {
                            //        return { value: row.id, text: row.name };
                            //    },
                            //    -1,
                            //    null);
                        },
                        null);

                    sap_id_card_tr = $('tr#sap-id-card');
                    label_sap_id_card = $('th#label-sap-id-card');
                    sap_id_card = $('input#sap-id-card').addClass('input-view');

                    // -----------------------------------------------------------------
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                });

        },
        // Очистить выбор
        clear = function () {
            //$(".validateTips").text('');
            //$(".ui-state-error").removeClass("ui-state-error");
            volume.val(''); // Очистить дозу
            mass.val('Введите объем и [Enter]'); // Очистить массу
            button_sap_tr.hide();
            sap_num_tr.hide(); sap_num.val('');
            sap_num_pos_tr.hide(); sap_num_pos.val('').hide(); sap_num_pos_select.selectmenu("widget").hide(); sap_num_pos_reserv_select.selectmenu("widget").hide();
            sap_num_ts_tr.hide(); sap_num_ts.val('');
            sap_num_kpp_tr.hide(); sap_num_kpp.val('');
            sap_name_forwarder_tr.hide(); sap_name_forwarder.val('');
            sap_ozm_tr.hide(); sap_ozm.val('').hide(); sap_ozm_select.selectmenu("widget").hide();
            sap_ozm_bak_tr.hide(); sap_ozm_bak.text('');
            sap_ozm_amount_tr.hide(); sap_ozm_amount.val('');
            sap_stock_recipient_tr.hide(); sap_stock_recipient.text('').hide(); sap_stock_recipient_select.selectmenu("widget").hide();
            sap_factory_recipient_tr.hide(); sap_factory_recipient.val('').hide(); sap_factory_recipient_select.selectmenu("widget").hide();
            sap_id_card_tr.hide(); sap_id_card.val('');
        },
        // Вариант выбора
        viewVariant = function (value) {
            switch (value) {
                case '2':
                    clear();
                    button_sap_tr.show();
                    button_sap.show();
                    button_sap_debitor.hide();
                    button_sap_ndopusk.hide();
                    sap_num_tr.show(); label_sap_num.text('*Номер резервирования :');
                    sap_num_pos_tr.show(); sap_num_pos.hide(); label_sap_num_pos.text('Выберите № поз. :');
                    sap_num_ts_tr.show(); label_sap_num_ts.text('*Номер ТС фактический :');
                    sap_num_kpp_tr.show(); label_sap_num_kpp.text('*№ КПП :');
                    sap_name_forwarder_tr.show(); label_sap_name_forwarder.text('*ФИО экспедитора :');
                    sap_ozm_tr.show(); sap_ozm.attr('disabled', 'disabled').show(); label_sap_ozm.text('ОЗМ из резервирования :');
                    sap_ozm_bak_tr.show(); label_sap_ozm_bak.text('ОЗМ согласно бака :');
                    sap_ozm_amount_tr.show(); label_sap_ozm_amount.text('Количество :');
                    sap_stock_recipient_tr.show(); sap_stock_recipient.attr('disabled', 'disabled').show(); label_sap_stock_recipient.text('Склад получателя из резервирования :');
                    sap_factory_recipient_tr.show(); sap_factory_recipient.attr('disabled', 'disabled').show(); label_sap_factory_recipient.text('Завод-получатель :');
                    sap_id_card_tr.show(); label_sap_id_card.text('ИД карта :');
                    if (card) {
                        sap_num_ts.val(card.AutoNumber);
                        sap_id_card.val(card.Id);
                    }
                    break;
                case '3':
                    clear();
                    button_sap_tr.show();
                    button_sap.show();
                    button_sap_debitor.hide();
                    button_sap_ndopusk.hide();
                    sap_num_tr.show(); label_sap_num.text('*Номер исх.поставки :');
                    sap_num_pos_tr.show(); label_sap_num_pos.text('*Номер позиции ИП :');
                    sap_num_ts_tr.show(); label_sap_num_ts.text('*Номер ТС фактический :');
                    sap_num_kpp_tr.show(); label_sap_num_kpp.text('*№ КПП :');
                    sap_name_forwarder_tr.show(); label_sap_name_forwarder.text('*ФИО экспедитора :');
                    sap_ozm_tr.show(); sap_ozm.attr('disabled', 'disabled').show(); label_sap_ozm.text('ОЗМ из поставки :');
                    sap_ozm_bak_tr.show(); label_sap_ozm_bak.text('ОЗМ согласно бака :');
                    sap_ozm_amount_tr.show(); label_sap_ozm_amount.text('Количество :');
                    sap_stock_recipient_tr.show(); sap_stock_recipient.attr('disabled', 'disabled').show(); label_sap_stock_recipient.text('Склад получателя = Получатель материала в ИП :');

                    if (card) {
                        sap_num_ts.val(card.AutoNumber);
                    }
                    break;
                case '4':
                    clear();
                    sap_num_tr.show(); label_sap_num.text('*Номер требования М-11 :');
                    sap_num_ts_tr.show(); label_sap_num_ts.text('*Номер ТС фактический :');
                    sap_num_kpp_tr.show(); label_sap_num_kpp.text('*№ КПП :');
                    sap_name_forwarder_tr.show(); label_sap_name_forwarder.text('*ФИО экспедитора :');
                    sap_ozm_tr.show();
                    sap_ozm_select.selectmenu("widget").show();
                    //sap_ozm_select.val(-1).selectmenu("refresh");
                    label_sap_ozm.text('ОЗМ :');
                    sap_ozm_bak_tr.show(); label_sap_ozm_bak.text('ОЗМ согласно бака :');
                    sap_stock_recipient_tr.show();
                    sap_stock_recipient_select.selectmenu("widget").show();
                    sap_stock_recipient_select.selectmenu("disable");
                    //sap_stock_recipient_select.val(-1).selectmenu("refresh");
                    label_sap_stock_recipient.text('Склад получателя :');
                    sap_factory_recipient_tr.show();
                    sap_factory_recipient_select.selectmenu("widget").show();
                    //sap_factory_recipient_select.val(-1).selectmenu("refresh");
                    label_sap_factory_recipient.text('Завод-получатель :');
                    if (card) {
                        sap_num_ts.val(card.AutoNumber);
                    }
                    break;
                case '5':
                    clear();
                    button_sap_tr.show();
                    button_sap.hide();
                    button_sap_debitor.show();
                    button_sap_ndopusk.hide();
                    sap_num_tr.show(); label_sap_num.text('*Номер резервирования :');
                    sap_num_pos_tr.show(); sap_num_pos.show(); label_sap_num_pos.text('*Номер позиции :');
                    sap_num_ts_tr.show(); label_sap_num_ts.text('*Номер ТС фактический :');
                    sap_num_kpp_tr.show(); label_sap_num_kpp.text('*№ КПП :');
                    sap_name_forwarder_tr.show(); label_sap_name_forwarder.text('*ФИО экспедитора :');
                    sap_ozm_tr.show(); sap_ozm.attr('disabled', 'disabled').show(); label_sap_ozm.text('ОЗМ из резервирования :');
                    sap_ozm_bak_tr.show(); label_sap_ozm_bak.text('ОЗМ согласно бака :');
                    sap_ozm_amount_tr.show(); label_sap_ozm_amount.text('Количество :');
                    sap_stock_recipient_tr.show(); sap_stock_recipient.attr('disabled', 'disabled').show(); label_sap_stock_recipient.text('Склад получателя из резервирования :');
                    sap_factory_recipient_tr.show(); sap_factory_recipient.attr('disabled', 'disabled').show(); label_sap_factory_recipient.text('Завод-получатель :');
                    sap_id_card_tr.show(); label_sap_id_card.text('ИД карта :');
                    if (card) {
                        sap_num_ts.val(card.AutoNumber);
                        //sap_num_ts.val(card.Debitor + '/' + card.AutoNumber + '/' + card.AutoModel);
                        sap_id_card.val(card.Id);
                    }
                    break;
                case '6':
                    clear();
                    button_sap_tr.show();
                    button_sap.hide();
                    button_sap_debitor.hide();
                    button_sap_ndopusk.show();
                    sap_num_tr.show(); label_sap_num.text('*Номер супер – маршрута:');
                    sap_num_pos_tr.show(); sap_num_pos.show(); label_sap_num_pos.text('Номер позиции :');
                    sap_num_ts_tr.show(); label_sap_num_ts.text('Номер ТС фактический :');
                    sap_num_kpp_tr.show(); label_sap_num_kpp.text('№ КПП :');
                    sap_name_forwarder_tr.show(); label_sap_name_forwarder.text('ФИО экспедитора :');
                    sap_ozm_tr.show(); sap_ozm.attr('disabled', 'disabled').show(); label_sap_ozm.text('ОЗМ из резервирования :');
                    sap_ozm_bak_tr.show(); label_sap_ozm_bak.text('ОЗМ согласно бака :');
                    sap_ozm_amount_tr.show(); label_sap_ozm_amount.text('Количество :');
                    sap_stock_recipient_tr.show(); sap_stock_recipient_tr.show(); sap_stock_recipient.attr('disabled', 'disabled').show(); label_sap_stock_recipient.text('Склад получателя из резервирования :');
                    sap_factory_recipient_tr.show(); sap_factory_recipient.attr('disabled', 'disabled').show(); label_sap_factory_recipient.text('Завод-получатель :');
                    sap_id_card_tr.show(); label_sap_id_card.text('ИД карта :');
                    if (card) {
                        //sap_num_ts.val(card.Debitor + '/' + card.AutoNumber + '/' + card.AutoModel)
                        sap_num_ts.val(card.AutoNumber);
                        sap_id_card.val(card.Id);
                    }
                    break;
                default:
                    clear();
                    break;
            }
        },
        //
        validationConfirm = function (variant) {
            var valid = true;
            $(".validateTips").text('');
            $(".ui-state-error").removeClass("ui-state-error");
            // Проверка RFID карты на активность

            if (ntype_test === 0 && confirm_df.gun) { valid = valid && confirm_df.checkCheckboxOfMessage($('#deliver-Taken'), true, "Пистолет не снят - выдача запрещена!") }

            if (confirm_df.input_deliver_start_counter.val() !== null && Number(confirm_df.input_deliver_start_counter.val()) > 0) {
                //
            } else {
                confirm_df.input_deliver_start_counter.addClass("ui-state-error");
                confirm_df.updateTips("Начальное значение счетчика неопределенно или равно '0'");

                return false;
            }

            if (!confirm_df.checkbox_deliver_Passage.prop('checked')) {

                if (confirm_df.card === null) {
                    confirm_df.updateTips("Нет RFID-карты - выдача запрещена!");
                    return false;
                }

                if (confirm_df.card && !confirm_df.card.Active) {
                    confirm_df.updateTips("RFID-карта не активна - выдача запрещена!");
                    return false;
                }
                // режим не пролив
                valid = valid && confirm_df.checkSelectOfMessage(confirm_df.select_variant, "Выберите и заполните вариант выдачи", 1, 6);

                valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_sap_num, "Не указан номер (резервирования\ исх.поставки\ требования М-11)");
                if (variant !== "4" && variant !== "3" && variant !== "2" && variant !== "6") valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_sap_num_pos, "Не указан номер позиции");
                if (variant === "3") valid = valid && confirm_df.checkSelectValOfMessage(confirm_df.select_sap_num_pos, "Выберите номер позиции ИП", 1, 10);
                if (variant === "2") valid = valid && confirm_df.checkSelectValOfMessage(confirm_df.select_sap_num_pos_reserv, "Выберите номер позиции ИП", 1, 10);
                valid = valid && confirm_df.checkLength(confirm_df.input_sap_num_ts, "Номер ТС фактический", 1, 40);
                //if (variant !== "5") valid = valid && confirm_df.checkLength(confirm_df.input_sap_num_kpp, "№ КПП", 1, 2);
                if (variant !== "5" && variant !== "6") valid = valid && confirm_df.checkLength(confirm_df.input_sap_name_forwarder, "ФИО экспедитора", 1, 40);
                //Проверка возврата САП
                if (variant !== "4") valid = valid && confirm_df.checkLength(confirm_df.input_sap_ozm, "ОЗМ из (резервирования \ поставки) ", 1, 18);
                if (variant === "4") valid = valid && confirm_df.checkSelectValOfMessage(confirm_df.select_sap_ozm, "Выберите ОЗМ");
                //valid && confirm_df.checkLength(confirm_df.input_sap_ozm_bak, "ОЗМ согласно бака", 1, 18);
                if (variant !== "4") valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_sap_stock_recipient, "Нет значения склад получателя (из резервирования \ получатель материала в ИП)");
                if (variant === "4") valid = valid && confirm_df.checkSelectValOfMessage(confirm_df.select_sap_stock_recipient, "Выберите склад получателя");
                if (variant !== "4" && variant !== "3") valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_sap_factory_recipient, "Нет значения завод-получатель");
                if (variant === "4") valid = valid && confirm_df.checkSelectValOfMessage(confirm_df.select_sap_factory_recipient, "Выберите завод-получатель");
                if (variant === "2" && variant === "5" && variant === "6") valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_sap_id_card, "Нет значения ID карты");

                if (variant !== "4") {
                    var max_mass = confirm_df.input_sap_ozm_amount.val() !== null ? Number(confirm_df.input_sap_ozm_amount.val()) : 0;
                    valid = valid && confirm_df.checkSelect(confirm_df.input_deliver_mase_fuel, "расчетной массы", 0, max_mass * confirm_df.sap_ozm_amount_multiplier);
                }
                // Проверка на совподение ОЗМ -------------------------------------------------
                var ozm_tanks;
                // Пистолет
                if (confirm_df.type === 0) {
                    ozm_tanks = confirm_df.gun != null ? confirm_df.gun.type_fuel : null;
                }
                // НС
                if (confirm_df.type === 1) {
                    ozm_tanks = confirm_df.risers != null ? confirm_df.risers.type_fuel : null;
                }
                var ozm_sap = variant === "4" ? confirm_df.select_sap_ozm.val() : confirm_df.input_sap_ozm.val();
                if (ozm_sap && ozm_sap !== "") {
                    ozm_sap = Number(ozm_sap);
                    if (ozm_sap !== ozm_tanks) {
                        confirm_df.updateTips("ОЗМ выбранной емкости и ОЗМ требования – не совпадают!");
                        valid = false;
                    }
                }
                //-------------------------------------------------------------------------------
            }
            // Проверка выбранного бака
            //valid = valid && confirm_df.checkSelectValOfMessage(confirm_df.select_capacity, "Выберите бак с топливом");
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_take_dens, "Нет значения плотности ГСМ в баке");
            valid = valid && confirm_df.checkIsZeroOfMessage(confirm_df.input_deliver_take_dens, "Значение плотности ГСМ в баке = 0, вычисление массы невозможно");
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_take_level, "Нет значения уровень ГСМ в баке");
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_take_mass, "Нет значения массы ГСМ в баке");
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_take_temp, "Нет значения температуры ГСМ в баке");
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_take_volume, "Нет значения объема ГСМ в баке");
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_take_water_level, "Нет значения уровень п-воды в баке");
            // Проверка колонки
            valid = valid && confirm_df.checkIsNullOfMessage(confirm_df.input_deliver_dose_fuel, "Нет значения дозы");
            if (confirm_df.type === 0) {
                valid = valid && confirm_df.checkSelect(confirm_df.input_deliver_dose_fuel, "дозы", 0, 4999);
            } else {
                valid = valid && confirm_df.checkSelect(confirm_df.input_deliver_dose_fuel, "дозы (для НС)", ins_advance, 99999);
            }
            return valid;
        },
        // Загрузка библиотек
        loadReference = function (callback) {
            init();
            //LockScreen('Инициализация данных');
            var count = 2;
            tsk.load(['catalog_ozm', 'catalog_depots', 'catalog_werks'], function () {
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
        var num_trk = (vars !== null && vars.num !== null && (Number(vars.num) > 0 && Number(vars.num) < 3) ? Number(vars.num) : 0);
        init(num_trk, function () {
            variant_sap.val(5).selectmenu("refresh").selectmenu("enable"); // Сбросили выбор вариантов
            viewVariant('5');
        });


        //    // Загрузка документа
        //    $(document).ready(function () {

        //    });
    });
});