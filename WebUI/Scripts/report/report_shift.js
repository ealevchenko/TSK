// Загрузка документа
$(document).ready(function () {
    var date_curent = moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
        date_start = null,
        date_stop = null,
        tsk = new TSK_API(), // Создадим класс TSK_API
        tabs_reports = {
            html_div: $("#tabs-reports"),
            active: 0,
            init: function () {
                $('#link-tabs-report-1').text("ТРК");
                $('#link-tabs-report-2').text("Емкости");
                tabs_reports.html_div.tabs({
                    collapsible: true,
                    activate: function (event, ui) {
                        tabs_reports.active = tabs_reports.html_div.tabs("option", "active");
                        tabs_reports.activeTable(tabs_reports.active, true);
                    }
                });
                //tabs_reports.activeTable(this.active, true);
            },
            activeTable: function (active, data_refresh) {
                if (active === 0) {
                    table_report_1.viewTable(true);
                }
                if (active === 1) {
                    table_report_2.viewTable(true);
                }

            }
        },
        panel_report = {
            bt_left: $('button#bt-left'),
            bt_right: $('button#bt-right'),
            select_sm: $('select#select-smena'),
            span_range_date: $('span#select-range-date'),
            input_date: $('input#date'),
            input_data_start: $('input#date-start'),
            input_data_stop: $('input#date-stop'),
            obj_date: null,
            obj_date_range: null,
            init: function () {
                //
                panel_report.bt_left.on('click', function () {
                    date_curent = moment(date_curent).add('days', -1);
                    panel_report.obj_date.data('dateRangePicker').setDateRange(moment(date_curent).format('DD.MM.YYYY HH:mm:'), moment(date_curent).format('DD.MM.YYYY HH:mm:'), true);
                    panel_report.view_report();
                });
                //
                panel_report.bt_right.on('click', function () {
                    date_curent = moment(date_curent).add('days', 1);
                    panel_report.obj_date.data('dateRangePicker').setDateRange(moment(date_curent).format('DD.MM.YYYY HH:mm:'), moment(date_curent).format('DD.MM.YYYY HH:mm:'), true);
                    panel_report.view_report();
                });
                // Настроим выбор времени
                panel_report.select_sm = initSelect(
                    panel_report.select_sm,
                    { width: 200 },
                    [{ value: 1, text: "Смена Д (07:00-18:59)" }, { value: 2, text: "Смена Н (19:00-06:59)" }],
                    null,
                    1,
                    function (event, ui) {
                        event.preventDefault();
                        // Обработать выбор смены
                        panel_report.view_report();
                    },
                    null);
                // настроим компонент выбора времени
                panel_report.obj_date = panel_report.input_date.dateRangePicker(
                    {
                        language: 'ru',
                        format: 'DD.MM.YYYY',
                        autoClose: true,
                        singleDate: true,
                        singleMonth: true,
                        showShortcuts: false
                    }).
                    bind('datepicker-change', function (evt, obj) {
                        date_curent = obj.date1;
                    })
                    .bind('datepicker-closed', function () {
                        panel_report.view_report();
                        panel_report.select_sm.selectmenu("enable");
                        panel_report.bt_left.prop('disabled', false);
                        panel_report.bt_right.prop('disabled', false);
                    });
                // Выставим текущую дату
                panel_report.obj_date.data('dateRangePicker').setDateRange(moment(date_curent).format('DD.MM.YYYY HH:mm:'), moment(date_curent).format('DD.MM.YYYY HH:mm:'), true);
                // настроим компонент выбора времени
                //panel_report.obj_date_range = panel_report.span_range_date.dateRangePicker(
                //    {
                //        language: 'ru',
                //        format: 'DD.MM.YYYY HH:mm',
                //        separator: '-',
                //        autoClose: false,
                //        time: {
                //            enabled: true
                //        },
                //        setValue: function (s, s1, s2) {
                //            panel_report.input_data_start.val(s1);
                //            panel_report.input_data_stop.val(s2);

                //        }
                //    }).
                //    bind('datepicker-change', function (evt, obj) {
                //        date_start = obj.date1;
                //        date_stop = obj.date2;
                //    })
                //    .bind('datepicker-closed', function () {
                //        table_report_1.viewTable(true);
                //        panel_report.select_sm.selectmenu("disable");
                //        panel_report.bt_left.prop('disabled', true);
                //        panel_report.bt_right.prop('disabled', true);
                //    });
            },
            view_report: function () {
                if (panel_report.select_sm.val() === "2") {
                    date_start = moment(date_curent).set({ 'hour': 19, 'minute': 0, 'second': 0, 'millisecond': 0 })._d;
                    date_stop = moment(date_curent).add('days', 1).set({ 'hour': 6, 'minute': 59, 'second': 59, 'millisecond': 0 })._d;
                }
                if (panel_report.select_sm.val() === "1") {
                    date_start = moment(date_curent).set({ 'hour': 7, 'minute': 0, 'second': 0, 'millisecond': 0 })._d;
                    date_stop = moment(date_curent).set({ 'hour': 18, 'minute': 59, 'second': 59, 'millisecond': 0 })._d;
                }
                //panel_report.obj_date_range.data('dateRangePicker').setDateRange(moment(date_start).format('DD.MM.YYYY HH:mm:'), moment(date_stop).format('DD.MM.YYYY HH:mm:'), true);
                //table_report_1.viewTable(true);
                tabs_reports.activeTable(tabs_reports.active, true)
            }
        },
        //
        table_report_1 = {
            html_table: $('#table-report-1'),
            obj: null,
            select: null,
            // Инициализировать таблицу
            init: function () {
                table_report_1.obj = this.html_table.DataTable({
                    //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "select": false,
                    "autoWidth": false,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table_ru(),
                    jQueryUI: true,
                    "createdRow": function (row, data, index) {
                        //$(row).attr('id', data.id);
                        //$('td', row).eq(3).addClass('td-number');
                        //$('td', row).eq(4).addClass('td-number');
                        //$('td', row).eq(5).addClass('td-number');
                        //$('td', row).eq(7).addClass('td-number');
                    },
                    "footerCallback": function (row, data, start, end, display) {
                        var api = this.api(), data;
                        // Remove the formatting to get integer data for summation
                        var intVal = function (i) {
                            return typeof i === 'string' ?
                                i.replace(/[\$,]/g, '') * 1 :
                                typeof i === 'number' ?
                                    i : 0;
                        };
                        // Total volume
                        total_dt_volume = api
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b.diff);
                            }, 0);
                        //// Total mass
                        //total_dt_mass = api
                        //    .data()
                        //    .reduce(function (a, b) {
                        //        return intVal(a) + intVal(b.MASS);
                        //    }, 0);
                        $('td#dt-volume').text(total_dt_volume.toFixed(2) + ' (л)');
                        //$('td#dt-mass').text(total_dt_mass.toFixed(2) + ' (кг)');
                    },
                    columns: [
                        { data: "count", title: 'Счетчик', width: "50px", orderable: true, searchable: true },
                        { data: "trkBigStart", title: 'На начало смены (л)', width: "50px", orderable: true, searchable: true },
                        { data: "trkBigStop", title: "На конец смены (л)", width: "50px", orderable: true, searchable: true },
                        { data: "diff", title: "Изменение (л)", width: "50px", orderable: true, searchable: true },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            text: 'Скопировать в буфер',
                            extend: 'copyHtml5',
                        },
                        {
                            text: 'Экспорт в Excel',
                            extend: 'excelHtml5',
                            sheetName: 'Заправочная ведомость',
                            messageTop: function () {
                                return '';
                            }
                        },
                        //{
                        //    extend: 'colvis',
                        //    text: 'Выбрать поля таблицы',
                        //    collectionLayout: 'fixed two-column',
                        //    //postfixButtons: ['colvisRestore']
                        //},
                        //{
                        //    extend: 'colvisGroup',
                        //    text: 'Показать все поля',
                        //    show: ':hidden'
                        //},
                        //{
                        //    extend: 'pageLength',
                        //}
                    ],
                });
            },
            // Показать таблицу с данными
            viewTable: function (data_refresh) {
                LockScreen('Мы обрабатываем ваш запрос...');
                if (table_report_1.list | data_refresh === true) {
                    // Обновим данные
                    tsk.getTRKcountersOfDateTime(
                        date_start,
                        date_stop,
                        function (result) {
                            //table_report_1.list = result;
                            table_report_1.loadDataTable(result);
                            table_report_1.obj.draw();
                        }
                    );
                } else {
                    table_report_1.loadDataTable(mors.list_cards_wagons);
                    table_report_1.obj.draw();
                };
            },
            // Загрузить данные
            loadDataTable: function (data) {
                table_report_1.list = data;
                table_report_1.obj.clear();
                for (i = 0; i < data.length; i++) {
                    table_report_1.obj.row.add(table_report_1.getRow(data[i]));
                }
                LockScreenOff();
                //table_report_1.initComplete();
            },
            // Получить строку для таблицы
            getRow: function (data) {
                return {
                    "count": data.count,
                    "trkBigStart": data.trkBigStart,
                    "trkBigStop": data.trkBigStop,
                    "diff": data.diff
                };
            },
            //// Обновить данные в таблице
            //updateRow: function (data) {
            //    if (data) {
            //        var row = this.getRow(data);
            //        var index = table_report_1.obj.row('#' + data.num).index();
            //        table_report_1.obj.cell(index, 1).data(row.genus_wagon);
            //        table_report_1.obj.cell(index, 2).data(row.state);
            //        table_report_1.obj.cell(index, 3).data(row.wagon_manufacturer);
            //        table_report_1.obj.cell(index, 4).data(row.year_wagon_create);
            //        table_report_1.obj.cell(index, 5).data(row.station);
            //        table_report_1.obj.cell(index, 6).data(row.carrying_capacity);
            //        table_report_1.obj.cell(index, 7).data(row.tara);
            //        table_report_1.obj.cell(index, 8).data(row.type_repairs);
            //        table_report_1.obj.cell(index, 9).data(row.date_type_repairs);
            //        table_report_1.obj.cell(index, 10).data(row.code_model_wagon);
            //        table_report_1.obj.cell(index, 11).data(row.type_wagon);
            //        table_report_1.obj.cell(index, 12).data(row.axis_length);
            //        table_report_1.obj.cell(index, 13).data(row.body_volume);
            //        table_report_1.obj.cell(index, 14).data(row.type_ownership);
            //        table_report_1.obj.cell(index, 15).data(row.owner_wagon);
            //        table_report_1.obj.cell(index, 16).data(row.date_registration);
            //        table_report_1.obj.cell(index, 17).data(row.lessor_wagon);
            //        table_report_1.obj.cell(index, 18).data(row.operator_wagon);
            //        table_report_1.obj.cell(index, 19).data(row.poligon_travel_wagon);
            //        table_report_1.obj.cell(index, 20).data(row.special_conditions);
            //        table_report_1.obj.cell(index, 21).data(row.sap);
            //        table_report_1.obj.draw();
            //    }
            //},
            //// Добавить данные в таблице
            //addRow: function (data) {
            //    if (data) {
            //        table_report_1.obj.row.add(this.getRow(data));
            //        // Убрать выделенную строку
            //        table_report_1.deselectRowOfSelect();
            //        table_report_1.obj.draw();
            //        // Выбрать новую строку
            //        table_report_1.selectRow(data.num);
            //    }
            //},
            //// Добавить данные в таблице
            //deleteRow: function () {
            //    table_report_1.obj.row('.selected').remove().draw(false);
            //    // Убрать выделенную строку
            //    table_report_1.select = null;
            //    table_report_1.obj.button(0).enable(false);
            //},
            //// Select по номеру вагона
            //selectRow: function (num) {
            //    var index = table_report_1.obj.row('#' + num).index();
            //    table_report_1.obj.row(index).select();
            //},
            //// Deselect по номеру вагона
            //deselectRow: function (num) {
            //    var index = table_report_1.obj.row('#' + num).index();
            //    table_report_1.obj.row(index).deselect();
            //},
            //// Deselect по выбраному
            //deselectRowOfSelect: function () {
            //    var index = table_report_1.obj.row('.selected').index();
            //    table_report_1.obj.row(index).deselect();
            //},

            //// Формирование элементов фильтра
            //initComplete: function () {
            //    table_report_1.obj.data().columns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).every(function () {
            //        var n = 0;
            //        var column = this;
            //        var num = column[0][0];
            //        var name = column.header().firstChild.innerText;
            //        var select = $('<select class="filter"><option value="">Выбрать...</option></select>').on('change', function () {
            //            var val = $.fn.dataTable.util.escapeRegex(
            //                $(this).val()
            //            );
            //            column
            //                .search(val ? '^' + val + '$' : '', true, false)
            //                .draw();
            //        });
            //        //
            //        column.data().unique().sort().each(function (d, j) {
            //            select.append('<option value="' + (d ? d : "") + '">' + (d ? d : "Не определенно") + '</option>');
            //            n++;
            //        });
            //        if (n > 1) {
            //            $('form#filtr')
            //                .append('<div class="cd-filter-block" id="filter-block-' + num + '"></div>');
            //            $('div#filter-block-' + num)
            //                .append('<h4>' + name + '</h4>')
            //                .append('<div class="cd-filter-content" id="filter-content-' + num + '"></div>');
            //            $('div#filter-content-' + num)
            //                .append('<div class="cd-select cd-filters" id="select-' + num + '"></div>');
            //            $('div#select-' + num)
            //                .append(select);
            //        }
            //    });
            //    //close filter dropdown inside lateral .cd-filter 
            //    $('.cd-filter-block h4').on('click', function () {
            //        $(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
            //    });
            //}
        },

        table_report_2 = {
            html_table: $('#table-report-2'),
            obj: null,
            select: null,
            start_item: null,
            stop_item: null,
            current_item: null,
            // Инициализировать таблицу
            init: function () {
                table_report_2.obj = this.html_table.DataTable({
                    //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "select": false,
                    "autoWidth": false,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table_ru(),
                    jQueryUI: true,
                    "createdRow": function (row, data, index) {
                        $(row).attr('id', data.id);
                        //$('td', row).eq(3).addClass('td-number');
                        //$('td', row).eq(4).addClass('td-number');
                        //$('td', row).eq(5).addClass('td-number');
                        //$('td', row).eq(7).addClass('td-number');
                    },
                    columns: [
                        { data: "bak", title: 'Резервуар', width: "50px", orderable: true, searchable: true },
                        { data: "date_start", title: 'Дата начала смены', width: "50px", orderable: true, searchable: true },
                        { data: "date_stop", title: 'Дата конца смены', width: "50px", orderable: true, searchable: true },
                        { data: "volume_start", title: 'Обьем в начале смены (м3.)', width: "50px", orderable: true, searchable: true },
                        { data: "mass_start", title: "Масса в начале смены (т.)", width: "50px", orderable: true, searchable: true },
                        { data: "volume_stop", title: "Обьем в конце смены (м3.)", width: "50px", orderable: true, searchable: true },
                        { data: "mass_stop", title: "Масса в конце смены (т.)", width: "50px", orderable: true, searchable: true },
                        { data: "volume_diff", title: "Разница (м3.)", width: "50px", orderable: true, searchable: true },
                        { data: "mass_diff", title: "Разница (т.)", width: "150px", orderable: true, searchable: true },
                    ],
                    dom: 'Bfrtip',
                    stateSave: false,
                    buttons: [
                        {
                            text: 'Скопировать в буфер',
                            extend: 'copyHtml5',
                        },
                        {
                            text: 'Экспорт в Excel',
                            extend: 'excelHtml5',
                            sheetName: 'Заправочная ведомость',
                            messageTop: function () {
                                return '';
                            }
                        },
                        //{
                        //    extend: 'colvis',
                        //    text: 'Выбрать поля таблицы',
                        //    collectionLayout: 'fixed two-column',
                        //    //postfixButtons: ['colvisRestore']
                        //},
                        //{
                        //    extend: 'colvisGroup',
                        //    text: 'Показать все поля',
                        //    show: ':hidden'
                        //},
                        //{
                        //    extend: 'pageLength',
                        //}
                    ],
                });
            },
            // Показать таблицу с данными
            viewTable: function (data_refresh) {
                LockScreen('Мы обрабатываем ваш запрос...');
                table_report_2.loadItems(function () {
                    table_report_2.obj.clear();
                    if (table_report_2.start_item !== null && table_report_2.stop_item !== null) {
                        //var d = moment(table_report_2.start_item.date).format('DD.MM.YYYY HH:mm');
                        table_report_2.obj.row.add(
                            {
                                "bak": '№1',
                                "date_start": table_report_2.start_item.date !== null ? moment(table_report_2.start_item.date).format('DD.MM.YYYY HH:mm') : null,
                                //"date_start": table_report_2.start_item.date !== null ? table_report_2.start_item.date.replace("T", " ") : null,
                                //moment(s_date, 'DD.MM.YYYY HH:mm')
                                "volume_start": table_report_2.start_item.volume !== null ? Number(table_report_2.start_item.volume).toFixed(3) : '0.000',
                                "mass_start": table_report_2.start_item.mass !== null ? Number(table_report_2.start_item.mass).toFixed(2) : '0.00',
                                "date_stop": table_report_2.stop_item.date !== null ? moment(table_report_2.stop_item.date).format('DD.MM.YYYY HH:mm') : null,
                                //"date_stop": table_report_2.stop_item.date !== null ? table_report_2.stop_item.date.replace("T", " ") : null,
                                "volume_stop": table_report_2.stop_item.volume !== null ? Number(table_report_2.stop_item.volume).toFixed(3) : '0.000',
                                "mass_stop": table_report_2.stop_item.mass !== null ? Number(table_report_2.stop_item.mass).toFixed(2) : '0.00',
                                "volume_diff": table_report_2.start_item.volume !== null & table_report_2.stop_item.volume !== null ? Number(table_report_2.stop_item.volume - table_report_2.start_item.volume).toFixed(3) : '0.000',
                                "mass_diff": table_report_2.start_item.mass !== null & table_report_2.stop_item.mass!== null ? Number(table_report_2.stop_item.mass - table_report_2.start_item.mass).toFixed(2) : '0.00',
                            }
                        );
                    }
                    LockScreenOff();
                    table_report_2.obj.draw();
                });

                //if (table_report_2.list | data_refresh === true) {
                //    // Обновим данные
                //    tsk.getRemainsTankOfDate(
                //        date_start,
                //        function (result) {
                //            //table_report_2.list = result;
                //            table_report_2.loadDataTable(result);
                //            table_report_2.obj.draw();
                //        }
                //    );
                //} else {
                //    table_report_2.loadDataTable(mors.list_cards_wagons);
                //    table_report_2.obj.draw();
                //};
            },
            //
            loadItems: function (callback) {
                var count = 2;
                tsk.getRemainsTankOfDate(
                    date_start,
                    function (result) {
                        table_report_2.start_item = result;
                        count -= 1;
                        if (count === 0) {
                            if (typeof callback === 'function') {
                                LockScreenOff();
                                callback();
                            }
                        }
                    }
                );
                if (moment(new Date()).isAfter(date_stop)) {
                    tsk.getRemainsTankOfDate(
                        date_stop,
                        function (result) {
                            table_report_2.stop_item = result;
                            count -= 1;
                            if (count === 0) {
                                if (typeof callback === 'function') {
                                    LockScreenOff();
                                    callback();
                                }
                            }
                        }
                    );
                } else {
                    tsk.getCurrentRemainsTank(
                        function (result) {
                            table_report_2.stop_item = result && result.length>0 ? result[0] : null;
                            count -= 1;
                            if (count === 0) {
                                if (typeof callback === 'function') {
                                    LockScreenOff();
                                    callback();
                                }
                            }
                        }
                    );
                }



            },
            // Загрузить данные
            loadDataTable: function (data) {
                table_report_2.list = data;
                table_report_2.obj.clear();
                for (i = 0; i < data.length; i++) {
                    table_report_2.obj.row.add(table_report_2.getRow(data[i]));
                }
                LockScreenOff();
                //table_report_2.initComplete();
            },
            // Получить строку для таблицы
            getRow: function (data) {
                return {
                    "id": data.id,
                    "Out_Type": data.Out_Type,
                    "Target_Volume": data.Target_Volume !== null ? Number(data.Target_Volume).toFixed(1) : null,
                    "Target_Dens": data.Target_Dens !== null ? Number(data.Target_Dens).toFixed(1) : null,
                    "Target_Mass": data.Target_Mass !== null ? Number(data.Target_Mass).toFixed(1) : null,
                    "User": data.User,
                    "Crated_Date": data.Crated_Date,
                    "Start_Counter": data.Start_Counter !== null ? Number(data.Start_Counter).toFixed(0) : null,
                    "Start_Level": data.Start_Level !== null ? Number(data.Start_Level).toFixed(3) : null,
                    "Start_Volume": data.Start_Volume !== null ? Number(data.Start_Volume).toFixed(3) : null,
                    "Start_Mass": data.Start_Mass !== null ? Number(data.Start_Mass).toFixed(3) : null,
                    "Start_Dens": data.Start_Dens !== null ? Number(data.Start_Dens).toFixed(1) : null,
                    "Start_Temp": data.Start_Temp !== null ? Number(data.Start_Temp).toFixed(2) : null,
                    "Start_Water": data.Start_Water !== null ? Number(data.Start_Water).toFixed(1) : null,
                    "Start_Date": data.Start_Date !== null ? data.Start_Date.replace("T", " ") : null,
                    "End_Counter": data.End_Counter !== null ? Number(data.End_Counter).toFixed(0) : null,
                    "End_Level": data.End_Level !== null ? Number(data.End_Level).toFixed(3) : null,
                    "End_Volume": data.End_Volume !== null ? Number(data.End_Volume).toFixed(3) : null,
                    "End_Mass": data.End_Mass !== null ? Number(data.End_Mass).toFixed(3) : null,
                    "End_Dens": data.End_Dens !== null ? Number(data.End_Dens).toFixed(1) : null,
                    "End_Temp": data.End_Temp !== null ? Number(data.End_Temp).toFixed(2) : null,
                    "End_Water": data.End_Water !== null ? Number(data.End_Water).toFixed(1) : null,
                    "End_Date": data.End_Date,
                    "close": data.close,
                    "RFID": data.RFID,
                    "FLAG_R": outMode(data.FLAG_R),
                    "N_TREB": data.N_TREB,
                    "RSPOS": data.RSPOS,
                    "N_BAK": data.N_BAK,
                    "fuel_type": "ДТ(107000024)",
                    "OZM_BAK": data.OZM_BAK,
                    "OZM_TREB": data.OZM_TREB,
                    "PLOTNOST": data.PLOTNOST !== null ? Number(data.PLOTNOST).toFixed(2) : null,
                    "VOLUME": data.VOLUME !== null ? Number(data.VOLUME).toFixed(2) : null,
                    "MASS": data.MASS !== null ? Number(data.MASS).toFixed(2) : null,
                    "LOGIN_R": data.LOGIN_R,
                    "LOGIN_EXP": data.LOGIN_EXP,
                    "N_POST": data.N_POST,
                    "TRANSP_FAKT": data.TRANSP_FAKT,
                    "LGORT": data.LGORT,
                    "WERKS": data.WERKS,
                    "N_DEB": data.N_DEB,
                    "sap_sending": data.sap_sending !== null ? 'Да' : 'Нет',
                    "sending": data.sending
                };
            },
            //// Обновить данные в таблице
            //updateRow: function (data) {
            //    if (data) {
            //        var row = this.getRow(data);
            //        var index = table_report_2.obj.row('#' + data.num).index();
            //        table_report_2.obj.cell(index, 1).data(row.genus_wagon);
            //        table_report_2.obj.cell(index, 2).data(row.state);
            //        table_report_2.obj.cell(index, 3).data(row.wagon_manufacturer);
            //        table_report_2.obj.cell(index, 4).data(row.year_wagon_create);
            //        table_report_2.obj.cell(index, 5).data(row.station);
            //        table_report_2.obj.cell(index, 6).data(row.carrying_capacity);
            //        table_report_2.obj.cell(index, 7).data(row.tara);
            //        table_report_2.obj.cell(index, 8).data(row.type_repairs);
            //        table_report_2.obj.cell(index, 9).data(row.date_type_repairs);
            //        table_report_2.obj.cell(index, 10).data(row.code_model_wagon);
            //        table_report_2.obj.cell(index, 11).data(row.type_wagon);
            //        table_report_2.obj.cell(index, 12).data(row.axis_length);
            //        table_report_2.obj.cell(index, 13).data(row.body_volume);
            //        table_report_2.obj.cell(index, 14).data(row.type_ownership);
            //        table_report_2.obj.cell(index, 15).data(row.owner_wagon);
            //        table_report_2.obj.cell(index, 16).data(row.date_registration);
            //        table_report_2.obj.cell(index, 17).data(row.lessor_wagon);
            //        table_report_2.obj.cell(index, 18).data(row.operator_wagon);
            //        table_report_2.obj.cell(index, 19).data(row.poligon_travel_wagon);
            //        table_report_2.obj.cell(index, 20).data(row.special_conditions);
            //        table_report_2.obj.cell(index, 21).data(row.sap);
            //        table_report_2.obj.draw();
            //    }
            //},
            //// Добавить данные в таблице
            //addRow: function (data) {
            //    if (data) {
            //        table_report_2.obj.row.add(this.getRow(data));
            //        // Убрать выделенную строку
            //        table_report_2.deselectRowOfSelect();
            //        table_report_2.obj.draw();
            //        // Выбрать новую строку
            //        table_report_2.selectRow(data.num);
            //    }
            //},
            //// Добавить данные в таблице
            //deleteRow: function () {
            //    table_report_2.obj.row('.selected').remove().draw(false);
            //    // Убрать выделенную строку
            //    table_report_2.select = null;
            //    table_report_2.obj.button(0).enable(false);
            //},
            //// Select по номеру вагона
            //selectRow: function (num) {
            //    var index = table_report_2.obj.row('#' + num).index();
            //    table_report_2.obj.row(index).select();
            //},
            //// Deselect по номеру вагона
            //deselectRow: function (num) {
            //    var index = table_report_2.obj.row('#' + num).index();
            //    table_report_2.obj.row(index).deselect();
            //},
            //// Deselect по выбраному
            //deselectRowOfSelect: function () {
            //    var index = table_report_2.obj.row('.selected').index();
            //    table_report_2.obj.row(index).deselect();
            //},

            //// Формирование элементов фильтра
            //initComplete: function () {
            //    table_report_2.obj.data().columns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).every(function () {
            //        var n = 0;
            //        var column = this;
            //        var num = column[0][0];
            //        var name = column.header().firstChild.innerText;
            //        var select = $('<select class="filter"><option value="">Выбрать...</option></select>').on('change', function () {
            //            var val = $.fn.dataTable.util.escapeRegex(
            //                $(this).val()
            //            );
            //            column
            //                .search(val ? '^' + val + '$' : '', true, false)
            //                .draw();
            //        });
            //        //
            //        column.data().unique().sort().each(function (d, j) {
            //            select.append('<option value="' + (d ? d : "") + '">' + (d ? d : "Не определенно") + '</option>');
            //            n++;
            //        });
            //        if (n > 1) {
            //            $('form#filtr')
            //                .append('<div class="cd-filter-block" id="filter-block-' + num + '"></div>');
            //            $('div#filter-block-' + num)
            //                .append('<h4>' + name + '</h4>')
            //                .append('<div class="cd-filter-content" id="filter-content-' + num + '"></div>');
            //            $('div#filter-content-' + num)
            //                .append('<div class="cd-select cd-filters" id="select-' + num + '"></div>');
            //            $('div#select-' + num)
            //                .append(select);
            //        }
            //    });
            //    //close filter dropdown inside lateral .cd-filter 
            //    $('.cd-filter-block h4').on('click', function () {
            //        $(this).toggleClass('closed').siblings('.cd-filter-content').slideToggle(300);
            //    });
            //}
        };
    // Инициализация
    tabs_reports.init();
    panel_report.init();
    table_report_1.init();
    table_report_2.init();
    panel_report.view_report();
});