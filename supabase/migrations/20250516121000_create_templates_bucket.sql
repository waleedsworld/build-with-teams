
-- Create a storage bucket for templates
INSERT INTO storage.buckets (id, name, public)
VALUES ('templates', 'templates', true);

-- Set up a policy to allow public read access to templates
CREATE POLICY "Allow public read access to templates" 
ON storage.objects
FOR SELECT
USING (bucket_id = 'templates');

-- Set up a policy to allow authenticated uploads to templates
CREATE POLICY "Allow authenticated uploads to templates" 
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'templates' AND auth.role() = 'authenticated');
