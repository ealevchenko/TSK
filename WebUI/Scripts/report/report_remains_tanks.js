// Загрузка документа
$(document).ready(function () {
    var date_curent = moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
        date_start = null,
        date_stop = null,
        tsk = new TSK_API(), // Создадим класс TSK_API
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
                panel_report.obj_date_range = panel_report.span_range_date.dateRangePicker(
                    {
                        language: 'ru',
                        format: 'DD.MM.YYYY HH:mm',
                        separator: '-',
                        autoClose: false,
                        time: {
                            enabled: true
                        },
                        setValue: function (s, s1, s2) {
                            panel_report.input_data_start.val(s1);
                            panel_report.input_data_stop.val(s2);

                        }
                    }).
                    bind('datepicker-change', function (evt, obj) {
                        date_start = obj.date1;
                        date_stop = obj.date2;
                    })
                    .bind('datepicker-closed', function () {
                        table_report.viewTable(true);
                        panel_report.select_sm.selectmenu("disable");
                        panel_report.bt_left.prop('disabled', true);
                        panel_report.bt_right.prop('disabled', true);
                    });
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
                panel_report.obj_date_range.data('dateRangePicker').setDateRange(moment(date_start).format('DD.MM.YYYY HH:mm:'), moment(date_stop).format('DD.MM.YYYY HH:mm:'), true);
                table_report.viewTable(true);
                table_report_curren.viewTable(true);
            }
        },
        //
        table_report = {
            html_table: $('#table-report'),
            obj: null,
            select: null,
            // Инициализировать таблицу
            init: function () {
                table_report.obj = this.html_table.DataTable({
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
                        $('td', row).eq(1).addClass('td-number');
                        $('td', row).eq(2).addClass('td-number');
                        $('td', row).eq(3).addClass('td-number');
                        $('td', row).eq(4).addClass('td-number');
                        $('td', row).eq(5).addClass('td-number');
                        $('td', row).eq(6).addClass('td-number');
                        $('td', row).eq(7).addClass('td-number');
                    },
                    columns: [
                        { data: "date", title: 'Дата и время', width: "50px", orderable: true, searchable: true },
                        { data: "level", title: 'Уровень', width: "50px", orderable: true, searchable: true },
                        { data: "volume", title: "Объем (м3)", width: "50px", orderable: true, searchable: true },
                        { data: "mass", title: "Масса (т)", width: "50px", orderable: true, searchable: true },
                        { data: "dens_avg", title: "Плотность (кг/м3)", width: "50px", orderable: true, searchable: true },
                        //{ data: "dens_calc", title: "Плотность (кг/м3)", width: "50px", orderable: true, searchable: true },
                        { data: "temp_avg", title: "Температура (гр.)", width: "150px", orderable: true, searchable: true },
                        { data: "water", title: "Уровень подт. воды", width: "50px", orderable: true, searchable: true },
                        { data: "persent", title: "% Заполнения емк.", width: "50px", orderable: true, searchable: true },
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
                            sheetName: 'Остатки',
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
                if (table_report.list | data_refresh === true) {
                    // Обновим данные
                    tsk.getRemainsTankOfDateTime(
                        date_start,
                        date_stop,
                        function (result) {
                            //table_report.list = result;
                            table_report.loadDataTable(result);
                            table_report.obj.draw();
                        }
                    );
                } else {
                    table_report.loadDataTable(mors.list_cards_wagons);
                    table_report.obj.draw();
                };
            },
            // Загрузить данные
            loadDataTable: function (data) {
                table_report.list = data;
                table_report.obj.clear();
                for (i = 0; i < data.length; i++) {
                    table_report.obj.row.add(table_report.getRow(data[i]));
                }
                LockScreenOff();
                //table_report.initComplete();
            },
            // Получить строку для таблицы
            getRow: function (data) {
                return {

                    "id": data.id,
                    "date": data.date !== null ? moment(data.date).format('DD.MM.YYYY HH:mm') : null,
                    "level": data.level !== null ? Number(data.level).toFixed(2) : null,
                    "volume": data.volume !== null ? Number(data.volume).toFixed(3) : null,
                    "mass": data.mass !== null ? Number(data.mass).toFixed(3) : null,
                    "dens_avg": data.dens_avg !== null ? Number(data.dens_avg).toFixed(1) : null,
                    //"dens_calc": data.dens_calc !== null ? Number(data.dens_calc).toFixed(1) : null,
                    "temp_avg": data.temp_avg !== null ? Number(data.temp_avg).toFixed(3) : null,
                    "water": data.water !== null ? Number(data.water).toFixed(1) : null,
                    "persent": data.volume !== null ? Number((Number(data.volume)*100)/355.0).toFixed(2): null,

                };
            },
            //// Обновить данные в таблице
            //updateRow: function (data) {
            //    if (data) {
            //        var row = this.getRow(data);
            //        var index = table_report.obj.row('#' + data.num).index();
            //        table_report.obj.cell(index, 1).data(row.genus_wagon);
            //        table_report.obj.cell(index, 2).data(row.state);
            //        table_report.obj.cell(index, 3).data(row.wagon_manufacturer);
            //        table_report.obj.cell(index, 4).data(row.year_wagon_create);
            //        table_report.obj.cell(index, 5).data(row.station);
            //        table_report.obj.cell(index, 6).data(row.carrying_capacity);
            //        table_report.obj.cell(index, 7).data(row.tara);
            //        table_report.obj.cell(index, 8).data(row.type_repairs);
            //        table_report.obj.cell(index, 9).data(row.date_type_repairs);
            //        table_report.obj.cell(index, 10).data(row.code_model_wagon);
            //        table_report.obj.cell(index, 11).data(row.type_wagon);
            //        table_report.obj.cell(index, 12).data(row.axis_length);
            //        table_report.obj.cell(index, 13).data(row.body_volume);
            //        table_report.obj.cell(index, 14).data(row.type_ownership);
            //        table_report.obj.cell(index, 15).data(row.owner_wagon);
            //        table_report.obj.cell(index, 16).data(row.date_registration);
            //        table_report.obj.cell(index, 17).data(row.lessor_wagon);
            //        table_report.obj.cell(index, 18).data(row.operator_wagon);
            //        table_report.obj.cell(index, 19).data(row.poligon_travel_wagon);
            //        table_report.obj.cell(index, 20).data(row.special_conditions);
            //        table_report.obj.cell(index, 21).data(row.sap);
            //        table_report.obj.draw();
            //    }
            //},
            //// Добавить данные в таблице
            //addRow: function (data) {
            //    if (data) {
            //        table_report.obj.row.add(this.getRow(data));
            //        // Убрать выделенную строку
            //        table_report.deselectRowOfSelect();
            //        table_report.obj.draw();
            //        // Выбрать новую строку
            //        table_report.selectRow(data.num);
            //    }
            //},
            //// Добавить данные в таблице
            //deleteRow: function () {
            //    table_report.obj.row('.selected').remove().draw(false);
            //    // Убрать выделенную строку
            //    table_report.select = null;
            //    table_report.obj.button(0).enable(false);
            //},
            //// Select по номеру вагона
            //selectRow: function (num) {
            //    var index = table_report.obj.row('#' + num).index();
            //    table_report.obj.row(index).select();
            //},
            //// Deselect по номеру вагона
            //deselectRow: function (num) {
            //    var index = table_report.obj.row('#' + num).index();
            //    table_report.obj.row(index).deselect();
            //},
            //// Deselect по выбраному
            //deselectRowOfSelect: function () {
            //    var index = table_report.obj.row('.selected').index();
            //    table_report.obj.row(index).deselect();
            //},

            //// Формирование элементов фильтра
            //initComplete: function () {
            //    table_report.obj.data().columns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]).every(function () {
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
        //
        table_report_curren = {
            html_table: $('#table-report-current'),
            obj: null,
            select: null,
            // Инициализировать таблицу
            init: function () {
                table_report_curren.obj = this.html_table.DataTable({
                    "paging": false,
                    "searching": false,
                    "ordering": false,
                    "info": false,
                    "select": false,
                    "autoWidth": false,
                    //"filter": true,
                    //"scrollY": "600px",
                    "scrollX": true,
                    language: language_table_ru(),
                    jQueryUI: true,
                    "createdRow": function (row, data, index) {
                        //$(row).attr('id', data.id);
                        $('td', row).eq(1).addClass('td-number');
                        $('td', row).eq(2).addClass('td-number');
                        $('td', row).eq(3).addClass('td-number');
                        $('td', row).eq(4).addClass('td-number');
                        $('td', row).eq(5).addClass('td-number');
                        $('td', row).eq(6).addClass('td-number');
                        $('td', row).eq(7).addClass('td-number');
                    },
                    columns: [
                        { data: "date", title: 'Дата и время', width: "50px", orderable: true, searchable: true },
                        { data: "level", title: 'Уровень', width: "50px", orderable: true, searchable: true },
                        { data: "volume", title: "Объем (м3)", width: "50px", orderable: true, searchable: true },
                        { data: "mass", title: "Масса (т)", width: "50px", orderable: true, searchable: true },
                        { data: "dens_avg", title: "Плотность (кг/м3)", width: "50px", orderable: true, searchable: true },
                        //{ data: "dens_calc", title: "Плотность (кг/м3)", width: "50px", orderable: true, searchable: true },
                        { data: "temp_avg", title: "Температура (гр.)", width: "150px", orderable: true, searchable: true },
                        { data: "water", title: "Уровень подт. воды", width: "50px", orderable: true, searchable: true },
                        { data: "persent", title: "% Заполнения емк.", width: "50px", orderable: true, searchable: true },

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
                            sheetName: 'Текущий остаток',
                            messageTop: function () {
                                return '';
                            }
                        },
                    ],
                });
            },
            // Показать таблицу с данными
            viewTable: function (data_refresh) {
                LockScreen('Мы обрабатываем ваш запрос...');
                if (table_report_curren.list | data_refresh === true) {
                    // Обновим данные
                    tsk.getCurrentRemainsTank(
                        function (result) {
                            //table_report_curren.list = result;
                            table_report_curren.loadDataTable(result);
                            table_report_curren.obj.draw();
                        }
                    );
                } else {
                    table_report_curren.loadDataTable(mors.list_cards_wagons);
                    table_report_curren.obj.draw();
                };
            },
            // Загрузить данные
            loadDataTable: function (data) {
                table_report_curren.list = data;
                table_report_curren.obj.clear();
                for (i = 0; i < data.length; i++) {
                    table_report_curren.obj.row.add(table_report_curren.getRow(data[i]));
                }
                LockScreenOff();
            },
            // Получить строку для таблицы
            getRow: function (data) {
                return {
                    "date": data.date !== null ? moment(data.date).format('DD.MM.YYYY HH:mm') : null,
                    "level": data.level !== null ? Number(data.level).toFixed(2) : null,
                    "volume": data.volume !== null ? Number(data.volume).toFixed(3) : null,
                    "mass": data.mass !== null ? Number(data.mass).toFixed(3) : null,
                    "dens_avg": data.dens_avg !== null ? Number(data.dens_avg).toFixed(1) : null,
                    //"dens_calc": data.dens_calc !== null ? Number(data.dens_calc).toFixed(1) : null,
                    "temp_avg": data.temp_avg !== null ? Number(data.temp_avg).toFixed(3) : null,
                    "water": data.water !== null ? Number(data.water).toFixed(1) : null,
                    "persent": data.volume !== null ? Number((Number(data.volume) * 100) / 355.0).toFixed(2) : null,
                };
            },
        };
    // Инициализация
    panel_report.init();
    table_report.init();
    table_report_curren.init();
    panel_report.view_report();

});