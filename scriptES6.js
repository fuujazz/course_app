class Course {
  constructor(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
    this.courseId = Math.floor(Math.random() * 1000000000);
  }
}

class UI {
  addCourseToList(course) {
    const list = document.getElementById("course-list");

    var html = `
        <tr>
                <th>${course.image} </th>
                <th>${course.title} </th>
                <th>${course.instructor} </th>
                <th>
                  <a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a>
                </th>
              </tr>
    `;
    list.innerHTML += html;
  }

  clearControls() {
    const title = (document.getElementById("title").value = "");
    const instructor = (document.getElementById("instructor").value = "");
    const image = (document.getElementById("image").value = "");
  }

  deleteCourse(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
      return true;
    }
  }

  showAlert(message, className) {
    var alert = `<div class="alert alert-${className}">
  ${message}
  </div>`;

    const row = document.querySelector(".row");
    //  beforeBegin, afterBegin, beforeEnd, afterEnd
    row.insertAdjacentHTML("beforebegin", alert);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

class Storage {
  static getCourses() {
    let courses;

    if (localStorage.getItem("courses") === null) {
      courses = [];
    } else {
      courses = JSON.parse(localStorage.getItem("courses"));
    }

    return courses;
  }

  static displayCourses() {
    const courses = Storage.getCourses();

    courses.forEach((course) => {
      const ui = new UI();
      ui.addCourseToList(course);
    });
  }

  static addCourse(course) {
    const courses = Storage.getCourses();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }

  static deleteCourse(element) {
    if (element.classList.contains("delete")) {
      const id = element.getAttribute("data-id");
      const courses = Storage.getCourses();

      courses.forEach((course, index) => {
        if (course.courseId == id) {
          courses.splice(index, 1);
        }
      });

      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }
}

document.addEventListener("DOMContentLoaded", Storage.displayCourses);

document
  .getElementById("delete-all")
  .addEventListener("click", function (event) {
    const courseList = document.getElementById("course-list");
    localStorage.clear();

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

      //  save to local storage
      Storage.addCourse(course);

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
    if (ui.deleteCourse(event.target) == true) {
      //    delete from storage
      Storage.deleteCourse(event.target);
      ui.showAlert("the course has been deleted", "danger");
    }
  });
