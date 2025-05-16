
-- Create a storage bucket for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true);

-- Set up a policy to allow public read access to videos
CREATE POLICY "Allow public read access to videos" 
ON storage.objects
FOR SELECT
USING (bucket_id = 'videos');

-- Set up a policy to allow public uploads to videos
CREATE POLICY "Allow public uploads to videos" 
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'videos');

-- Set up a policy to allow public updates to videos
CREATE POLICY "Allow public updates to videos" 
ON storage.objects
FOR UPDATE
USING (bucket_id = 'videos');

-- Set up a policy to allow public deletes from videos
CREATE POLICY "Allow public deletes from videos" 
ON storage.objects
FOR DELETE
USING (bucket_id = 'videos');
