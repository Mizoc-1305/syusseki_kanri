var count = 0;　//人数を数える変数
var value_array = [];

function openHome() {
  //alert('ホーム画面を開きます');
  window.location.href = 'index.html';
}
function openAna() {
  //alert('分析画面を開きます');
  window.location.href = 'analyze.html';
}
function openSet() {
  //alert('設定画面を開きます');
  window.location.href = 'setting.html';
}

function get_time() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var day_of_week = now.getDay()
  var day = [ "日", "月", "火", "水", "木", "金", "土" ][day_of_week] 
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

function tab(element){
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

  function delHello(){
    var hello = document.getElementById('name');
    hello.innerHTML = '';
  }
  window.setTimeout(delHello,2000);
}


var day_area = document.getElementById("day")
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
