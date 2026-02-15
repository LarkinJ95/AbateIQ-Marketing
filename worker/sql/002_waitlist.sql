CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  phone TEXT,
  team_size TEXT,
  notes TEXT,
  source TEXT NOT NULL DEFAULT 'ios-release-modal',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_email ON waitlist_submissions(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_created_at ON waitlist_submissions(created_at);
