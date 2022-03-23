// document
//   .getElementById("new-course")
//   .addEventListener("submit", function (event) {
//     const title = document.getElementById("title").value;
//     const instructor = document.getElementById("instructor").value;
//     const image = document.getElementById("image").value;

//     console.log(title, instructor, image);
//     console.log("hebele hübele");
//     event.preventDefault();
//   });

const save = document.querySelector(".btn");
const course_list = document.getElementById("course-list");
const from_group = document.querySelectorAll(".from-group");
const courseList = [];
class Course {
  constructor(_title, _instructor, _image) {
    this.title = _title;
    this.instructor = _instructor;
    this.image = _image;
  }
}

save.addEventListener("click", (event) => {
  const title = document.getElementById("title").value;
  const instructor = document.getElementById("instructor").value;
  const image = document.getElementById("image").value;

  let course = new Course(title, instructor, image);
  courseList.push(course);
  handleChange(course);

  event.preventDefault();
});

function handleChange(_course) {
  let course = _course;
  if (course.title == "" || course.instructor == "" || course.image == "") {
    from_group.classList.forEach((item) => {
      item.innerHTML += `<p style="color: red;font-size=12px;">Can not be empty</p>`;
    });
  }
  course_list.innerHTML += `<tr>
                <th>${course.image}</th>
                <th>${course.title}</th>
                <th>${course.instructor}</th>
                <th></th>
              </tr>`;
}
