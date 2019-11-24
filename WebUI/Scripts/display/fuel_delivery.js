//=========== ЗАГРУЗКА СТРАНИЦЫ СТАРТ ПРОЕКТА ====================================================
$(function () {
    //=======================================================================
    // Обявление глобальных переменных
    //=======================================================================
    var vars = $.getUrlVars(),
        tsk = new TSK_API(),
        log = null, // лог иницилизируется после загрузки библиотек
        sap = new SAP_API(),
        opc = new OPC_API(),
        user_tsk = null,
        rfid = null,        // RFID
        tank = null,        // Tank
        supply = null,  // резерврование 3 режим
        reserv = null,  // резерврование 2 режим
        //=======================================================================
        // поля
        //=======================================================================
        title_fuel_delivery = null,
        button_ok = null,
        button_cancel = null,
        // Номер переданый форме
        num_select = (vars !== null && vars.num !== null && (Number(vars.num) > 0 && Number(vars.num) < 3) ? Number(vars.num) : 0),

        title = "Выдача неопределена",
        default_mode = -1,
        num_out = null,         // номер ТРК выдачи
        open_fuel_sale = null,  // Открытая строка выдачи
        // RFID
        active_card = null,
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
        sap_ndopusk = null,

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
        sap_ozm_amount_multiplier = null,

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
        //=======================================================================
        // методы
        //=======================================================================
        // Вывести сообщение
        updateTips = function (t) {
            $(".validateTips")
                .text(t)
                .addClass("ui-state-highlight");
            setTimeout(function () {
                $(".validateTips").removeClass("ui-state-highlight", 1500);
            }, 500);
        },
        //--- Проверка ------------------------------
        // Проверка на пустой объект
        checkIsNullOfMessage = function (o, message) {
            if (o.val() === '' || o.val() === null) {
                o.addClass("ui-state-error");
                updateTips(message);
                return false;
            } else {
                return true;
            }
        },
        // Проверка на мин. и мак. значения
        checkSelect = function (o, n, min, max) {
            if (o.val() > min && o.val() <= max) {
                return true;
            } else {
                o.addClass("ui-state-error");
                updateTips("Значение " + n + " должно быть в диапазоне от " +
                    min + " до " + max + ".");
                return false;
            }
        },
        // Проверка на выбор за указаный период valume
        checkSelectOfMessage = function (o, message, min, max) {
            if (o.val() > max || o.val() < min) {
                o.addClass("ui-state-error");
                updateTips(message);
                return false;
            } else {
                return true;
            }
        },
        // Проверка на выбор valume >-1
        checkSelectValOfMessage = function (o, message) {
            if (Number(o.val()) < 0) {
                o.addClass("ui-state-error");
                updateTips(message);
                return false;
            } else {
                return true;
            }
        },
        //
        checkLength = function (o, n, min, max) {
            if (o.val().length > max || o.val().length < min) {
                o.addClass("ui-state-error");
                updateTips("Размер поля [" + n + "] должен быть в диапазоне от " +
                    min + " до " + max + ".");
                return false;
            } else {
                return true;
            }
        },
        // Проверка на "0"
        checkIsZeroOfMessage = function (o, message) {
            if (o.val() === 0) {
                o.addClass("ui-state-error");
                updateTips(message);
                return false;
            } else {
                return true;
            }
        },
        // Проверка на правильность заполнения формы
        validationConfirm = function (variant) {
            var valid = true;
            $(".validateTips").text('');
            $(".ui-state-error").removeClass("ui-state-error");
            // Проверка RFID карты на активность

            //if (ntype_test === 0 && confirm_df.gun) { valid = valid && confirm_df.checkCheckboxOfMessage($('#deliver-Taken'), true, "Пистолет не снят - выдача запрещена!") }

            //if (confirm_df.input_deliver_start_counter.val() !== null && Number(confirm_df.input_deliver_start_counter.val()) > 0) {
            //    //
            //} else {
            //    confirm_df.input_deliver_start_counter.addClass("ui-state-error");
            //    confirm_df.updateTips("Начальное значение счетчика неопределенно или равно '0'");

            //    return false;
            //}

            if (!deliver.prop('checked')) {

                if (rfid.card === null) {
                    updateTips("Нет RFID-карты - выдача запрещена!");
                    return false;
                }

                if (rfid.card && !rfid.card.Active) {
                    updateTips("RFID-карта не активна - выдача запрещена!");
                    return false;
                }
                // режим не пролив
                valid = valid && checkSelectOfMessage(variant_sap, "Выберите и заполните вариант выдачи", 1, 6);
                valid = valid && checkIsNullOfMessage(fio, "Не указан ФИО");

                valid = valid && checkIsNullOfMessage(sap_num, "Не указан номер (резервирования\ исх.поставки\ требования М-11)");
                if (variant !== "4" && variant !== "3" && variant !== "2" && variant !== "6") valid = valid && checkIsNullOfMessage(sap_num_pos, "Не указан номер позиции");
                if (variant === "3") valid = valid && checkSelectValOfMessage(sap_num_pos, "Выберите номер позиции ИП", 1, 10);
                if (variant === "2") valid = valid && checkSelectValOfMessage(sap_num_pos_reserv_select, "Выберите номер позиции ИП", 1, 10);
                valid = valid && checkLength(sap_num_ts, "Номер ТС фактический", 1, 40);
                if (variant !== "5" && variant !== "6") valid = valid && checkLength(sap_name_forwarder, "ФИО экспедитора", 1, 40);
                //Проверка возврата САП
                if (variant !== "4") valid = valid && checkLength(sap_ozm, "ОЗМ из (резервирования \ поставки) ", 1, 18);
                if (variant === "4") valid = valid && checkSelectValOfMessage(sap_ozm_select, "Выберите ОЗМ");
                if (variant !== "4") valid = valid && checkIsNullOfMessage(sap_stock_recipient, "Нет значения склад получателя (из резервирования \ получатель материала в ИП)");
                if (variant === "4") valid = valid && checkSelectValOfMessage(sap_stock_recipient_select, "Выберите склад получателя");
                if (variant !== "4" && variant !== "3") valid = valid && checkIsNullOfMessage(sap_factory_recipient, "Нет значения завод-получатель");
                if (variant === "4") valid = valid && checkSelectValOfMessage(sap_factory_recipient_select, "Выберите завод-получатель");
                if (variant === "2" && variant === "5" && variant === "6") valid = valid && checkIsNullOfMessage(sap_id_card, "Нет значения ID карты");

                if (variant !== "4") {
                    var max_mass = sap_ozm_amount.val() !== null ? Number(sap_ozm_amount.val()) : 0;
                    valid = valid && checkSelect(mass, "расчетной массы", 0, max_mass * sap_ozm_amount_multiplier);
                }
                // Проверка на совподение ОЗМ -------------------------------------------------
                var ozm_sap = variant === "4" ? sap_ozm_select.val() : sap_ozm.val();
                if (ozm_sap && ozm_sap !== "") {
                    ozm_sap = Number(ozm_sap);
                    if (ozm_sap !== 107000024) {
                        updateTips("ОЗМ емкости и ОЗМ требования – не совпадают!");
                        valid = false;
                    }
                }
                //-------------------------------------------------------------------------------
            }
            // Проверка выбранного бака

            valid = valid && checkIsNullOfMessage(dens, "Нет значения плотности ГСМ в баке");
            valid = valid && checkIsZeroOfMessage(dens, "Значение плотности ГСМ в баке = 0, вычисление массы невозможно");

            // Проверка колонки
            valid = valid && checkIsNullOfMessage(volume, "Нет значения дозы");
            //if (confirm_df.type === 0) {
            //    valid = valid && confirm_df.checkSelect(confirm_df.input_deliver_dose_fuel, "дозы", 0, 4999);
            //} else {
            //    valid = valid && confirm_df.checkSelect(confirm_df.input_deliver_dose_fuel, "дозы (для НС)", ins_advance, 99999);
            //}
            return valid;
        },
        //---- Инициализация окна -------------------
        // Инициализация
        init = function (num_trk, callback) {
            num_out = num_trk;
            switch (num_trk) {
                case 1:
                    title = "Выдача на тепловоз (К-1)";
                    fio_title = "ФИО машиниста :";
                    default_mode = 5;
                    break;
                case 2:
                    title = "Выдача на бензовоз (К-2)";
                    fio_title = "ФИО водителя :";
                    default_mode = 2;
                    break;
                default:
                    break;
            }

            log.logInfo('Панель оператора "' + title + '" - ОТКРЫТА');

            button_ok = $('button#button-ok').on('click', function () {
                event.preventDefault();
                LockScreen('Идет проверка...');
                var variant = variant_sap.val();
                var valid = validationConfirm(variant);
                if (valid) {
                    // Да форма заполнена
                    log.logInfo('Панель оператора "' + title + '" - Нажата кнопка [Ок]');
                    // Получим новую строку
                    var new_fuel_sale = getNewFuelSale(num_out);
                    log.logInfo('Получена новая строка fuelsale = ' + JSON.stringify(new_fuel_sale));
                    tsk.postFuelSale(new_fuel_sale, function (result_id) {
                        if (result_id > 0) {
                            // Закрыть форму
                            log.logInfo('Добавлена новая строка fuelsale = ' + JSON.stringify(new_fuel_sale)+ ', id новой строки='+result_id);
                            tsk.putSettingDisplay_fd(0,
                                function (result_close) {
                                    log.logInfo('Панель оператора "' + title + '" - закрыта, result=' + result_close);
                                });
                        } else {
                            updateTips("ОШИБКА создания новой строки fuelsale, код ошибки=" + result_id);
                            log.logWarn("ОШИБКА создания новой строки fuelsale, код ошибки=" + result_id);
                            LockScreenOff();
                        }
                    });

                } else {
                    // Нет форма не заполнена
                    // .....
                    LockScreenOff();
                }

            });
            button_cancel = $('button#button-cancel').on('click', function () {
                event.preventDefault();
                LockScreen('Форма закрывается...');
                tsk.putSettingDisplay_fd(0,
                    function (result) {
                        log.logInfo('Панель оператора "' + title + '" - Нажата кнопка [Cancel]');
                    });
            });
            // Установим признак открытого окна
            tsk.putSettingDisplay_fd(num_trk,
                function (result) {
                    // -----------------------------------------------------------------
                    title_fuel_delivery = $('legend#title-fuel-delivery').text(title);
                    active_card = $('input#active-card');

                    num_card = $('input#num-card').addClass('input-view');
                    num_car = $('input#num-car').addClass('input-view');
                    debitor = $('input#debitor').addClass('input-view');
                    fio_title = $('th#fio-title').text(fio_title);
                    fio = $('input#fio').addClass('input-edit');
                    volume = $('input#volume').addClass('input-edit').on("change", function (event) {
                        event.preventDefault();
                        viewCalcMass();
                    });
                    dens = $('input#dens').addClass('input-view');
                    // Считать параметры емкости
                    getTank();
                    mass = $('input#mass').addClass('input-view');
                    // тех-пролив
                    deliver = $('input#deliver').prop('checked', false).on("change", function (event) {
                        event.preventDefault();
                        var res = $(this).prop('checked');
                        if (res) {
                            variant_sap.val(-1).selectmenu("refresh");
                            clear();
                            variant_sap.selectmenu("disable");
                        } else {
                            variant_sap.selectmenu("enable");
                        }
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
                            log.logInfo('Выбран режим : ' + ui.item.value + ' - ' + ui.item.label);
                            viewVariant(ui.item.value);
                        },
                        null
                    );

                    button_sap_tr = $('tr#button-sap');
                    // По объему, массе и дебитору
                    button_sap_debitor = $('button#button-sap-debitor').on('click', function () {
                        $(".validateTips").text('');
                        $(".ui-state-error").removeClass("ui-state-error");
                        event.preventDefault();
                        var i = variant_sap.val();

                        var valid = true;
                        valid = valid && checkIsNullOfMessage(volume, "Нет значения дозы");
                        valid = valid && checkSelect(volume, "дозы", 0, 99999);

                        if (valid === true) {
                            // Покажем позиции
                            sap_num_pos_select.selectmenu("widget").hide();
                            sap_num_pos_reserv_select.selectmenu("widget").hide();
                            sap_ozm.val('');
                            sap_ozm_amount.val('');
                            sap_stock_recipient.val('');
                            sap_factory_recipient.val('');
                            switch (i) {
                                case "5":
                                    // По резервированию
                                    var val = volume.val();
                                    var mas = mass.val();
                                    var debitor = rfid.card !== null ? rfid.card.Debitor : null;
                                    var ozm = '107000024';
                                    // Запрос в САП по объему, массе и дебитору
                                    sap.getReservationOfVolumeMassDebitor(
                                        val,
                                        mas,
                                        debitor,
                                        ozm,
                                        i,
                                        function (result) {
                                            log.logInfo('Получен ответ на запрос в САП (по объему, массе и дебитору) Метод: [getReservationOfVolumeMassDebitor(val=' + val + ',mas=' + mas + ',debitor=' + debitor + ',ozm=' + ozm + ',i=' + i + ')] Ответ: ' + JSON.stringify(result));
                                            if (result.message !== undefined) {
                                                updateTips(result.message);
                                            } else {
                                                if (result.RSNUM === "") {
                                                    updateTips("Резервирование для цеха не найдено. Код дебитора :" + debitor + ", объем :" + val + ", масса :" + mass);
                                                } else {
                                                    sap_num.val(result.RSNUM);
                                                    sap_num_pos.val(result.RSPOS);
                                                    //sap_ozm_bak.val('000000000107000024');
                                                    sap_ozm.val(result.MATNR);
                                                    sap_ozm_amount.val(result.BDMNG);
                                                    sap_factory_recipient.val(result.WERKS);
                                                    sap_ozm_amount_multiplier = ($.trim(result.MEINS) === "TO" ? 1000 : 1);
                                                    label_sap_ozm_amount.text('Количество ' + result.MEINS + ':');
                                                    var depots = tsk.getCat_DepotsOfID($.trim(result.UMLGO));
                                                    if (depots) {
                                                        sap_stock_recipient.val('(' + depots.id + ') ' + depots.name);
                                                    }
                                                }
                                            }
                                        }
                                    );
                                    break;
                            }
                        }
                    });
                    // По наряд-допуску
                    button_sap_ndopusk = $('button#button-sap-ndopusk').on('click', function () {
                        $(".validateTips").text('');
                        $(".ui-state-error").removeClass("ui-state-error");
                        event.preventDefault();
                        var i = variant_sap.val();
                        if (i === "6") {
                            sap_ndopusk = null;
                            sap_num_pos_select.selectmenu("widget").hide();
                            sap_num_pos_reserv_select.selectmenu("widget").hide();
                            sap_ozm.val('');
                            sap_ozm_amount.val('');
                            sap_stock_recipient.val('');
                            sap_factory_recipient.val('');
                            //sap_ozm_bak.val('000000000107000024');

                        }
                        var valid = true;

                        valid = valid && checkIsNullOfMessage(sap_num, "Введите наряд-допуск");
                        valid = valid && checkSelect(sap_num, "наряд-допуска", 0, 99999);

                        if (valid === true) {
                            sap_num.val($.trim(sap_num.val())); // Уберем пробелы
                            var num = sap_num.val();
                            sap.getReservationOfNDopusk(
                                num, i,
                                function (result) {
                                    log.logInfo('Получен ответ на запрос в САП (по наряд-допуску) Метод: [getReservationOfNDopusk(num=' + num + ',i=' + i + ')] Ответ: ' + JSON.stringify(result));
                                    if (result.message !== undefined) {
                                        updateTips(result.message);
                                    } else {
                                        if (result.RSNUM === "") {
                                            updateTips("Резервирование по наряд-допуску:" + num + " не найдено");
                                        } else {
                                            sap_ndopusk = num;
                                            sap_num.val(result.RSNUM);
                                            sap_num_pos.val(result.RSPOS);
                                            sap_ozm.val(result.MATNR);
                                            sap_ozm_amount.val(result.BDMNG);
                                            sap_factory_recipient.val(result.WERKS);
                                            sap_ozm_amount_multiplier = ($.trim(result.MEINS) === "TO" ? 1000 : 1);
                                            label_sap_ozm_amount.text('Количество ' + result.MEINS + ':');
                                            var depots = tsk.getCat_DepotsOfID($.trim(result.UMLGO));
                                            if (depots) {
                                                sap_stock_recipient.val('(' + depots.id + ') ' + depots.name);
                                            }
                                        }
                                    }
                                });
                        }
                    });
                    // По номеру и поз.
                    button_sap = $('button#button-sap').on('click', function () {
                        $(".validateTips").text('');
                        $(".ui-state-error").removeClass("ui-state-error");
                        event.preventDefault();
                        var i = variant_sap.val();

                        // Покажем позиции
                        sap_num_pos_select.selectmenu("widget").hide();
                        sap_num_pos_reserv_select.selectmenu("widget").hide();
                        sap_ozm.val('');
                        sap_ozm_amount.val('');
                        sap_stock_recipient.val('');
                        sap_factory_recipient.val('');
                        switch (i) {
                            case "3":
                                sap_num.val($.trim(sap_num.val())); // Уберем пробелы
                                num = sap_num.val();
                                supply = null;
                                // По номеру и поз.
                                sap.getSupply(
                                    num,
                                    function (result) {
                                        log.logInfo('Получен ответ на запрос в САП (по номеру и позиции) Метод: [getSupply(num=' + num + ')] Ответ: ' + JSON.stringify(result));
                                        if (result.message !== undefined) {
                                            updateTips(result.message);
                                        } else {
                                            // Проверим на возврат значений
                                            if (result.length > 0 && result[0].posnr !== "") {
                                                supply = result;
                                                var pos = [];
                                                for (i = 0, count_result_supply = result.length; i < count_result_supply; i++) {
                                                    pos.push({ value: result[i].posnr, text: result[i].posnr });
                                                };
                                                // Обновим перечень позиций
                                                updateOptionSelect(sap_num_pos_select, pos, null, -1, null);
                                                // Покажем позиции
                                                sap_num_pos_select.selectmenu("widget").show();
                                            } else {
                                                updateTips("Номер ИП №" + num + " - не найден в САП");
                                            }

                                        }
                                    }
                                );
                                break;
                            case "2":
                                // По резервированию с передачей озм
                                sap_num.val($.trim(sap_num.val())); // Уберем пробелы
                                num = sap_num.val();
                                // Определим ОЗМ бака
                                var matrn = '000000000107000024';
                                sap.getReservationMatrn(
                                    num,
                                    matrn,
                                    2,
                                    function (result) {
                                        log.logInfo('Получен ответ на запрос в САП (По резервированию с передачей озм) Метод: [getReservationMatrn(num=' + num + ', matrn=' + matrn + ', mode=2)] Ответ: ' + JSON.stringify(result));
                                        if (result.message !== undefined) {
                                            updateTips(result.message);
                                        } else {
                                            if (result === null || result[0].RSNUM === "") {
                                                updateTips("Номер резервирования №" + num + ", по ОЗМ:" + matrn + " - не найдет в САП");
                                            } else {
                                                reserv = result;
                                                var pos = [];
                                                for (i = 0, count_result_supply = result.length; i < count_result_supply; i++) {
                                                    pos.push({ value: result[i].RSPOS, text: result[i].RSPOS });
                                                };
                                                // Обновим перечень позиций
                                                updateOptionSelect(sap_num_pos_reserv_select, pos, null, -1, null);
                                                // Покажем позиции
                                                sap_num_pos_reserv_select.selectmenu("widget").show();
                                            }
                                        }
                                    }
                                );
                                break;
                        }
                    });

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
                            sap_ozm.val('');
                            sap_ozm_amount.val('');
                            sap_stock_recipient.val('');
                            //sap_ozm_bak.val('000000000107000024');
                            var sup = getPosSupply(ui.item.value);
                            if (sup) {
                                sap_ozm.val(sup.MATNR);
                                sap_ozm_amount.val(sup.LFIMG);
                                sap_stock_recipient.val(sup.KUNNR);
                                sap_ozm_amount_multiplier = ($.trim(sup.MEINS) === "TO" ? 1000 : 1);
                                label_sap_ozm_amount.text('Количество ' + sup.MEINS + ':');
                            }
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
                            sap_ozm.val('');
                            sap_ozm_amount.val('');
                            sap_factory_recipient.val('');
                            sap_stock_recipient.val('');
                            //sap_ozm_bak.val('000000000107000024');
                            var reserv = getPosReserv(ui.item.value);
                            if (reserv !== null) {

                                if (reserv.BWART !== "X01") {
                                    updateTips("Вид движения BWART =" + reserv.BWART + " (В режиме 2, BWART должен содержать X01)");
                                } else {
                                    //if (Number($.trim(reserv.UMLGO)) !== 435 && Number($.trim(reserv.UMLGO)) !== rfid.card.House) {
                                    //    OnAJAXErrorOfMessage("Шифр цеха "+rfid.card.House+" RFID карты, не совпадает с шифром цеха "+reserv.UMLGO+" резервирования.");
                                    //} else {
                                    //UMLGO = "163 "
                                    sap_num.val(reserv.RSNUM);
                                    sap_ozm.val(reserv.MATNR);
                                    sap_ozm_amount.val(reserv.BDMNG);
                                    sap_factory_recipient.val(reserv.WERKS);
                                    sap_ozm_amount_multiplier = ($.trim(reserv.MEINS) === "TO" ? 1000 : 1);
                                    label_sap_ozm_amount.text('Количество ' + reserv.MEINS + ':');
                                    var depots = tsk.getCat_DepotsOfID($.trim(reserv.UMLGO));
                                    if (depots) {
                                        sap_stock_recipient.val('(' + depots.id + ') ' + depots.name);
                                    }
                                    //}

                                }
                            } else {
                                updateTips("По указанной позиции нет данных");
                            }
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
                    sap_ozm_bak = $('input#sap-ozm-bak').val('000000000107000024').addClass('input-view');

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
                            //sap_ozm_bak.val('000000000107000024');
                            sap_stock_recipient_select.selectmenu("enable");
                            var kod = "000" + ui.item.value;
                            updateOptionSelect(
                                sap_stock_recipient_select,
                                tsk.getCat_DepotsOfWerks(kod.substring(kod.length - 4)),
                                function (row) {
                                    return { value: row.id, text: row.name };
                                },
                                -1,
                                null);
                        },
                        null);

                    sap_id_card_tr = $('tr#sap-id-card');
                    label_sap_id_card = $('th#label-sap-id-card');
                    sap_id_card = $('input#sap-id-card').addClass('input-view');
                    // Прочесть карту
                    getCard();
                    // Показать карту
                    viewCard();
                    // -----------------------------------------------------------------
                    if (typeof callback === 'function') {
                        LockScreenOff();
                        callback();
                    }
                });
        },
        //---- вариант выдачи ------------------------
        // Очистить выбор
        clear = function () {
            $(".validateTips").text('');
            $(".ui-state-error").removeClass("ui-state-error");
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

            switch (Number(value)) {
                case 2:
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
                    if (rfid.card) {
                        sap_num_ts.val(rfid.card.AutoNumber);
                        sap_id_card.val(rfid.card.Id);
                    }
                    break;
                case 3:
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

                    if (rfid.card) {
                        sap_num_ts.val(rfid.card.AutoNumber);
                    }
                    break;
                case 4:
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
                    if (rfid.card) {
                        sap_num_ts.val(rfid.card.AutoNumber);
                    }
                    break;
                case 5:
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
                    if (rfid.card) {
                        sap_num_ts.val(rfid.card.AutoNumber);
                        //sap_num_ts.val(rfid.card.Debitor + '/' + rfid.card.AutoNumber + '/' + rfid.card.AutoModel);
                        sap_id_card.val(rfid.card.Id);
                    }
                    break;
                case 6:
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
                    if (rfid.card) {
                        //sap_num_ts.val(rfid.card.Debitor + '/' + rfid.card.AutoNumber + '/' + rfid.card.AutoModel)
                        sap_num_ts.val(rfid.card.AutoNumber);
                        sap_id_card.val(rfid.card.Id);
                    }
                    break;
                default:
                    clear();
                    break;
            }
        },
        //---- методы рачсетов, и определений --------
        // Вывести расчетную массу
        viewCalcMass = function () {
            var massa = 0;
            var dens_n = Number(dens.val() !== "" ? dens.val() : "0");
            if (dens_n > 0) {
                massa = Number(volume.val() !== "" ? volume.val() : "0") * dens_n * 0.001;
                mass.val(massa.toFixed(2));
            } else {
                updateTips('Плотность не указана');
                mass.val('');
                volume.val('');
            }
        },
        // Определить RFID карту
        getCard = function () {
            //rfid.card = {
            //    Id: 1,
            //    Active: true,
            //    Number: '039,02783',
            //    AutoNumber: 'АЕ 0311 АВ',
            //    Debitor: 101635,
            //    AutoModel: 'НЕМАН 52012 050',
            //};
        },
        // Определить параметры емкости
        getTank = function () {
            if (tank) {
                if (tank.mass > 0 && tank.volume > 0) {
                    var densite = tank.mass / tank.volume * 1000;
                    dens.val(densite.toFixed(5));
                }
            }
        },
        // Показать RFID карту
        viewCard = function () {
            // Вывести инфу по карте
            if (rfid.card) {
                active_card.prop('checked', rfid.card.Active);
                num_card.val(rfid.card.Number);
                num_car.val(rfid.card.AutoNumber);
                debitor.val(rfid.card.Debitor);
                //$('#deliver-AutoModel').val(rfid.card.AutoModel).addClass('input_view');
            } else {
                active_card.prop('checked', false);
                num_card.val('');
                num_car.val('');
                debitor.val('');
                //$('#deliver-AutoModel').val('').addClass('input_view');
            }
        },
        // Получить поставку
        getPosSupply = function (pos) {
            var sup = getObjects(supply, 'posnr', pos);
            if (sup !== null && sup.length > 0) {
                return sup[0];
            }
            return null;
        },
        // Вернуть позицию резервирования
        getPosReserv = function (pos) {
            var sup = getObjects(reserv, 'RSPOS', pos);
            if (sup !== null && sup.length > 0) {
                return sup[0];
            }
            return null;
        },
        //--------------------------------------------
        // FuelSale
        getNewFuelSale = function (num) {
            var current_date = new Date();
            var variant = variant_sap.val();
            if (variant === "-1" && deliver.prop('checked')) {
                variant = "7";
            }
            var user = user_tsk !== null ? user_tsk.UserName : '?';
            // Получить новую строку
            var new_fs = {
                id: 0,
                Out_Type: num,
                Target_Volume: volume.val(),
                Target_Dens: dens.val(),
                Target_Mass: mass.val(),
                User: user,
                Crated_Date: toISOStringTZ(current_date),
                Start_Counter: null,
                Start_Level: null,
                Start_Volume: null,
                Start_Mass: null,
                Start_Dens: null,
                Start_Temp: null,
                Start_Water: null,
                Start_Date: null,
                End_Counter: null,
                End_Level: null,
                End_Volume: null,
                End_Mass: null,
                End_Dens: null,
                End_Temp: null,
                End_Water: null,
                End_Date: null,
                close: null,
                RFID: variant !== "7" ? num_card.val() : null,
                FLAG_R: variant,
                N_TREB: variant !== "7" ? sap_num.val() : null,
                RSPOS: variant === "3" ? sap_num_pos_select.val() : variant === "2" ? sap_num_pos_reserv_select.val() : variant !== "4" && variant !== "7" ? sap_num_pos.val() : null,
                N_BAK: 1,
                OZM_BAK: sap_ozm_bak.val(),
                OZM_TREB: variant === "4" ? sap_ozm_select.val() : variant !== "7" ? sap_ozm.val() : null,
                PLOTNOST: null,
                VOLUME: null,
                MASS: null,
                LOGIN_R: user,
                LOGIN_EXP: variant !== "7" ? sap_name_forwarder.val() : null,
                N_POST: variant !== "7" ? sap_num_kpp.val() : null,
                TRANSP_FAKT: variant !== "7" ? sap_num_ts.val() : null,
                LGORT: variant === "4" ? sap_stock_recipient_select.val() : null,
                WERKS: variant === "4" ? sap_factory_recipient_select.val() : null,
                N_DEB: variant === "5" || variant === "6" ? debitor.val() : null,
                sending: null
            };
            return new_fs;
        },
        //--------------------------------------------
        // Загрузка библиотек
        loadReference = function (callback) {
            LockScreen('Инициализация данных');
            var count = 5;
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
            // Определим наличие не открытых
            tsk.getOpenFuelSale(num_select,
                function (result_id_open) {
                    open_fuel_sale = result_id_open;
                    count -= 1;
                    if (count <= 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            // Определим rfid карту
            opc.getTagsRFID(
                function (result_rfid) {
                    rfid = result_rfid;
                    count -= 1;
                    if (count <= 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
            // Определим rfid карту
            opc.getTagsTank(
                function (result_tank) {
                    tank = result_tank;
                    count -= 1;
                    if (count <= 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                });
        };

    //=======================================================================
    // Запуск
    //=======================================================================
    // Загрузка библиотек
    loadReference(function (result) {
        // Создадим класс лог
        log = new LOG_API(blog, user_tsk !== null ? user_tsk.UserName : '?');
        init(num_select, function () {
            variant_sap.val(default_mode).selectmenu("refresh").selectmenu("enable"); // Сбросили выбор вариантов
            viewVariant(default_mode);
            log.logInfo('Инициализация завершена, режим по умолчанию: ' + default_mode);
            LockScreenOff();
            if (open_fuel_sale !== null) {
                button_ok.hide();
                variant_sap.selectmenu("refresh").selectmenu("disable"); // выбор вариантов
                button_sap_tr.hide();
                updateTips('!ВНИМАНИЕ. Перед настройкой новой выдачи закройте предыдущую выдачу id=' + open_fuel_sale.id + ' дата создания:' + open_fuel_sale.Crated_Date + ' cоздал оператор:' + open_fuel_sale.User);
            }
        });


        //    // Загрузка документа
        //    $(document).ready(function () {

        //    });
    });
});