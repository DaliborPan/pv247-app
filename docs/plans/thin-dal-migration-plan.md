# Migrace na tenkou DAL (varianta A)

Stav: migrace varianty A a zaverecny cleanup implementovany. Dokoncena staticka kontrola; funkcnost nebyla runtime overena. Na zadost uzivatele nebyly spusteny testy, build, lint, typecheck ani seed, DB nebo GitHub operace.

## Stav Pilotu

- Na zadost uzivatele se zacalo samostatnym `lecture` pilotem (krok 2), nikoliv plosnou pripravou session (krok 1).
- Pridany `src/modules/lecture/queries.ts`, `types.ts` a `tag.ts`. Odstraneny lecture loader a stare server/query, repository, mutation a index soubory.
- Verejny katalog explicitne vybira pole bez `attendanceToken` a bez relace hodnoceni. QR cteni ma vlastni kontrolu role lektora a samostatne DTO.
- Zapis dostupnosti je primo v existujici action. Zachovana cache katalogu `lectures` / `cacheLife('max')` i SWR invalidace.
- Prepojeny runtime i typove konzumenty. Attendance route dela aktualni lookup tokenu primo v DB; jeji zapis dochazky zustava ve stavajicim student-lecture modulu mimo rozsah pilotu.
- Klient dostava jen potrebne lecture props; seed pouziva DB insert typ, nikoliv aplikacni DTO. `.pop()` nahrazeno `.at(-1)`, aby konzument nemenil memoizovane pole.
- Provedena pouze staticka kontrola kodu, diffu a importu. Testy, browser, build, lint ani typecheck nebyly spusteny. Vyukove MDX ukazky stare architektury nebyly prepisovany.
- Pred migraci dalsiho modulu pockat na schvaleni uzivatele.

## Stav Homework

- Po schvaleni lecture pilotu byl samostatne migrovan `homework`, nikoliv soucasne `student-lecture` z puvodne spojeneho kroku 3.
- Pridany `src/modules/homework/queries.ts` a `types.ts`. Read API: `getMyHomeworksQuery(lectureId?)`, `getStudentHomeworksQuery(studentId)`, `getHomeworkGradingStatusQuery(lectureId)`.
- `HomeworkType` obsahuje pouze `lectureId` a `points`; `HomeworkGradingStatusType` obsahuje `hasGradingStarted`. Select skutecne vynechava nepotrebna pole `id`, `name`, `studentId` a `lectorId` z osobnich vysledku.
- Zachovano anonymni vlastni cteni jako prazdny seznam a self-or-lector autorizace studentskych dat. Vsechny nove read vstupy pouzivaji `React.cache`, bez persistentni cache. Stav hodnoceni zustava verejnou informaci o existenci libovolneho zaznamu pro prednasku.
- Create/update jsou primo v existujici ZSA action, se stejnou validaci, lektorskou procedurou a `refresh()`. Klientske mutation hooky a vstupni schema zustavaji.
- Odstraneny homework loader, server/query, repository, mutation, index a nepouzivane vystupni Zod schema. Nevyuzita vetev cteni vsech hodnoceni bez studentId nebyla prenesena do noveho API.
- Prepojeny komponenty lecture/homework/student i homework cteni ve student loaderu a query. Studentsky detail uz neimportuje raw homework repository; jeho `homeworksStudent` nese minimalni vysledek nove query.
- Zachovany nuly, nullable lectureId, pocty/soucty vsech zaznamu a update vsech odpovidajicich radku. Kontrola zahajeneho hodnoceni nacita pouze prvni ID misto celeho seznamu.
- Samostatne follow-upy, bez oprav v migraci: create duveruje klientskemu `lectorId` a nazvu zadani; bodove schema neurcuje minimum/maximum; databaze nezakazuje duplicitni hodnoceni. Soucasne chovani nebylo pri presunu predefinovano.
- Provedena pouze staticka kontrola diffu, importu a konzumentu. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

## Stav Student-Lecture

- Pridany `src/modules/student-lecture/queries.ts` a `types.ts`. Read vstup je `getStudentLecturesQuery(studentId)` s `server-only`, `React.cache` a vlastni self-or-lector autorizaci. Nepouzivany cache tag byl nasledne na zadost uzivatele odstranen.
- `StudentLectureType` obsahuje pouze `lectureId: string | null`. DB select skutecne vraci jen toto pole; pocty zaznamu vcetne duplicit a null hodnot zustavaji stejne.
- Lektorsky toggle je primo v existujici action se zachovanou validaci a ZSA procedurou. Existence se zjistuje cilenym dotazem; pri odebrani se nadale mazou vsechny odpovidajici zaznamy. Navratovy status `created`/`deleted` zustava kompatibilni s klientem.
- QR Route Handler provadi vlastni check a insert primo pres Drizzle. Zachovano prihlaseni, kontrola tokenu a SUCCESS pro novy i jiz existujici zaznam; pri opakovanem postupnem potvrzeni se znovu nevklada.
- Na zadost uzivatele odstraneny invalidace attendance tagu, ktery nemel odpovidajici cache. Action po zapisu vola `refresh()` pro obnovu UI; QR route nadale konci redirectem. Zadna persistentni cache nebyla pridana.
- Prepojeny attendance badge, studentska dochazkova karta a studentsky overview loader. Studentske repository relace zustavaji mimo rozsah teto migrace.
- Odstraneny loader a stare server/query, repository, mutation a index soubory. Nepouzivane read Zod schema nahrazeno explicitnim typem; `acceptAttendanceCodeSchema` zustava pro route a vysledkovou stranku.
- Samostatny follow-up: check-then-insert neni ochrana proti soubehu a DB nema unikatni par student/prednaska. Migrace tuto vlastnost nezmenila a nepridala schema zmeny.
- Provedena pouze staticka kontrola diffu, importu a klientova navratoveho kontraktu. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

## Stav Lecture-Lector

- Pridany `src/modules/lecture-lector/queries.ts` a `types.ts`. Read vstupy pouzivaji `server-only` a `React.cache`, bez persistentni cache a bez tagu.
- `getLectureApprovedLectorsQuery(lectureId)` zustava verejna; filtruje schvalene zaznamy primo v SQL a vraci `LectureApprovedLectorType` s ID prirazeni a jmenem/avatarem vyucujiciho. Nenacita kompletni uzivatelske zaznamy.
- `getLectorsForLecturesQuery()` vraci seskupene `LectureLectorType` pro spravu prihlaseni a nove overuje roli lektora primo v DAL, nikoliv jen pres podminene zobrazeni profile sekce. Skupinovy klic nese lectureId, polozky obsahuji jen potrebne udaje.
- Sign-up, sign-out a approval zapisuji primo v existujicich actions. Zachovany ZSA procedury, validace, chybove zpravy a `refresh()` po uspesnem zapisu. Vlastni lectorId pro prihlaseni/odhlaseni pochazi ze session.
- Zachovana soucasna pravidla schvalovani: libovolny lektor smi schvalit existujici prihlasku vcetne vlastni, bez omezeni availability statusem; nove schvaleni odmita stav se dvema schvalenymi, jiz schvaleny cil lze potvrdit znovu a odschvaleni zustava povolene.
- Status enum presunut do client-safe moduloveho `schema.ts`; Drizzle definice ho importuje odtud. Hodnoty, poradi, default i DB constraints zustaly identicke; zadna DB migrace ani zapis nebyly provedeny.
- Prepojeny verejne lecture teachers a profile sprava prihlaseni. `LectorChip` prijima pouze zobrazovana pole. Odstraneny loader, server/query, repository, mutation, index a puvodni DB enum soubor; nepouzivane neomezene cteni pro jednu prednasku se neprenaselo.
- Existujici unikatni par lectureId/lectorId zustava. Samostatny follow-up: soucasna kontrola limitu dvou schvalenych neni atomicka a muze zavodit pri soubehu; migrace nepridavala transakce ani nova pravidla.
- Provedena pouze staticka kontrola diffu, typu, importu a autorizacnich vetvi. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

## Stav Project

- Pridany `src/modules/project/queries.ts` a `types.ts`. Read vstupy: `getMyProjectQuery`, `getProjectQuery`, `getProjectsQuery`, `getStudentProjectQuery`, `getProjectFormStudentComboboxOptionsQuery`. Vse s `server-only` a `React.cache`, bez persistentni cache/tagu.
- Na zadost uzivatele sjednoceny seznam, detail i studentsky prehled na `ProjectType` a spolecny DB vyber. `getMyProjectQuery()` deleguje na `getStudentProjectQuery(sessionUser.id)`, kde zustava self-or-lector autorizace i memoizace. `ProjectStudentOptionType` zustava pro combobox. Clenove projektu neobsahuji e-mail, account metadata ani cely DB radek. Seznam a prehled nyni nacitaji stejna projektova pole jako detail vcetne clenu.
- Detail i vlastni projekt pouzivaji cilene DB dotazy; vlastni a studentsky projekt se urcuji podle aktualniho DB clenstvi. Zachovano null pro chybejici vlastni/studentsky projekt a undefined pro lektorsky detail.
- Lektorske seznamy a detail zustavaji lector-only, studentsky prehled self-or-lector. Seznam nacte data jednou a v UI je rozdeli do puvodnich skupin; FAILED zustava mimo obe skupiny.
- Combobox kandidatu presunut ze student vrstev do project query a vraci primo value/label. Kontroluje opravneni k operaci podle aktualniho users.projectId z DB: edit vyzaduje clenstvi bez lektorske vyjimky, create nepovoli existujici prirazeni. Filtr kandidatu vcetne GitHub podminky a stavajicich clenu zustal zachovan.
- Create/edit, status a hodnoceni zapisuji primo v existujicich actions. Zachovany vstupni schemata, ZSA procedury, chybove zpravy, poradi zapisu, refresh/revalidatePath a role-student filtr pri prirazovani clenu. Create zachovava i dosavadni volitelne ID ze vstupu.
- Approval klient dostava explicitne jen id/status. Odstraneny project LoaderResult/ReturnType vazby; posledni student konzumenti a obecny LoaderResult byly nasledne odstraneny pri migraci student.
- Odstraneny project loader, server/query, repository, mutation a index. Odstraneny take nepotrebne student assignment/candidate helpery; studentsky overview vzdy vola `getStudentProjectQuery(user.id)`, bez podminky nad projectId uzivatelskeho objektu.
- Status enum je definovany v aplikacnim schema.ts a pouzity Drizzle schematem se stejnymi hodnotami/defaultem. Stare read Zod schema a DB enum soubor odstraneny; zadna DB migrace nebyla provedena.
- Samostatne follow-upy bez oprav v refactoru: zapisy clenstvi nejsou atomicke a nekontroluji obsazenost vsech clenu; approval nadale duveruje klientskemu currentStatus a povoluje clena projektu nebo lektora; edit nezavadi nove omezeni na CREATED. Kandidat bez GitHub muze chybet mezi options i kdyz je v editacnich defaults. Tyto existujici vlastnosti se pri migraci nezmenily.
- Na naslednou zadost uzivatele odstranen projectId z Better Auth user.additionalFields, a tim z odvozenych session-user typu a nove nacitaneho auth vystupu. Sloupec users.projectId a DB uzivatelske typy zustaly zachovany. Neni potreba DB migrace ani nove prihlaseni pri aktualni konfiguraci bez cookie cache/secondary storage.
- Create i approval action overuji clenstvi primo necachovanym DB dotazem, nikoliv pres React.cache query. Student overview nacita projekt soubezne s body/dochazkou; nav/card props byly zuzeny na skutecne potrebna pole, aby session nemusela splnovat cely UserType.
- Provedena pouze staticka kontrola diffu, SQL struktury, importu a UI kontraktu. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

## Stav Student

- Pridany `src/modules/student/queries.ts`, `types.ts`, `actions.ts` a `schema.ts`. Read API: `getStudentQuery`, `getStudentsQuery`, `getStudentsWithHomeworkQuery`, `getStudentOverviewQuery`, `getMyStudentOverviewQuery`. Pouziva `server-only`, primitivni argumenty a `React.cache`, bez persistentni cache/tagu.
- Seznam, detail a hodnoceni sdileji zaklad `StudentType`; `StudentProgressType` a `StudentHomeworkType` pridavaji skutecne odlisne agregace/hodnoceni. `StudentOverviewType` popisuje souhrn. Email, auth metadata a nepotrebne relace se nevybiraji ani neposilaji do klientskych tabulek.
- Detail pouziva cilene ID plus role=student misto nacitani vsech studentu. Zachovana lector-only autorizace i chyba pri neexistujicim studentovi; nepotrebne pripojene homework cteni z detailu odstraneno. Nepouzivany puvodni getMany se neprenasel.
- Seznam a grading zustavaji lector-only. Own-students tab je stale pouze filtr v UI. Grading zahrnuje i studenty bez hodnoceni a zachovava prvni odpovidajici zaznam vcetne nuly.
- Prehled overuje self-or-lector a sklada existujici homework, attendance a project query. Vlastni prehled deleguje na stejny vstup; role student se zde nevynucuje. Projekt se vzdy cte podle DB clenstvi, nikdy ze session.projectId.
- Zachovany soucty vsech bodu, pocet zaznamu hodnoceni/dochazky vcetne duplicit a prahy 130/8. TotalPoints stale znamena homework points. `attendanceCount` nahradil nepotrebne pole attendances; list nema plne homework/attendance relace a projektovy odkaz bere ID z vybraneho projektu.
- Onboarding a edit-profile jsou dve samostatne autentizovane actions v jednom souboru s primym update vlastniho uzivatele. Sdileji profileFormSchema/ProfileFormType se stejnymi tremi z.string() poli bez nove validace. Zachovany revalidace '/' layout a '/profile', i moznost editace vlastniho profilu lektorem.
- Onboarding client dostava pouze defaultGithub=sessionUser.name, nikoliv cely session objekt. UI, formulare a ZSA error/toast flow zustaly zachovany.
- Prepojeny runtime i type-only konzumenty vcetne sidebaru, detailu a obou tabulek. Odstraneny stary loader, server/query, repository, mutation, index, duplikovane colocated profile action/schema soubory a posledni LoaderResult helper `src/types.ts`.
- Provedena pouze staticka kontrola diffu, importu, projekci a kontraktu. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

## Stav Homework-Repository

- Pridany `src/modules/homework-repository/queries.ts` a `types.ts`. `getStudentHomeworkRepositoriesQuery(studentId)` pouziva `server-only`, `React.cache` a self-or-lector autorizaci. Vraci pouze lectureId/repositoryUrl/status jako `HomeworkRepositoryType`.
- Cely create/complete workflow je v existujicim `components/create-homework-repository-action/action.ts`. Exportovany jsou pouze dve puvodni actions; kontext, faze a opakovane persistence update jsou privatni funkce ve stejnem souboru. Nevznikla zadna samostatna service/use-case/repository vrstva.
- Privatni ulozeny stav pouziva DB select/insert typy, nikoliv verejny read typ. `HomeworkRepositoryResultType` oddeluje transientni `preparing` od `ready` s URL; persisted stavy zustaly pending/repository_created/ready.
- Zachovany ZSA student-only vstupy, studentId odvozene ze session, ready fast path, overeni OAuth account ID, 45s budget, validace template URL a repository, rezervace jmena pred POST, konfliktni guard a zakaz adopce existujiciho nespojeneho repozitare.
- Zachovano ulozeni GitHub ID hned po vytvoreni, dokonceni podle immutable ID, kontrola organizace/private/active stavu, initial commit s 409 pripravou, teacher-team opravneni, paginace/reuse pozvanek a finalni ready zapis. Zadne automaticke retry ani polling nebyly pridany.
- Zachovano setRecord pro persistence chyby po rezervaci, mapovani chyb bez raw detailu, puvodni result/error kontrakt i refresh ve finally. Klientsky retry:false a router.refresh zustaly beze zmeny. Nizkourovnova GitHub integrace zustala zachovana.
- Status enum presunut do client-safe moduloveho schema.ts; Drizzle pouziva stejne hodnoty a default. Vstupni schema actions je sdilene v modulu se stejnym lectureId.min(1). Nepouzivane full-row/input Zod schema odstraneno.
- Prepojeny homework card actions. Odstraneny loader, server/query, server/repository, server/mutation a puvodni DB status soubor. Zadna zmena ulozenych dat ani databazovych constraints.
- Provedena pouze staticka kontrola importu a porovnani puvodniho/noveho workflow. Testy, browser, build, lint, typecheck, GitHub operace ani DB zapisy nebyly spusteny. Pred cleanupem pockat na schvaleni uzivatele.

## Stav Cleanupu

- Odstranen zbyvajici `lector/server` (query, repository, index). Reviewer-selection a getLectorStudents nemely runtime ani typove konzumenty vcetne auth/integraci; neni potreba nahradni DAL modul.
- V `src/modules` nezbyvaji soubory starych `server/` vrstev ani loadery. Vsech 24 verejnych read vstupu v sedmi queries.ts modulech ma suffix Query a server-only hranici. Klientske mutation hooky, komponentove exporty a GitHub integrace zustaly zachovany.
- Doplnene `server-only` do aplikacni DB inicializace, auth implementace, session readeru a sdilenych ZSA procedur. Auth barrel ma pouze explicitni export auth. Client auth inference zustava type-only a konkretni actions maji nadale vlastni use-server hranici.
- Seed nepouziva server-only DB vstup: vytvari vlastni Drizzle spojeni az pri explicitnim volani seed(), se stejnymi promennymi prostredi a puvodni transakci. Nevznikl novy CLI prikaz ani automaticke spousteni seedu.
- User role a lecture/homework slug enumy presunuty do client-safe modulovych schema.ts. DB je importuje z aplikacni vrstvy; hodnoty, poradi, defaulty a prazdny homework slug posledni lekce zustaly zachovany. Sdilena modulova schema.ts/types.ts nemaji runtime DB zavislosti.
- Na naslednou zadost uzivatele odstranen cely modul user i obecny UserType. Role jsou v client-safe `session-user/schema.ts`, ktery importuje i DB definice. Navigace pouziva Pick<SessionUserType>, studentske karty Pick<StudentType> a LectorChip ma lokalni props pro zobrazovane udaje. Sdilene schema neimportuje serverovy session reader ani auth implementaci; projectId se do session nevraci.
- Odstraneny nepouzivane DB typove aliasy UserInsertType/UserSelectType, ProjectInsertType, HomeworkInsertType, LectureLectorInsertType, StudentLectureInsertType a jejich reexporty. Privatne pouzivane homework-repository insert/select typy zustaly. Odstranen nepouzivany AcceptAttendanceCodeType; runtime schema kodu zustava.
- Staticky zkontrolovany reference odstranenych souboru/symbolu, klient/server hranice, seed importni cesta, enumy a typove kontrakty. Nebyl nalezen zbyvajici primy DB pristup v prezentacnich komponentach; DB importuji query, actions, route a auth infrastruktura.
- Vyukove MDX ukazky puvodni architektury, nesouvisejici UI barrely a tooling zustaly mimo cleanup. Pripadna aktualizace vyukovych textu je samostatna zmena.

## Oddelene Follow-Upy

- Project clenstvi: vice zapisu bez transakce a bez serverove kontroly obsazenosti vsech vybranych clenu; schvalovani nadale vychazi z klientsky zaslaneho currentStatus.
- Dochazka: check-then-insert neni ochrana proti soubehu; chybi DB unikatnost paru student/prednaska.
- Lecture-lector: limit dvou schvalenych vyucujicich je kontrolovan neatomicky.
- Hodnoceni: create prebira lectorId/nazev zadani ze vstupu, validace neurcuje rozsah bodu a schema nezakazuje duplicity.
- Session: nullable getSession zachytava i provozni chyby jako neprihlaseni; toto chovani nebylo meneno.
- Tooling a overeni: existujici next lint script neni platny pro Next 16; jeho oprava i runtime/test overeni byly podle dohody mimo rozsah.

## Cil A Rozsah

Zjednodusit serverovou datovou vrstvu bez povinneho retezce loader -> query -> repository. Pouzit vyhradne variantu A, bez samostatne use-case/service vrstvy.

```text
Cteni: Server Component -> modules/<modul>/queries.ts -> Drizzle
Zapis: Client Component -> Server Action -> Drizzle
Existujici HTTP vstup: Route Handler -> Drizzle
```

- Zadna tvorba ani spousteni automatizovanych testu, zadny test runner, mocky, fixtures, testovaci DB, rucni scenare ani browser smoke testy.
- Soucasti planu neni ani spousteni buildu, lintu nebo typechecku. Dokonceni znamena provedene presuny a statickou kontrolu kodu/importu, nikoliv runtime overenou funkcnost.
- Zachovat nazvy modulu, URL, DB schema, Better Auth adapter, ZSA, UI a klientsky form/mutation stack. Zadny novy HTTP mezikrok pro Server Components.
- Nepridavat persistentni cache, genericke repository, DI ani novy background system.
- Nemichat migraci s novymi business pravidly nebo samostatnymi opravami chyb. Zjistene problemy evidovat zvlast; zmeny produktu nejprve odsouhlasit.

## Cilove Konvence

- Aplikacni typy pojmenovavat podle vyznamu s priponou `Type`, nikdy `Dto` ani `DTO`: napr. `LectureType`, `LectureAttendanceType`, `ProjectType`. Preferovat jeden sdileny typ entity pro seznam/detail/prehled, pokud neni konkretni duvod je oddelit. Tato konvence plati i pro vsechny dalsi migrovane moduly. DTO v textu planu oznacuje pouze koncept oddeleni aplikacnich dat od DB, nikoliv cast nazvu typu.
- `queries.ts`: pojmenovane exporty read operaci s povinnym suffixem `Query` (napr. `getProjectQuery`, `getMyStudentOverviewQuery`), `import 'server-only'`, ziskani session, autorizace, business vypocty, cilene Drizzle dotazy a minimalni DTO. Plati i pro agregace a delegujici/memoizovane read vstupy, ne pouze pro prime SQL dotazy. Verejny katalog muze zustat anonymni. Privatni helpery povinny suffix nemaji; Server Actions pouzivaji suffix `Action`.
- `React.cache`: vychozi pro read vstupy pouzivane pri RSC renderu. Definice na urovni modulu, prednostne primitivni argumenty, zadne vedlejsi efekty. Nespolihat na memoizaci v Route Handlerech ani pri mutacich.
- `types.ts`: explicitni read DTO podle skutecnych konzumentu, bez runtime importu DB nebo serverove implementace. Neprepisovat vsechny typy preventivne.
- `schema.ts`: Zod validace vstupu a client-safe domenove hodnoty. DB schema muze sdilene hodnoty importovat; UI nema runtime zaviset na DB modulech.
- Stavajici colocated `components/<feature>/action.ts` mohou zustat. Zapis, autorizace, business pravidla a pripadna existujici transakce budou primo v action. Zadna samostatna funkce predstavujici celou operaci v dalsi vrstve.
- Pokud dve actions sdileji podstatnou logiku, mohou byt v jednom action souboru s privatnimi pomocnymi funkcemi. Pomocne funkce nejsou exportovane, nemaji vlastni verejne API a netvori novou vrstvu.
- Stejne pravidlo plati pro delsi GitHub workflow: muze mit privatni pomocne funkce uvnitr action souboru. Existujici nizkourovnovy GitHub klient zustava integraci, nikoliv novou domenovou vrstvou.
- Existujici attendance Route Handler resi vlastni vstup, autorizaci a zapis primo. Nevola Server Action jako interni sluzbu.
- DTO skutecne orezat pres select/mapovani. Navratovy TypeScript typ sam nadbytecna pole neodstrani.
- Client Components dostavaji minimalni DTO/props a neimportuji read query. Serverove komponenty mohou nacitat i uvnitr stromu.
- `app/` resi routovani, routovaci vstupy, skladbu UI, Suspense, redirect a notFound. Layout/proxy nenahrazuje autorizaci v query/action.
- `"use server"` pouze pro skutecne Server Actions. Zadny spolecny barrel pro klientsky i serverovy povrch.
- Existujici `"use cache"` zachovat jen pro odpovidajici data; session a aktualni kontrola pristupu zustavaji mimo sdilenou cache.

## Vychodiska

Puvodni stav pred migraci: moduly `lecture`, `lecture-lector`, `homework`, `student-lecture`, `project`, `student`, `homework-repository` mely loader i serverove query/repository/mutation soubory. `lector` mel query/repository bez loaderu. `session-user` je infrastruktura identity; `user` obsahuje sdilene kontrakty a nepotrebuje novou DAL.

`homework-repository` je domena GitHub repozitaru, nikoliv vrstva urcena ke smazani. Klientske `components/**/mutation.ts` jsou React Query hooky, nikoliv backendova vrstva.

V repozitari nebyly nalezeny `docs/rules/*.mdc`. `cacheComponents: true` je zapnuto. Existujici problem `next lint` zustava mimo rozsah teto migrace; tooling se nemeni.

## Postup Implementace

Implementovat kroky 1 az 8. Po kazdem kroku predlozit souhrn zmen a pripadne odchylky; pred dalsim krokem pockat na schvaleni uzivatele. Tento dokument neschvaluje DB zmeny ani produkcni zapisy.

### 1. Upevnit Session A Hranice

- Zachovat API `src/modules/session-user` a Better Auth konfiguraci. Doplnit `server-only` na serverovy vstup; serverovou identitu nepredavat do klientskych props.
- Zachovat `authServerAction` a role-specific procedury v `src/server/server-actions.ts`. Runtime kontroly se pri presunu mutaci nesmi ztratit.
- Nove queries i DB moduly oznacit `server-only`. UI bude pouzivat pouze queries, odkazy na actions a client-safe kontrakty.
- Nepridavat novy tooling ani prazdne vrstvy. Stavajici importy migrovat spolu s modulem, nikoliv pres docasne kompatibilitni loadery.

Vystup: stanovene a v kodu vyznacene server/client hranice, beze zmeny session chovani. Maskovani provoznich chyb v `getSession` evidovat jako samostatny problem.

### 2. Migrovat Lecture Jako Pilot

- Vytvorit `src/modules/lecture/queries.ts` a potrebne DTO v `types.ts`. Sloucit loader a read logiku z `server/query.ts` a `server/repository.ts`.
- Oddelit verejny katalog od autorizovaneho QR/token cteni. Verejne DTO nesmi obsahovat `attendanceToken` ani relaci studentskych hodnoceni `homeworks`.
- Upravit konzumenty vcetne verejnych lectures/homeworks stranek, metadata/static params, navigace, sidebaru a `LectureCardActions`. Zuzit props misto zachovani sirokeho `LectureType`.
- Zachovat session-free interni `"use cache"` cteni katalogu s tagem `lectures` a `cacheLife('max')`. Attendance route provede aktualni lookup tokenu primo, neziska jej z verejneho DTO.
- Zapis dostupnosti presunout primo do `components/revalidate-lecture-action/action.ts`; zachovat `revalidateTag('lectures', 'max')`.
- Ve stejnem kroku aktualizovat mezimodulove a route konzumenty a odstranit nahrazene lecture vrstvy/barrel.

Vystup: jedno verejne read API, minimalni katalogove DTO, oddelena ochrana tokenu a primy zapis v action. Stavajici Suspense a cache semantika zustavaji zachovany v kodu.

### 3. Migrovat Homework A Student-Lecture

- V kazdem modulu vytvorit `queries.ts` se session/autorizaci, `React.cache` a explicitnimi DTO. Zachovat anonymni homework `getMine` jako prazdny seznam a self-or-lector omezeni osobnich dat.
- Create/update hodnoceni a toggle dochazky presunout primo do stavajicich actions pri zachovani ZSA kontraktu a runtime opravneni.
- Odstranit primy import homework repository ze student query: konzument pouzije nove autorizovane cteni nebo vlastni autorizovany cileny DB dotaz.
- V `src/app/api/accept-attendance/[token]/route.ts` umistit zapis primo do handleru. Zachovat prihlaseni, validaci tokenu a idempotentni opakovane potvrzeni; nepridavat mezivrstvu ani volani action z route.
- Attendance tag bez odpovidajici cache odstranit podle nasledneho rozhodnuti uzivatele; action pouzije `refresh()`, route ponecha redirect. Nepridavat kvuli tagu persistentni cache.
- Prevest konzumenty vcetne zatim nemigrovaneho studentskeho loaderu a odstranit nahrazene backendove vrstvy. Klientske mutation hooky zustavaji.

Vystup: cteni pres queries, zapisy primo v actions/route, zadne verejne raw repository API.

### 4. Migrovat Lecture-Lector

- Sloucit read logiku do `src/modules/lecture-lector/queries.ts`. Verejny seznam schvalenych vyucujicich vraci jen zobrazovana pole; administrativni cteni ma vlastni autorizaci.
- Sign-up, sign-out a approval presunout primo do stavajicich actions. Pripadne privatni pomocne funkce ponechat uvnitr action souboru, ne v samostatne vrstve.
- Zachovat soucasne kontroly duplicit a limit dvou schvalenych vyucujicich. Pripadne zlepseni ochrany proti soubehu evidovat samostatne, nemenit pri presunech schema.
- Aktualizovat profile sekce, `lecture-teachers.tsx` a lektorskou spravu prednasek; odstranit stare vrstvy.

Vystup: read DTO a autorizovane actions bez dalsiho delegovani do mutation/repository vrstvy.

### 5. Migrovat Project

- Vytvorit `src/modules/project/queries.ts` pro own/detail/list operace a DTO. Nahradit nacitani vsech projektu pro jediny detail cilenym SQL. Pro skupiny seznamu pouzit sdilene cteni nebo cilene filtry podle spotreby.
- Vyber kandidatu umistit do projektove DAL s opravnenimi pro danou operaci; combobox dostava jen option DTO.
- Create/edit clenstvi presunout primo do `components/project-form/action.ts`, vcetne autorizace a Drizzle prirazeni uzivatelu. Zrusit zavislost na student repository/barrelu a cyklus student -> project -> student.
- Hodnoceni, komentar a status presunout primo do odpovidajicich actions. Zachovat aktualni pravidla i error/input kontrakty.
- Nepridavat automaticky nova pravidla schvalovani, transakce ani schema zmeny. Soucasne duverovani klientskemu `currentStatus`, dostupnost clenu a neatomicitu zapisu zapsat jako konkretni samostatne problemy k rozhodnuti.
- Prevest formular, vlastni projekt, sidebar/profile i lektorske seznamy/detail na DTO. Zachovat revalidace, odstranit nahrazene project vrstvy a nepouzite student assignment helpery.

Vystup: projektove cteni v queries, kompletni zapisy v actions, zadne nove use-casy ani zmena business pravidel skryta v refactoru.

### 6. Migrovat Student A Profil

- Sloucit loader a query/repository read logiku do `src/modules/student/queries.ts`. Agregace sklada autorizovane query nebo vlastni autorizovany SQL select, nikoliv raw cteni cizich modulu.
- Detail nacitat filtrem podle ID. Zavest DTO pro seznam, grading tabulku a osobni prehled; zachovat jen potrebna pole a pocty.
- Pred odstranenim relace prevest tabulkovou bunku z `studentLectures.length` na `attendanceCount`.
- Zachovat vyznam vypoctu: awarded count pocita zaznamy hodnoceni, `totalPoints` predstavuje homework points, prahy jsou 130 bodu a 8 dochazek.
- Onboarding a editaci profilu umistit do spolecneho `src/modules/student/actions.ts`, pokud sdileji zapis. Kazda exportovana action zajisti vlastni validaci a autorizaci; spolecne drobne mapovani/zapis muze byt privatni funkci v temze souboru. Zachovat revalidace `/` layoutu a `/profile`.
- Aktualizovat vsechny importy obou actions, studentske prehledy a lektorske tabulky; odstranit nahrazene vrstvy.

Vystup: explicitni read DTO a profilove actions bez samostatneho update-profile use-casu.

### 7. Migrovat Homework-Repository

- Sloucit UI cteni do `src/modules/homework-repository/queries.ts` se self/lector autorizaci a minimalnim status DTO.
- Create/complete provisioning presunout z `server/mutation.ts` do stavajiciho `components/create-homework-repository-action/action.ts`. Obe actions zustanou samostatnymi autorizovanymi vstupy; sdileny kod bude privatni v tomto souboru.
- DB pristup presunout z repository primo k action logice/privatnim funkcim. Neexportovat dalsi domenovou vrstvu. Zachovat existujici nizkourovnovou GitHub integraci.
- Pri presunu nemenit stavovy automat: OAuth identitu, ownership, rezervaci cile, persisted stavy, create/complete faze, opatrne retry, reuse pozvanek, sanitizaci chyb a request budget.
- Zachovat refresh vcetne chybovych a partial-success vetvi. Neprovadet zadne realne provisioning volani ani zkusebni zapisy.

Vystup: queries a action soubor s privatnimi pomocnymi funkcemi, bez samostatneho provisioning use-casu a bez prepisu workflow.

### 8. Dokoncit Cleanup

- Projit reference `src/modules/lector/server` vcetne auth/integraci. Nepouzivane reviewer-selection funkce odstranit; pripadne skutecne konzumenty prevest primo do prislusne query/action. Nevyrabet vrstvu jen kvuli symetrii.
- Podle nasledneho rozhodnuti uzivatele modul user odstranit; role umistit do client-safe `session-user/schema.ts`. Konzumenty puvodniho UserType prevest na potrebna pole session/student typu nebo lokalni props. Sdilene enum zavislosti presmerovat z DB do domeny bez zmeny ulozenych hodnot.
- Odstranit nahrazene loadery, `server/query.ts`, domenove `server/mutation.ts`, repository wrappery a siroke `server/index.ts` barrely. Neodstranovat klientsky React Query kod ani nizkourovnove integrace podle pouheho nazvu.
- Odstranit `LoaderResult` z `src/types.ts`, pokud uz nema konzumenty. Verejne UI kontrakty nahradit explicitnimi DTO; lokalni inference muze zustat.
- Staticky projit vsechny runtime i type-only reference, `ReturnType`, relativni importy, aliases, metadata a route konzumenty. UI nesmi importovat DB; colocated serverove actions ji importovat mohou.
- Projit diff bez spousteni testu a nastroju pro overovani aplikace. Zapsat provedene presuny, zachovane cache tagy a oddelene follow-upy.

Vystup: pouze varianta A, zadne kompatibilitni loadery ani nove use-case/service vrstvy. V zaveru explicitne uvest, ze funkcnost nebyla testovana a build/lint/typecheck nebyly spusteny.

## Zdroje A Omezeni

- Next.js 16.2.3 lokalni dokumentace: `node_modules/next/dist/docs/01-app/02-guides/data-security.md` (DAL, DTO, server-only, verejne actions).
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` a `07-mutating-data.md` (hranice, kompozice a actions).
- `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md` a dokumentace `updateTag`/`revalidateTag` (scope a invalidace).
- Pred kazdym Next-specific implementacnim krokem precist relevantni lokalni dokumentaci podle `AGENTS.md`.
- Neon MCP je read-only. Zadne DB ani externi resource zmeny nejsou soucasti tohoto planu.
