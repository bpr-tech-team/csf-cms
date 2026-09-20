# CSF CMS

Сайт CSF и административная панель на Payload CMS 3.88, Next.js 16.3, React 19 и PostgreSQL. Контент доступен на чешском и английском языках.

Эта версия предназначена для демонстрации клиенту. Рекомендация по инфраструктуре и подготовке контейнеров: [KUBERNETES.md](KUBERNETES.md).

## Локальный запуск

Используйте Node.js 22.12+ в ветке 22 либо Node.js 24, pnpm 10.32.1 и PostgreSQL 16.

```bash
cp .env.example .env
pnpm install --frozen-lockfile
docker compose up -d postgres
```

В `.env` задайте `DATABASE_URL`, `PAYLOAD_SECRET`, `PREVIEW_SECRET` и `NEXT_PUBLIC_SERVER_URL`. Для секретов используйте отдельные случайные значения. Если отправка почты не нужна, удалите из `.env` пример `SMTP_HOST`; остальные SMTP-параметры описаны в `.env.example`.

```bash
pnpm payload migrate
pnpm dev
```

Сайт: [localhost:3000](http://localhost:3000). Админка: [localhost:3000/admin](http://localhost:3000/admin). На новой базе создайте первого администратора и добавьте контент через CMS.

В `docker-compose.yml` также есть сервис `payload` для локальной разработки. При его использовании сначала примените миграции через `docker compose run --rm payload sh -c 'corepack enable && pnpm install --frozen-lockfile && pnpm payload migrate'`, затем выполните `docker compose up payload`.

## Команды

| Команда                   | Назначение                                                       |
| ------------------------- | ---------------------------------------------------------------- |
| `pnpm dev`                | Локальный сервер с обновлением при изменении исходников          |
| `pnpm build`              | Сборка приложения и генерация sitemap/robots.txt                 |
| `pnpm start`              | Запуск собранного приложения на порту 3000                       |
| `pnpm check`              | Проверка форматирования, ESLint и TypeScript                     |
| `pnpm test:int`           | Тесты Vitest; API-тесту нужна настроенная база                   |
| `pnpm test:e2e`           | Браузерные тесты Playwright; нужны база и установленный Chromium |
| `pnpm generate:types`     | Генерация типов Payload после изменения схемы                    |
| `pnpm generate:importmap` | Обновление карты компонентов админки                             |

`pnpm build` обращается к базе при генерации страниц. До сборки база должна быть доступна, а миграции — применены. Сборка сама миграции не запускает. Для демонстрационного сервера используйте `NODE_ENV=production` и собранное приложение.

## База данных и миграции

Подключение PostgreSQL задаёт `DATABASE_URL`. Во всех окружениях установлен `push: false`: изменения схемы применяются только через [миграции Payload](https://payloadcms.com/docs/database/migrations).

```bash
pnpm payload migrate:create describe_the_change
pnpm payload migrate
```

Проверяйте сгенерированный SQL и сохраняйте вместе изменение схемы, `.ts`-миграцию, `.json`-снимок и обновлённый `src/migrations/index.ts`. Типы обновляйте через `pnpm generate:types`.

История начинается с объединённой миграции `20260908_222040_initial`, создающей схему в пустой базе. После неё добавляются новые миграции. Не применяйте эту начальную миграцию поверх базы со старой историей и не изменяйте уже применённые миграции. Команда `migrate:fresh` удаляет данные; для обычных обновлений используется `migrate`.

## Загружаемые файлы

По умолчанию Payload сохраняет загрузки в `public/media` и выдаёт их через `/api/media/file/<filename>`. Записи о файлах находятся в PostgreSQL; сами файлы хранятся отдельно.

Для контейнера задайте абсолютный путь `MEDIA_UPLOAD_DIR=/data/media` и подключите к нему постоянный том. Встроенные изображения `public/media/block` входят в репозиторий: том для пользовательских загрузок не должен перекрывать этот каталог. При переносе уже заполненной базы отдельно перенесите оригиналы загрузок и все сгенерированные размеры.

## Структура

- `src/collections` — страницы, статьи, медиа, категории и пользователи.
- `src/globals` — общие данные шапки и подвала.
- `src/blocks` — блоки страниц.
- `src/app` — сайт, админка и API.
- `src/migrations` — схема PostgreSQL и история изменений.
- `src/email/smtp.ts` — настройка SMTP.

## Особенности проекта

### Копирование локализации Globals

Для Payload UI 3.88.0 применяется [pnpm-патч](patches/@payloadcms__ui@3.88.0.patch), исправляющий поиск конфигурации Global в действии `Copy to locale`. Он зарегистрирован в `pnpm.patchedDependencies` и применяется при установке зависимостей. Каталог `patches` должен быть доступен и при сборке Docker-образа.

При обновлении Payload обновляйте `payload` и пакеты `@payloadcms/*` вместе. Удаляйте патч только после проверки официального исправления и копирования локализации для Header и Footer.

### Типографика

Форматируйте текст при отображении: `applyTypography(text, { locale })` для строк и общий `RichText` для Lexical. `SectionHeading`, `HighlightedText`, `Eyebrow` и `CMSLink` уже обрабатывают типографику — передавайте им локаль без повторного форматирования. В CMS сохраняется исходный текст.

Подробности: [типографика](src/utilities/typography.md), [UI-компоненты](src/components/ui/README.md).
