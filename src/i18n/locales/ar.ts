export default {
  skillsList: 'المهارات اللغة {{lang}}',
  loading: 'الرجاء انتظر قليلاً',
  chooseYourWay: 'اختر طريقك',
  general: {
    close: 'أغلق',
    retry: {
      title: 'حصل مشكلة في الاتصال!',
      reason: 'فشل البرنامج بالاتصال مع مخدم سوريولينجو. ' +
        'الرجاء التأكد من اتصال الجهاز بشكبة الانترنت.',
      reconnect: 'حاول الاتصال',
      cancelAndExist: 'اخرج من البرنامج',
    },
  },
  alert: {
    NETWORK_ERROR: {
      title: 'حصل خطأ في الشبكة',
      message: 'تأكد من ان جهازك متصل في الشبكة.',
    },
    UNKNOWN_ERROR: {
      title: 'حصل خطأ في الشبكة',
      message: 'تأكد من ان جهازك متصل في الشبكة.',
    },
    INTERNAL_SERVER_ERROR: {
      title: 'حصل خطأ ما في السرفر',
      message: 'لقد تم ارسال تقرير عن هذا الخطأ وسيتم اصلاحه في اسرع وقت ممكن',
    },
    TIMEOUT_ERROR: {
      title: 'حصل خطأ ما في السرفر',
      message: 'لقد تم ارسال تقرير عن هذا الخطأ وسيتم اصلاحه في اسرع وقت ممكن',
    },
  },
  levels: {
    1: 'المرحلة الأولى',
    2: 'المرحلة الثانية',
    3: 'المرحلة الثالثة',
    4: 'المرحلة الرابعة',
    5: 'المرحلة الخامسة',
    6: 'المرحلة السادسة',
    7: 'المرحلة السابعة',
    8: 'المرحلة الثامنة',
    9: 'المرحلة التاسعة',
    10: 'المرحلة العاشرة',
    11: 'المرحلة الحادية عشر',
    12: 'المرحلة الثانية عشر',
    13: 'المرحلة الثالثة عشر',
    14: 'المرحلة الرابعة عشر',
    15: 'المرحلة الخامسة عشر',
    16: 'المرحلة السادسة عشر',
  },
  skills: {
    title: 'المهارات',
    level: 'المستوى رقم: {{level}}',
    skillInactive: 'هذه المهارة غير فعالة. عليك اجتياز المهارات الفعالة أولاً.',
  },
  questions: {
    garshoni: 'جرشوني',
    help: 'مساعدة',

    submit: 'أرسل الاجابة',
    continue: 'أكمل',
    exist: {
      areYouSure: 'هل حقاً تريد الخروج؟',
      caviat: 'بخروجك سوف تخسر تقدمك الذي حققته في هذا الدرس حتى الآن!',
      ok: 'اخرج',
      cancel: 'تابع الدرس',
    },
    phraseMeaning: 'المعنى',
    translateTo: {
      'cl-ara': 'ترجم إلى العربية',
      'cl-syr': 'ترجم إلى السريانية',
      'tor-syr': 'ترجم إلى الطورانية',
    },
    dictionation: 'اكتب بالسريانية كما تسمع',
    multiChoice: 'اختر الاجابات الصحيحة',
    singleChoice: 'اختر الاجابة الصحيحة',
    evaluation: {
      passed: 'الإجابة صحيحة',
      failed: 'الإجابة خاطئة',
      correctAnswer: 'الإجابة الصحيحة:',
      youAnswered: 'إجابتك كانت:',
    },

  },
  completion: {
    congratulations: 'أحسنت! لقد اجتزت الدرس رقم {{order}} بنجاح',
    xpGain: 'لقد اكتسبت {{xp}} من نقاط الخبرة',
    backToLessons: 'تابع الدروس',
    willAllowToGoInSeconds: 'المتابعة متاحة خلال {{seconds}} ثانية',
  },
  lessons: {
    lesson: {
      title: 'الدرس {{lessonOrder}} من {{totalLessons}}',
    },
    title: 'دروس - {{skill}}',
    instruction: 'اسحب يميناً وشمالاً للتنقل بين الدروس',
    enterLesson: 'ادخل الى الدرس',
    locked: 'الدرس مقفل',
  },
  courses: {
    title: 'الدورات الدراسية',
    shortTitle: 'الدورات',
    learnLanguage: 'تعلم {{lang}}',
    forSpeakersOfLanguage: 'لمتحدثي {{lang}}',
    languages: {
      long: {
        'cl-ara': 'العربية الفصيحة',
        'cl-syr': 'اللغة السريانية الآرامية الفصيحة',
        'tor-syr': 'اللغة السريانية الآرامية باللهجة الطورانية',

      },
      short: {
        'cl-ara': 'العربية',
        'cl-syr': 'السريانية',
        'tor-syr': 'الطورانية',
      },
    },
  },
  profile: {
    title: 'تسجيل حساب سوريولينجو',
    description: 'لكي تحفظ تقدمك في الدراسة من الضياع\nيُفضّل ان تقوم بتسجيل حساب خاص.',
    signonToSave: 'تسجل حسابك لحفظ تقدمك',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    signUp: 'تسجيل حساب جديد',
    form: {
      fields: {
        email: 'الإيميل',
        name: 'الاسم',
        password: 'كلمة السر',
      },
      hints: {
        name: '',
        email: '',
        password: '',
      },
      errors: {
        name_required: 'الاسم مطلوب',
        email_required: 'البريد الالكتروني مطلوب',
        password_required: 'كلمة السر مطلوبة',
        name_invalid: 'عليك اختيار اسم مؤلف من أحرف عربية أو انكليزية',
        email_invalid: 'الإيميل غير صحيح',
        password_invalid: 'كلمة السر غير صالحة',
      },
      submit: 'أرسل',
      skip: 'سجل لاحقاً',
    },
  },


};
