-- 1. ROLES
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  permissions CLOB DEFAULT '{}'
);
-- 2. USERS
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);
-- 3. ACCOUNTS
CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  website VARCHAR(255),
  phone VARCHAR(50),
  address CLOB,
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);
-- 4. CONTACTS
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT,
  first_name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150),
  email VARCHAR(255),
  phone VARCHAR(50),
  job_title VARCHAR(255),
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX idx_contacts_email ON contacts(email);
-- 5. PIPELINES
CREATE TABLE pipelines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 6. PIPELINE STAGES
CREATE TABLE pipeline_stages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pipeline_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  stage_order INT NOT NULL,
  FOREIGN KEY (pipeline_id) REFERENCES pipelines(id) ON DELETE CASCADE,
  UNIQUE(pipeline_id, stage_order)
);
-- 7. DEALS
CREATE TABLE deals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT,
  contact_id INT,
  name VARCHAR(255) NOT NULL,
  amount DECIMAL(12, 2),
  pipeline_id INT,
  stage_id INT,
  status VARCHAR(20) DEFAULT 'open',
  close_date DATE,
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL,
  FOREIGN KEY (pipeline_id) REFERENCES pipelines(id) ON DELETE SET NULL,
  FOREIGN KEY (stage_id) REFERENCES pipeline_stages(id) ON DELETE SET NULL,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);
-- 8. ACTIVITIES
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50),   -- call, meeting, email, task, note
  subject VARCHAR(255),
  description CLOB,
  due_date DATE,
  status VARCHAR(20) DEFAULT 'open',
  owner_id INT,
  account_id INT,
  contact_id INT,
  deal_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL,
  FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE SET NULL
);
-- 9. EMAIL MESSAGES
CREATE TABLE email_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT,
  user_id INT
  direction VARCHAR(20), -- inbound/outbound
  subject VARCHAR(255),
  body CLOB,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
-- 10. TAGS
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
-- ACCOUNT TAGS (Many-to-Many)
CREATE TABLE account_tags (
  account_id INT,
  tag_id INT,
  PRIMARY KEY (account_id, tag_id),
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
-- CONTACT TAGS
CREATE TABLE contact_tags (
  contact_id INT,
  tag_id INT,
  PRIMARY KEY (contact_id, tag_id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
-- DEAL TAGS
CREATE TABLE deal_tags (
  deal_id INT,
  tag_id INT,
  PRIMARY KEY (deal_id, tag_id),
  FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
-- 11. CUSTOM FIELDS
CREATE TABLE custom_fields (
  id INT AUTO_INCREMENT PRIMARY KEY,
  entity_type VARCHAR(50),
  name VARCHAR(255) NOT NULL,
  field_type VARCHAR(50)
);
-- 12. CUSTOM FIELD VALUES
CREATE TABLE custom_field_values (
  id INT AUTO_INCREMENT PRIMARY KEY,
  custom_field_id INT,
  entity_id INT NOT NULL,
  field_value CLOB,
  FOREIGN KEY (custom_field_id) REFERENCES custom_fields(id) ON DELETE CASCADE
);
