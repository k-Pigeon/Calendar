$(document).ready(function () {
    // 현재 날짜 가져오기
    var currentDate = new Date();
    var todayYear = currentDate.getFullYear(); // 연도 추출
    var todayMonth = currentDate.getMonth(); // 월 추출
    var todayDate = currentDate.getDate(); // 일 추출

    let todayYearNch = currentDate.getFullYear();
    let todayMonthNch = currentDate.getMonth();
    let todayDateNch = currentDate.getDate();

    // 연도와 월을 기반으로 달력 HTML을 생성하는 함수
    function generateCalendar(year, month) {
        var $firstDay = new Date(year, month - 1, 1); // 이번 달 첫 날 [월~일 구분]
        var $lastDay = new Date(year, month, 0); // 이번 달 마지막 날 [월~일 구분]
        var $dayMonth = $lastDay.getDate(); // 이번 달의 마지막 일
        var $lastMonthLastDay = new Date(year, month - 1, 0).getDate(); // 지난 달의 마지막 일

        // 네비게이션 바에 현재 연도와 월 업데이트
        $('#navigation .year_day').text(year);
        $('#navigation .month_day').text(month);

        // 달력을 위한 HTML 테이블 구조 생성
        var $table = $('<table class="table_line">');
        var $headerRow = $('<tr>');
        var $daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        // 요일을 테이블 헤더에 추가
        for (var i = 0; i < $daysOfWeek.length; i++) {
            $headerRow.append($('<th>').text($daysOfWeek[i]));
        }

        $table.append($headerRow);

        // 첫 번째 셀의 시작 날짜 계산
        var currentDate = 1 - $firstDay.getDay();

        // 각 달력 셀을 생성
        for (var i = 0; i < 6; i++) {
            var row = $('<tr>');
            for (var j = 0; j < 7; j++) {
                var cell = $('<td>');
                // 현재 달의 범위 내에 있는 경우 해당 날짜를 추가
                if (currentDate > 0 && currentDate <= $dayMonth) {
                    cell.text(currentDate);
                    if (currentDate === todayDateNch &&
                        year === todayYearNch &&
                        month === todayMonthNch + 1
                    ) {
                        cell.addClass("today");
                    }
                } else if (currentDate <= 0) {
                    // 이전 달의 날짜
                    cell.text($lastMonthLastDay + currentDate).addClass('prev_Date');
                } else {
                    // 다음 달의 날짜
                    cell.text(currentDate - $dayMonth).addClass('next_Date');
                }
        
                row.append(cell);
                currentDate++;
            }
            $table.append(row);
        }
        return $table;
    }

    // 주어진 연도와 월에 기반하여 달력 업데이트하는 함수
    function updateCalendar(year, month) {
        $('#wrap').empty().append(generateCalendar(year, month));
    }

    // 현재 월로 달력 초기화
    $('#wrap').append(generateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1));

    // 이전 달 버튼 클릭 이벤트 핸들러
    $('#prev-month').on('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);
    });

    // 다음 달 버튼 클릭 이벤트 핸들러
    $('#next-month').on('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);
    });

    // 이전 연도 버튼 클릭 이벤트 핸들러
    $('#prev-year').on('click', function () {
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);
    });

    // 다음 연도 버튼 클릭 이벤트 핸들러
    $('#next-year').on('click', function () {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);
    });

    //날짜 클릭 시 오늘날짜로 이동하는 이벤트
    $('.today_move').on('click', function () {
        var today = new Date(); // 현재 날짜를 가져옴
        currentDate.setFullYear(today.getFullYear());
        currentDate.setMonth(today.getMonth());
        updateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);
    });
});