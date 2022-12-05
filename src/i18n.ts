import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const storageLang = localStorage.getItem('lang')?.toLocaleLowerCase() || 'en';

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: storageLang,
  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      translation: {
        messages: {
          success: {
            name1: 'Account was created',
            name2: 'You are logged in',
            name3: 'Initial login',
            name4: 'Account deleted!',
            name5: 'Account changed!',
            name6: 'Column added',
            name7: 'Column deteted',
            name8: 'Task added',
            name9: 'Task edited',
            name10: 'Task deteted',
            name11: 'Project added',
            name12: 'Project delete',
            name13: 'Project edited',
          },
          error: {
            name1: 'Account with this login already exist',
            name2: 'Incorrect login and/or password',
            name3: 'Your token expired, please sign in again',
            name4: 'Oops something went wrong.. Try reload',
            name5: 'User with this login already exist',
            name6: 'Loading is not success',
            name7: 'Error occurred with deletion',
            name8: 'Server error! Please try again',
          },
        },
        header: {
          signin: 'Sign In',
          signoup: 'Sign Up',
          signout: 'Sign Out',
          boards: 'Projects',
          create: '+ Create project',
          edit: 'Edit Profile',
        },
        toggle: {
          working: 'working',
          done: 'done',
        },
        features: {
          maintitle: 'Save your time with RS Task',
          title1: 'Automating Tasks from Your Phone',
          text1:
            'Our application is available on any device - manage your projects from a computer, tablet or phone.',
          title2: 'No Any Limits for Every User',
          text2:
            'Unlimited number of projects, task stages and tasks themselves for every user. You have personal, fully editable list of projects with  possibility to add, edit or delete tasks, stages or full project.',
          title3: 'Manage Your Projects Easily',
          text3:
            'Simple and intuitive application interface. A convenient search among the list of all your projects will help you find any project at any time.',
        },
        about: {
          main: 'Our Team',
          title1: 'Alexey Pepelyaev',
          subtitle1: 'Team Lead',
          text1:
            'Responsible for: organizing teamwork, drag and drop and interaction with columns and tasks.',
          title2: 'Mariya Vasileva',
          subtitle2: 'Developer',
          text2:
            'Designed the layout of the application, created the main page, the page with boards, search for boards.',
          title3: 'Alexander Omelchuk',
          subtitle3: 'Developer',
          text3:
            'Created login, sign up and edit profile page, building private and public routes,  set up app localization, the sticky header with user menu and footer.',
        },
        hero: {
          title: 'Best helper for organize your work',
          desc1:
            'RS Task is a simple application gives teams everything they need to stay in sync, hit deadlines, and reach their goals. It is adaptable, flexible tool for planning and tracking work.',
          desc2: 'Organize your work in different wonderful projects with RS Task!',
          btn1: 'Start',
          btn2: 'Learn more',
        },
        team: {
          title: 'Our team',
        },
        sign: {
          title1: 'Sign In',
          title2: 'Sign Up',
          name: 'Name',
          login: 'Login',
          pass: 'Password',
          btn: 'Submit',
          already: 'If you already have an account, you can sign in here',
          noacc: 'If you do not have an account, you can sign up here',
          edit: 'Save changes',
          delete: 'Delete account',
        },
        footer: {
          alex: 'Alexander Omelchuk',
          maria: 'Mariya Vasileva',
          aleksei: 'Aleksei Pepeliaev',
        },
        popapBtn: {
          warning: 'Warning!',
          Ok: 'Ok',
          Cancel: 'Cancel',
        },
        errors: {
          pagebtn: 'To Main Page',
          empty: 'Should not be empty',
          login: 'Should contain at least 4 characters',
          pass: 'Should contain at least 6 characters',
          columnTitEmpty: 'Please, input column title',
          taskTitEmpty: 'Please, input task title',
          taskDescEmpty: 'Please, input task description',
          longtext: 'Be more concise',
        },
        boardPage: {
          title: 'Your Projects',
        },
        taskPage: {
          title: 'Project',
        },
        tasks: {
          description: 'Description',
          autor: 'Autor',
          responsibles: 'Responsible users',
          complite: 'Complite',
        },
        boards: {
          addbtn: ' Add New Project',
        },
        search: {
          search: 'Search',
          placeHolder: 'Enter Project Name...',
        },
        boardPopap: {
          createTitle: 'Add New Project',
          editTitle: 'Edit Project',
          projectTitle: 'Project Title',
          projectDesc: 'Project description',
        },
        columnPopap: {
          createTitle: 'Create column',
          editTitle: 'Edit column',
          columnTitle: 'Column title',
          columnTitlePlaceHolder: 'input column title',
        },
        taskPopap: {
          createTitle: 'Create task',
          editTitle: 'Edit task',
          taskTitle: 'Task title',
          taskDesc: 'Task description',
          responsibles: 'Responsible users',
          taskTitlePlaceHolder: 'input task title',
          taskDescPlaceHolder: 'input task description',
        },
        confirmPopap: {
          confirmMessage: 'A you sure?',
        },
        message: {
          boardcreate: 'Project added',
        },
      },
    },
    ru: {
      translation: {
        header: {
          signin: 'Войти',
          signoup: 'Регистрация',
          signout: 'Выйти',
          boards: 'Проекты',
          create: '+ Создать проект',
          edit: 'Профиль',
        },
        messages: {
          success: {
            name1: 'Учетная запись создана',
            name2: 'Вы вошли в систему',
            name3: 'Первоначальный вход в систему',
            name4: 'Аккаунт удален!',
            name5: 'Аккаунт изменен!',
            name6: 'Добавлен столбец',
            name7: 'Столбец обнаружен',
            name8: 'Задание добавлено',
            name9: 'Задание отредактировано',
            name10: 'Задача удалена',
            name11: 'Проект добавлен',
            name12: 'Удалить проект',
            name13: 'Проект отредактирован',
          },
          error: {
            name1: 'Учетная запись с таким логином уже существует',
            name2: 'Неверный логин и/или пароль',
            name3: 'Срок действия вашего токена истек, пожалуйста, войдите снова',
            name4: 'К сожалению, что-то пошло не так... Попробуйте перезагрузить',
            name5: 'Пользователь с таким логином уже существует',
            name6: 'Загрузка не удалась',
            name7: 'Произошла ошибка при удалении',
            name8: 'Ошибка сервера! Пожалуйста, попробуйте еще раз',
          },
        },
        hero: {
          title: 'Лучший помощник для организации вашей работы',
          desc1:
            'RS Task это простое приложение, которое дает командам все необходимое для синхронизации, соблюдения сроков и достижения целей. Это адаптируемый, гибкий инструмент для планирования и отслеживания работы.',
          desc2: 'Организуйте свою работу в разных замечательных проектах с RS Task!',
          btn1: 'Старт',
          btn2: 'Узнай больше',
        },
        toggle: {
          working: 'в процессе',
          done: 'сделано',
        },
        features: {
          maintitle: 'Экономьте свое время с RS Task',
          title1: 'Автоматизация Задач с Вашего Телефона',
          text1:
            'Наше приложение доступно на любом устройстве - управляйте своими проектами с компьютера, планшета или телефона.',
          title2: 'Никаких ограничений для каждого пользователя',
          text2:
            'Неограниченное количество проектов, этапов задач и самих задач для каждого пользователя. У вас есть личный, полностью редактируемый список проектов с возможностью добавления, редактирования или удаления задач, этапов или всего проекта.',
          title3: 'Управляйте Вашими Проектами Легко',
          text3:
            'Простой и интуитивно понятный интерфейс приложения. Удобный поиск среди списка всех ваших проектов поможет найти любой проект в любое время.',
        },
        about: {
          main: 'Наша команда',
          title1: 'Алексей Пепеляев',
          subtitle1: 'Тимлид',
          text1:
            'Отвечал за организацию командной работы, drag and drop and взаимодействие со столбцами и задачами.',
          title2: 'Мария Васильева',
          subtitle2: 'Разработчик',
          text2:
            'Разработала макет приложения, создал главную страницу, страницу с досками, поиск досок.',
          title3: 'Александр Омельчук',
          subtitle3: 'Разработчик',
          text3:
            'Создан страницы входа, регистрация и редактирование профиля, приватные и публичные роуты, настройка локализации приложения, стинки хэдер и футер',
        },
        sign: {
          title1: 'Войти',
          title2: 'Регистрация',
          name: 'Имя',
          login: 'Логин',
          pass: 'Пароль',
          btn: 'Отправить',
          already: 'Если у вас уже есть аккаунт, вы можеть войту тут',
          noacc: 'Если у вас нет аккаунта, вы можеть зарегистрироваться тут',
          edit: 'Сохранить изменения',
          delete: 'Удалить аккаунт',
        },
        team: {
          title: 'Наша команда',
        },
        errors: {
          pagebtn: 'На Главную Страницу',
          empty: 'Не должно быть пусто',
          login: 'Дожно быть как минимум 4 символа',
          pass: 'Дожно быть как минимум 6 символов',
          columnTitEmpty: 'Введите назавание колонки',
          taskTitEmpty: 'Введите назавание задачи',
          taskDescEmpty: 'Введите описание задачи',
          longtext: 'Будте лаконичнее',
        },
        footer: {
          alex: 'Александр Омельчук',
          maria: 'Мария Васильева',
          aleksei: 'Алексей Пепеляев',
        },
        popapBtn: {
          warning: 'Внимание!',
          Ok: 'Ок',
          Cancel: 'Отмена',
        },
        boardPage: {
          title: 'Ваши проекты',
        },
        taskPage: {
          title: 'Проект',
        },
        tasks: {
          description: 'Описание',
          autor: 'Создатель',
          responsibles: 'Ответственные лица',
          complite: 'Завершить',
        },
        boards: {
          addbtn: 'Добавить проект',
        },
        search: {
          search: 'Поиск',
          placeHolder: 'Введите название проекта...',
        },
        boardPopap: {
          createTitle: 'Создать новый проект',
          editTitle: 'Изменить проект',
          projectTitle: 'Название',
          projectDesc: 'Описание',
        },
        columnPopap: {
          createTitle: 'Создать колонку',
          editTitle: 'Изменить колонку',
          columnTitle: 'Название',
          columnTitlePlaceHolder: 'Введите название колонки',
        },
        taskPopap: {
          createTitle: 'Создать задачу',
          editTitle: 'Изменить задачу',
          taskTitle: 'Название',
          taskDesc: 'Описание',
          responsibles: 'Ответственные лица',
          taskTitlePlaceHolder: 'Введите название задачи',
          taskDescPlaceHolder: 'Введите описание задачи',
        },
        confirmPopap: {
          confirmMessage: 'Вы уверены?',
        },
        message: {
          boardcreate: 'Проект создан',
        },
      },
    },
  },
});

export default i18n;
