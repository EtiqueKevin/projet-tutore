db.createCollection("module");
db.module.createIndex({ id: 1 }, { unique: true });

db.createCollection("lesson");
db.lesson.createIndex({ id: 1 }, { unique: true });

db.createCollection("module_lesson");
db.module_lesson.createIndex({ id: 1 }, { unique: true });
db.module_lesson.createIndex({ id_module: 1 });
db.module_lesson.createIndex({ id_lesson: 1 });

db.createCollection("module_users");
db.module_users.createIndex({ id: 1 }, { unique: true });
db.module_users.createIndex({ id_module: 1 });
db.module_users.createIndex({ id_users: 1 });

db.createCollection("exercise");
db.exercise.createIndex({ id: 1 }, { unique: true });
db.exercise.createIndex({ id_user: 1 });