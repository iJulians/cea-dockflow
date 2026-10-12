import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function App() {
  return (
    <main className="min-h-screen bg-background p-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>CEA DockFlow</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Badge>Operacional</Badge>

          <p className="text-sm text-muted-foreground">
            Sistema de gerenciamento de docas.
          </p>

          <Button>Nova movimentação</Button>
        </CardContent>
      </Card>
    </main>
  );
}