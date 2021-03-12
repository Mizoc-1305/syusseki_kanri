var count = 0;　//人数を数える変数
var value_array = [];

function side_tab(element) {
  let id = element.id;
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

function pageChange(html,element) {
  var change_area = document.getElementById('change_area');
  change_area.innerHTML = html;
  side_tab(element);
}
function openHome(element) {
  html_home = '<div class="header"><div class="name"><p id="name"></p></div><p id="day"></p><div class="count"><p id="count">本日の出席人数：　0人</p>  <!--Number of peopleの略--></div></div><div class="tab"><p class="grade" id="one" onclick="tab(this)">１年</p><p class="grade" id="two" onclick="tab(this)">２年</p><p class="grade" id="three" onclick="tab(this)">３年</p></div><div class="btn"><button class="button" type="button" name="button" id="btn_1" value="伊藤 聡馬" onclick="check(this)">伊藤 聡馬</button><button class="button" type="button" name="button" id="btn_2" value="岸田 健吾" onclick="check(this)">岸田 健吾</button><button class="button" type="button" name="button" id="btn_3" value="溝上 幸太" onclick="check(this)">溝上 幸太</button><button class="button" type="button" name="button" id="btn_4" value="坂本 光志朗" onclick="check(this)">坂本 光志朗</button></div><div id="syusseki_people"></div>';
  pageChange(html_home,element);
}
function openAna(element) {
  html_ana = '<div class="main_analyze"><div class="anaHeader"><p id="dateArea">3月12日</p></div><div class="NoA"> <!--Number of attendeesの略--><p class="people">出席人数：<span id="people">10</span>人</p></div></div>'
  pageChange(html_ana,element);
}
function openSet(element) {
  html_set = '<div class="menu_tile"><div class="menu_newList"><img class="menu_icon" src="newList.png" alt=""><p class="menu_Text">名簿の新規作成</p></div><div class="menu_addMember"><img class="menu_icon" src="addMember.png" alt=""><p class="menu_Text">メンバーの追加</p></div><div class="menu_delMenber"><img class="menu_icon" src="delMember.png" alt=""><p class="menu_Text">メンバーの削除</p></div></div>'
  pageChange(html_set,element);
}

function get_time() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var day_of_week = now.getDay()
  var day = ["日", "月", "火", "水", "木", "金", "土"][day_of_week]
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var time = year + "/" + month + "/" + date + " " + hour + ":" + minute;
  var month_date = month + "/" + date
  return [time, month_date];
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
  count = count + 1;
  var id = element.id;

  var nop = document.getElementById('count');
  var name = document.getElementById(id).value;
  var clicked = document.getElementById(id);
  var hello = document.getElementById('name');
  nop.innerHTML = '本日の出席人数：　' + count + '人';
  hello.innerHTML = name + 'さん こんにちは';
  var what_time = get_time();
  var value = what_time[0] + " " + name;
  var key = what_time[1];
  value_array.push(value);
  localStorage.setItem(key, JSON.stringify(value_array));
  append_people(value);
  document.getElementById(id).disabled = true;
  clicked.style.backgroundColor = '#BFBFBF';

  function delHello() {
    var hello = document.getElementById('name');
    hello.innerHTML = '';
  }
  window.setTimeout(delHello, 2000);
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
