-- Create table for maturity assessment submissions
CREATE TABLE public.maturity_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  segmento TEXT NOT NULL,
  respostas JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.maturity_assessments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form, no auth required)
CREATE POLICY "Anyone can submit an assessment"
  ON public.maturity_assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read submissions
CREATE POLICY "Authenticated users can read assessments"
  ON public.maturity_assessments
  FOR SELECT
  TO authenticated
  USING (true);