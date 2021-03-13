var value_array = [];
var time_array = [];

window.addEventListener('beforeunload', function (e) {
  e.returnValue = '';
}, false); //リロード前に確認ダイアログを表示

function get_time() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var day_of_week = now.getDay()
  var day = ["日", "月", "火", "水", "木", "金", "土"][day_of_week]
  var hour = set(now.getHours());
  var minute = set(now.getMinutes());
  var second = set(now.getSeconds());
  var time = hour + ":" + minute;
  var month_date = month + "/" + date
  return [time, month_date];
}

function side_tab(id) {
  var grade = document.getElementById(id);
  grade.style.backgroundColor = '#000B70';

  if (id == 'side_home') {
    var else_1 = document.getElementById('side_analyze');
    var else_2 = document.getElementById('side_setting');
    else_1.style.backgroundColor = '#02002E';
    else_2.style.backgroundColor = '#02002E';
  } else if (id == 'side_analyze') {
    var else_1 = document.getElementById('side_home');
    var else_2 = document.getElementById('side_setting');
    else_1.style.backgroundColor = '#02002E';
    else_2.style.backgroundColor = '#02002E';
  } else if (id == 'side_setting') {
    var else_1 = document.getElementById('side_home');
    var else_2 = document.getElementById('side_analyze');
    else_1.style.backgroundColor = '#02002E';
    else_2.style.backgroundColor = '#02002E';
  }

}
function append_people(text) {
  var syusseki_people = document.getElementById('syusseki_people');
  var new_element = document.createElement('p');
  new_element.textContent = text;
  new_element.className = "person";
  syusseki_people.appendChild(new_element);
  var new_element_hr = document.createElement('hr');
  syusseki_people.appendChild(new_element_hr);
}
function pull_array() {
  var people_on_the_day = localStorage.getItem(get_time()[1]);
  var when_people_arrive = localStorage.getItem(get_time()[1]+"_time");
  people_on_the_day = JSON.parse(people_on_the_day);
  when_people_arrive = JSON.parse(when_people_arrive);
  for (let index = 0; index < people_on_the_day.length; index++) {
    var name = people_on_the_day[index];
    var time = when_people_arrive[index];
    append_people(time + " " + name);
  }
}
function reload_NoA(id) {
  var people_on_the_day = localStorage.getItem(get_time()[1]);
  people_on_the_day = JSON.parse(people_on_the_day);
  var count = people_on_the_day.length
  var people = document.getElementById(id);
  people.innerHTML = count;
}
function reload_people() {
  var IDs = [];
  var buttons_length = document.getElementsByClassName("button").length;
  for (let index = 1; index < buttons_length + 1; index++) {
    IDs.push("btn_" + index);
  }
  var attended_people = localStorage.getItem(get_time()[1]);
  attended_people = JSON.parse(attended_people);
  for (let index2 = 0; index2 < buttons_length; index2++) {
    var values = document.getElementById(IDs[index2]).value;
    for (let index3 = 0; index3 < attended_people.length; index3++) {
      var attended_person = attended_people[index3];
      if (values == attended_person) {
        document.getElementById(IDs[index2]).disabled = true;
        document.getElementById(IDs[index2]).style.backgroundColor = '#BFBFBF';
      }
    }
  }
}


function pageChange(html, id) {
  var change_area = document.getElementById('change_area');
  change_area.innerHTML = html;
  side_tab(id);
}
function openHome(element) {
  html_home = '<div class="header"><div class="name"><p id="name"></p></div><p id="day"></p><div class="count"><p>本日の出席人数：　<span id="count">0</span>人</p>  <!--Number of peopleの略--></div></div><div class="tab"><p class="grade" id="one" onclick="tab(this)">１年</p><p class="grade" id="two" onclick="tab(this)">２年</p><p class="grade" id="three" onclick="tab(this)">３年</p></div><div class="btn"><button class="button" type="button" name="button" id="btn_1" value="伊藤 聡馬" onclick="check(this)">伊藤 聡馬</button><button class="button" type="button" name="button" id="btn_2" value="岸田 健吾" onclick="check(this)">岸田 健吾</button><button class="button" type="button" name="button" id="btn_3" value="溝上 幸太" onclick="check(this)">溝上 幸太</button><button class="button" type="button" name="button" id="btn_4" value="坂本 光志朗" onclick="check(this)">坂本 光志朗</button></div>';
  pageChange(html_home, element);
  reload_NoA('count');
  reload_people()
}
window.onload = function () {
  openHome("side_home");
}
function openAna(element) {
  html_ana = '<div class="main_analyze"><div class="anaHeader"><p id="dateArea">3月12日</p></div><div class="NoA"> <!--Number of attendeesの略--><p class="people">出席人数：<span id="people">10</span>人</p></div><div id="syusseki_people"></div></div>'
  pageChange(html_ana, element);
  pull_array();
  reload_NoA('people');
}
function openSet(element) {
  html_set = '<div class="menu_tile"><div class="menu_newList"><img class="menu_icon" src="newList.png" alt=""><p class="menu_Text">名簿の新規作成</p></div><div class="menu_addMember"><img class="menu_icon" src="addMember.png" alt=""><p class="menu_Text">メンバーの追加</p></div><div class="menu_delMenber"><img class="menu_icon" src="delMember.png" alt=""><p class="menu_Text">メンバーの削除</p></div></div>'
  pageChange(html_set, element);
}

function set(num) {
  var ret;
  if (num < 10) { ret = "0" + num; }
  else { ret = num; }
  return ret;
}

function tab(element) {
  let id = element.id;
  var grade = document.getElementById(id);
  grade.style.backgroundColor = '#BDD7EE';

  if (id == 'one') {
    var else_1 = document.getElementById('two');
    var else_2 = document.getElementById('three');
    else_1.style.backgroundColor = '#BFBFBF';
    else_2.style.backgroundColor = '#BFBFBF';
  } else if (id == 'two') {
    var else_1 = document.getElementById('one');
    var else_2 = document.getElementById('three');
    else_1.style.backgroundColor = '#BFBFBF';
    else_2.style.backgroundColor = '#BFBFBF';
  } else if (id == 'three') {
    var else_1 = document.getElementById('one');
    var else_2 = document.getElementById('two');
    else_1.style.backgroundColor = '#BFBFBF';
    else_2.style.backgroundColor = '#BFBFBF';
  }

}


function check(element) {
  var id = element.id;

  var nop = document.getElementById('count');
  var name = document.getElementById(id).value;

  var check = window.confirm(name + 'さん でいいですか？');

  if (check) {
    var clicked = document.getElementById(id);
    var hello = document.getElementById('name');
    hello.innerHTML = name + 'さん こんにちは';
    var what_time = get_time();
    var value = name;
    var key = what_time[1];
    if(localStorage.hasOwnProperty(key + "_time")) {
      time_array = localStorage.getItem(key + "_time");
      time_array = JSON.parse(time_array);
      time_array.push(what_time[0]);
      localStorage.setItem(key + "_time", JSON.stringify(time_array));
    }else{
      time_array.push(what_time[0]);
      localStorage.setItem(key + "_time", JSON.stringify(time_array));
    }
    if(localStorage.hasOwnProperty(key)) {
      value_array = localStorage.getItem(key);
      value_array = JSON.parse(value_array);
      value_array.push(value);
      localStorage.setItem(key, JSON.stringify(value_array));
    }else{
      value_array.push(value);
      localStorage.setItem(key, JSON.stringify(value_array));
    }

    var people_on_the_day = localStorage.getItem(key);
    people_on_the_day = JSON.parse(people_on_the_day);
    nop.innerHTML = people_on_the_day.length;
    document.getElementById(id).disabled = true;
    clicked.style.backgroundColor = '#BFBFBF';

    function delHello() {
      var hello = document.getElementById('name');
      hello.innerHTML = '';
    }
    window.setTimeout(delHello, 3000);
  }


}


function set(num) {
  var ret;
  if (num < 10) { ret = "0" + num; }
  else { ret = num; }
  return ret;
}

function time() {
  var nowTime = new Date();
  //var year = set( nowTime.getFullYear() );
  //var mouth = set( nowTime.getMonth() );
  //var day = set( nowTime.getDate() );
  var nowHour = set(nowTime.getHours());
  var nowMin = set(nowTime.getMinutes());
  //var nowSec  = set( nowTime.getSeconds() );
  //var msg_1 = year + "   " + month + "  " + day;
  var msg = nowHour + ":" + nowMin;
  //document.getElementById("dateArea").innerHTML = msg_1;
  document.getElementById("ClockArea").innerHTML = msg;

}


setInterval('time()', 500);
