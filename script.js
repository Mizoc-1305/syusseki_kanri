var value_array = [];
var time_array = [];
var tab_where;
var day_array = [];
var day_lentgh = [];
var day_index = day_lentgh - 1;
var member = [];
var main_array = [];
var reader = new FileReader();
var reader2 = new FileReader();
var result_setting;
var result;


function for_day_length() {
  if (JSON.parse(localStorage.getItem("day")) == null) {
    day_lentgh = 0;
  } else {
    day_lentgh = JSON.parse(localStorage.getItem("day")).length;
  }
}
for_day_length()
class CSV {
  constructor(data, keys = false) {
    this.ARRAY = Symbol('ARRAY')
    this.OBJECT = Symbol('OBJECT')

    this.data = data

    if (CSV.isArray(data)) {
      if (0 == data.length) {
        this.dataType = this.ARRAY
      } else if (CSV.isObject(data[0])) {
        this.dataType = this.OBJECT
      } else if (CSV.isArray(data[0])) {
        this.dataType = this.ARRAY
      } else {
        throw Error('Error: 未対応のデータ型です')
      }
    } else {
      throw Error('Error: 未対応のデータ型です')
    }

    this.keys = keys
  }

  toString() {
    if (this.dataType === this.ARRAY) {
      return this.data.map((record) => (
        record.map((field) => (
          CSV.prepare(field)
        )).join(',')
      )).join('\n')
    } else if (this.dataType === this.OBJECT) {
      const keys = this.keys || Array.from(this.extractKeys(this.data))

      const arrayData = this.data.map((record) => (
        keys.map((key) => record[key])
      ))

      console.log([].concat([keys], arrayData))

      return [].concat([keys], arrayData).map((record) => (
        record.map((field) => (
          CSV.prepare(field)
        )).join(',')
      )).join('\n')
    }
  }

  save(filename = 'data.csv') {
    if (!filename.match(/\.csv$/i)) { filename = filename + '.csv' }

    console.info('filename:', filename)
    console.table(this.data)

    const csvStr = this.toString()

    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, csvStr], { 'type': 'text/csv' });
    const url = window.URL || window.webkitURL;
    const blobURL = url.createObjectURL(blob);

    let a = document.createElement('a');
    a.download = decodeURI(filename);
    a.href = blobURL;
    a.type = 'text/csv';

    a.click();
  }

  extractKeys(data) {
    return new Set([].concat(...this.data.map((record) => Object.keys(record))))
  }

  static prepare(field) {
    return '"' + ('' + field).replace(/"/g, '""') + '"'
  }

  static isObject(obj) {
    return '[object Object]' === Object.prototype.toString.call(obj)
  }

  static isArray(obj) {
    return '[object Array]' === Object.prototype.toString.call(obj)
  }
}
function setting_export() {
  var values = [];
  var current_values = [];
  var keys = Object.keys(localStorage)

  for (let i = 0; i < keys.length; i++) {
    current_values = [];
    current_values.push(keys[i]);
    current_values.push(JSON.parse(localStorage.getItem(keys[i])));
    values.push(current_values);
  }
  (new CSV(values)).save('setting.csv');
}

function excel_input() {
  var first_index = ["項目"];
  var days = JSON.parse(localStorage.getItem('day'));
  for (var i = 0; i < days.length; i++) {
    first_index.push(days[i]);
  }
  main_array.push(first_index);
  var excel_member = JSON.parse(localStorage.getItem('member'));
  for (let index_1 = 0; index_1 < excel_member.length; index_1++) {
    var excel_member_each = excel_member[index_1]
    for (let index_2 = 0; index_2 < excel_member_each.length; index_2++) {
      var someone = excel_member_each[index_2];
      var came_day = [];
      came_day.push(someone);
      for (var a = 0; a < days.length; a++) {
        var came_member_day = JSON.parse(localStorage.getItem(days[a]));
        if (came_member_day.indexOf(someone) == -1) {
          came_day.push("");
        } else {
          came_day.push("〇")
        }
      }
      main_array.push(came_day);
    }
  }
}
function sheet_to_workbook(sheet, opts) {
  var n = opts && opts.sheet ? opts.sheet : "Sheet1";
  var sheets = {}; sheets[n] = sheet;
  return { SheetNames: [n], Sheets: sheets };
}

function aoa_to_workbook(data, opts) {
  return sheet_to_workbook(XLSX.utils.aoa_to_sheet(data, opts), opts);
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

function excel_output() {
  excel_input();
  var write_opts = {
    type: 'binary'
  };

  var wb = aoa_to_workbook(main_array);
  var wb_out = XLSX.write(wb, write_opts);

  var blob = new Blob([s2ab(wb_out)], { type: 'application/octet-stream' });
  saveAs(blob, 'information.xlsx');
}

function get_time() {
  var now = new Date();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var time = hour + ":" + minute;
  var month_date = month + "/" + date
  return [time, month_date];
}
function listEx() {
  var exportList = JSON.parse(localStorage.getItem('member'));
  (new CSV(exportList)).save('member.csv');
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
  if (members == null) {
    var number = 0;
  }
  else {
    var number = members.length;
  }
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
  document.getElementById('syusseki_people').innerHTML = "";
  var people_on_the_day = localStorage.getItem(get_time()[1]);
  var when_people_arrive = localStorage.getItem(get_time()[1] + "_time");
  people_on_the_day = JSON.parse(people_on_the_day);
  when_people_arrive = JSON.parse(when_people_arrive);
  if (people_on_the_day == null) {
    var people_on_the_day_length = 0;
  } else {
    var people_on_the_day_length = people_on_the_day.length;
  }
  for (let index = 0; index < people_on_the_day_length; index++) {
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
  if (attended_people == null) {
    var attended_people_length = 0;
  } else {
    var attended_people_length = attended_people.length;
  }
  for (let index2 = 0; index2 < buttons_length; index2++) {
    var values = document.getElementById(IDs[index2]).value;
    for (let index3 = 0; index3 < attended_people_length; index3++) {
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

function next() {
  if (day_index < day_lentgh - 1) {
    day_index = day_index + 1;
    document.getElementById('syusseki_people').innerHTML = "";
    var someday_data = JSON.parse(localStorage.getItem("day"));
    var day_key = someday_data[day_index];
    var the_days_name = JSON.parse(localStorage.getItem(day_key));
    var the_days_time = JSON.parse(localStorage.getItem(day_key + "_time"));
    if (the_days_name == null) {
      var count = 0;
    } else {
      var count = the_days_name.length
    }
    var people = document.getElementById('people');
    people.innerHTML = count;
    var day_area = document.getElementById('dateArea');
    day_area.innerHTML = day_key;
    for (let index = 0; index < the_days_name.length; index++) {
      var name = the_days_name[index];
      var time = the_days_time[index];
      append_people(time, name);
    }
  }
}
function before() {
  if (day_index > 0) {
    day_index = day_index - 1;
    document.getElementById('syusseki_people').innerHTML = "";
    var someday_data = JSON.parse(localStorage.getItem("day"));
    var day_key = someday_data[day_index];
    var the_days_name = JSON.parse(localStorage.getItem(day_key));
    var the_days_time = JSON.parse(localStorage.getItem(day_key + "_time"));
    if (the_days_name == null) {
      var count = 0;
    } else {
      var count = the_days_name.length
    }
    var people = document.getElementById('people');
    people.innerHTML = count;
    var day_area = document.getElementById('dateArea');
    day_area.innerHTML = day_key;
    for (let index = 0; index < the_days_name.length; index++) {
      var name = the_days_name[index];
      var time = the_days_time[index];
      append_people(time, name);
    }
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

function add_member() {
  var new_name = document.getElementById('form_name').value;
  var new_grade = document.getElementsByClassName('radio');
  for (var value = "", i = new_grade.length; i--;) {
    if (new_grade[i].checked) {
      var value = new_grade[i].value;
      break;
    }
  }
  member = JSON.parse(localStorage.getItem("member"))
  member[value].push(new_name);
  localStorage.setItem("member", JSON.stringify(member));
  document.getElementById('decide').disabled = true;
  document.getElementById('decide').style.backgroundColor = '#BFBFBF';
  if (value == 0) {
    var new_tab_where = 'one';
  } else if (value == 1) {
    var new_tab_where = 'two';
  } else {
    var new_tab_where = 'three';
  }
  open_tab('side_home');
  tab(new_tab_where);
}

document.getElementById('analyze_main').style.display = "none";
document.getElementById('setting_main').style.display = "none";
document.getElementById('new_list').style.display = 'none';
document.getElementById('add_member').style.display = 'none';
document.getElementById('del_member').style.display = 'none';
document.getElementById('set_In').style.display = 'none';

function open_tab(id) {
  if (id == 'side_home') {
    var title = document.getElementById('title');
    title.innerHTML = 'ホーム - 出席管理システム';
    member = JSON.parse(localStorage.getItem('member'));
    document.getElementById('home_main').style.display = "block";
    document.getElementById('analyze_main').style.display = "none";
    document.getElementById('setting_main').style.display = "none";
    document.getElementById('new_list').style.display = 'none';
    document.getElementById('add_member').style.display = 'none';
    document.getElementById('del_member').style.display = 'none';
    document.getElementById('set_In').style.display = 'none';
    tab(tab_where);
    reload_NoA('count');
    reload_people();
    side_tab(id);
  } else if (id == 'side_analyze') {
    var title = document.getElementById('title');
    title.innerHTML = '分析 - 出席管理システム';
    document.getElementById('home_main').style.display = "none";
    document.getElementById('analyze_main').style.display = "block";
    document.getElementById('setting_main').style.display = "none";
    document.getElementById('new_list').style.display = 'none';
    document.getElementById('add_member').style.display = 'none';
    document.getElementById('del_member').style.display = 'none';
    document.getElementById('set_In').style.display = 'none';
    side_tab(id);
    for_day_length();
    day_index = day_lentgh - 1;
    document.getElementById('dateArea').innerHTML = get_time()[1];
    pull_array();
    reload_NoA('people');
  } else if (id == 'side_setting') {
    var title = document.getElementById('title');
    title.innerHTML = '設定 - 出席管理システム';
    document.getElementById('home_main').style.display = "none";
    document.getElementById('analyze_main').style.display = "none";
    document.getElementById('setting_main').style.display = "block";
    document.getElementById('new_list').style.display = 'none';
    document.getElementById('add_member').style.display = 'none';
    document.getElementById('del_member').style.display = 'none';
    document.getElementById('set_In').style.display = 'none';
    side_tab(id);
  }

}

document.getElementById('new_list').style.display = 'none';
document.getElementById('add_member').style.display = 'none';
document.getElementById('del_member').style.display = 'none';

function select_box(value) {
  var select_box = document.getElementsByClassName("select")[0];
  var grade_people = JSON.parse(localStorage.getItem("member"))[value];
  select_box.innerHTML = "";
  var default_element = document.createElement('option');
  default_element.value = "";
  default_element.textContent = "削除する人を選択してください";
  select_box.appendChild(default_element);
  for (let index = 0; index < grade_people.length; index++) {
    var new_element = document.createElement('option');
    new_element.value = grade_people[index];
    new_element.textContent = grade_people[index];
    select_box.appendChild(new_element);
  }
}
function settingFunc(id) {
  var id_FS = id;

  if (id_FS == 'new') {
    document.getElementById('setting_main').style.display = "none";
    document.getElementById('new_list').style.display = 'block';
    document.getElementById('add_member').style.display = 'none';
    document.getElementById('del_member').style.display = 'none';
    document.getElementById('set_In').style.display = 'none';
    var form = document.forms.nameform;
    form.namefile.addEventListener('change', function (e) {
      result = e.target.files[0];

      reader.readAsText(result);
    })
  } else if (id_FS == 'add') {
    var overwriteAdd = document.getElementById('add_member');

    document.getElementById('setting_main').style.display = "none";
    document.getElementById('new_list').style.display = 'none';
    document.getElementById('add_member').style.display = 'block';
    document.getElementById('del_member').style.display = 'none';
    document.getElementById('set_In').style.display = 'none';
    overwriteAdd.innerHTML = '<div class="form"><h2 class="text">メンバーの追加</h2><h4 class="choiceGrade">学年を選択</h4><label class="container">１年<input type="radio"  checked="checked" name="radio" value="0" class="radio"><span class="checkmark"></span></label><label class="container">２年<input type="radio" name="radio" value="1" class="radio"><span class="checkmark"></span></label><label class="container">３年<input type="radio" name="radio" value="2" class="radio"><span class="checkmark"></span></label><div class="textbox"><label for="name">名前:</label><input type="text" id="form_name" class="form_text"><p class="instruction">※姓と名のあいだに半角スペースを入力してください。</p></div><button id="decide" onclick="add_member()">メンバーを追加</button></div>'

  } else if (id_FS == 'del') {
    var overwriteDel = document.getElementById('del_member');

    document.getElementById('setting_main').style.display = "none";
    document.getElementById('new_list').style.display = 'none';
    document.getElementById('add_member').style.display = 'none';
    document.getElementById('del_member').style.display = 'block';
    document.getElementById('set_In').style.display = 'none';
    overwriteDel.innerHTML = '<div class="form"><h2 class="text">メンバーの削除</h2><h4 class="choiceGrade">学年を選択</h4><label class="container">１年<input type="radio" checked="checked" name="radio" value="0" class="radio" onclick="select_box(this.value)"><span class="checkmark"></span></label><label class="container">２年<input type="radio" name="radio" value="1" class="radio" onclick="select_box(this.value)"><span class="checkmark"></span></label><label class="container">３年<input type="radio" name="radio" value="2" class="radio" onclick="select_box(this.value)"><span class="checkmark"></span></label><div class="pullDown"><select class="select" name="memberName"></select></div><button id="delete" onclick="del_member()">選択したメンバーを削除</button></div>'
    select_box("0");
  } else if (id_FS == 'setEx') {
    setting_export()
  } else if (id_FS == 'setIn') {
    document.getElementById('setting_main').style.display = "none";
    document.getElementById('new_list').style.display = 'none';
    document.getElementById('add_member').style.display = 'none';
    document.getElementById('del_member').style.display = 'none';
    document.getElementById('set_In').style.display = 'block';
    var form2 = document.forms.settingform;
    form2.settingfile.addEventListener('change', function (f) {
      result_setting = f.target.files[0];
      reader2.readAsText(result_setting);
    })
  } else if (id_FS == 'dataEx') {
    excel_output();
  } else if (id_FS == 'listEx') {
    listEx();
  } else if (id_FS == 'dataReset') {
    var checkReset = window.confirm('全てのデータを削除します。よろしいですか？\nなお、この作業は取り消すことができません。事前にデータの書き出し等を行ってください。')
    if (checkReset) {

    }
  }

}
function setting_import() {
  var csv_arrays = reader2.result.split('\n');
  var targetStr = '"';
  var regExp = new RegExp(targetStr, "g");
  for (let index = 0; index < csv_arrays.length; index++) {
    var each_array = csv_arrays[index].replace(regExp, '');
    each_array = each_array.split(',');
    console.log(each_array);
  }

  /*  var temp_array = [];
    for (let index2 = 1; index2 < each_array.length; index2++) {
      temp_array.push(each_array[index2]);
    }
    localStorage.setItem(each_array[0], temp_array);
  }*/
}

function new_list() {  //指定されたCSVファイルを読み込み、名簿に追加する
  var csv_member = reader.result.split('\n');
  var changed_array = []
  for (let index = 0; index < csv_member.length; index++) {
    changed_array[index] = csv_member[index].split(',')
  }
  localStorage.setItem("member", JSON.stringify(changed_array));
  document.getElementById('load').disabled = true;
  document.getElementById('load').style.backgroundColor = '#BFBFBF';
  open_tab('side_home');
}


function del_member() { //指定されたメンバーを削除する

  var del_name = document.getElementsByClassName('select')[0].value;
  var checkDel = window.confirm(del_name + 'さんを削除してよろしいですか？');
  var del_grade = document.getElementsByClassName('radio');
  if (checkDel) {
    for (var value = "", i = del_grade.length; i--;) {
      if (del_grade[i].checked) {
        var value = del_grade[i].value;
        break;
      }
    }
  }
  member = JSON.parse(localStorage.getItem("member"))
  member[value].splice(member[value].indexOf(del_name), 1);
  localStorage.setItem("member", JSON.stringify(member));
  document.getElementById('delete').disabled = true;
  document.getElementById('delete').style.backgroundColor = '#BFBFBF';
  if (value == 0) {
    var del_tab_where = 'one';
  } else if (value == 1) {
    var del_tab_where = 'two';
  } else {
    var del_tab_where = 'three';
  }
  open_tab('side_home');
  tab(del_tab_where);
}
window.onload = function () {
  if (localStorage.hasOwnProperty('member')) {
    member = JSON.parse(localStorage.getItem('member'));
  } else {
    member = [];
    localStorage.setItem('member', JSON.stringify(member));
  }
  if (localStorage.hasOwnProperty('day')) {

  } else {
    day_array = [];
    localStorage.setItem('day', JSON.stringify(day_array));
  }
  var title = document.getElementById('title');
  title.innerHTML = 'ホーム - 出席管理システム';
  document.getElementById('home_main').style.display = "block";
  document.getElementById('analyze_main').style.display = "none";
  document.getElementById('setting_main').style.display = "none";
  tab('one');
  reload_people();
  reload_tab();
  reload_NoA('count');
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
