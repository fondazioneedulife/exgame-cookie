# Database schema

## Users

### Role: Admin

```ts
{
    "_id": ObjectId("1"),
    "first_name": "Name",
    "last_name": "Surname",
    "email": "example@gmail.com",
    "password": "HashedPassword",
    "image"?: 1010101010110,
    "created_at": ISODate("2024-01-01T14:30:00Z"),
    "updated_at"?: ISODate("2024-01-01T14:30:00Z"),
    "role": "admin",
}
```

### Role: Teacher

```ts
{
    "_id": ObjectId("2"),
    "first_name": "Name",
    "last_name": "Surname",
    "email": "example@gmail.com",
    "password": "HashedPassword",
    "image"?: 1010101010110,
    "created_at": ISODate("2024-01-01T14:30:00Z"),
    "updated_at"?: ISODate("2024-01-01T14:30:00Z"),
    "role": "teacher",
    "subjects"?: ["Node_JS", "Testing", "React"],
    "teacher_classes"?: ["Cookie", "Suse"],
}
```

### Role: Student

```ts
{
    "_id": ObjectId("3"),
    "first_name": "Name",
    "last_name": "Surname",
    "email": "example@gmail.com",
    "password": "HashedPassword",
    "image"?: 1010101010110,
    "created_at": ISODate("2024-01-01T14:30:00Z"),
    "updated_at"?: ISODate("2024-01-01T14:30:00Z"),
    "role": "student",
    "student_class"?: "Cookie"
}
```

## Exams

```ts
[
  {
    _id: ObjectId(""),
    name: "Esame di Matematica",
    created_at: ISODate("2024-01-20T10:00:00Z"),
    updated_at: ISODate("2024-01-20T10:00:00Z"),
    created_by: ObjectId(""), //id del docente che fa l'esame
    classes: [], //array delle classi per cui viene fatto l'esame
    max_time: 90,
    questions: [
      {
        _id: ObjectId("..."),
        text: "Qual è il risultato di 5 + 5?",
        type: "multiple_choice",
        answers: [
          { _id: ObjectId("..."), answer: "10", isCorrect: true },
          { _id: ObjectId("..."), answer: "2", isCorrect: false },
        ],
      },
      {
        _id: ObjectId("..."),
        text: "Quanto fa 10 / 2 ?",
        type: "multiple_choice",
        answers: [
          { _id: ObjectId("..."), answer: "10", isCorrect: false },
          { _id: ObjectId("..."), answer: "5", isCorrect: true },
        ],
      },
    ],
  },
];
```

## Sessions
```ts
[
  {
    _id: ObjectId(""),
    exam_id: ObjectId(""),
    student_class: "",
    start_date: ISODate("2024-01-20T10:00:00Z"),
    start_time: ISODate("2024-01-20T10:00:00Z")
  }
]
```

## Subscriptions

```ts
[
  {
    _id: ObjectId(""),
    student_id: ObjectId(""),
    session_id: ObjectId(""),
    questions: [
      {
        question_id: ObjectId("..."),
        responses: [
          {
            answer_id: ObjectId("..."),
          },
        ],
      },
    ],
  },
];
```
