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
  var month = now.getMonth()+1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var time = year + "/" + month + "/" + date + " " + hour + ":" + minute;
  var month_date = month + "/" + date
  return [time, month_date];
}

<<<<<<< HEAD
function append_people(){
  var susseki_people = document.getElementById('susseki_people')
  
=======
function append_people(text){
  var syusseki_people = document.getElementById('syusseki_people');
  var new_element = document.createElement('p');
  new_element.textContent = text;
  syusseki_people.appendChild(new_element);
>>>>>>> 8771d78a2d167e78b4e9b9685e3c01cc0d4882d3
}


function check(element) {
  count = count + 1;
  var id = element.id;

  var nop = document.getElementById('count');
  var name = document.getElementById(id).value;
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
}
function hello() {
  alert('1年生');
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
