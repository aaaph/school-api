install
'git clone https://github.com/riki4iki/school-api.git'
'npm i'
'npm run .' - run nodemon

endpoints

-  api/v1/auth/sign-up - post - body[login, password] - return 201
-  api/v1/auth/sign-in - post - body[login, password] - return jwt pair, 200
-  protected by token Authorization(access_token)

-  api/v1/discipline - get - return discipline[]
-  api/v1/discipline/:id - get - param[id] return discipline
-  api/v1/discipline - post - body[couse, title] return discipline
-  api/v1/discipline/:id - put - param[id], body[couse, title] return discipline
-  api/v1/discipline/:id- del - param[id] return discipline

-  api/v1/school - get - return school[]
-  api/v1/school/:id - get - param[id] return school
-  api/v1/school - post - body[name,days] return school
-  api/v1/school/:id - put - param[id], body[name,days] return school
-  api/v1/school/:id - delete - param[id] return school

-  api/v1/school/:schoolId/teacher - get - return teacher[]
-  api/v1/school/:schoolId/teacher/:id - get - param[id] return teacher
-  api/v1/school/:schoolId/teacher - post - body[firstName, secondName, age, disciplines[]] return teacher
-  api/v1/school/:schoolId/teacher/:id - put - param[id], body[firstName, secondName, age, disciplines[]] return teacher
-  api/v1/school/:schoolId/teacher/:id - del - param[id] return teacher

-  api/v1/school/:schoolId/group - get - return group[]
-  api/v1/school/:schoolId/group/:id - get - param[id] return group
-  api/v1/school/:schoolId/group - post - body[course, symbol] return group
-  api/v1/school/:schoolId/group/:id - put - param[id], body[course, symbol] return group
-  api/v1/school/:schoolId/group/:id - del - param[id] return group

-  api/v1/school/:schoolId/group/:groupId/student - get - return student[]
-  api/v1/school/:schoolId/group/:groupId/student/:id - get - param[id] return student
-  api/v1/school/:schoolId/group/:groupId/student - post - body[firstName, secondName, age] return student
-  api/v1/school/:schoolId/group/:groupId/student/:id - put - param[id], body[firstName, secondName, age] return student
-  api/v1/school/:schoolId/group/:groupId/student/:id - delete - param[id] return student

-  api/v1/school/:schoolId/group/:groupId/schedule - get - return schedule[]
-  api/v1/school/:schoolId/group/:groupId/schedule/:id - get - param[id] return schedule
-  api/v1/school/:schoolId/group/:groupId/schedule - post - body[day, lessonTitle, lessonNumber, teacher] return schedule
-  api/v1/school/:schoolId/group/:groupId/schedule/:id- put - param[id],body[day, lessonTitle, lessonNumber, teacher] return schedule
-  api/v1/school/:schoolId/group/:groupId/schedule/:id - delete - param[id] return schedule

-  api/v1/school/:schoolId/teacher/:teacher/schedule - get - return schedule[]
-  api/v1/school/:schoolId/teacher/:teacher/schedule/:id - get - param[id] return schedule
-  api/v1/school/:schoolId/teacher/:teacher/schedule - post - body[day, lessonTitle, lessonNumber, group] return schedule
-  api/v1/school/:schoolId/teacher/:teacher/schedule/:id - put - param[id], body[day, lessonTitle, lessonNumber, group] return schedule
-  api/v1/school/:schoolId/teacher/:teacher/schedule/:id - delete - param[id] return schedule

Необходим для реализации авторизации через jwt. Не является освновной целью, поэтому будет возможность только создавать аккаунты через регестрацию
Ендпроинтов для обновления инфы аккаунта/удаления смысла делать не вижу.

school - name

требования к школе: уникальное имя, сделать так , чтобы вводилось кол-во учебных дней в школе(по дефолту 5, но существуют же и 6 дневние школы)
кол-во учебных лет будет состовлять 11 (по дефолту)
адрес?? - нет смысла
номер?? - не имеет особого значения, номер можно впихнуть и в название

group
уникальность по номеру группы и году обучения ( не может быть двух 5Б в одной школе)
Ест ьвозможность сдлеать апдейт только инкрементом, по сути 5б не может за 1 итерацию превратится в 9б при реальных обстоятельствах
student
студент принадлежит группе, у каждого студента есть свои оценки по предметам (а каждая оценка это один предмет, а один предмет это 1 преподователь)
teacher
имя, фамилия, кол-во лет, учитель может преподовать несколько предметов (Существует же учитель математики, алгебры, геометрии одновременно)
вопрос как учителям добавлять список предметов... айдишниками или строками(скорее айдишниками)
можно сделать возможность классного руководителя(при создании группы указывать айди учителя, или при добавлении учителя кидать ссылку группы)
schedule
Расписания состовляет для групп(а может для и для учителей, хотя всегда казалось что для групп)
Расписание принадлежит и группе учеников и учителям.
Сложная связь...
Расписание можно получить из уроков
lesson
Предмет проводится в группе. Предмет проводит преподователь, преподоет один из своих предметов. Урок проходит в определенное время(день недели, номер урока(1-8)
Группа имеет расписание, а значит много предметов
1 предмет принадлежит только 1 дисциплине
1 предмет принадлежит 1 группе(но у группы много уроков)
1 предмет принадлежит 1 преподователю(но у преподователя также много уроков в течении недели)
Вопрос как добавлять уроки.. через ендпоинт группы или через ендпоинт преподователя, или так и так, или сделать отдельно

    у предмет не может проходить для 1 учителя одновременно для 2 групп

disciplines
по своей сути предмет принадлежит учебному году(алгебра 5 класс) поэтому при добавлении необходимо учитывать не повторяется ли предмет для курса
Как я считаю набор предметов это сущность стоящая выше всех школ (на уровне государства) Сама школа не может коректировать ее набор. Но стоит ли делать таблицу
предметов независимой от школ.
Также, считаю что студент и учитель являются общей сущностью человека, При создании Таблицы Человека который также не будет зависить от школы. Это позволит
приблизиться к реальности, и сделать так чтобы 1 человек не посещал 1 школы, (но при этом 1 учитель в теории может преподовать в разных школах)

    Конфигурация школы(кол-во учебных лет, сколько предметов) в реальности представлена в виде законодательства государства
