var value_array = [];
var time_array = [];
var tab_where;
var day_array = [];
var member = [["徳川 家康", "豊臣 秀吉", "南方 熊楠", "黒田 官兵衛", "溝上 幸太"], ["ナポレオン", "織田 信長", "武田 信玄", "源 頼朝", "岸田 健吾"], ["大久保 利通", "西郷 隆盛", "足利 尊氏", "ペリー", "木戸 孝允"]]
/*window.addEventListener('beforeunload', function (e) {
  e.returnValue = '';
}, false);*/ //リロード前に確認ダイアログを表示

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
function reload_member(members) {
  var btn = document.getElementsByClassName("btn")[0];
  btn.innerHTML = "";
  var number = members.length;
  var IDs = [];
  for (let index = 1; index < number + 1; index++) {
    IDs.push("btn_" + index);
  }
  for (let index2 = 0; index2 < number; index2++) {
    var new_button = document.createElement("button");
    new_button.id = IDs[index2];
    new_button.onclick = function () { check(this); }
    new_button.className = "button";
    new_button.type = "button";
    new_button.name = "button";
    new_button.value = members[index2];
    new_button.textContent = members[index2];
    btn.appendChild(new_button);
  }
}

function append_people(time, name) {
  var syusseki_people = document.getElementById('syusseki_people');
  if (member[0].indexOf(name) != -1) {
    var grade = "1";
  } else if (member[1].indexOf(name) != -1) {
    var grade = "2";
  } else {
    var grade = "3"
  }
  var new_element = document.createElement('p');
  new_element.textContent = time + " " + grade + "年 " + name;
  new_element.className = "person";
  syusseki_people.appendChild(new_element);
  var new_element_hr = document.createElement('hr');
  syusseki_people.appendChild(new_element_hr);
}
function pull_array() {
  var people_on_the_day = localStorage.getItem(get_time()[1]);
  var when_people_arrive = localStorage.getItem(get_time()[1] + "_time");
  people_on_the_day = JSON.parse(people_on_the_day);
  when_people_arrive = JSON.parse(when_people_arrive);
  for (let index = 0; index < people_on_the_day.length; index++) {
    var name = people_on_the_day[index];
    var time = when_people_arrive[index];
    append_people(time, name);
  }
}
function reload_NoA(id) {
  var people_on_the_day = localStorage.getItem(get_time()[1]);
  people_on_the_day = JSON.parse(people_on_the_day);
  if (people_on_the_day == null) {
    var count = 0;
  } else {
    var count = people_on_the_day.length
  }
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
function day_manage() {
  var today = get_time()[1];
  if (localStorage.hasOwnProperty("day")) {
    day_array = localStorage.getItem("day");
    day_array = JSON.parse(day_array);
    if (day_array[day_array.length - 1] != today) {
      day_array.push(today);
      localStorage.setItem("day", JSON.stringify(day_array));
    }
  } else {
    day_array.push(today);
    localStorage.setItem("day", JSON.stringify(day_array));
  }
}
function tab(id) {
  var grade = document.getElementById(id);
  grade.style.backgroundColor = '#BDD7EE';

  if (id == 'one') {
    var else_1 = document.getElementById('two');
    var else_2 = document.getElementById('three');
    else_1.style.backgroundColor = '#BFBFBF';
    else_2.style.backgroundColor = '#BFBFBF';
    tab_where = 'one';
    reload_member(member[0]);
  } else if (id == 'two') {
    var else_1 = document.getElementById('one');
    var else_2 = document.getElementById('three');
    else_1.style.backgroundColor = '#BFBFBF';
    else_2.style.backgroundColor = '#BFBFBF';
    tab_where = 'two';
    reload_member(member[1]);
  } else if (id == 'three') {
    var else_1 = document.getElementById('one');
    var else_2 = document.getElementById('two');
    else_1.style.backgroundColor = '#BFBFBF';
    else_2.style.backgroundColor = '#BFBFBF';
    tab_where = 'three';
    reload_member(member[2]);
  }
  reload_people();
}
function reload_tab() {
  var grade = document.getElementById('one');
  grade.style.backgroundColor = '#BDD7EE';
  tab_where = 'one'
  var grade = document.getElementById('side_home');
  grade.style.backgroundColor = '#000B70';
}

function pageChange(html, id) {
  var change_area = document.getElementById('change_area');
  change_area.innerHTML = html;
  side_tab(id);
}
function openHome(element) {
  html_home = '<div class="header"><div class="name"><p id="name"></p></div><p id="day"></p><div class="count"><p>本日の出席人数：　<span id="count">0</span>人</p>  <!--Number of peopleの略--></div></div><div class="tab"><p class="grade" id="one" onclick="tab(this.id)">１年</p><p class="grade" id="two" onclick="tab(this.id)">２年</p><p class="grade" id="three" onclick="tab(this.id)">３年</p></div><div class="btn"></div>';
  pageChange(html_home, element);
  tab(tab_where);
  reload_NoA('count');
  reload_people();
}
window.onload = function () {
  tab('one');
  reload_people();
  reload_tab();
  reload_NoA('count');
}
function openAna(element) {
  html_ana = '<div class="main_analyze"><div class="anaHeader"><p id="dateArea">3月12日</p></div><div class="NoA"> <!--Number of attendeesの略--><p class="people">出席人数：<span id="people">0</span>人</p></div><div id="syusseki_people"></div></div>'
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
    if (localStorage.hasOwnProperty(key + "_time")) {
      time_array = localStorage.getItem(key + "_time");
      time_array = JSON.parse(time_array);
      time_array.push(what_time[0]);
      localStorage.setItem(key + "_time", JSON.stringify(time_array));
    } else {
      time_array.push(what_time[0]);
      localStorage.setItem(key + "_time", JSON.stringify(time_array));
    }
    if (localStorage.hasOwnProperty(key)) {
      value_array = localStorage.getItem(key);
      value_array = JSON.parse(value_array);
      value_array.push(value);
      localStorage.setItem(key, JSON.stringify(value_array));
    } else {
      value_array.push(value);
      localStorage.setItem(key, JSON.stringify(value_array));
    }

    var people_on_the_day = localStorage.getItem(key);
    people_on_the_day = JSON.parse(people_on_the_day);
    nop.innerHTML = people_on_the_day.length;
    day_manage();
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
