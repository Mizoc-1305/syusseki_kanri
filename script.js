function openHome() {
  alert('ホーム画面を開きます');
}
function openAna() {
  alert('分析画面を開きます');
}
function openSet() {
  alert('設定画面を開きます');
}
function kansu(element) {
  var id = element.id;
  var name = document.getElementById(id).value;
  var hello = document.getElementById('name');
  hello.innerHTML = name + 'さん こんにちは';
}
function hello() {
  alert('三年生');
}

