# PROJECT_CONTEXT — BEM (Brazilian Edible Mushrooms)

> Documento de contexto para ferramentas de IA. Cobre o frontend (este repositório, `BEM-portal`) e o backend irmão (`../BEM-api`). Não contém segredos: só **nomes** de variáveis de ambiente.

## 1. Objetivo

O BEM é um banco de dados científico e portal de divulgação sobre cogumelos comestíveis brasileiros (UNEB / G2BC). Ele mostra taxonomia, características, distribuição, observações (iNaturalist, Mushroom Observer, speciesLink, BOLD), status IUCN e referências de cada espécie. Também tem um painel interno onde curadores e admins editam espécies, revisam sugestões da comunidade e gerenciam usuários.

- Produção: `https://bem.uneb.br` (front) e `api.bem.uneb.br` (API).
- Repositórios: `G2BC/BEM-portal` (React) e `G2BC/BEM-api` (Flask).

---

## 2. Stack e versões

### Frontend (`package.json`, versão do app 1.9.0)

| Área        | Lib / versão                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime     | Node 22 (`.nvmrc`, Dockerfile `node:22-alpine`). O README diz "Node 20+"                                                                                          |
| Linguagem   | TypeScript ~5.8.3 (strict, `noUnusedLocals/Parameters`, `erasableSyntaxOnly`)                                                                                     |
| Build       | Vite ^6.3.5, `@vitejs/plugin-react` ^4.4.1, `vite-plugin-svgr`, `vite-plugin-pwa` ^1.1, `vite-plugin-sitemap`, `vite-prerender-plugin`                            |
| UI          | React ^19.1, Tailwind CSS ^4.1.8 (`@tailwindcss/vite`), shadcn/ui (estilo new-york, Radix UI), lucide-react, react-icons, sweetalert2, vaul, embla-carousel, cmdk |
| Roteamento  | react-router ^7.6.2 (modo declarativo `<Routes>`)                                                                                                                 |
| Dados       | axios ^1.12, @tanstack/react-query ^5.96 (+ devtools só em DEV)                                                                                                   |
| Estado      | zustand ^5.0.5 (com `persist`)                                                                                                                                    |
| Formulários | react-hook-form ^7.63 + @hookform/resolvers ^5.2 + zod ^4.1                                                                                                       |
| i18n        | i18next ^25, react-i18next ^15, i18next-browser-languagedetector, i18n-iso-countries                                                                              |
| Mapas       | leaflet ^1.9.4 + react-leaflet ^5                                                                                                                                 |
| Qualidade   | ESLint ^9 (flat config, typescript-eslint, react-hooks, prettier), Prettier 3.5.3, Husky ^9 + lint-staged                                                         |
| Env         | `dotenv` (lê `.env` / `.env.vault` no `vite.config.ts`)                                                                                                           |

### Backend (`../BEM-api/pyproject.toml`)

| Área      | Lib / versão                                                                                                          |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| Runtime   | Python `>=3.12,<3.13`, gerenciado com **uv** (`uv.lock`)                                                              |
| Web       | Flask 3.1.3, flask-smorest 0.44.0 (OpenAPI/Swagger em `/docs`), marshmallow 3.26.2, webargs 8.6.0, gunicorn 23.0.0    |
| Banco     | SQLAlchemy 2.0.46, Flask-SQLAlchemy 3.1.1, Flask-Migrate 4.1.0 / Alembic 1.14.1, psycopg2-binary 2.9.9. PostgreSQL 17 |
| Auth      | Flask-JWT-Extended 4.6.0. Hash de senha do werkzeug                                                                   |
| Infra     | Redis 7 (`redis` 5.2.1) para cache e locks, MinIO via boto3 1.40.x (fotos e snapshots)                                |
| Outros    | biopython 1.85 (NCBI), pandas/openpyxl/numpy (snapshots XLSX/JSON), requests, sentry-sdk, python-dotenv-vault         |
| Qualidade | ruff 0.12.12 (line-length 100, regras E,F,I,UP), pre-commit                                                           |

---

## 3. Estrutura de pastas e camadas

### Frontend (`src/`)

```
src/
  main.tsx              Bootstrap: initI18n → QueryClientProvider → BrowserRouter → AuthBootstrap → Router
  router.tsx            Todas as rotas (lazy), prefixo /:lang, guards
  prerender.ts          Prerender/SEO (títulos, descrições, meta) das rotas públicas
  api/                  Camada HTTP
    index.ts            Instância axios `API` (baseURL VITE_API_URL, header X-API-Key, timeout 30s)
    setup-interceptors.ts  Registra auth-interceptor + errors-interceptor (importado no main)
    auth-interceptor.ts    Injeta Bearer e faz refresh automático no 401 (com dedupe de refresh)
    errors-interceptor.ts  Mostra erros globais em modal SweetAlert (fila com deduplicação, mensagens bilíngues)
    error-silencer.ts      runWithSilencedApiErrors(fn): suprime o modal global
    get-localized-error.ts Extrai message_pt / message_en do erro
    query-keys.ts          Fábricas de query keys (speciesKeys, changeRequestKeys, userKeys)
    auth/ species/ contact/ snapshot/   Funções por domínio + tipos (I*.ts)
    types/                 Tipos compartilhados (IPagination, ISelect, IReference, IDistribution...)
  auth/bootstrap.ts     Restaura a sessão no load (refresh + /auth/me)
  stores/               zustand: useAuthStore (sessionStorage), useLanguageStore (localStorage)
  components/           Componentes globais (header, footer, layouts, guards, comboboxes async, alert)
    ui/                 Componentes shadcn (gerados, fora do ESLint, não editar à mão sem necessidade)
  pages/<pagina>/       Uma pasta por página: index.tsx + use<Pagina>Page.ts(x) + components/ + schema.ts/types.ts/utils.ts/constants.ts
  hooks/                Hooks genéricos (useIsMobile, useIucnIcon, useBEMFlags, useLangRedirect...)
  lib/                  i18n, lang (locales), query-client, utils (cn), nomes de países
  constants/            Classificações BEM, status IUCN, estados do Brasil
  locales/pt.json en.json   Traduções (pt é a fonte; validadas por scripts/validate-locales.mjs)
  utils/                Helpers puros
```

**Fluxo:** `page (index.tsx)` → `hook da página (use*Page)` → `useQuery/useMutation` → `api/<domínio>` → `API (axios + interceptors)` → BEM-api.

### Backend (`../BEM-api/app/`)

```
app/
  __init__.py      create_app(): Sentry, config, CORS, db, jwt, Migrate, Api(smorest), handlers JWT bilíngues,
                   before_request (API key + bloqueio por must_change_password), rotas / e /health
  config/          Config (lê env), cors.py (CORS manual)
  extensions/      db (SQLAlchemy), jwt (JWTManager)
  exceptions.py    AppError(pt, en, status), AppPermissionError, AppRuntimeError
  routes/          Blueprints flask-smorest (MethodView): HTTP, parse, try/except → bilingual_response
  services/        Regras de negócio (classes com métodos estáticos), lançam AppError
    species_change_request/   service, validation (tradução DeepL), storage (MinIO), enrichment
  repositories/    Acesso ao banco (queries, paginate, commit)
  models/          Um arquivo por tabela (inclui as tabelas de associação)
  schemas/         Marshmallow: validação de entrada e serialização de saída
  utils/           bilingual, permissions, require_api_key, pagination, object_storage, send_email, ...
migrations/        Alembic (4 revisões)
scripts/           sync_*.py (SyncRunner), snapshot_db.py, cleanup_species_tmp_uploads.py, old/
wsgi.py
```

**Fluxo:** `before_request (API key, troca de senha)` → `routes` (decorators `@require_*`, `@bp.arguments(Schema)`, `@bp.response`) → `services` → `repositories` → `models` → o schema serializa a resposta.

---

## 4. Padrões e convenções

### Frontend

- **Nomes:** arquivos em kebab-case (`species-actions-menu.tsx`). Há exceções em `pages/species/components/` (camelCase: `taxonomyCard.tsx`) e em `useExplorePage.tsx`. Hooks se chamam `use*`, tipos de API usam o prefixo `I` (`ISpecie`). Algumas funções de API têm nome em PT (`searchEspecies`, variável `resposta`).
- **Rotas em PT**, sempre com prefixo de idioma: `/:lang/explorar`, `/:lang/painel/especies/:species/editar`. Idiomas: `pt` (padrão) e `en`.
- **Padrão de página:** a lógica fica no hook `use*Page` e o componente só renderiza. Formulários usam `react-hook-form` + `zodResolver`, e os schemas zod são **fábricas que recebem `t`** (`createSpeciesEditSchema(t)`) para ter mensagens traduzidas.
- **Dados de servidor:** React Query com as keys de `api/query-keys.ts`. Padrões: `staleTime` 2 min, `retry` 1, sem refetch ao focar a janela. As mutations invalidam as keys relacionadas. As funções de API recebem `signal` para cancelar requisições.
- **Tratamento de erros:** centralizado no `errors-interceptor` (modal global). Ele prioriza `message_pt`/`message_en`, depois `detail`, depois `errors` (422 do marshmallow). Para tratar o erro localmente, use `runWithSilencedApiErrors` + `getLocalizedError`. O helper `Alert` (SweetAlert, cor `#E64420`) também serve para confirmações (`confirm-action.ts`).
- **Auth:** access e refresh token no `useAuthStore` (sessionStorage). O refresh automático no 401 usa o header `X-Skip-Auth-Refresh` para evitar loop. `AuthGuard` aceita `requireAdmin`, `requireCurator` e `requireUser`, e redireciona para `/trocar-senha` se `mustChangePassword`.
- **Papéis:** `researcher` | `curator` | `admin`.
- **i18n:** todo texto visível passa por `t("...")`. Chaves novas vão em `pt.json` **e** `en.json` (a CI roda `validate:locales`, que confere chaves, tipos e placeholders).
- **Estilo:** Prettier (aspas duplas, `;`, printWidth 100, trailingComma es5). ESLint proíbe `console` (`no-console: error`). Alias `@/` → `src/`.
- **Scripts npm:** `dev`, `build` (`tsc -b && vite build`), `lint`, `lint:fix`, `prettier:format`, `prettier:check`, `validate:locales`, `preview`. O pre-commit (husky) roda `lint-staged` (eslint --fix + prettier).

### Backend

- **Nomes:** snake*case: `*_routes.py`, `*_service.py`, `*_repository.py`, `*_schemas.py`. Blueprints `<entidade>_bp` / `admin*<entidade>_bp`. Constantes no model (`User.ROLE__`, `SpeciesChangeRequest.STATUS\__`). Tabelas no plural.
- **Erros:** os services lançam `AppError(pt=..., en=..., status=...)` e as rotas capturam e devolvem `{"code","status","message_pt","message_en"}` (`utils/bilingual.py`). Não existe errorhandler global: cada rota repete o try/except. Erros de schema seguem o padrão do smorest (422 `{"errors": ...}`, não bilíngue).
- **Validação:** schemas marshmallow via `@bp.arguments`. Parte é feita manualmente (query params de `/species`, contato).
- **Auth:** JWT com claims `role`, `is_admin`, `is_curator`, `email`, `must_change_password`. `@require_admin` / `@require_curator_or_admin` (`utils/permissions.py`). Access token de 4 h, refresh de 30 dias. O model `User` tem `is_active` com padrão `False`, mas `UserService.create_user` cria o usuário **já ativo** (`is_active=True`). O fluxo de aprovação (`/admin/users/<id>/approve`, mensagem "Aguarde aprovação") existe, mas na prática não é usado no cadastro (ver dívidas). Se o token tiver `must_change_password`, todas as rotas, exceto login, refresh, change-password, `/`, `/health` e `/docs`, respondem 403 com `must_change_password: true`.
- **Campos bilíngues:** sem sufixo = inglês, `_pt` = português (`curiosities` / `curiosities_pt`). Nos lookups: `slug`, `label_en`, `label_pt`.
- **Serialização:** em `SpeciesChangeRequestSchema`, os IDs (`id`, `species_id`, `*_user_id`) saem como **string**. Em `SpeciesDetailSchema`, `mycobank_index_fungorum_id`, `inaturalist_taxon_id` e `unite_taxon_id` também saem como string.
- **Solicitações de alteração:** os textos traduzíveis são traduzidos automaticamente com DeepL a partir de `source_lang` (`pt`/`en`). Os campos aceitos estão em `SpeciesChangeRequestService.ALLOWED_SPECIES_FIELDS`.
- **API key:** header `X-API-Key`, checado no `before_request` para `/admin`, `/auth`, `/registrations`, `/species`, `/species-change-requests` e `/contact-messages`.
- **Paginação:** `{items, total, page, per_page, pages}`. Sem `page`/`per_page` a lista vem inteira (com `null`s).
- **Cache Redis** (falha silenciosa): observações e NCBI, TTL de 24 h, header `X-Cache: HIT|MISS`.
- **Uploads:** em três passos.

  1. O front pede a URL presigned POST em `.../upload-urls`.
  2. Faz um POST multipart direto no MinIO (`url` + `fields` + `file`), no bucket temporário.
  3. Envia o `object_key` para a API.

  Na aprovação, o arquivo é copiado para o bucket final (público). Limites padrão: 5 MB, jpeg/png/webp/gif, até 5 fotos por solicitação (`SPECIES_PHOTO_MAX_BYTES`, `SPECIES_PHOTO_ALLOWED_MIME_TYPES`, `SPECIES_REQUEST_MAX_PHOTOS`).

- **Scripts:** `scripts/sync_base.py` (`SyncRunner`) faz lock e checkpoint diário no Redis, processa por grupo BEM com pausa e tem limite de tempo de execução. Filtro com `BEM_ID=1,2`. As subclasses implementam `get_species_rows`/`sync_species`. Rodam por workflows agendados (GitHub Actions, runner self-hosted): BOLD, iNaturalist (+ fotos), speciesLink, Mushroom Observer, IUCN, MycoBank e snapshot (manual).

---

## 5. Backend: models

| Model (tabela)                                                                       | Campos relevantes                                                                                                                                                                                                                                                                                    | Relações                                                                                                           |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `User` (`users`)                                                                     | id, name, institution?, email **unique**, password (hash), role (`researcher`/`curator`/`admin`), is_admin, is_active (padrão False), must_change_password, created_at                                                                                                                               | CHECK `(role='admin') = is_admin`                                                                                  |
| `Species` (`species`)                                                                | id, uid (uuid) unique, **scientific_name unique**, common_name, bem (código BEM1–10/P1/P2), brazilian_type, brazilian_type_synonym, dna, type_country, mycobank_index_fungorum_id, inaturalist/ncbi/unite/mushroom_observer ids (unique), iucn_redlist, is_visible, is_outdated_mycobank, timestamps | 1:1 `Taxon`, 1:1 `SpeciesCharacteristics`; 1:N photos, observations, similarities; M:N `Distribution`, `Reference` |
| `Taxon` (`taxonomies`)                                                               | species_id unique FK, kingdom…genus, section, specific_epithet, synonyms, basionym, name_type, authors, years_of_effective_publication                                                                                                                                                               | 1:1 Species                                                                                                        |
| `SpeciesCharacteristics` (`species_characteristics`)                                 | PK species_id, cultivation_possible, pares EN/`_pt` (cultivation, finding_tips, nearby_trees, curiosities, general_description, colors), conservation_status, size_cm, season_start/end_month, iucn_assessment_year/url                                                                              | M:N `GrowthForm`, `Substrate`, `NutritionMode`, `Habitat`, `DecayType`                                             |
| Lookups (`growth_forms`, `substrates`, `nutrition_modes`, `habitats`, `decay_types`) | id, slug unique, label_pt, label_en, is_active                                                                                                                                                                                                                                                       | via `species_characteristics_<lookup>`                                                                             |
| `Distribution` (`distributions`)                                                     | id, slug unique, label_pt, label_en                                                                                                                                                                                                                                                                  | M:N via `species_distributions`                                                                                    |
| `Reference` (`references`)                                                           | id, apa, doi, url (pelo menos um preenchido)                                                                                                                                                                                                                                                         | M:N via `species_references`                                                                                       |
| `SpeciesPhoto` (`species_photos`)                                                    | PK (species_id, photo_id), medium_url, original_url, license_code, attribution, rights_holder, source_url, source (padrão iNaturalist), featured                                                                                                                                                     | FK Species                                                                                                         |
| `SpeciesSimilarity` (`species_similarities`)                                         | PK (species_id, similar_species_id)                                                                                                                                                                                                                                                                  | auto-relação de Species (sem auto-referência)                                                                      |
| `Observation` (`observations`)                                                       | species_id, source (`inaturalist`/`mushroom_observer`/`specieslink`/`bold`), external_id, lat/long, location_obscured, observed_on, quality_grade, photo_url, url                                                                                                                                    | UNIQUE (source, external_id)                                                                                       |
| `SpeciesChangeRequest` (`species_change_requests`)                                   | species_id, requested_by_user_id?, reviewed_by_user_id?, requester_name/email/institution, request_note, **proposed_data JSON**, status (`pending`/`approved`/`partial_approved`/`rejected`), review_note, reviewed_at                                                                               | 1:N `SpeciesPhotoRequest`                                                                                          |
| `SpeciesPhotoRequest` (`species_photo_requests`)                                     | request_id, object_key, bucket_name, mime_type, size_bytes, checksum_sha256, caption, licença/atribuição, status                                                                                                                                                                                     | FK ChangeRequest                                                                                                   |

Migrações: `724366db099e_init` → `74520b823115` → `151dca54bb38` → `2b6d7f8e9a10`.

## 6. Backend: endpoints

**Sistema (sem API key):** `GET /`, `GET /health`, `GET /docs`, `GET /openapi.json`

**Público (API key):**

- `GET /species`: busca e lista (`search`, `country`, `bem`, `conservation` CSV, `distributions` CSV, `is_visible`, `page`, `per_page`)
- `GET /species/options/{countries|bem|species|domains|distributions}`: opções para selects
- `GET /species/statistics`, `GET /species/distribution-statistics`
- `GET /species/<id>` e `GET /species/by-name/<name>`: detalhe
- `GET /species/<id>/ncbi` e `GET /species/by-name/<name>/ncbi`: dados do NCBI (cache)
- `GET /species/<id>/observations?source`: observações (cache)
- `GET /snapshots/latest/download?lang&format&version`: URL presigned do snapshot (sem API key)

**Auth (API key):** `POST /auth/login` (401 para credenciais inválidas, 403 para conta inativa), `POST /auth/refresh` (refresh JWT), `GET /auth/me`, `POST /auth/change-password` (devolve tokens novos), `POST /registrations` (201 com tokens; o usuário já nasce ativo)

**Contribuição (API key, JWT opcional):** `POST /species-change-requests`, `POST /species-change-requests/upload-urls`, `POST /contact-messages`

**Admin de usuários (`require_admin`):** `GET /admin/users`, `PATCH /admin/users/<id>/approve`, `PATCH /admin/users/<id>/deactivate`, `POST /admin/users/<id>/reset-password`, `PATCH /admin/users/<id>/role`. Também `PATCH /admin/users/me` (perfil do próprio usuário, só com JWT do hook).

**Curadoria (`require_curator_or_admin`):**

- `GET /admin/species/outdated`, `POST /admin/species`, `PATCH|DELETE /admin/species/<id>`
- `POST /admin/species/<id>/photo-upload-urls`, `POST /admin/species/<id>/photos`, `PATCH|DELETE /admin/species/<id>/photos/<photo_id>`
- `POST /admin/species/<id>/reference-associations`, `POST /admin/species/<id>/references`, `DELETE /admin/species/<id>/references/<ref_id>` (apaga a referência se ela ficar sem nenhuma espécie)
- `GET /admin/references/options`, `PATCH /admin/references/<id>`
- `GET /admin/species-change-requests`, `GET /admin/species-change-requests/<id>`, `PATCH /admin/species-change-requests/<id>/review` (aceita aprovação parcial), `POST /admin/species-change-requests/temp-uploads/cleanup`

---

## 7. Frontend: páginas, componentes, API e estado

### Páginas (todas sob `/:lang`)

| Rota                                                                                                                                                       | Página                                                                                                                                                             | Acesso           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `/` (index)                                                                                                                                                | `pages/home` (hero)                                                                                                                                                | público          |
| `explorar`                                                                                                                                                 | `pages/explore`: busca com filtros (BEM, distribuição, conservação), scroll infinito, barra de estatísticas                                                        | público          |
| `especie/:species`                                                                                                                                         | `pages/species`: cards de taxonomia, características, cultivo, conservação, mapa de observações (Leaflet), molecular/NCBI, bibliografia, similares, links externos | público          |
| `distribuicao`                                                                                                                                             | `pages/distribution.tsx`: mapa por estado com classificações BEM                                                                                                   | público          |
| `sobre`, `publicacoes`, `glossario`, `guia`, `colaboradores`, `contato`, `dados` (download de snapshot)                                                    | páginas institucionais                                                                                                                                             | público          |
| `login`, `cadastro`, `trocar-senha`                                                                                                                        | auth                                                                                                                                                               | público / sessão |
| `painel`                                                                                                                                                   | `pages/panel` (layout com sidebar) → `overview`, `profile`                                                                                                         | logado           |
| `painel/especies`, `especies/:species/detalhes`, `especies/:species/solicitar-atualizacao` (`pages/species-request`, wizard em etapas com upload de fotos) |                                                                                                                                                                    | logado           |
| `painel/usuarios`                                                                                                                                          | gestão de usuários                                                                                                                                                 | admin            |
| `painel/especies/cadastro`, `/desatualizadas`, `/:species/{editar,fotos,referencias}`, `painel/solicitacoes`                                               | curadoria                                                                                                                                                          | curador/admin    |

Rotas públicas pré-renderizadas (SEO): home, explorar, sobre, publicacoes, distribuicao, contato e colaboradores, em pt e en.

### Componentes principais

`base-layout`, `header`/`header-nav`/`header-menu-nav`, `footer`, `auth-guard`, `language-guard`, `auth-bootstrap`, `route-aware-loader`, `combobox-async` (+ `species-combobox-async`, `domain-combobox-async`), `bem-icon`, `conservation-status-icon`, `country-type-icon`, `alert`, `confirm-action`, além de `components/ui/*` (shadcn).

### Chamadas à API

- Uma única instância `API` (axios) em `src/api/index.ts`, com funções por domínio em `src/api/<domínio>/index.ts`. Nunca use `fetch` direto. Use as funções existentes ou crie novas no módulo do domínio.
- Hoje há uma exceção: `pages/panel/profile.tsx` chama `API.patch("/admin/users/me")` direto.

### Estado

- **Servidor:** TanStack React Query (`src/lib/query-client.ts`, keys em `src/api/query-keys.ts`).
- **Global de cliente:** zustand. `useAuthStore` guarda tokens, usuário, `mustChangePassword` e `initialized`, em sessionStorage. `useLanguageStore` guarda o idioma, em localStorage.
- **URL:** os filtros de Explorar ficam nos search params.
- **Local:** `useState` e react-hook-form.

---

## 8. Como rodar localmente

### Frontend

```bash
nvm use                 # Node 22
npm install
cp .env.sample .env     # preencher (ou usar dotenv-vault)
npm run dev             # http://localhost:5173
```

- Variáveis (nomes): `VITE_SITE_URL`, `VITE_API_URL` (dev: `http://localhost:4000`), `VITE_API_KEY`, `VITE_ROBOTS`, `VITE_PUBLIC_STORAGE_BASE_URL`, `VITE_CLARITY_ID`, `NODE_ENV`. O build de produção usa `.env.vault` + `DOTENV_KEY`.
- Docker dev: `make run-dev` (`docker-compose.dev.yml`, alvo `dev`, porta 5173, com volume do código).
- Produção: imagem nginx (`docker-compose.yml`, porta 4002 → 80).
- Antes de abrir PR: `npm run lint`, `npm run validate:locales`, `npm run build`.

### Backend (`../BEM-api`)

1. `cp .env.example .env` e preencher. Também é preciso ter `docker/dev/minio/policies/app-policy.json` e `docker/dev/db-backup/backup.dump` (restaurado no primeiro boot do volume).
2. `docker compose -f docker-compose.dev.yml up --build`. Serviços:
   - `db`: Postgres 17, porta **5432**
   - `redis`: porta 6379
   - `minio`: portas 9000 e 9001 (console)
   - `minio-init`
   - `api`: porta **4000**
3. Em `APP_ENV=development`, o `entrypoint.sh` roda `uv run flask db upgrade` automaticamente. Teste com `curl http://localhost:4000/health`.
4. Para refazer o restore do banco: `docker compose -f docker-compose.dev.yml down -v` e subir de novo.

**Migrations:** `uv run flask db migrate -m "mensagem"` e depois `uv run flask db upgrade`. Em produção quem roda é o `deploy.yml` (`docker compose exec api flask db upgrade`).

**⚠️ Host do banco dentro e fora do Docker:**

- Dentro do Docker, o compose sobrescreve `DATABASE_URL` com host **`db:5432`**. O mesmo vale para `redis:6379` e `minio:9000`.
- Ao rodar **scripts ou a API fora do Docker** (no host, com `uv run python scripts/<script>.py`), o `DATABASE_URL` do `.env` precisa usar **`localhost:5432`**, porque o nome `db` só resolve na rede do compose. Faça o mesmo para Redis (`localhost:6379`) e MinIO (`MINIO_ENDPOINT=localhost:9000`).
- O padrão do `Config` é `...@db:5432/app`, então o script falha se a variável não for ajustada.

Scripts de sync: `BEM_ID=1,2 uv run python scripts/sync_inaturalist.py` (precisa de Redis para lock e checkpoint).

---

## 9. Fluxo de Git

- **Branches** saem da `main`:
  - `feature/BEM-XX-descricao-curta` (ex.: `feature/BEM-69-pintura-mapa-estados`);
  - `fix/BEM-XX-descricao` para correções.
  - `XX` é o número da tarefa no board.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `fix(BEM-69): ...`). Isso é **obrigatório na prática**, porque o semantic-release só gera versão a partir de `feat`/`fix`. Commits fora do padrão não geram release.
- **PR para a `main`:** a CI do front roda lint, validate:locales, build e scan Trivy com limite de EPV. A do back roda `uv lock --check` e Trivy/EPV.
- **Merge na `main`:**
  1. `release.yml` (semantic-release) atualiza `CHANGELOG.md` e a versão, e cria a tag e a release.
  2. `cd.yml` faz build e push da imagem no GHCR.
  3. `deploy.yml` faz o deploy no runner self-hosted.
  4. Depois roda o DAST (OWASP ZAP).
- Não crie commits `chore(main): release`: são gerados pelo bot.

---

## 10. Pontos de atenção e dívidas técnicas

### Frontend

1. **Sem testes:** não há nenhum `*.test`/`*.spec` nem runner de testes configurado.
2. **API key exposta:** `VITE_API_KEY` vai no bundle (`src/api/index.ts`), então na prática é pública. Ela não protege nada sozinha.
3. **Contato com destinatário hardcoded:** `src/api/contact/index.tsx` escolhe o e-mail de destino no cliente (e-mails pessoais no código) e manda no campo `to`. O backend aceita esse `to` (ver o item 1 do backend).
4. **Duplicação:** `activateUser` e `approveUser` (`src/api/auth/index.ts`) chamam o mesmo endpoint.
5. **Chamada direta à API** em `pages/panel/profile.tsx`, fugindo do padrão de `api/<domínio>`.
6. **Configs inconsistentes:**
   - `vite.config.ts` tem um host ngrok fixo em `server.allowedHosts`.
   - O `makefile` (`run-prod`) referencia `docker-compose.prod.yml`, que não existe.
   - `docker-compose.dev.yml` passa build args `VITE_API_URL`/`VITE_API_KEY` que o `Dockerfile` não declara.
   - O README pede Node 20+, o `.nvmrc` e a CI usam 22, e o `release.yml` usa 20.
   - O host da API está fixo (`api.bem.uneb.br`) no cache do PWA.
7. **Prerender duplicado:** a lista de rotas pré-renderizadas existe em `vite.config.ts` e em `src/prerender.ts` e precisa ser mantida igual nos dois lugares.
8. **Nomenclatura mista:** PT/EN (`searchEspecies`, `resposta`, `dados`), camelCase e kebab-case nos arquivos, e o typo `languege-switcher.tsx`.
9. **TODO** em `src/auth/bootstrap.ts:10`: falta remover um fallback antigo.
10. **Arquivos grandes:** `glossary/terms.ts` (~1100 linhas), `species/utils.ts` (~520) e `useSpeciesPhotosPage.ts` (~440) são candidatos a dividir.
11. **Histórico de Git:** há vários merges `Merge branch 'main' of ...` direto na main e alguns commits fora do Conventional Commits nas branches de feature.

### Backend

1. **Segurança, `/contact-messages`:** aceita `to` do cliente (envia e-mail para qualquer endereço com a API key) e interpola nome, assunto e mensagem no HTML sem escape (`app/routes/contact_routes.py`).
2. **Segurança, `PATCH /admin/users/me`:** não tem `@jwt_required` e depende do JWT opcional do hook global. A troca de e-mail não pede a senha atual.
3. **Permissões:** são lidas só da claim `role`. Um usuário rebaixado ou desativado mantém acesso até o token expirar (4 h).
4. **Fluxo de aprovação inconsistente:** `UserService.create_user` cria o usuário já ativo (`app/services/user_service.py:74`) e `POST /registrations` devolve tokens na hora. Mesmo assim, existem `/admin/users/<id>/approve`, o default `is_active=False` no model e a mensagem "Aguarde aprovação". É preciso decidir se a aprovação manual deve existir.
5. **`is_visible`:** é um filtro opcional enviado pelo cliente, então as rotas públicas podem devolver espécies ocultas. No front, a tela Explorar manda `is_visible=true`, mas `fetchSpecies` (`/species/by-name/...`, usado na página da espécie) **não manda**, e uma espécie oculta abre pela URL direta. O ideal é forçar o filtro no backend para quem não está autenticado.
6. **Vazamentos:** `scripts/snapshot_db.py` imprime a access key do MinIO no log, e o Sentry está com `send_default_pii=True`.
7. **Bug de ordenação:** em `species_repository.py`, `else_=8` coincide com a posição de `BEM9`. Os códigos BEM estão hardcoded.
8. **Sem testes e sem lint na CI:** o README diz o contrário. O ruff do pre-commit (v0.6.9) está diferente do ruff do pyproject (0.12.12).
9. **Sem errorhandler global:** o try/except se repete em todas as rotas. Erros 422 não são bilíngues. Há `except Exception` genéricos nas rotas (snapshot, contato, usuários, NCBI).
10. **Paginação inconsistente:** padrão 30 em espécies e 20 em usuários. `per_page` não tem limite máximo em espécies.
11. **`.env.example` incompleto:** faltam várias variáveis dos scripts (`IUCN_API_KEY`, `INATURALIST_*`, `SPECIESLINK_*`, `BEM_DB_VERSION`, entre outras).
12. **Dependências desnecessárias e config copiada:** `Flask-Cors` não é usado. O devcontainer se chama "LUMM Server", copiado de outro projeto.
13. **Ambiente dev:** depende de um `backup.dump` externo e não tem seed versionado. Há só 4 migrações, com uma init grande.
14. **Busca por nome:** usa `ilike` sem escapar `%`/`_` em `/species/by-name/`.
15. **Snapshot inexistente:** `GET /snapshots/latest/download` gera a URL presigned sem verificar se o objeto existe. Uma combinação inexistente de `version`/`lang`/`format` devolve uma URL que dá 404 no MinIO.
16. **Lógica de negócio nas rotas:** as observações e o cache são tratados direto na rota, e o HTML do e-mail de aprovação está inline em `user_routes.py`.
17. **Detalhes:**
    - `SpeciesService.distributions_select` não tem `@staticmethod`.
    - `reset-password` devolve a senha temporária no corpo da resposta (o front não deve logar nem persistir esse valor).
    - `send_email` não envia nada em `development`.
    - A IUCN pode bloquear chamadas locais via Cloudflare, então o sync dela deve rodar pelo runner self-hosted.
    - A collection Postman pode estar desatualizada. Prefira o Swagger (`/docs` em dev).
