export type EgeMaterial = {
  title: string;
  url: string;
};

export type EgeTopic = {
  title: string;
  slug: string;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  materials: EgeMaterial[];
};

export type EgeBlock = {
  title: string;
  topics: EgeTopic[];
};

export type EgeSubject = {
  title: string;
  slug: string;
  description: string;
  blocks: EgeBlock[];
};

export type EgePlan = {
  title: string;
  slug: string;
  description: string;
  duration: string;
};

const emptyMaterials: EgeMaterial[] = [];

export const egeSubjects: EgeSubject[] = [
  {
    title: 'Русский язык',
    slug: 'russkiy-yazyk',
    description:
      'Цель: высокий балл за счет минимальных ошибок в тесте и идеального сочинения.',
    blocks: [
      {
        title: 'Блок 1: Нормы языка (Задания 1-3, 5-8)',
        topics: [
          {
            title: 'Орфоэпия (ударения)',
            slug: 'orfoepiya-udareniya',
            description:
              'Составь список слов из банка ФИПИ, учи по 10-15 в неделю.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Лексические нормы (паронимы)',
            slug: 'leksicheskie-normy-paronimy',
            description: 'Выучи паронимы из списка ФИПИ, практика на заданиях.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Морфологические нормы',
            slug: 'morfologicheskie-normy',
            description:
              'Склонение числительных, формы слов: правила и исключения.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Синтаксические нормы',
            slug: 'sintaksicheskie-normy',
            description:
              'Разбор ошибок: несогласованность, управление, причастный/деепричастный оборот.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 2: Орфография (Задания 4, 9-15)',
        topics: [
          {
            title: 'Правописание корней',
            slug: 'pravopisanie-korney',
            description:
              'Чередующиеся, проверяемые/непроверяемые гласные. Правила и словарные слова.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Правописание приставок',
            slug: 'pravopisanie-pristavok',
            description:
              'Неизменяемые, на з/с, пре-/при-. Правила и исключения.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Правописание суффиксов и окончаний',
            slug: 'pravopisanie-suffiksov-okoncaniy',
            description: 'Таблицы с правилами для разных частей речи.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Слитное/раздельное/дефисное написание',
            slug: 'slitno-razdelno-defisno',
            description:
              'Частые случаи: то/же/либо/нибудь, пол-/полу-.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Н/НН в разных частях речи',
            slug: 'n-nn',
            description: 'Алгоритм решения.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 3: Пунктуация (Задания 16-21)',
        topics: [
          {
            title: 'Запятая в простом и сложном предложениях',
            slug: 'zapytaya-prostoe-slozhnoe',
            description: 'Отработка базовых случаев.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Тире между подлежащим и сказуемым',
            slug: 'tire-podlezh-skaz',
            description: 'Основные правила и исключения.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Причастные и деепричастные обороты',
            slug: 'prichastnye-deeprichastnye',
            description: 'Знаки препинания и типовые ошибки.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Вводные слова и конструкции',
            slug: 'vvodnye-slova',
            description: 'Классификация и пунктуация.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Сложноподчиненное предложение',
            slug: 'spp',
            description: 'Запятые и основные виды придаточных.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Однородные члены предложения',
            slug: 'odnorodnye-chleny',
            description: 'Союзы и запятые.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title:
          'Блок 4: Текст, речь, выразительные средства (Задания 1-3, 22-26)',
        topics: [
          {
            title: 'Информационная обработка текста',
            slug: 'informacionnaya-obrabotka',
            description: 'Учись выделять главное.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Средства связи предложений',
            slug: 'sredstva-svyazi',
            description: 'Лексические и морфологические средства.',
            materials: emptyMaterials,
          },
          {
            title: 'Типы речи',
            slug: 'tipy-rechi',
            description: 'Функционально-смысловые типы.',
            materials: emptyMaterials,
          },
          {
            title: 'Лексическое значение слова',
            slug: 'leksicheskoe-znachenie',
            description: 'Синонимы, антонимы, контекст.',
            materials: emptyMaterials,
          },
          {
            title: 'Изобразительно-выразительные средства',
            slug: 'izrazi-tropy-figury',
            description: 'Тропы и фигуры речи: учи и находи в тексте.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 5: Сочинение (Задание 27)',
        topics: [
          {
            title: 'Структура сочинения',
            slug: 'sochinenie-struktura',
            description:
              'Вступление → 2 примера → проблема → позиция автора → своя позиция → заключение.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Алгоритм работы с текстом',
            slug: 'sochinenie-algoritm',
            description: 'Как быстро выявлять проблему и позицию автора.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Аргументация и банк примеров',
            slug: 'sochinenie-argumenty',
            description:
              'Литературные, исторические, жизненные аргументы по ключевым проблемам.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Комментарий к проблеме',
            slug: 'sochinenie-kommentarij',
            description: 'Анализ примера, пояснение, связь между примерами.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Клише и речевые обороты',
            slug: 'sochinenie-klishe',
            description: 'Фразы для вступления, связок и заключения.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Грамматика и логика',
            slug: 'sochinenie-grammatika',
            description: 'Проверка на речевые ошибки и логичность изложения.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
    ],
  },
  {
    title: 'Математика (Профиль)',
    slug: 'matematika-profil',
    description:
      'Цель: решить все задачи 1-й части без ошибок и набрать максимум во 2-й.',
    blocks: [
      {
        title: 'Часть 1: задачи 1-12',
        topics: [
          {
            title: 'Практическая математика (№1-5)',
            slug: 'prakticheskaya-matematika',
            description:
              'Проценты, округление, графики, прикладные задачи. Скорость и внимательность.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Алгебра (№6, 9)',
            slug: 'algebra',
            description:
              'Преобразования выражений: степенные, логарифмические, тригонометрические.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Уравнения и неравенства (№10, 12)',
            slug: 'uravneniya-neravenstva',
            description: 'Методы решения, ОДЗ.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Начала анализа (№7, 11)',
            slug: 'nachala-analiza',
            description:
              'Производная, экстремумы, монотонность. Связь графика и производной.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Геометрия (№8, 13)',
            slug: 'geometriya',
            description:
              'Планиметрия и стереометрия: теоремы и свойства фигур.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Часть 2: задачи 13-18',
        topics: [
          {
            title: '№13 Стереометрия',
            slug: 'stereometriya-13',
            description:
              'Углы и расстояния, координаты, векторы, скалярное произведение.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: '№14 Уравнение/неравенство',
            slug: 'uravnenie-14',
            description: 'Метод рационализации, разложение на множители.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: '№15 Неравенство',
            slug: 'neravenstvo-15',
            description: 'Системы неравенств, ОДЗ, равносильные преобразования.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: '№16 Планиметрия',
            slug: 'planimetriya-16',
            description:
              'Окружности, биссектрисы, медианы, высоты, синусы/косинусы, подобие.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: '№17 Экономическая задача',
            slug: 'ekonomicheskaya-17',
            description: 'Кредиты, вклады, оптимизация. Математическая модель.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: '№18 Задача с параметром',
            slug: 'parametr-18',
            description:
              'Графический и аналитический методы, типовые сюжеты.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
    ],
  },
  {
    title: 'Обществознание',
    slug: 'obshchestvoznanie',
    description:
      'Цель: системные знания по всем блокам и уверенная аргументация в эссе.',
    blocks: [
      {
        title: 'Блок 1: Человек и общество',
        topics: [
          {
            title: 'Общество как система, институты',
            slug: 'obshchestvo-sistema',
            description: 'Ключевые понятия и роли институтов.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Глобальные проблемы, типы обществ',
            slug: 'tipy-obshchestv',
            description: 'Традиционное, индустриальное, постиндустриальное.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Мышление и деятельность',
            slug: 'myshlenie-deyatelnost',
            description: 'Потребности и интересы.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Познание и истина',
            slug: 'poznanie-istina',
            description: 'Формы, методы, виды знаний, критерии истины.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
        ],
      },
      {
        title: 'Блок 2: Экономика',
        topics: [
          {
            title: 'Факторы производства и доходы',
            slug: 'faktory-proizvodstva',
            description: 'Земля, труд, капитал, предпринимательство.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Рынок: спрос, предложение, конкуренция',
            slug: 'rynok-spros-predlozhenie',
            description: 'Механизмы и графики.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Экономические системы, издержки, прибыль',
            slug: 'ekonomicheskie-sistemy',
            description: 'Типы систем и базовые понятия.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Роль государства в экономике',
            slug: 'gosudarstvo-v-ekonomike',
            description: 'Налоги, бюджет, ВВП, инфляция, безработица.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Банковская система и финрынок',
            slug: 'banki-finrynok',
            description: 'Ценные бумаги и финансовые инструменты.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Экономические задачи',
            slug: 'ekonomicheskie-zadachi',
            description: 'Проценты, кредиты, налоги.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
      {
        title: 'Блок 3: Социальные отношения',
        topics: [
          {
            title: 'Социальная стратификация и мобильность',
            slug: 'stratifikaciya',
            description: 'Критерии и типы мобильности.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Социальные группы и молодежь',
            slug: 'socialnye-gruppy',
            description: 'Роли, статусы, молодежь.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Семья и брак, этнические общности',
            slug: 'semya-brak-etnos',
            description: 'Функции семьи и особенности этносов.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Социальный контроль и девиации',
            slug: 'socialnyj-kontrol',
            description: 'Нормы, санкции, отклоняющееся поведение.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Социальный конфликт',
            slug: 'socialnyj-konflikt',
            description: 'Причины и способы разрешения.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 4: Политика',
        topics: [
          {
            title: 'Власть и политическая система',
            slug: 'vlast-politicheskaya-sistema',
            description: 'Институты и функции.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Государство и формы',
            slug: 'gosudarstvo-formy',
            description: 'Форма правления, устройство, режим.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Гражданское общество и правовое государство',
            slug: 'grazhdanskoe-obshchestvo',
            description: 'Признаки и механизмы.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Партии и избирательные системы',
            slug: 'partii-i-vybory',
            description: 'Типы партий и выборов.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Политическая элита и участие',
            slug: 'politicheskoe-uchastie',
            description: 'Формы участия и элиты.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 5: Право',
        topics: [
          {
            title: 'Теория права',
            slug: 'teoriya-prava',
            description:
              'Система права, источники, правоотношения, ответственность.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Конституционное право',
            slug: 'konstitucionnoe-pravo',
            description: 'Права и свободы, федеративное устройство, органы власти.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Отрасли права',
            slug: 'otrasli-prava',
            description:
              'Гражданское, семейное, трудовое, административное, уголовное.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Работа с правовыми текстами',
            slug: 'pravovye-teksty',
            description: 'Задания 20-21.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 6: Развернутый ответ и эссе (24-29)',
        topics: [
          {
            title: '№24 Определение понятия',
            slug: 'zadanie-24',
            description: 'Дать точное определение и 2 предложения.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: '№25 План по теме',
            slug: 'zadanie-25',
            description: 'Раскрытие смысла, теория, примеры.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: '№26/28 Конкретизация и план',
            slug: 'zadanie-26-28',
            description: 'Иллюстрации и логика плана.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: '№29 Эссе',
            slug: 'zadanie-29-esse',
            description:
              'Смысл высказывания → теория → факты → вывод. Банк примеров.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
    ],
  },
  {
    title: 'История',
    slug: 'istoriya',
    description:
      'Цель: хронология, причинно-следственные связи и работа с источниками.',
    blocks: [
      {
        title: 'Блок 1: Древность и Средневековье (до конца XVII в.)',
        topics: [
          {
            title: 'Древняя Русь и Крещение',
            slug: 'drevyannaya-rus-kreshchenie',
            description:
              'Восточные славяне, образование государства, Крещение Руси.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Удельная Русь и ордынское иго',
            slug: 'udelnaya-rus-orda',
            description: 'Нашествие и последствия.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Объединение земель вокруг Москвы',
            slug: 'moskva-obedinenie',
            description: 'Формирование единого государства.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Россия в XVI веке и Смутное время',
            slug: 'xvi-smuta',
            description: 'Иван Грозный и Смута.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Россия в XVII веке',
            slug: 'xvii-romanovy',
            description:
              'Первые Романовы, раскол, социальные движения.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 2: Россия в XVIII веке',
        topics: [
          {
            title: 'Эпоха Петра I',
            slug: 'petr-1',
            description: 'Реформы и Северная война.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Дворцовые перевороты',
            slug: 'dvortsovye-perevoroty',
            description: 'Смена правителей и особенности эпохи.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Екатерина II и Пугачев',
            slug: 'ekaterina-2',
            description: 'Просвещенный абсолютизм и восстание.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Внешняя политика XVIII века',
            slug: 'vneshnyaya-politika-18',
            description: 'Русско-турецкие войны, разделы Польши.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 3: Россия в XIX веке',
        topics: [
          {
            title: 'Александр I и 1812 год',
            slug: 'aleksandr-1-1812',
            description: 'Отечественная война и декабристы.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Николай I и общественная мысль',
            slug: 'nikolay-1',
            description: 'Крымская война, западники и славянофилы.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Великие реформы Александра II',
            slug: 'reformy-aleksandra-2',
            description: 'Отмена крепостного права и реформы.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Контрреформы и общественные движения',
            slug: 'kontrreformy-19',
            description: 'Народничество, марксизм.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Внешняя политика XIX века',
            slug: 'vneshnyaya-politika-19',
            description: 'Кавказ, Балканы, Дальний Восток.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
      {
        title: 'Блок 4: Россия в XX – начале XXI вв.',
        topics: [
          {
            title: 'Революции и реформы начала века',
            slug: 'revolyucii-1905-1917',
            description: '1905–1907, реформы Столыпина.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Первая мировая и революции 1917',
            slug: 'pervaya-mirovaya-1917',
            description: 'Февральская и Октябрьская революции.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Гражданская война и НЭП',
            slug: 'grazhdanskaya-voina-nep',
            description: 'Образование СССР.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Индустриализация и сталинизм',
            slug: 'industrializaciya-stalinizm',
            description: 'Коллективизация и репрессии.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Великая Отечественная война',
            slug: 'vov',
            description: 'Периодизация, основные сражения, тыл.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Послевоенный период и «застой»',
            slug: 'poslevoennyy-period',
            description: 'Оттепель, застой, ключевые события.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Перестройка и распад СССР',
            slug: 'perestroyka-sssr',
            description: 'Причины и последствия.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Современная Россия',
            slug: 'sovremennaya-rossiya',
            description: '1990–2000-е годы.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
      {
        title: 'Блок 5: Источники и историческое сочинение',
        topics: [
          {
            title: 'Анализ исторического источника (№20-22)',
            slug: 'istoricheskiy-istochnik',
            description: 'Автор, эпоха, цель, контекст.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Анализ ситуации/карты/культуры (№23-24)',
            slug: 'istoricheskiy-analiz',
            description: 'Памятники культуры, карты, причины и следствия.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Историческое сочинение (№25)',
            slug: 'istoricheskoe-sochinenie',
            description:
              'Структура, выбор периода, ключевые события и личности.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
    ],
  },
  {
    title: 'Физика',
    slug: 'fizika',
    description:
      'Цель: понимание физических законов и умение решать задачи.',
    blocks: [
      {
        title: 'Блок 1: Механика',
        topics: [
          {
            title: 'Кинематика и динамика',
            slug: 'kinematika-dinamika',
            description:
              'Равномерное/ускоренное движение, законы Ньютона, силы.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Статика',
            slug: 'statika',
            description: 'Момент силы, условия равновесия.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Законы сохранения',
            slug: 'zakony-sohraneniya',
            description: 'Импульс и энергия.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Колебания и волны',
            slug: 'kolebaniya-volny',
            description: 'Механические колебания, волновые процессы.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 2: Молекулярная физика и термодинамика',
        topics: [
          {
            title: 'МКТ и идеальный газ',
            slug: 'mkt-idealny-gaz',
            description: 'Уравнение состояния и основные положения.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Изопроцессы и графики',
            slug: 'izoprocessy',
            description: 'Графики и их анализ.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Внутренняя энергия и первое начало',
            slug: 'vnutrennyaya-energiya',
            description: 'Работа газа и энергия.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Тепловые машины',
            slug: 'teplovye-mashiny',
            description: 'КПД и влажность.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 3: Электродинамика',
        topics: [
          {
            title: 'Электростатика',
            slug: 'elektrostatika',
            description: 'Закон Кулона, напряженность, потенциал.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Постоянный ток',
            slug: 'postoyannyy-tok',
            description: 'Закон Ома, работа и мощность.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Магнетизм',
            slug: 'magnetizm',
            description: 'Сила Ампера и Лоренца.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Электромагнитная индукция',
            slug: 'indukciya',
            description: 'Закон Фарадея, правило Ленца.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Колебания, волны и оптика',
            slug: 'kolbaniya-optika',
            description: 'Электромагнитные колебания, геометрическая и волновая оптика.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
        ],
      },
      {
        title: 'Блок 4: Квантовая и ядерная физика',
        topics: [
          {
            title: 'Фотоэффект',
            slug: 'fotoeffekt',
            description: 'Уравнение Эйнштейна.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Атом и спектры',
            slug: 'atom-spektry',
            description: 'Планетарная модель и спектры.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Радиоактивность',
            slug: 'radioaktivnost',
            description: 'Закон распада.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Ядерные реакции',
            slug: 'yadernye-reakcii',
            description: 'Энергия связи.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
      {
        title: 'Блок 5: Решение задач',
        topics: [
          {
            title: 'Качественные задачи (№1-4, 21-23)',
            slug: 'kachestvennye-zadachi',
            description: 'Понимание теории и объяснение явлений.',
            materials: emptyMaterials,
            difficulty: 'easy',
          },
          {
            title: 'Расчетные задачи базового уровня',
            slug: 'raschetnye-zadachi-baza',
            description: 'Оттачивание формул и алгоритмов.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
          {
            title: 'Сложные задачи: механика',
            slug: 'slozhnye-zadachi-mehanika',
            description: 'Комбинированные задачи на динамику и сохранение.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Сложные задачи: МКТ/термодинамика',
            slug: 'slozhnye-zadachi-mkt',
            description: 'Графики и первое начало термодинамики.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Сложные задачи: электродинамика',
            slug: 'slozhnye-zadachi-elektro',
            description: 'Частицы в полях, цепи, индукция.',
            materials: emptyMaterials,
            difficulty: 'hard',
          },
          {
            title: 'Сложные задачи: квантовая/ядерная',
            slug: 'slozhnye-zadachi-kvant',
            description: 'Фотоэффект и ядерные реакции.',
            materials: emptyMaterials,
            difficulty: 'medium',
          },
        ],
      },
    ],
  },
];

export const egePlans: EgePlan[] = [
  {
    title: 'Интенсив на 3 месяца',
    slug: 'intensive-3',
    description: 'Подойдет, если базовые знания уже есть.',
    duration: '3 месяца',
  },
  {
    title: 'Стандарт на 6 месяцев',
    slug: 'standard-6',
    description: 'Самый сбалансированный формат подготовки.',
    duration: '6 месяцев',
  },
  {
    title: 'Длинный план на 12 месяцев',
    slug: 'long-12',
    description: 'Подготовка с нуля и без спешки.',
    duration: '12 месяцев',
  },
];

export const egeSubjectsBySlug = new Map(
  egeSubjects.map((subject) => [subject.slug, subject]),
);

export function getEgeSubjectTopics(subject: EgeSubject): EgeTopic[] {
  return subject.blocks.flatMap((block) => block.topics);
}
