"use client"

export default function Setup() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border" id="setup">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-12">Setup Guide</h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Access Developer Settings</h3>
                <p className="text-muted-foreground mb-4">
                  Log in to your PORTAL account and navigate to the Developer section in your account settings.
                </p>
                <div className="bg-card border border-border rounded p-4">
                  <p className="text-sm text-foreground">
                    You'll see the Developer API dashboard where you can manage your credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Generate API Key</h3>
                <p className="text-muted-foreground mb-4">
                  Click "Create API Key" to generate your unique authentication token.
                </p>
                <div className="bg-card border border-border rounded p-4 space-y-3">
                  <p className="text-sm text-foreground font-mono">Your_API_Key_Here_12345</p>
                  <p className="text-xs text-destructive">
                    ⚠️ Never share your API key. Keep it secure and never commit it to version control.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Make Your First Request</h3>
                <p className="text-muted-foreground mb-4">
                  Use your API key to authenticate requests to the PORTAL API.
                </p>
                <pre className="bg-secondary border border-border rounded p-4 text-sm text-foreground overflow-x-auto">
                  <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.portal.io/v1/data`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
