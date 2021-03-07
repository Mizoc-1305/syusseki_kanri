function openHome() {
  alert('ホーム画面を開きます');
}
function openAna() {
  alert('分析画面を開きます');
}
function openSet() {
  alert('設定画面を開きます');
}
function write_log(text) {
  var fs = WScript.CreateObject("Scripting.FileSystemObject");
  alert("success");
  var file = fs.OpenTextFile("log.txt", 2);
  file.Write(text);
  file.Close();
}
function get_time() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var time = year + "/" + month + "/" + date + "/" + hour + ":" + minute + ":" + second;
  return time;
}
function kansu(element) {
  var id = element.id;
  var name = document.getElementById(id).value;
  var hello = document.getElementById('name');
  hello.innerHTML = name + 'さん こんにちは';
  var what_time = get_time();
  var info = what_time + " " + name;
  write_log(info);
}
function hello() {
  alert('三年生');
}
