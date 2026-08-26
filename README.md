# BugAnalyzer

## Description

A backend application that analyzes backend errors using **Google Gemini**.

The application receives a bug report, sends it to Gemini for analysis, validates the response using **Zod**, and saves both the bug and analysis in **PostgreSQL**.

## Features

- Backend error analysis using Google Gemini
- Bug priority classification
- Error category classification
- Probable root cause detection
- Suggested fix generation
- Confidence score
- PostgreSQL persistence
- Request and AI response validation with Zod
- Simple authentication
- Centralized error handling
- PostgreSQL transactions

## OOP

This project uses object-oriented programming in selected parts of the backend.
Since the project is relatively small this is not necessary from a practical perspective. They were introduced primarily for educational purposes and to gain hands-on experience with OOP in a backend application.

## Technologies

- [**Node.js**](https://nodejs.org/)
- [**Express**](https://expressjs.com/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Zod**](https://zod.dev/)
- [**Google Gemini**](https://ai.google.dev/)
- [**Supabase**](https://supabase.com/)
- [**PostgreSQL**](https://www.postgresql.org/)
- [**node-postgres**](https://node-postgres.com/)

## Project Structure

```text
BugAnalyzer
│
├── src
│   ├── config
│   ├── errors
│   ├── middlewares
│   ├── modules
│   │   └── bug
│   └── utils
│
└── supabase
```

## API

| Method | Endpoint            | Description                                       |
| ------ | ------------------- | ------------------------------------------------- |
| GET    | `/health`           | Check if the API is running.                      |
| POST   | `/api/bugs/analyze` | Analyze a bug using Gemini and save the result.   |
| GET    | `/api/bugs`         | Get all stored bugs together with their analyses. |

## AI Analysis

Gemini analyzes each bug and returns:

```json
{
  "priority": "P2",
  "category": "API",
  "probableCause": "Invalid request data is being sent to the API.",
  "suggestedFix": "Validate the request body before processing it.",
  "confidence": 0.91
}
```

Available priorities:

- P1 = critical functionality is unavailable or the application is severely affected.
- P2 = important functionality is broken or significantly degraded.
- P3 = limited impact or a workaround exists.
- P4 = minor issue with low impact.

Available categories:

- DATABASE
- API
- AUTH
- CONFIGURATION
- BUSINESS_LOGIC
- EXTERNAL_SERVICE
- UNKNOWN

## Database

The application uses two PostgreSQL tables:

- bugs
- bug_analysis

The analysis references the original bug using a foreign key.

Saving a bug and its analysis is performed inside a database transaction.

## Environment Variables

Create a `.env` file:

```env
PORT=5000

POSTGRES_HOST=
POSTGRES_PORT=5432
POSTGRES_DATABASE=
POSTGRES_USER=
POSTGRES_PASSWORD=

GEMINI_API_KEY=
SECRET_KEY=
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ZajacMateusz1/BugAnalyzer.git && cd BugAnalyzer
```

Install dependencies:

```bash
npm install
```

Configure `.env` file.

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

## Future Improvements

- Add pagination
- Add filtering and search
- Add automated tests
- Add frontend dashboard
