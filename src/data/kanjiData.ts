export interface KanjiItem {
  id: number;
  kanji: string;
  meaning: string;
  onyomi?: string;
  kunyomi?: string;
  jlpt: number;
  options: string[];
}

// Starting data with 20 common kanji
export const kanjiList: KanjiItem[] = [
  {
    id: 1,
    kanji: "日",
    meaning: "day",
    onyomi: "ニチ, ジツ",
    kunyomi: "ひ, -び, -か",
    jlpt: 5,
    options: ["day", "month", "year", "sun"]
  },
  {
    id: 2,
    kanji: "一",
    meaning: "one",
    onyomi: "イチ, イツ",
    kunyomi: "ひと-",
    jlpt: 5,
    options: ["one", "two", "three", "four"]
  },
  {
    id: 3,
    kanji: "人",
    meaning: "person",
    onyomi: "ジン, ニン",
    kunyomi: "ひと",
    jlpt: 5,
    options: ["person", "dog", "tree", "house"]
  },
  {
    id: 4,
    kanji: "大",
    meaning: "big",
    onyomi: "ダイ, タイ",
    kunyomi: "おお-",
    jlpt: 5,
    options: ["big", "small", "medium", "tall"]
  },
  {
    id: 5,
    kanji: "月",
    meaning: "month",
    onyomi: "ゲツ, ガツ",
    kunyomi: "つき",
    jlpt: 5,
    options: ["month", "day", "year", "week"]
  },
  {
    id: 6,
    kanji: "時",
    meaning: "time",
    onyomi: "ジ",
    kunyomi: "とき",
    jlpt: 5,
    options: ["time", "place", "money", "water"]
  },
  {
    id: 7,
    kanji: "百",
    meaning: "hundred",
    onyomi: "ヒャク",
    kunyomi: "もも",
    jlpt: 5,
    options: ["hundred", "thousand", "ten", "million"]
  },
  {
    id: 8,
    kanji: "名",
    meaning: "name",
    onyomi: "メイ, ミョウ",
    kunyomi: "な",
    jlpt: 5,
    options: ["name", "place", "word", "language"]
  },
  {
    id: 9,
    kanji: "水",
    meaning: "water",
    onyomi: "スイ",
    kunyomi: "みず",
    jlpt: 5,
    options: ["water", "fire", "earth", "air"]
  },
  {
    id: 10,
    kanji: "本",
    meaning: "book",
    onyomi: "ホン",
    kunyomi: "もと",
    jlpt: 5,
    options: ["book", "pen", "paper", "desk"]
  },
  {
    id: 11,
    kanji: "山",
    meaning: "mountain",
    onyomi: "サン",
    kunyomi: "やま",
    jlpt: 5,
    options: ["mountain", "river", "ocean", "valley"]
  },
  {
    id: 12,
    kanji: "川",
    meaning: "river",
    onyomi: "セン",
    kunyomi: "かわ",
    jlpt: 5,
    options: ["river", "lake", "ocean", "stream"]
  },
  {
    id: 13,
    kanji: "子",
    meaning: "child",
    onyomi: "シ, ス",
    kunyomi: "こ",
    jlpt: 5,
    options: ["child", "adult", "parent", "baby"]
  },
  {
    id: 14,
    kanji: "女",
    meaning: "woman",
    onyomi: "ジョ, ニョ",
    kunyomi: "おんな",
    jlpt: 5,
    options: ["woman", "man", "person", "girl"]
  },
  {
    id: 15,
    kanji: "男",
    meaning: "male",
    onyomi: "ダン, ナン",
    kunyomi: "おとこ",
    jlpt: 5,
    options: ["male", "female", "boy", "man"]
  },
  {
    id: 16,
    kanji: "見",
    meaning: "see",
    onyomi: "ケン",
    kunyomi: "み.る",
    jlpt: 5,
    options: ["see", "hear", "feel", "touch"]
  },
  {
    id: 17,
    kanji: "先",
    meaning: "before",
    onyomi: "セン",
    kunyomi: "さき",
    jlpt: 5,
    options: ["before", "after", "now", "later"]
  },
  {
    id: 18,
    kanji: "生",
    meaning: "life",
    onyomi: "セイ, ショウ",
    kunyomi: "い.きる, う.まれる",
    jlpt: 5,
    options: ["life", "death", "birth", "grow"]
  },
  {
    id: 19,
    kanji: "空",
    meaning: "sky",
    onyomi: "クウ",
    kunyomi: "そら, あ.く",
    jlpt: 5,
    options: ["sky", "ground", "cloud", "star"]
  },
  {
    id: 20,
    kanji: "下",
    meaning: "below",
    onyomi: "カ, ゲ",
    kunyomi: "した, さ.げる",
    jlpt: 5,
    options: ["below", "above", "middle", "side"]
  }
];

// Get random kanji for testing purposes
export const getRandomKanji = (count: number): KanjiItem[] => {
  const shuffled = [...kanjiList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Create practice set with custom options
export const createPracticeSet = (count: number): KanjiItem[] => {
  const selectedKanji = getRandomKanji(count);
  
  // For each kanji, ensure its options include meanings from other kanji to make it more challenging
  return selectedKanji.map(kanji => {
    // Keep the correct answer
    const correctAnswer = kanji.meaning;
    
    // Get random meanings from other kanji
    const otherMeanings = kanjiList
      .filter(k => k.id !== kanji.id)
      .map(k => k.meaning)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    
    // Combine and shuffle
    const allOptions = [correctAnswer, ...otherMeanings].slice(0, 6)
      .sort(() => 0.5 - Math.random());
    
    return {
      ...kanji,
      options: allOptions
    };
  });
};
