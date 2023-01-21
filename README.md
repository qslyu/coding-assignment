## Development Setup

### Envronment variables

Set environment variables to .env

```bash .env
VITE_API_KEY=firebase api key
VITE_AUTH_DOMAIN=firebase auth admin
VITE_PROJECT_ID=firebase project id
VITE_STORAGE_BUCKET=firebase storage bucket
VITE_MESSAGING_SENDOR_ID=firebase messaging sendor id
VITE_APP_ID=firebase app id

VITE_DEFAULT_AVATAR_SRC= default avatar image url
```

### Run development server

```bash
pnpm i
pnpm dev
```

## Firebase security rules

firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /user/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId
    }
  }
}
```

cloud storage

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /user/{userId}/public/profile.jpg {
      allow read;
      allow write: if request.auth.uid == userId;
    }
    match /user/{userId}/public/profile.png {
      allow read;
      allow write: if request.auth.uid == userId;
    }
    match /default/profile.jpg {
      allow read;
    }
  }
}
```
