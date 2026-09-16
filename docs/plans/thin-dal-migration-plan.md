# Migrace na tenkou DAL (varianta A)

Stav: `lecture`, `homework` a `student-lecture` implementovany. Ostatni moduly zatim nemigrovany; dalsi na rade je `lecture-lector`.

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
- Pridany `src/modules/homework/queries.ts` a `types.ts`. Read API: `getMyHomeworks(lectureId?)`, `getStudentHomeworks(studentId)`, `getHomeworkGradingStatus(lectureId)`.
- `HomeworkType` obsahuje pouze `lectureId` a `points`; `HomeworkGradingStatusType` obsahuje `hasGradingStarted`. Select skutecne vynechava nepotrebna pole `id`, `name`, `studentId` a `lectorId` z osobnich vysledku.
- Zachovano anonymni vlastni cteni jako prazdny seznam a self-or-lector autorizace studentskych dat. Vsechny nove read vstupy pouzivaji `React.cache`, bez persistentni cache. Stav hodnoceni zustava verejnou informaci o existenci libovolneho zaznamu pro prednasku.
- Create/update jsou primo v existujici ZSA action, se stejnou validaci, lektorskou procedurou a `refresh()`. Klientske mutation hooky a vstupni schema zustavaji.
- Odstraneny homework loader, server/query, repository, mutation, index a nepouzivane vystupni Zod schema. Nevyuzita vetev cteni vsech hodnoceni bez studentId nebyla prenesena do noveho API.
- Prepojeny komponenty lecture/homework/student i homework cteni ve student loaderu a query. Studentsky detail uz neimportuje raw homework repository; jeho `homeworksStudent` nese minimalni vysledek nove query.
- Zachovany nuly, nullable lectureId, pocty/soucty vsech zaznamu a update vsech odpovidajicich radku. Kontrola zahajeneho hodnoceni nacita pouze prvni ID misto celeho seznamu.
- Samostatne follow-upy, bez oprav v migraci: create duveruje klientskemu `lectorId` a nazvu zadani; bodove schema neurcuje minimum/maximum; databaze nezakazuje duplicitni hodnoceni. Soucasne chovani nebylo pri presunu predefinovano.
- Provedena pouze staticka kontrola diffu, importu a konzumentu. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

## Stav Student-Lecture

- Pridany `src/modules/student-lecture/queries.ts` a `types.ts`. Read vstup je `getStudentLectures(studentId)` s `server-only`, `React.cache` a vlastni self-or-lector autorizaci. Nepouzivany cache tag byl nasledne na zadost uzivatele odstranen.
- `StudentLectureType` obsahuje pouze `lectureId: string | null`. DB select skutecne vraci jen toto pole; pocty zaznamu vcetne duplicit a null hodnot zustavaji stejne.
- Lektorsky toggle je primo v existujici action se zachovanou validaci a ZSA procedurou. Existence se zjistuje cilenym dotazem; pri odebrani se nadale mazou vsechny odpovidajici zaznamy. Navratovy status `created`/`deleted` zustava kompatibilni s klientem.
- QR Route Handler provadi vlastni check a insert primo pres Drizzle. Zachovano prihlaseni, kontrola tokenu a SUCCESS pro novy i jiz existujici zaznam; pri opakovanem postupnem potvrzeni se znovu nevklada.
- Na zadost uzivatele odstraneny invalidace attendance tagu, ktery nemel odpovidajici cache. Action po zapisu vola `refresh()` pro obnovu UI; QR route nadale konci redirectem. Zadna persistentni cache nebyla pridana.
- Prepojeny attendance badge, studentska dochazkova karta a studentsky overview loader. Studentske repository relace zustavaji mimo rozsah teto migrace.
- Odstraneny loader a stare server/query, repository, mutation a index soubory. Nepouzivane read Zod schema nahrazeno explicitnim typem; `acceptAttendanceCodeSchema` zustava pro route a vysledkovou stranku.
- Samostatny follow-up: check-then-insert neni ochrana proti soubehu a DB nema unikatni par student/prednaska. Migrace tuto vlastnost nezmenila a nepridala schema zmeny.
- Provedena pouze staticka kontrola diffu, importu a klientova navratoveho kontraktu. Testy, browser, build, lint ani typecheck nebyly spusteny. Pred dalsim modulem pockat na schvaleni uzivatele.

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

- Aplikacni typy pojmenovavat podle vyznamu s priponou `Type`, nikdy `Dto` ani `DTO`: napr. `LectureType`, `LectureAttendanceType`, `ProjectListItemType`. Tato konvence plati i pro vsechny dalsi migrovane moduly. DTO v textu planu oznacuje pouze koncept oddeleni aplikacnich dat od DB, nikoliv cast nazvu typu.
- `queries.ts`: pojmenovane exporty read operaci, `import 'server-only'`, ziskani session, autorizace, business vypocty, cilene Drizzle dotazy a minimalni DTO. Verejny katalog muze zustat anonymni.
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

Moduly `lecture`, `lecture-lector`, `homework`, `student-lecture`, `project`, `student`, `homework-repository` maji loader i serverove query/repository/mutation soubory. `lector` ma query/repository bez loaderu. `session-user` je infrastruktura identity; `user` obsahuje sdilena schemata a nepotrebuje novou DAL.

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
- `user/schema.ts` ponechat jako client-safe kontrakty. Sdilene enum zavislosti presmerovat z DB do domeny bez zmeny ulozenych hodnot.
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
