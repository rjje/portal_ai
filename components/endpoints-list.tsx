"use client"

export default function EndpointsList() {
  const endpoints = [
    {
      method: "GET",
      path: "/v1/data",
      description: "Retrieve your data with advanced filtering and pagination",
    },
    {
      method: "POST",
      path: "/v1/integrations",
      description: "Create new integrations with external services",
    },
    {
      method: "GET",
      path: "/v1/analytics",
      description: "Access detailed analytics and insights about your usage",
    },
    {
      method: "DELETE",
      path: "/v1/data/:id",
      description: "Securely delete your data with permanent removal",
    },
    {
      method: "GET",
      path: "/v1/exports",
      description: "Export your data in various formats",
    },
    {
      method: "POST",
      path: "/v1/webhooks",
      description: "Set up webhooks for real-time event notifications",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border" id="endpoints">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12">API Endpoints</h2>

        <div className="space-y-3">
          {endpoints.map((endpoint, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition hover:bg-card/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded text-sm font-mono font-bold ${
                      endpoint.method === "GET"
                        ? "bg-blue-500/20 text-blue-400"
                        : endpoint.method === "POST"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm text-accent font-mono">{endpoint.path}</code>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{endpoint.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-8 p-4 bg-card border border-border rounded">
          While the API is in beta, these are the core endpoints available. We're constantly adding new features. Check
          the roadmap for upcoming endpoints.
        </p>
      </div>
    </section>
  )
}
