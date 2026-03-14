-- Temporary SQL to insert admin role
INSERT INTO user_roles (user_id, role) 
VALUES ('a0dec346-a558-4064-b49e-b0cd4b4d059d', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
