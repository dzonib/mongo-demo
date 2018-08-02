const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://mosh:mosh135@ds263571.mlab.com:63571/moshnode',
    { useNewUrlParser: true }
  )
  .then(console.log('connected to db'))
  .catch(e => console.log(`could not connect do db. --> ${e}`));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'Angular.js Course',
    author: 'Mosh',
    tags: ['Angular', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
};

const getCourses = async () => {
  // eq (equal)
  // ne (not equal)
  // gt (greater then)
  // gte (greater or equal)
  // lt (less then)
  // lte (less then or equal to)
  // in
  //  nin (not in)
  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // only returns item that has key value pairs you selected on top

    // .find({price: {$gt: 10}})
    // returns courses that are 10 or more dolars or whatever

    .find({price: {$in: [10, 15, 20]}})
    // returns courses that are 10 15 or 20 dolars
    .limit(10)
    // limits to 10 items
    .sort({ name: 1 })
    // sort by name
    .select({ name: 1, tags: 1 });
    // only return wished paramethars
  console.log(courses);
};

getCourses();
