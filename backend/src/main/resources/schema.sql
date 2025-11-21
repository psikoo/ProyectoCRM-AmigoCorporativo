-- ================================
-- USERS (CRM internal users)
-- ================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'sales_rep', -- admin, manager, sales_rep
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- ACCOUNTS (Companies/Organizations)
-- ================================
CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(200),
    phone VARCHAR(50),
    address TEXT,
    owner_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- CONTACTS (People associated with Accounts)
-- ================================
CREATE TABLE contacts (
    contact_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(50),
    position VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- LEADS (Potential clients not yet qualified)
-- ================================
CREATE TABLE leads (
    lead_id SERIAL PRIMARY KEY,
    source VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, unqualified
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(50),
    owner_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- DEALS / OPPORTUNITIES
-- ================================
CREATE TABLE deals (
    deal_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    deal_name VARCHAR(200) NOT NULL,
    stage VARCHAR(50) NOT NULL, -- lead, qualified, proposal, negotiation, closed_won, closed_lost
    amount NUMERIC(12,2),
    probability INT CHECK (probability BETWEEN 0 AND 100),
    close_date DATE,
    owner_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- ACTIVITIES (Tasks, calls, emails)
-- ================================
CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- call, meeting, email, task
    description TEXT,
    due_date TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    related_account INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    related_contact INT REFERENCES contacts(contact_id) ON DELETE CASCADE,
    related_deal INT REFERENCES deals(deal_id) ON DELETE CASCADE,
    owner_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- NOTES
-- ================================
CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    related_account INT REFERENCES accounts(account_id) ON DELETE CASCADE,
    related_contact INT REFERENCES contacts(contact_id) ON DELETE CASCADE,
    related_deal INT REFERENCES deals(deal_id) ON DELETE CASCADE,
    owner_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- TAGS & Tag assignments
-- ================================
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tagged_entities (
    tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL, -- 'account', 'contact', 'deal', etc.
    entity_id INT NOT NULL,
    PRIMARY KEY(tag_id, entity_type, entity_id)
);
