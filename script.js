var title_data = document.getElementById("title");

var desc_data = document.getElementById("desc");
var xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:3000/notes`);
xhr.send();
var data_json;

xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data_json = JSON.parse(xhr.response);
    console.log(JSON.parse(xhr.response));
    var my_id = lastid(data_json);
    localStorage.setItem("id", my_id);
    getAllNotes(data_json);
  }
});

function lastid(ele) {
  var id_num = ele[ele.length - 1].id;
  console.log(id_num);
  return id_num;
}

function addNote() {
  var title_value = title_data.value;
  var dec_value = desc_data.value;
  var post = new XMLHttpRequest();
  post.open("POST", `http://localhost:3000/notes`);
  post.setRequestHeader("Content-Type", "application/json");
  console.log(title_value);
  console.log(dec_value);
  if (title_value.length <= 5 && dec_value.length >= 20) {
    document.getElementById("title").nextElementSibling.innerHTML =
      "Title must be more than 6 charachter";
  } else if (title_value.length > 5 && dec_value.length < 20) {
    document.getElementById("desc").nextElementSibling.innerHTML =
      "description must be more than 20 charachter";
  } else if (title_value.length <= 5 && dec_value.length < 20) {
    document.getElementById("title").nextElementSibling.innerHTML =
      "Title must be more than 6 charachter";
    document.getElementById("desc").nextElementSibling.innerHTML =
      "description must be more than 20 charachter";
  } else {
    let data = JSON.stringify({
      id: Number(localStorage.getItem("id")) + 1 + "",
      title: title_value,
      description: dec_value,
    });
    post.send(data);
  }
}
document.getElementById("add_note_button").addEventListener("click", addNote);

function getAllNotes(elem) {
  var note = `<tr>
            <th>Title</th>
            <th>Description</th>
            <td>Action</td>
          </tr>`;
  for (let i = 0; i < elem.length; i++) {
    note += ` <tr>
            <td>${elem[i].title}</td>
            <td>${elem[i].description}</td>
            <td class="delUp">
              <button id="upButt" onclick="editNote(${elem[i].id})">Edit</button>
              <button onclick="deleteNote(${elem[i].id})">Delete</button>
            </td>
          </tr>`;
  }
  document.getElementById("theTable").innerHTML = note;
}

/////////////////////////////////////////////////////
const popup = document.getElementById("popup");

function editNote(id) {
  popup.style.display = "block";
  localStorage.setItem("id", id);
}

function upData() {
  var upId = localStorage.getItem("id");
  var upXhr = new XMLHttpRequest();
  upXhr.open("PUT", `http://localhost:3000/notes/${upId}`);
  /////////////////////////////////////
  //////////////////////////////////

  upXhr.setRequestHeader("Content-Type", "application/json");
  var upTitle = document.getElementById("uptitle").value;
  var upDesc = document.getElementById("upDesc").value;
  /////////////
  if (upTitle.length <= 5 && upDesc.length >= 20) {
    document.getElementById("uptitle").nextElementSibling.innerHTML =
      "Title must be more than 6 charachter";
  } else if (upTitle.length > 5 && upDesc.length < 20) {
    document.getElementById("upDesc").nextElementSibling.innerHTML =
      "description must be more than 20 charachter";
  } else if (upTitle.length <= 5 && upDesc.length < 20) {
    document.getElementById("uptitle").nextElementSibling.innerHTML =
      "Title must be more than 6 charachter";
    document.getElementById("upDesc").nextElementSibling.innerHTML =
      "description must be more than 20 charachter";
  } else {
    var upDataJson = JSON.stringify({
      id: upId + "",
      title: upTitle,
      description: upDesc,
    });
    upXhr.send(upDataJson);
    popup.style.display = "none";
  }
  //////////////

  upXhr.addEventListener("readystatechange", function () {
    if (upXhr.readyState == 4 && upXhr.status == 200) {
      console.log("updated");
    }
  });
}

function deleteNote(id) {
  var delXhr = new XMLHttpRequest();
  delXhr.open("DELETE", "http://localhost:3000/notes/" + id);
  delXhr.send();
}
