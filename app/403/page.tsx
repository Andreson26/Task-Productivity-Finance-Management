import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <p className="text-sm font-mono text-amber-500">Error 403</p>
        <h1 className="text-3xl font-bold">You’re not allowed here</h1>
        <p className="text-muted-foreground">
          You don’t have permission to access this page. If you think this is a
          mistake, contact the administrator.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="/dashboard" className="btn">
            Go to dashboard
          </Link>

          <Link href="/" className="btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}


