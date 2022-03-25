//  Course constructor
function Course(_title, _instructor, _image) {
  this.title = _title;
  this.instructor = _instructor;
  this.image = _image;
}

//  UI constructor
function UI() {}
UI.prototype.addCourseToList = function (course) {
  const list = document.getElementById("course-list");

  var html = `
        <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>
                  <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </th>
              </tr>
    `;
  list.innerHTML += html;
};
UI.prototype.clearControls = function () {
  const title = (document.getElementById("title").value = "");
  const instructor = (document.getElementById("instructor").value = "");
  const image = (document.getElementById("image").value = "");
};
UI.prototype.deleteCourse = function (element) {
  console.log(element);
  beforebegin;
  if (element.classList.contains("delete")) {
    element.parentElement.parentElement.remove();
  }
};
UI.prototype.showAlert = function (message, className) {
  var alert = `<div class="alert alert-${className}">
  ${message}
  </div>`;
  console.log(alert);
  const row = document.querySelector(".row");
  //  beforeBegin, afterBegin, beforeEnd, afterEnd
  row.insertAdjacentHTML("beforebegin", alert);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

document
  .getElementById("delete-all")
  .addEventListener("click", function (event) {
    const courseList = document.getElementById("course-list");

    courseList.innerHTML = "";
  });

document
  .getElementById("new-course")
  .addEventListener("submit", function (event) {
    const title = document.getElementById("title").value;
    const instructor = document.getElementById("instructor").value;
    const image = document.getElementById("image").value;

    //    create course object
    const course = new Course(title, instructor, image);

    //    create UI
    const ui = new UI();

    if (title == "" || instructor == "" || image == "") {
      ui.showAlert("Please complete the form", "warning");
    } else {
      //    add course to list
      ui.addCourseToList(course);

      //    clear controls
      ui.clearControls();

      ui.showAlert("The course has ben added", "success");
    }

    event.preventDefault();
  });

document
  .getElementById("course-list")
  .addEventListener("click", function (event) {
    const ui = new UI();
    ui.deleteCourse(event.target);
    ui.showAlert("the course has been deleted", "danger");
  });
