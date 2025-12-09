// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // 1) Not logged in at all → go to sign in
  if (!session) {
    redirect("/auth/signin");
  }

  // 2) Logged in but not admin → show Not Authorized page
  if (session.user.role !== "ADMIN") {
    redirect("/403");
  }

  // --- Simple stats ---
  const [totalUsers, adminCount, latestUsers] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen pt-24 px-6 md:px-10 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Signed in as{" "}
            <span className="font-semibold">
              {session.user.email ?? session.user.name ?? "Unknown user"}
            </span>{" "}
            ({session.user.role})
          </p>
        </header>

        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-foreground tracking-wide">
              Total users
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalUsers}</p>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-foreground tracking-wide">
              Admins
            </p>
            <p className="mt-2 text-2xl font-semibold">{adminCount}</p>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-xs uppercase text-muted-foreground tracking-wide">
              App activity
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Hook up task & finance stats here.
            </p>
          </div>
        </section>

        {/* USERS TABLE */}
        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent users</h2>
            <p className="text-xs text-muted-foreground">
              Last 10 users to sign up.
            </p>
          </div>

          {latestUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No users yet. Once people sign up, they’ll appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {latestUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-2 pr-4">
                        {user.name || (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="py-2 pr-4">{user.email}</td>
                      <td className="py-2 pr-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">
                        {user.createdAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

