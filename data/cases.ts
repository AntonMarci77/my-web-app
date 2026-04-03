export interface Examination {
  id: string;
  name: string;
  result: string;
  isRelevant: boolean;
}

export interface ClinicalCase {
  id: number;
  title: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  patient: {
    age: number;
    gender: string;
    occupation: string;
  };
  chiefComplaint: string;
  history: string;
  symptoms: string[];
  examinations: Examination[];
  diagnosisOptions: string[];
  correctDiagnosis: string;
  explanation: string;
}

export const cases: ClinicalCase[] = [
  {
    id: 1,
    title: "Bolesti dolnej časti chrbta",
    category: "Chrbtice",
    difficulty: "medium",
    patient: { age: 35, gender: "Muž", occupation: "Skladník" },
    chiefComplaint: "Vystreľujúca bolesť z dolnej časti chrbta do ľavej nohy",
    history:
      "Pacient popisuje náhly nástup bolesti pred 2 týždňami po zdvihnutí ťažkého predmetu. Bolesť sa zhoršuje pri sedení a predklone. Pociťuje tŕpnutie v ľavom lýtku a chodidle.",
    symptoms: [
      "Vystreľujúca bolesť do ľavej dolnej končatiny",
      "Tŕpnutie v oblasti L5-S1 dermatómu",
      "Zhoršenie pri sedení a Valsalvovom manévri",
      "Antalgické držanie tela",
      "Obmedzená flexia chrbtice",
    ],
    examinations: [
      {
        id: "slr",
        name: "Lasègueov test (SLR)",
        result:
          "Pozitívny na ľavej strane pri 30° - reprodukuje vystreľujúcu bolesť do nohy",
        isRelevant: true,
      },
      {
        id: "neuro",
        name: "Neurologické vyšetrenie dolných končatín",
        result:
          "Oslabený reflex Achillovej šľachy vľavo, znížená citlivosť na laterálnej strane chodidla",
        isRelevant: true,
      },
      {
        id: "rom_spine",
        name: "Rozsah pohybu chrbtice",
        result:
          "Flexia výrazne obmedzená (30%), extenzia mierne obmedzená, laterálna flexia vľavo bolestivá",
        isRelevant: true,
      },
      {
        id: "palpation_spine",
        name: "Palpácia paravertebrálnych svalov",
        result: "Výrazný spazmus paravertebrálnych svalov v oblasti L4-S1 vľavo",
        isRelevant: true,
      },
      {
        id: "shoulder_test",
        name: "Vyšetrenie ramenného kĺbu",
        result: "Plný rozsah pohybu, bez bolesti",
        isRelevant: false,
      },
      {
        id: "knee_test",
        name: "Vyšetrenie kolenného kĺbu",
        result: "Stabilné, bez výpotku, plný rozsah pohybu",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Hernia disku L5-S1 s radikulopatiou",
      "Lumbálna spinálna stenóza",
      "Svalový spazmus bedrovej chrbtice",
      "Sakroiliakálna dysfunkcia",
    ],
    correctDiagnosis: "Hernia disku L5-S1 s radikulopatiou",
    explanation:
      "Pozitívny Lasègueov test, dermatomálne tŕpnutie, oslabený Achillov reflex a mechanizmus úrazu (zdvíhanie ťažkého bremena) jasne poukazujú na herniu disku s kompresiou nervového koreňa S1. Radikulárny vzorec bolesti a neurologické nálezy sú kľúčové pre túto diagnózu.",
  },
  {
    id: 2,
    title: "Zmrazené rameno",
    category: "Horná končatina",
    difficulty: "medium",
    patient: { age: 52, gender: "Žena", occupation: "Učiteľka" },
    chiefComplaint: "Progresívne obmedzenie pohybu v pravom ramene s bolesťou",
    history:
      "Pacientka udáva postupný nástup bolesti a tuhosti pravého ramena pred 4 mesiacmi. Nedokáže si česať vlasy ani zapnúť podprsenku. Bolesť je najhoršia v noci. Anamnéza diabetes mellitus 2. typu.",
    symptoms: [
      "Progresívne obmedzenie aktívneho aj pasívneho pohybu",
      "Nočná bolesť rušiaca spánok",
      "Neschopnosť vykonávať bežné denné činnosti",
      "Kapsulárny vzorec obmedzenia (ZR > ABD > VR)",
      "Diabetes mellitus v anamnéze",
    ],
    examinations: [
      {
        id: "rom_shoulder",
        name: "Rozsah pohybu ramena (aktívny + pasívny)",
        result:
          "Aktívna aj pasívna vonkajšia rotácia: 15° (norma 90°), abdukcia: 70° (norma 180°), vnútorná rotácia: 30° (norma 70°). Kapsulárny vzorec obmedzenia.",
        isRelevant: true,
      },
      {
        id: "empty_can",
        name: "Empty Can test (Jobe test)",
        result:
          "Nemožno plne vyšetriť kvôli obmedzenému rozsahu pohybu, ale sila supraspinatu sa javí zachovaná",
        isRelevant: true,
      },
      {
        id: "palpation_shoulder",
        name: "Palpácia ramenného kĺbu",
        result:
          "Difúzna citlivosť okolo glenohumerálneho kĺbu, bez lokálnej bolestivosti šliach",
        isRelevant: true,
      },
      {
        id: "cervical_screen",
        name: "Skríning krčnej chrbtice",
        result: "Plný rozsah pohybu krčnej chrbtice, bez radikulárnych príznakov",
        isRelevant: true,
      },
      {
        id: "ankle_test",
        name: "Vyšetrenie členkového kĺbu",
        result: "Normálny nález",
        isRelevant: false,
      },
      {
        id: "hip_test",
        name: "Vyšetrenie bedrového kĺbu",
        result: "Plný rozsah pohybu, bez bolesti",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Adhezívna kapsulitída (zmrazené rameno)",
      "Ruptúra rotátorovej manžety",
      "Subakromiálny impingement syndróm",
      "Cervikálna radikulopatia C5",
    ],
    correctDiagnosis: "Adhezívna kapsulitída (zmrazené rameno)",
    explanation:
      "Kapsulárny vzorec obmedzenia (vonkajšia rotácia > abdukcia > vnútorná rotácia), obmedzenie aktívneho aj pasívneho pohybu, postupný nástup a diabetes v anamnéze sú typické pre adhezívnu kapsulitídu. Na rozdiel od impingementu, kde je pasívny pohyb zachovaný, tu je obmedzený aj pasívny pohyb.",
  },
  {
    id: 3,
    title: "Syndróm karpálneho tunela",
    category: "Horná končatina",
    difficulty: "easy",
    patient: { age: 45, gender: "Žena", occupation: "Účtovníčka" },
    chiefComplaint: "Tŕpnutie a mravčenie v prstoch pravej ruky",
    history:
      "Pacientka popisuje tŕpnutie a mravčenie v palci, ukazováku a prostredníku pravej ruky, trvajúce 3 mesiace. Príznaky sa zhoršujú v noci a pri práci s počítačom. Občas jej veci vypadávajú z ruky.",
    symptoms: [
      "Tŕpnutie a parestézie v oblasti n. medianus",
      "Nočné prebúdzanie kvôli symptómom",
      "Oslabenie úchopu",
      "Zhoršenie pri opakovaných pohyboch zápästia",
      "Príznaky prítomné 3 mesiace",
    ],
    examinations: [
      {
        id: "phalen",
        name: "Phalenov test",
        result:
          "Pozitívny - reprodukcia tŕpnutia v palci, ukazováku a prostredníku do 20 sekúnd",
        isRelevant: true,
      },
      {
        id: "tinel",
        name: "Tinelov znak na zápästí",
        result:
          "Pozitívny - vystreľujúce mravčenie do palca a ukazováka pri poklepe na karpálny tunel",
        isRelevant: true,
      },
      {
        id: "grip_strength",
        name: "Dynamometria - sila úchopu",
        result:
          "Pravá ruka: 15 kg, ľavá ruka: 25 kg. Výrazná asymetria v neprospech dominantnej ruky.",
        isRelevant: true,
      },
      {
        id: "sensory_hand",
        name: "Vyšetrenie citlivosti ruky",
        result:
          "Znížená citlivosť na dotyky v oblasti palca, ukazováka a radiálnej strany prostredníka. Malíček a ulnárna strana bez zmien.",
        isRelevant: true,
      },
      {
        id: "elbow_test",
        name: "Vyšetrenie lakťového kĺbu",
        result: "Plný rozsah pohybu, stabilný, bez bolesti",
        isRelevant: false,
      },
      {
        id: "cervical_test",
        name: "Spurlingov test krčnej chrbtice",
        result: "Negatívny bilaterálne",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Syndróm karpálneho tunela",
      "Cervikálna radikulopatia C6",
      "Syndróm kubitálneho tunela",
      "De Quervainova tenosynovitída",
    ],
    correctDiagnosis: "Syndróm karpálneho tunela",
    explanation:
      "Pozitívny Phalenov test a Tinelov znak, distribúcia symptómov v oblasti n. medianus (palec, ukazovák, prostredník), nočné zhoršovanie a pracovná anamnéza sú klasickými príznakmi syndrómu karpálneho tunela. Negatívny Spurlingov test vylučuje cervikálnu príčinu.",
  },
  {
    id: 4,
    title: "Poranenie predného skríženého väzu",
    category: "Dolná končatina",
    difficulty: "medium",
    patient: { age: 22, gender: "Muž", occupation: "Študent / futbalista" },
    chiefComplaint:
      "Opuch a nestabilita pravého kolena po úraze pri futbale",
    history:
      'Pacient udáva rotačný úraz pravého kolena pred 3 dňami počas futbalového zápasu. Počul "prasknutie", okamžite nemohol pokračovať v hre. Koleno opuchlo do 2 hodín. Pociťuje nestabilitu pri chôdzi.',
    symptoms: [
      'Počuteľné "prasknutie" pri úraze',
      "Rýchly nástup opuchu (do 2 hodín)",
      "Pocit nestability - koleno sa podlamuje",
      "Rotačný mechanizmus úrazu",
      "Neschopnosť plne zaťažiť končatinu",
    ],
    examinations: [
      {
        id: "lachman",
        name: "Lachmanov test",
        result:
          "Pozitívny - výrazná predná translukcia tíbie voči femuru s mäkkým konečným pocitom (soft end-feel)",
        isRelevant: true,
      },
      {
        id: "anterior_drawer",
        name: "Test predného zásuvkového príznaku",
        result:
          "Pozitívny - zvýšená predná translukcia v porovnaní s kontralaterálnou stranou",
        isRelevant: true,
      },
      {
        id: "pivot_shift",
        name: "Pivot shift test",
        result:
          "Pozitívny - palpovateľný posun pri extenzii s valgóznym a rotačným stresom",
        isRelevant: true,
      },
      {
        id: "mcmurray",
        name: "McMurrayov test",
        result: "Negatívny bilaterálne, bez klikania alebo bolesti",
        isRelevant: true,
      },
      {
        id: "valgus_stress",
        name: "Valgózny stresový test",
        result: "Stabilný pri 0° aj 30° flexie",
        isRelevant: true,
      },
      {
        id: "wrist_test",
        name: "Vyšetrenie zápästia",
        result: "Normálny nález",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Ruptúra predného skríženého väzu (ACL)",
      "Ruptúra mediálneho menisku",
      "Poranenie mediálneho kolaterálneho väzu (MCL)",
      "Patellárna luxácia",
    ],
    correctDiagnosis: "Ruptúra predného skríženého väzu (ACL)",
    explanation:
      'Trojica pozitívnych testov (Lachman, predný zásuvkový príznak, pivot shift), rotačný mechanizmus úrazu, počuteľné "prasknutie" a rýchly nástup opuchu (hemartróza) sú klasickými príznakmi ruptúry ACL. Negatívny McMurrayov test znižuje pravdepodobnosť poranenia menisku.',
  },
  {
    id: 5,
    title: "Plantárna fascitída",
    category: "Dolná končatina",
    difficulty: "easy",
    patient: { age: 48, gender: "Žena", occupation: "Predavačka" },
    chiefComplaint: "Ostrá bolesť päty pri prvých krokoch ráno",
    history:
      "Pacientka popisuje bolesť pravej päty trvajúcu 2 mesiace. Bolesť je najhoršia pri prvých krokoch ráno a po dlhom státí v práci. Nedávno začala s behom. BMI 28.",
    symptoms: [
      "Ostrá bolesť päty pri prvých krokoch ráno",
      "Bolesť po dlhom státí alebo chôdzi",
      "Postupný nástup bez úrazu",
      "Lokalizácia bolesti na mediálnom výbežku calcaneu",
      "Zlepšenie po rozhýbaní, zhoršenie ku koncu dňa",
    ],
    examinations: [
      {
        id: "palpation_heel",
        name: "Palpácia mediálneho výbežku calcaneu",
        result:
          "Výrazná bodová bolestivosť na mediálnom výbežku pätovej kosti v mieste úponu plantárnej fascie",
        isRelevant: true,
      },
      {
        id: "windlass",
        name: "Windlass test",
        result:
          "Pozitívny - pasívna dorzálna flexia palca reprodukuje bolesť v oblasti päty",
        isRelevant: true,
      },
      {
        id: "ankle_rom",
        name: "Rozsah pohybu členkového kĺbu",
        result:
          "Obmedzená dorzálna flexia členka (5° vpravo vs. 15° vľavo), skrátený m. gastrocnemius",
        isRelevant: true,
      },
      {
        id: "foot_posture",
        name: "Vyšetrenie postúry nohy",
        result:
          "Mierna pronácia pravej nohy, znížená mediálna pozdĺžna klenba v stoji",
        isRelevant: true,
      },
      {
        id: "knee_ligaments",
        name: "Vyšetrenie väzov kolena",
        result: "Stabilné, bez patológie",
        isRelevant: false,
      },
      {
        id: "hip_rom",
        name: "Rozsah pohybu bedrového kĺbu",
        result: "Plný rozsah pohybu bilaterálne",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Plantárna fascitída",
      "Stresová fraktúra calcaneu",
      "Tarzálny tunelový syndróm",
      "Achillova tendinopatia",
    ],
    correctDiagnosis: "Plantárna fascitída",
    explanation:
      "Typická ranná bolesť pri prvých krokoch, bodová bolestivosť na mediálnom výbežku calcaneu, pozitívny Windlass test a rizikové faktory (zvýšená záťaž - začiatok behu, práca v stoji, BMI) sú diagnostické pre plantárnu fascitídu. Obmedzená dorzálna flexia členka je častým predisponujúcim faktorom.",
  },
  {
    id: 6,
    title: "Cervikálna radikulopatia",
    category: "Chrbtice",
    difficulty: "hard",
    patient: { age: 55, gender: "Muž", occupation: "IT programátor" },
    chiefComplaint:
      "Vystreľujúca bolesť z krku do pravej ruky s tŕpnutím prstov",
    history:
      "Pacient udáva postupný nástup bolesti krku s vystreľovaním do pravej hornej končatiny pred 3 týždňami. Tŕpnutie v ukazováku a prostredníku. Bolesť sa zhoršuje pri záklone hlavy. Sedavé zamestnanie, pracuje za počítačom 10+ hodín denne.",
    symptoms: [
      "Vystreľujúca bolesť z krku do pravej hornej končatiny",
      "Tŕpnutie v ukazováku a prostredníku (dermatóm C7)",
      "Zhoršenie pri extenzii a rotácii krčnej chrbtice",
      "Oslabenie extenzie zápästia",
      "Protrahované držanie hlavy",
    ],
    examinations: [
      {
        id: "spurling",
        name: "Spurlingov test",
        result:
          "Pozitívny vpravo - kompresia a rotácia reprodukujú vystreľujúcu bolesť do pravej ruky",
        isRelevant: true,
      },
      {
        id: "upper_limb_tension",
        name: "Upper Limb Tension Test (ULTT) - n. medianus",
        result:
          "Pozitívny vpravo - reprodukuje vystreľujúcu bolesť a tŕpnutie pri pridaní krčnej laterálnej flexie",
        isRelevant: true,
      },
      {
        id: "cervical_rom",
        name: "Rozsah pohybu krčnej chrbtice",
        result:
          "Extenzia obmedzená na 50% s bolesťou, pravá rotácia obmedzená na 60%, ostatné smery mierne obmedzené",
        isRelevant: true,
      },
      {
        id: "reflex_upper",
        name: "Šľachovo-okosticové reflexy horných končatín",
        result:
          "Oslabený tricepsový reflex (C7) vpravo, bicepsový a brachioradiálny reflexy symetrické",
        isRelevant: true,
      },
      {
        id: "thoracic_test",
        name: "Vyšetrenie hrudnej chrbtice",
        result: "Zvýšená kyfóza, obmedzená extenzia, ale bez bolesti",
        isRelevant: false,
      },
      {
        id: "sacroiliac_test",
        name: "Vyšetrenie SI kĺbu",
        result: "Negatívne provokačné testy",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Cervikálna radikulopatia C7",
      "Syndróm karpálneho tunela",
      "Thoracic Outlet Syndróm",
      "Cervikálna myelopatia",
    ],
    correctDiagnosis: "Cervikálna radikulopatia C7",
    explanation:
      "Pozitívny Spurlingov test, dermatomálna distribúcia (C7 - ukazovák, prostredník), oslabený tricepsový reflex, pozitívny ULTT a zhoršenie pri extenzii krčnej chrbtice potvrdzujú cervikálnu radikulopatiu na úrovni C7. Spurlingov test má vysokú špecificitu pre cervikálnu radikulopatiu.",
  },
  {
    id: 7,
    title: "Tenisový lakeť",
    category: "Horná končatina",
    difficulty: "easy",
    patient: { age: 40, gender: "Muž", occupation: "Maliar" },
    chiefComplaint: "Bolesť na vonkajšej strane pravého lakťa",
    history:
      "Pacient popisuje bolesť na laterálnej strane pravého lakťa trvajúcu 6 týždňov. Bolesť sa zhoršuje pri uchopovaní predmetov a otáčaní kľučky. Pracuje ako maliar, vykonáva opakované pohyby zápästia.",
    symptoms: [
      "Bolesť na laterálnom epikondyle",
      "Bolesť pri uchopovaní a zdvíhaní predmetov",
      "Oslabený úchop",
      "Bolesť pri extenzii zápästia proti odporu",
      "Opakované pohyby zápästia v anamnéze",
    ],
    examinations: [
      {
        id: "cozen",
        name: "Cozenov test",
        result:
          "Pozitívny - bolesť na laterálnom epikondyle pri odporovanej extenzii zápästia so zaťatou päsťou",
        isRelevant: true,
      },
      {
        id: "mill",
        name: "Millov test",
        result:
          "Pozitívny - bolesť na laterálnom epikondyle pri pasívnej flexii zápästia s extendovaným lakťom",
        isRelevant: true,
      },
      {
        id: "palpation_elbow",
        name: "Palpácia laterálneho epikondylu",
        result:
          "Výrazná bodová bolestivosť na laterálnom epikondyle a úpone extenzory zápästia",
        isRelevant: true,
      },
      {
        id: "grip_dynamometry",
        name: "Dynamometria úchopu",
        result:
          "Pravá ruka: 20 kg, ľavá ruka: 35 kg. Bolesť pri meraní na pravej strane.",
        isRelevant: true,
      },
      {
        id: "shoulder_screen",
        name: "Skríning ramenného kĺbu",
        result: "Bez patológie",
        isRelevant: false,
      },
      {
        id: "wrist_special",
        name: "Finkelsteinov test",
        result: "Negatívny",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Laterálna epikondylitída (tenisový lakeť)",
      "Radiálny tunelový syndróm",
      "Cervikálna radikulopatia C6",
      "Osteoartróza lakťového kĺbu",
    ],
    correctDiagnosis: "Laterálna epikondylitída (tenisový lakeť)",
    explanation:
      "Pozitívny Cozenov a Millov test, bodová bolestivosť na laterálnom epikondyle, bolesť pri odporovanej extenzii zápästia a pracovná anamnéza s opakovanými pohybmi sú diagnostickými kritériami pre laterálnu epikondylitídu. Negatívny Finkelsteinov test vylučuje De Quervainovu tenosynovitídu.",
  },
  {
    id: 8,
    title: "Patellofemorálny syndróm",
    category: "Dolná končatina",
    difficulty: "medium",
    patient: { age: 19, gender: "Žena", occupation: "Študentka / bežkyňa" },
    chiefComplaint:
      "Bolesť okolo jabĺčka pri chôdzi po schodoch a kľakaní",
    history:
      "Pacientka popisuje postupný nástup bolesti okolo pravého jabĺčka pred 2 mesiacmi. Bolesť sa zhoršuje pri chôdzi po schodoch (najmä schodov), kľakaní a dlhom sedení. Beží 30 km týždenne. Nedávno zvýšila tréningový objem.",
    symptoms: [
      "Predná bolesť kolena okolo patelly",
      'Bolesť pri dlhom sedení ("cinema sign")',
      "Zhoršenie pri chôdzi po schodoch (najmä nadol)",
      "Krepitus pri pohybe kolena",
      "Nedávne zvýšenie tréningovej záťaže",
    ],
    examinations: [
      {
        id: "clarke",
        name: "Clarkov test (patellar grind test)",
        result:
          "Pozitívny - bolesť a nepríjemný pocit pri kompresii patelly a kontrakcii quadricepsu",
        isRelevant: true,
      },
      {
        id: "patellar_tilt",
        name: "Test patelárneho tiltu a glidu",
        result:
          "Laterálny tilt patelly, obmedzená mediálna mobilita, mierna laterálna hypermobilita",
        isRelevant: true,
      },
      {
        id: "squat_assessment",
        name: "Funkčné hodnotenie - drepovanie",
        result:
          "Mediálny kolaps kolena (valgózna pozícia) pri jednostrannom drepe, bolesť pri 60° flexie",
        isRelevant: true,
      },
      {
        id: "vmo_strength",
        name: "Sila m. vastus medialis obliquus (VMO)",
        result:
          "Oslabený VMO vpravo v porovnaní s ľavou stranou, oneskorená aktivácia pri extenzii kolena",
        isRelevant: true,
      },
      {
        id: "mcmurray2",
        name: "McMurrayov test",
        result: "Negatívny bilaterálne",
        isRelevant: false,
      },
      {
        id: "ankle_lig",
        name: "Vyšetrenie väzov členkového kĺbu",
        result: "Stabilné bilaterálne",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Patellofemorálny bolestivý syndróm",
      "Poranenie mediálneho menisku",
      "Chondromalácia patelly",
      "Osgood-Schlatterova choroba",
    ],
    correctDiagnosis: "Patellofemorálny bolestivý syndróm",
    explanation:
      "Typická predná bolesť kolena, pozitívny Clarkov test, laterálny patelárny malalignment, oslabený VMO, dynamický valgus pri drepe a súvislosť s preťažením sú charakteristické pre patellofemorálny syndróm. Cinema sign a zhoršenie pri schodoch sú patognomické.",
  },
  {
    id: 9,
    title: "Tendinopatia rotátorovej manžety",
    category: "Horná končatina",
    difficulty: "medium",
    patient: { age: 58, gender: "Muž", occupation: "Stavbyvedúci" },
    chiefComplaint: "Bolesť v pravom ramene pri zdvíhaní ruky nad hlavu",
    history:
      "Pacient popisuje bolesť v pravom ramene pri aktivitách nad hlavou, trvajúcu 2 mesiace. Bolestivý oblúk pri abdukcii 60-120°. Pracuje na stavbách, často zdvíha ťažké predmety. Bolesť interferuje s prácou.",
    symptoms: [
      "Bolestivý oblúk (painful arc) pri 60-120° abdukcie",
      "Bolesť pri aktivitách nad hlavou",
      "Nočná bolesť pri ležaní na postihnutom ramene",
      "Zachovaný pasívny rozsah pohybu",
      "Bolesť vystreľujúca do deltového svalu",
    ],
    examinations: [
      {
        id: "empty_can2",
        name: "Empty Can test (Jobe test)",
        result:
          "Pozitívny - bolesť a mierné oslabenie pri odporovanej abdukcii v skapulárnej rovine s vnútornou rotáciou",
        isRelevant: true,
      },
      {
        id: "hawkins",
        name: "Hawkins-Kennedy test",
        result:
          "Pozitívny - bolesť pri pasívnej vnútornej rotácii v 90° flexii ramena",
        isRelevant: true,
      },
      {
        id: "neer",
        name: "Neer impingement test",
        result:
          "Pozitívny - bolesť pri pasívnej flexii ramena so stabilizovanou scapulou",
        isRelevant: true,
      },
      {
        id: "rom_shoulder2",
        name: "Rozsah pohybu ramena",
        result:
          "Aktívna abdukcia bolestivá v oblúku 60-120°, pasívny rozsah pohybu plný, bolestivý oblúk zachovaný",
        isRelevant: true,
      },
      {
        id: "speed_test",
        name: "Speedov test (dlhá hlava bicepsu)",
        result: "Negatívny",
        isRelevant: false,
      },
      {
        id: "lumbar_screen",
        name: "Skríning bedrovej chrbtice",
        result: "Bez patológie",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Tendinopatia rotátorovej manžety (supraspinatus)",
      "Adhezívna kapsulitída",
      "Akromioklavikulárna osteoartróza",
      "Tendinopatia dlhej hlavy bicepsu",
    ],
    correctDiagnosis: "Tendinopatia rotátorovej manžety (supraspinatus)",
    explanation:
      "Pozitívny Empty Can test identifikuje supraspinatus, pozitívne impingement testy (Hawkins, Neer), bolestivý oblúk pri zachovanom pasívnom rozsahu pohybu a pracovná anamnéza s opakovanými aktivitami nad hlavou potvrdzujú diagnózu tendinopatie rotátorovej manžety. Plný pasívny ROM vylučuje adhezívnu kapsulitídu.",
  },
  {
    id: 10,
    title: "Ankylozujúca spondylitída",
    category: "Chrbtice",
    difficulty: "hard",
    patient: { age: 28, gender: "Muž", occupation: "Grafický dizajnér" },
    chiefComplaint:
      "Chronická ranná stuhnutosť a bolesť dolnej časti chrbta",
    history:
      'Pacient popisuje postupnú bolesť dolnej časti chrbta a stuhnutosť trvajúcu viac ako 1 rok. Ranná stuhnutosť trvá viac ako 30 minút a zlepšuje sa pohybom. Bolesť je horšia v pokoji a v noci. Pozitívna rodinná anamnéza - otec má "problémy s chrbtom".',
    symptoms: [
      "Ranná stuhnutosť > 30 minút",
      "Zápalová bolesť chrbta (zlepšuje sa pohybom)",
      "Insidózny nástup pred 25. rokom života",
      "Nočná bolesť (druhá polovica noci)",
      "Pozitívna rodinná anamnéza",
    ],
    examinations: [
      {
        id: "schober",
        name: "Modifikovaný Schoberov test",
        result:
          "Pozitívny - expanzia len 2 cm (norma > 5 cm), výrazne obmedzená flexia bedrovej chrbtice",
        isRelevant: true,
      },
      {
        id: "si_provocation",
        name: "Provokačné testy SI kĺbu (FABER, kompresia, distrakcia)",
        result:
          "FABER test pozitívny bilaterálne, kompresia a distrakcia pozitívne - bolesť v oblasti SI kĺbov",
        isRelevant: true,
      },
      {
        id: "chest_expansion",
        name: "Meranie expanzie hrudníka",
        result:
          "Expanzia hrudníka: 2.5 cm (norma > 5 cm). Obmedzená pohyblivosť hrudnej chrbtice.",
        isRelevant: true,
      },
      {
        id: "posture_assessment",
        name: "Hodnotenie postúry",
        result:
          "Zvýšená hrudná kyfóza, oploštená bedrová lordóza, protrakcia hlavy",
        isRelevant: true,
      },
      {
        id: "slr2",
        name: "Lasègueov test",
        result: "Negatívny bilaterálne",
        isRelevant: false,
      },
      {
        id: "knee_exam",
        name: "Vyšetrenie kolenných kĺbov",
        result: "Bez patológie",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Ankylozujúca spondylitída",
      "Mechanická bolesť dolnej časti chrbta",
      "Hernia disku",
      "Degeneratívne ochorenie disku",
    ],
    correctDiagnosis: "Ankylozujúca spondylitída",
    explanation:
      "Zápalový charakter bolesti (ranná stuhnutosť > 30 min, zlepšenie pohybom, nočná bolesť), pozitívny Schoberov test, bilaterálna sakroiliitída (FABER test), obmedzená expanzia hrudníka, nástup pred 25. rokom a pozitívna rodinná anamnéza spĺňajú kritériá pre ankylozujúcu spondylitídu.",
  },
  {
    id: 11,
    title: "Thoracic Outlet Syndróm",
    category: "Horná končatina",
    difficulty: "hard",
    patient: { age: 30, gender: "Žena", occupation: "Hudobníčka (huslistka)" },
    chiefComplaint:
      "Tŕpnutie a slabosť v pravej ruke pri hre na husle",
    history:
      "Pacientka popisuje tŕpnutie, mravčenie a slabosť pravej ruky a predlaktia, objavujúce sa najmä pri hre na husle a pri aktivitách s rukami nad hlavou. Príznaky trvajú 4 mesiace. Občas pozoruje blednutie prstov.",
    symptoms: [
      "Tŕpnutie a parestézie v celej ruke (nie dermatomálne)",
      "Príznaky pri elevácii horných končatín",
      "Slabosť ruky pri aktivitách nad hlavou",
      "Občasné vaskulárne zmeny (blednutie prstov)",
      "Súvislosť s opakovanými pohybmi a pozíciou HK",
    ],
    examinations: [
      {
        id: "adson",
        name: "Adsonov test",
        result:
          "Pozitívny vpravo - oslabenie pulzu na a. radialis pri rotácii hlavy k postihnutej strane s hlbokým nádychom",
        isRelevant: true,
      },
      {
        id: "roos",
        name: "Roosov test (EAST - elevated arm stress test)",
        result:
          "Pozitívny - reprodukcia symptómov a únava ruky do 60 sekúnd pri opakovanom otvráraní a zatvráraní päste s abdukovanými ramenami",
        isRelevant: true,
      },
      {
        id: "scalene_palpation",
        name: "Palpácia skalenových svalov",
        result:
          "Výrazná citlivosť a spazmis skalenových svalov vpravo, reprodukcia vystreľujúcich parestézií do ruky",
        isRelevant: true,
      },
      {
        id: "cervical_rom2",
        name: "Rozsah pohybu krčnej chrbtice",
        result:
          "Mierne obmedzená laterálna flexia bilaterálne, ostatné pohyby plné",
        isRelevant: true,
      },
      {
        id: "phalen2",
        name: "Phalenov test",
        result: "Negatívny bilaterálne",
        isRelevant: false,
      },
      {
        id: "lumbar_test",
        name: "Vyšetrenie bedrovej chrbtice",
        result: "Bez patológie",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Thoracic Outlet Syndróm (TOS)",
      "Cervikálna radikulopatia",
      "Syndróm karpálneho tunela",
      "Raynaudov syndróm",
    ],
    correctDiagnosis: "Thoracic Outlet Syndróm (TOS)",
    explanation:
      "Pozitívny Adsonov test a Roosov test, nedermatomálna distribúcia symptómov (celá ruka), vaskulárne zmeny (blednutie), spazmus skalenových svalov a súvislosť s pozíciou HK nad hlavou sú typické pre TOS. Negatívny Phalenov test vylučuje syndróm karpálneho tunela.",
  },
  {
    id: 12,
    title: "Achillova tendinopatia",
    category: "Dolná končatina",
    difficulty: "easy",
    patient: { age: 38, gender: "Muž", occupation: "Rekreačný bežec" },
    chiefComplaint: "Bolesť Achillovej šľachy pri behu a chôdzi po schodoch",
    history:
      "Pacient popisuje postupný nástup bolesti v oblasti Achillovej šľachy pravej nohy pred 6 týždňami. Beží 40 km týždenne, nedávno pridal intervalový tréning. Bolesť je najhoršia na začiatku behu, po rozbehnutí sa mierne zlepší. Ranná stuhnutosť šľachy.",
    symptoms: [
      "Bolesť 2-6 cm nad úponom Achillovej šľachy",
      "Ranná stuhnutosť šľachy",
      "Bolesť na začiatku aktivity (warm-up bolesť)",
      "Lokálne zhrubnutie šľachy",
      "Zvýšenie tréningovej záťaže v anamnéze",
    ],
    examinations: [
      {
        id: "palpation_achilles",
        name: "Palpácia Achillovej šľachy",
        result:
          "Bolestivosť a hmatné zhrubnutie šľachy 4 cm nad úponom na calcaneus. Bolestivá oblasť sa pohybuje so šľachou pri plantárnej/dorzálnej flexii (pozitívny arc sign).",
        isRelevant: true,
      },
      {
        id: "royal_london",
        name: "Royal London Hospital test",
        result:
          "Pozitívny - bolestivosť pri palpácii v neutrálnej pozícii, zmierňuje sa pri dorzálnej flexii členka",
        isRelevant: true,
      },
      {
        id: "heel_raise",
        name: "Test zdvíhania na špičky (single leg heel raise)",
        result:
          "Reprodukcia bolesti, pacient zvládne len 8 opakovaní vpravo vs. 20 vľavo",
        isRelevant: true,
      },
      {
        id: "thompson",
        name: "Thompsonov test (squeeze test)",
        result:
          "Negatívny - plantárna flexia prítomná pri stlačení lýtka, vylúčenie ruptúry",
        isRelevant: true,
      },
      {
        id: "knee_stability",
        name: "Vyšetrenie stability kolenného kĺbu",
        result: "Stabilné bilaterálne",
        isRelevant: false,
      },
      {
        id: "hip_strength",
        name: "Vyšetrenie sily bedrových svalov",
        result: "Symetrická sila bilaterálne",
        isRelevant: false,
      },
    ],
    diagnosisOptions: [
      "Achillova tendinopatia (midportion)",
      "Ruptúra Achillovej šľachy",
      "Retrokalkaneárna burzitída",
      "Plantárna fascitída",
    ],
    correctDiagnosis: "Achillova tendinopatia (midportion)",
    explanation:
      "Lokalizácia bolesti 2-6 cm nad úponom (midportion), zhrubnutie šľachy, pozitívny arc sign, warm-up fenomén a negatívny Thompsonov test (vylúčenie ruptúry) potvrdzujú diagnózu midportion Achillovej tendinopatie. Zvýšenie tréningovej záťaže je typickým precipitujúcim faktorom.",
  },
];
