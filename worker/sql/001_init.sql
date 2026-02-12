CREATE TABLE IF NOT EXISTS auth_users (
  user_id TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at INTEGER DEFAULT (cast((julianday('now') - 2440587.5) * 86400000 as integer)),
  updated_at INTEGER DEFAULT (cast((julianday('now') - 2440587.5) * 86400000 as integer)),
  last_login_at INTEGER
);

CREATE UNIQUE INDEX IF NOT EXISTS auth_users_email_unique ON auth_users(email);

CREATE TABLE IF NOT EXISTS auth_sessions (
  session_id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL,
  created_at INTEGER DEFAULT (cast((julianday('now') - 2440587.5) * 86400000 as integer)),
  expires_at INTEGER NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  FOREIGN KEY (user_id) REFERENCES auth_users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS password_reset_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  token TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_password_reset_email ON password_reset_requests(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_requests(token);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  company_size TEXT NOT NULL,
  primary_hazard TEXT NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
