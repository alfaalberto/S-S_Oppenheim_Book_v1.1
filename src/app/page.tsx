import { AppLayout } from '@/components/AppLayout';
import { SlidesProvider } from '@/contexts/SlidesContext';

export default function Home() {
  return (
    <SlidesProvider>
      <AppLayout />
    </SlidesProvider>
  );
}
