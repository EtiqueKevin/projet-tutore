db = db.getSiblingDB('cours'); // Remplace par le nom de ta BD

db.modules.insertMany([
  {
    _id: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_creator: UUID("123e4567-e89b-12d3-a456-426614174000"),
    name: "Module de test",
    description: "Exemple de module",
    nblesson: 5,
    date_update: new Date()
  }
]);

db.lessons.insertMany([
  {
    _id: UUID("660e8400-e29b-41d4-a716-446655440000"),
    name: "Cours de programmation",
    type: "langage",
    json : [],
    date_update: new Date()
  }
]);

db.module_lessons.insertMany([
  {
    _id: UUID("770e8400-e29b-41d4-a716-446655440000"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_lesson: UUID("660e8400-e29b-41d4-a716-446655440000")
  }
]);

db.module_users.insertMany([
  {
    _id: UUID("880e8400-e29b-41d4-a716-446655440000"),
    id_module: UUID("550e8400-e29b-41d4-a716-446655440000"),
    id_users: UUID("990e8400-e29b-41d4-a716-446655440000"),
    stage: 1,
    status: "En cours",
    rate: 4,
    date_update: new Date()
  }
]);
