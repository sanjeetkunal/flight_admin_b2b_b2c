const pinnedConversations = [
  {
    initial: "OR",
    online: true,
    name: "Olivia Rhye",
    time: "Just now",
    subject: "Deployment pipeline failing on staging s…",
    preview: "We're seeing 502 errors after the latest …",
    badge: 4,
    active: true,
  },
  {
    initial: "PB",
    online: true,
    name: "Phoenix Baker",
    time: "5m",
    subject: "Refund for order #8823 — double charged",
    preview: "I was billed twice on the 3rd. Can someone lo…",
  },
  {
    initial: "LS",
    online: false,
    name: "Lana Steiner",
    time: "8m",
    subject: "Access to analytics dashboard — permis…",
    preview: "I'm getting a 403 since the role update y…",
    badge: 2,
  },
]

const todayConversations = [
  {
    initial: "DW",
    online: false,
    name: "Demi Wilkinson",
    time: "10:42 AM",
    subject: "Sustainability report inquiry",
    preview: "Hi team, I'm looking for the latest ESG disclos…",
    badge: 5,
  },
  {
    initial: "CW",
    online: false,
    name: "Candice Wu",
    time: "10:15 AM",
    subject: "Bulk export keeps timing out",
    preview: "Tried three times this morning. It gets to about 6…",
  },
  {
    initial: "NC",
    online: false,
    name: "Natali Craig",
    time: "9:58 AM",
    subject: "Invoice INV-4821 still marked unpaid",
    preview: "Our payment cleared on Friday — screenshot…",
    badge: 1,
  },
  {
    initial: "DC",
    online: true,
    name: "Drew Cano",
    time: "9:32 AM",
    subject: "Onboarding docs for new hire — where to start?",
    preview: "Got a new backend dev starting Monday. Need t…",
  },
]

const messages = [
  {
    from: "them",
    text: "We're seeing 502s on staging right after the latest build. We rolled back, but the health checks are still red.",
    time: "10 min ago",
  },
  {
    from: "me",
    text: "Thanks, Olivia. I'm checking the deploy logs and upstream gateway config now.",
    time: "8 min ago",
  },
  {
    from: "them",
    text: "The weird part is API traffic looks fine, but the web container is failing readiness probes.",
    time: "5 min ago",
  },
  {
    from: "me",
    text: "Found a mismatch in the staging environment variables. I'm applying the fix and will confirm once the probes recover.",
    time: "3 min ago",
    reaction: "\u{1F44D}",
  },
  {
    from: "them",
    text: "Great. Keep me posted, this is blocking our QA pass.",
    time: "1 min ago",
    reaction: "\u{1F440}",
  },
]

function Avatar({ initial, online }: { initial: string; online?: boolean }) {
  return (
    <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-400 text-xs font-semibold text-white dark:bg-slate-600">
      {initial}
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
      )}
    </div>
  )
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200">
      {children}
    </button>
  )
}

function ConversationRow({ conv }: { conv: (typeof pinnedConversations)[number] }) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer ${
        conv.active ? "bg-slate-50 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      <Avatar initial={conv.initial} online={conv.online} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{conv.name}</p>
          <span className="flex-shrink-0 text-[11px] text-slate-400 dark:text-slate-500">{conv.time}</span>
        </div>
        <p className="truncate text-sm text-slate-600 dark:text-slate-300">{conv.subject}</p>
        <p className="truncate text-xs text-slate-400 dark:text-slate-500">{conv.preview}</p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-1.5 pt-1">
        <svg className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="17" x2="12" y2="22" />
          <path d="M5 17h14l-1.4-7.2A4 4 0 0013.7 6.5V4a1.7 1.7 0 00-3.4 0v2.5A4 4 0 006.4 9.8z" />
        </svg>
        {conv.badge && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
            {conv.badge}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[640px] overflow-hidden rounded-2xl border border-slate-100 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Left conversation list */}
      <section className="flex w-full flex-shrink-0 flex-col border-r border-slate-100 dark:border-slate-800 md:w-[380px]">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-800">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="18" rx="1" />
              <rect x="14" y="3" width="7" height="18" rx="1" />
            </svg>
            Inbox
          </h2>
          <IconBtn>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </IconBtn>
        </div>

        <div className="flex items-center gap-5 border-b border-slate-100 px-4 pt-3 text-sm dark:border-slate-800">
          <button className="border-b-2 border-slate-800 pb-2.5 font-medium text-slate-800 dark:border-slate-100 dark:text-slate-100">
            All <span className="text-slate-400 dark:text-slate-500">(24)</span>
          </button>
          <button className="pb-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
            Open <span className="text-slate-300 dark:text-slate-600">(18)</span>
          </button>
          <button className="pb-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
            Snoozed <span className="text-slate-300 dark:text-slate-600">(2)</span>
          </button>
          <button className="pb-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Closed</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center gap-1.5 px-4 pb-1 pt-3 text-xs font-medium text-slate-400 dark:text-slate-500">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Pinned
          </div>
          <div>
            {pinnedConversations.map((conv) => (
              <ConversationRow key={conv.name} conv={conv} />
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-4 pb-1 pt-3 text-xs font-medium text-slate-400 dark:text-slate-500">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Today
          </div>
          <div>
            {todayConversations.map((conv) => (
              <ConversationRow key={conv.name} conv={conv} />
            ))}
          </div>
        </div>
      </section>

      {/* Right chat pane */}
      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar initial="OR" online />
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Olivia Rhye</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Senior DevOps Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24L3 3v6.59a2 2 0 00.59 1.41l9.58 9.58a2 2 0 002.82 0l4.6-4.6a2 2 0 000-2.83z" />
                <circle cx="7.5" cy="7.5" r="1.5" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="19" cy="12" r="1.6" />
              </svg>
            </IconBtn>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-end gap-2.5 ${m.from === "me" ? "flex-row-reverse" : ""}`}>
              {m.from === "me" && <Avatar initial="AK" />}
              <div className={`flex max-w-[70%] flex-col ${m.from === "me" ? "items-end" : "items-start"}`}>
                <div className="relative">
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === "me"
                        ? "rounded-br-md bg-indigo-600 text-white"
                        : "rounded-bl-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.reaction && (
                    <span
                      className={`absolute -bottom-2.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs dark:border-slate-900 dark:bg-slate-800 ${
                        m.from === "me" ? "left-2" : "right-2"
                      }`}
                    >
                      {m.reaction}
                    </span>
                  )}
                </div>
                <span className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 px-6 pt-3 dark:border-slate-800">
          <div className="flex items-center gap-5 text-sm">
            <button className="border-b-2 border-slate-800 pb-2.5 font-medium text-slate-800 dark:border-slate-100 dark:text-slate-100">
              Reply
            </button>
            <button className="pb-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Internal note</button>
          </div>

          <div className="py-3">
            <p className="text-sm text-slate-400 dark:text-slate-500">Type your message...</p>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pb-4 pt-3 dark:border-slate-800">
            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <IconBtn>
                <span className="text-sm font-semibold">T</span>
              </IconBtn>
              <IconBtn>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </IconBtn>
              <IconBtn>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </IconBtn>
              <IconBtn>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
              </IconBtn>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
                </svg>
              </button>
            </div>
            <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
