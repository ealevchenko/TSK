//=========== ЗАГРУЗКА СТРАНИЦЫ СТАРТ ПРОЕКТА ====================================================
$(function () {

    var vars = $.getUrlVars(),
        tsk = new TSK_API(),
        log = new LOG_API(),
        user_tsk = null,
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
        switch (num_trk) {
            case 0:
                break;
            case 1:
                title = "Выдача на тепловоз (К-1)";
                fio_title = "ФИО машиниста :";
                break;
            case 2:
                title = "Выдача на бензовоз (К-2)";
                fio_title = "ФИО водителя :";
                break;
        }
        $('legend#title-fuel-delivery').text(title);
        $('th#fio-title').text(fio_title);
        log.logInfo(user_tsk !== null ? user_tsk.UserName : '?', 'Панель оператора "' + title +'" - ОТКРЫТА');
    //    // Загрузка документа
    //    $(document).ready(function () {

    //    });
    });
});