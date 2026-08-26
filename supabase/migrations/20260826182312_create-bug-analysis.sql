CREATE TABLE IF NOT EXISTS bug_analysis (
    id SERIAL PRIMARY KEY,
    bug_id INT NOT NULL,
    priority VARCHAR(2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    probable_cause TEXT NOT NULL,
    suggested_fix TEXT NOT NULL,
    confidence Numeric(3, 2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bug
        FOREIGN KEY (bug_id)
        REFERENCES bugs(id)
        ON DELETE CASCADE
);