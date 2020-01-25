// Загрузка документа
$(document).ready(function () {
    var date_curent = moment().set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 }),
        date_start = null,
        date_stop = null,
        tsk = new TSK_API(), // Создадим класс TSK_API
        panel_report = {
            span_range_date: $('span#select-range-date'),
            input_data_start: $('input#date-start'),
            input_data_stop: $('input#date-stop'),
            obj_date_range: null,
            init: function () {
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
                panel_report.obj_date_range.data('dateRangePicker').setDateRange(moment(date_start).format('DD.MM.YYYY HH:mm:'), moment(date_stop).format('DD.MM.YYYY HH:mm:'), true);
                table_report.viewTable(true);
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
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    "paging": true,
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
                        {
                            className: 'details-control',
                            orderable: false,
                            data: null,
                            defaultContent: '',
                            searchable: false, width: "30px"
                        },
                        { data: "date_start", title: "Дата", width: "50px", orderable: true, searchable: true },
                        { data: "type", title: "ОЗМ", width: "50px", orderable: true, searchable: true },
                        { data: "volume_start", title: "Остаток, объем на начало суток (л)", width: "50px", orderable: true, searchable: true },
                        { data: "mass_start", title: "Остаток, масса на начало суток (кг)", width: "50px", orderable: true, searchable: true },
                        { data: "dens_start", title: "Остаток, плотность на начало суток (кг/м3)", width: "50px", orderable: true, searchable: true },
                        { data: "temp_start", title: "Остаток, температура на начало суток (град. С°)", width: "50px", orderable: true, searchable: true },
                        //{ data: "volume15_start", title: "Остаток на начало суток привед. к 15 град. (л)", width: "50px", orderable: true, searchable: true },
                        //{ data: "mass15_start", title: "Остаток на начало суток привед. к 15 град. (кг)", width: "50px", orderable: true, searchable: true },
                        //{ data: "dens15_start", title: "Плотность на начало суток привед. к 15 град.", width: "50px", orderable: true, searchable: true },

                        { data: "volume_received", title: "Приход, объем (л)", width: "50px", orderable: true, searchable: true },
                        { data: "mass_received", title: "Приход, масса (кг)", width: "50px", orderable: true, searchable: true },
                        { data: "dens_received", title: "Приход, плотность (кг/м3)", width: "50px", orderable: true, searchable: true },
                        { data: "temp_received", title: "Приход, температура (град. С°)", width: "50px", orderable: true, searchable: true },
                        //{ data: "volume15_received", title: "Приход привед. к 15 град. (л)", width: "50px", orderable: true, searchable: true },
                        //{ data: "mass15_received", title: "Приход привед. к 15 град. (кг)", width: "50px", orderable: true, searchable: true },
                        //{ data: "dens15_received", title: "Приход плотность привед. к 15 град. (кг)", width: "50px", orderable: true, searchable: true },

                        { data: "volume_delivery", title: "Расход, объем (л)", width: "50px", orderable: true, searchable: true },
                        { data: "mass_delivery", title: "Расход, масса (кг)", width: "50px", orderable: true, searchable: true },
                        { data: "dens_delivery", title: "Расход, плотность (кг/м3)", width: "50px", orderable: true, searchable: true },
                        { data: "temp_delivery", title: "Расход, температура (град. С°)", width: "50px", orderable: true, searchable: true },
                        //{ data: "volume15_delivery", title: "Расход привед. к 15 град. (л)", width: "50px", orderable: true, searchable: true },
                        //{ data: "mass15_delivery", title: "Расход привед. к 15 град. (кг)", width: "50px", orderable: true, searchable: true },
                        //{ data: "dens15_delivery", title: "Расход плотность привед. к 15 град. (кг)", width: "50px", orderable: true, searchable: true },

                        { data: "volume_stop", title: "Остаток, объем на конец суток (л)", width: "50px", orderable: true, searchable: true },
                        { data: "mass_stop", title: "Остаток, масса на конец суток (кг)", width: "50px", orderable: true, searchable: true },
                        { data: "dens_stop", title: "Остаток, плотность на конец суток (кг/м3)", width: "50px", orderable: true, searchable: true },
                        { data: "temp_stop", title: "Остаток, температура на конец суток (град. С°)", width: "50px", orderable: true, searchable: true },
                        //{ data: "volume15_stop", title: "Остаток на конец суток привед. к 15 град.(л)", width: "50px", orderable: true, searchable: true },
                        //{ data: "mass15_stop", title: "Остаток на конец суток привед. к 15 град. (кг)", width: "50px", orderable: true, searchable: true },
                        //{ data: "dens15_stop", title: "Плотность на конец суток привед. к 15 град.", width: "50px", orderable: true, searchable: true },
                        //{ data: "permissible_error", title: "Допустимая ошибка, 0,65%", width: "50px", orderable: true, searchable: true },
                        { data: "difference_mass", title: "Разница масс (Мн-Мв+Мп) – Мк (кг.)", width: "50px", orderable: true, searchable: true },
                        { data: "pers_difference_mass", title: "% отклонения между массами (Мн-Мв+Мп) и Мк (%)", width: "50px", orderable: true, searchable: true },
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
                if (table_report.list | data_refresh === true) {
                    // Обновим данные
                    tsk.getFuelSaleOfDateTime(
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
            },
            // Получить строку для таблицы
            getRow: function (data) {
                return {
                    "id": data.id,
                    "type": data.type,
                    "date_start": data.date_start,
                    "date_stop": data.date_stop,
                    "volume_start": data.volume_start,
                    "mass_start": data.mass_start !== null ? Number(data.mass_start).toFixed(2) : 0.00,
                    "dens_start": data.dens_start !== null ? Number(data.dens_start).toFixed(5) : 0.00000,
                    "temp_start": data.temp_start !== null ? Number(data.temp_start).toFixed(2) : 0.00,
                    "volume15_start": data.volume15_start,
                    "mass15_start": data.mass15_start !== null ? Number(data.mass15_start).toFixed(2) : 0.00,
                    "dens15_start": data.dens15_start !== null ? Number(data.dens15_start).toFixed(5) : 0.00000,

                    "volume_received": data.volume_received !== null ? data.volume_received : 0,
                    "mass_received": data.mass_received !== null ? Number(data.mass_received).toFixed(2) : 0.00,
                    "dens_received": data.dens_received !== null ? Number(data.dens_received).toFixed(5) : 0.00000,
                    "temp_received": data.temp_received !== null ? Number(data.temp_received).toFixed(2) : 0.00,
                    "volume15_received": data.volume15_received !== null ? data.volume15_received : 0,
                    "mass15_received": data.mass15_received !== null ? Number(data.mass15_received).toFixed(2) : 0.00,
                    "dens15_received": data.dens15_received !== null ? Number(data.dens15_received).toFixed(5) : 0.00000,

                    "volume_delivery": data.volume_delivery !== null ? data.volume_delivery : 0,
                    "mass_delivery": data.mass_delivery !== null ? Number(data.mass_delivery).toFixed(2) : 0.00,
                    "dens_delivery": data.dens_delivery !== null ? Number(data.dens_delivery).toFixed(5) : 0.00000,
                    "temp_delivery": data.temp_delivery !== null ? Number(data.temp_delivery).toFixed(2) : 0.00,
                    "volume15_delivery": data.volume15_delivery !== null ? data.volume15_delivery : 0,
                    "mass15_delivery": data.mass15_delivery !== null ? Number(data.mass15_delivery).toFixed(2) : 0.00,
                    "dens15_delivery": data.dens15_delivery !== null ? Number(data.dens15_delivery).toFixed(5) : 0.00000,

                    "volume_stop": data.volume_stop !== null ? data.volume_stop : 0,
                    "mass_stop": data.mass_stop !== null ? Number(data.mass_stop).toFixed(2) : 0.00,
                    "dens_stop": data.dens_stop !== null ? Number(data.dens_stop).toFixed(5) : 0.00000,
                    "temp_stop": data.temp_stop !== null ? Number(data.temp_stop).toFixed(2) : 0.00,
                    "volume15_stop": data.volume15_stop !== null ? data.volume15_stop : 0,
                    "mass15_stop": data.mass15_stop !== null ? Number(data.mass15_stop).toFixed(2) : 0.00,
                    "dens15_stop": data.dens15_stop !== null ? Number(data.dens15_stop).toFixed(5) : 0.00000,
                    "difference_mass": deff_mass !== 0 ? Number(deff_mass).toFixed(2) : 0.00,
                    "pers_difference_mass": pers_deff_mass !== 0 ? Number(pers_deff_mass).toFixed(2) : 0.00,
                };
            },
        };

    // Инициализация
    panel_report.init();
    table_report.init();
    panel_report.view_report();
});