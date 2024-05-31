const config = require('../config/config');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  username: config.DB_USER_NAME,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  define: {
    timestamps: false
  },
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;












































































// const config = require('../config');
// const { Sequelize, DataTypes } = require('sequelize');
// const studentData = require('./data/students_data');
// const coursesData = require('./data/courses_data');
// const teachersData = require('./data/teachers_data');
// const studentsCoursesData = require('./data/students_courses_data');

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   host: config.DB_HOST,
//   username: config.DB_USER,
//   database: config.DB_NAME,
//   password: config.DB_PASSWORD,
//   port: config.DB_PORT,
//   define: {
//     timestamps: false
//   }
// });

// const Students = require('./student_model')(sequelize);
// const { Teachers } = require('./teachers_model')(sequelize);
// const { Courses } = require('./courses_model')(sequelize);
// const { StudentsCourses } = require('./students_courses_model')(sequelize);

// Students.belongsToMany(Courses, { through: StudentsCourses});
// Courses.belongsToMany(Students, { through: StudentsCourses });
// Courses.belongsTo(Teachers, { onDelete: 'CASCADE' });


// async function main() {
//   try {
//     await sequelize.authenticate();

//     await sequelize.sync({ force: true });

//     console.log('Database connected and synchronized.');

//     await Students.bulkCreate(studentData);
//     await Courses.bulkCreate(coursesData);
//     await Teachers.bulkCreate(teachersData);
//     await StudentsCourses.bulkCreate(studentsCoursesData);

//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   } 
//   finally {
//     await sequelize.close();
//     console.log('Database connection closed.');
//   }
// }

// main();

// module.exports =  sequelize;
