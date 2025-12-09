import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <section className="px-6 md:p-12 max-w-7xl mx-auto ">
      <h1 className="text-4xl font-bold tracking-tight mb-6">
        Welcome back, {session.user.name || "there"} 👋
      </h1>

      <p className="text-muted-foreground mb-12 text-lg">
        Here&apos;s a quick overview of your productivity and finances today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 shadow-sm rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Tasks Overview</h3>
          <p className="text-muted-foreground">
            View your upcoming tasks and deadlines.
          </p>
        </div>

        <div className="card p-6 shadow-sm rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Finance Summary</h3>
          <p className="text-muted-foreground">
            Track spending, income, and budgets.
          </p>
        </div>

        <div className="card p-6 shadow-sm rounded-xl">
          <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
          <p className="text-muted-foreground">
            Personalized suggestions to stay productive.
          </p>
        </div>
      </div>
    </section>
  );
}
