# Деплой в Netlify

Проект: https://app.netlify.com/projects/csf-cms

Production: https://csf-cms.netlify.app

Репозиторий `bpr-tech-team/csf-cms` подключён через Netlify GitHub App.
Production-ветка — `main`. Каждый push запускает сборку на Netlify.
Deploy keys не используются.

## Сборка

Настройки хранятся в `netlify.toml`: Node.js 24, pnpm 10.32.1,
команда `pnpm run build:netlify`, каталог `.next`.
Next.js runtime устанавливается Netlify автоматически.

Скрипт `scripts/netlify-build.mjs` сначала выполняет `payload migrate`,
затем `pnpm run build`. Ошибка миграции останавливает сборку.
Миграции Payload находятся в `src/migrations`; дублировать их в
`netlify/database/migrations` не нужно. Изменения схемы должны быть
совместимы с предыдущим деплоем, который работает во время сборки.
Откат деплоя не откатывает базу данных.

## База и переменные окружения

Netlify Database — управляемый PostgreSQL. Пакет `@netlify/database`
получает подключение из `NETLIFY_DB_URL`, предоставляемого платформой.
Локальная разработка продолжает использовать `DATABASE_URL` из `.env`.
В production автоматическое изменение схемы (`push`) выключено.

В Netlify UI → Environment variables для production настроены:

- `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `CRON_SECRET` — секретные значения;
- `NEXT_PUBLIC_SERVER_URL=https://csf-cms.netlify.app`;
- `NETLIFY_STORAGE_CONTEXT=production`.

Переменные должны быть доступны сборке и серверным функциям. Значения
в `netlify.toml` сами по себе не заменяют runtime-переменные из UI.
При подключении своего домена обновите `NEXT_PUBLIC_SERVER_URL` и
назначьте домен основным в Netlify.

SMTP на новом проекте отдельно не настроен. Для отправки писем и
восстановления пароля задайте production-переменные `SMTP_*` из `.env.example`.

## Медиа

На Netlify загруженные файлы сохраняются в постоянном Netlify Blobs store
`payload-media`. Payload обслуживает их через `/api/media/file/...`,
сохраняет MIME-тип и проверяет доступ стандартным механизмом CMS.
Локально используется прежний каталог `public/media`.

Production-секреты настроены только для production. Перед включением
Deploy Previews настройте отдельные секреты для этого контекста.
Preview использует изолированную ветку базы Netlify и хранилище медиа,
привязанное к конкретному деплою; медиа production туда не копируются.

## Первый запуск

База создаётся пустой, без переноса локальных данных. После успешного деплоя
откройте `/admin` и создайте первого администратора. Если включена защита
Netlify SSO, сначала войдите в Netlify. Затем добавьте контент через CMS.

Пока в CMS нет опубликованной страницы со slug `home`, главная показывает
404 (либо настроенный в CMS редирект). Демо-контент, меню и изображения
автоматически не подставляются. Заполните Header и Footer в разделе Globals;
изображения для блоков выбирайте из Media. Сидеры запускаются только явно.
