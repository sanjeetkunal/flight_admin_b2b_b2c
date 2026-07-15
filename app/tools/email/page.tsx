const pinnedEmails = [
  {
    initial: "W",
    avatar: "from-sky-400 to-blue-600",
    name: "William Smith",
    subject: "Meeting Tomorrow",
    time: "40 minutes ago",
    preview:
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on…",
    active: true,
  },
  {
    initial: "A",
    avatar: "from-violet-400 to-purple-600",
    name: "Alice Smith",
    subject: "Re: Project Update",
    time: "about 2 hours ago",
    preview:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate…",
  },
  {
    initial: "B",
    avatar: "from-amber-400 to-orange-600",
    name: "Bob Johnson",
    subject: "Weekend Plans",
    time: "1 day ago",
    preview:
      "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested,…",
  },
  {
    initial: "E",
    avatar: "from-rose-400 to-pink-600",
    name: "Emily Davis",
    subject: "Re: Question about Budget",
    time: "2 days ago",
    unread: true,
    preview:
      "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've reviewed the budget report and…",
  },
]

const inboxEmails = [
  {
    initial: "M",
    avatar: "from-emerald-400 to-teal-600",
    name: "Michael Wilson",
    subject: "Important Announcement",
    time: "3 days ago",
    unread: true,
    preview:
      "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've…",
  },
  {
    initial: "S",
    avatar: "from-blue-400 to-blue-700",
    name: "Sarah Brown",
    subject: "Re: Feedback on Proposal",
    time: "27 Jun 2026",
    preview:
      "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key…",
  },
]

const attachments = [
  { icon: "figma", name: "studio-admin.fig", size: "21 MB", color: "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300" },
  { icon: "doc", name: "features.docx", size: "3.7 MB", color: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300" },
  { icon: "image", name: "preview.png", size: "2.3 MB", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300" },
]

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200">
      {children}
    </button>
  )
}

function AttachmentIcon({ type }: { type: string }) {
  if (type === "figma") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6a3 3 0 010 6H9zM9 9h4.5a3 3 0 110 6H9zM9 15h3a3 3 0 110 6 3 3 0 01-3-3z" />
      </svg>
    )
  }
  if (type === "doc") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    )
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function EmailRow({ email }: { email: (typeof pinnedEmails)[number] }) {
  return (
    <div
      className={`flex gap-3 px-4 py-3 cursor-pointer border-l-2 ${
        email.active
          ? "border-blue-500 bg-slate-50 dark:bg-slate-800"
          : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${email.avatar} text-xs font-semibold text-white`}>
        {email.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 truncate text-sm font-medium text-slate-800 dark:text-slate-100">
            {email.name}
            {email.unread && <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />}
          </p>
          <span className="flex-shrink-0 text-[11px] text-slate-400 dark:text-slate-500">{email.time}</span>
        </div>
        <p className="truncate text-sm text-slate-600 dark:text-slate-300">{email.subject}</p>
        <p className="mt-0.5 line-clamp-2 text-xs text-slate-400 dark:text-slate-500">{email.preview}</p>
      </div>
    </div>
  )
}

export default function EmailPage() {
  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[640px] overflow-hidden rounded-2xl border border-slate-100 bg-white text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Left sidebar */}
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-100 p-4 dark:border-slate-800 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-700 text-xs font-semibold text-white">
            A
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-semibold text-white">
            W
          </div>
          <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </button>
        </div>

        <div className="mb-5">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Arham Khan</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">hello@arhamkhnz.com</p>
        </div>

        <button className="mb-5 flex items-center justify-center gap-2 rounded-full bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z" />
          </svg>
          New email
        </button>

        <nav className="space-y-1 text-sm">
          <div className="flex items-center gap-3 rounded-lg bg-amber-400 px-3 py-2 font-medium text-slate-900">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-6l-2 3h-4l-2-3H2" />
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
            </svg>
            Inbox
            <span className="ml-auto text-xs font-semibold">18</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Priority
            <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">3</span>
          </div>
        </nav>

        <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600">
          Folders
        </p>
        <nav className="flex-1 space-y-1 text-sm">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" opacity="0" />
              <path d="M20 8L12 13 4 8" />
              <rect x="3" y="4" width="18" height="14" rx="2" />
            </svg>
            Drafts
            <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">9</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Sent
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="21 8 21 21 3 21 3 8" />
              <rect x="1" y="3" width="22" height="5" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
            Archive
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 0V4a2 2 0 012-2h0a2 2 0 012 2v2" />
            </svg>
            Trash
          </div>
        </nav>

        <div className="mt-auto space-y-1 border-t border-slate-100 pt-3 text-sm dark:border-slate-800">
          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Help &amp; feedback
          </div>
          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
            </svg>
            Keyboard shortcuts
          </div>
        </div>
      </aside>

      {/* Middle inbox list */}
      <section className="flex w-full flex-shrink-0 flex-col border-r border-slate-100 dark:border-slate-800 md:w-[380px]">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-800">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="18" rx="1" />
              <rect x="14" y="3" width="7" height="18" rx="1" />
            </svg>
            Inbox
          </h2>
          <div className="flex items-center gap-1">
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="14" y2="12" />
                <line x1="4" y1="18" x2="10" y2="18" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
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

        <div className="px-4 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search...
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <p className="px-4 pb-1 text-xs font-medium text-slate-400 dark:text-slate-500">Pinned (4)</p>
          <div>
            {pinnedEmails.map((email) => (
              <EmailRow key={email.name + email.subject} email={email} />
            ))}
          </div>

          <p className="px-4 pb-1 pt-3 text-xs font-medium text-slate-400 dark:text-slate-500">Inbox (13)</p>
          <div>
            {inboxEmails.map((email) => (
              <EmailRow key={email.name + email.subject} email={email} />
            ))}
          </div>
        </div>
      </section>

      {/* Right reading pane */}
      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </IconBtn>
          </div>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="17" x2="12" y2="22" />
                <path d="M5 17h14l-1.4-7.2A4 4 0 0013.7 6.5V4a1.7 1.7 0 00-3.4 0v2.5A4 4 0 006.4 9.8z" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="21 8 21 21 3 21 3 8" />
                <rect x="1" y="3" width="22" height="5" />
                <line x1="10" y1="12" x2="14" y2="12" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="19" cy="12" r="1.6" />
              </svg>
            </IconBtn>
            <IconBtn>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 0V4a2 2 0 012-2h0a2 2 0 012 2v2" />
              </svg>
            </IconBtn>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Meeting Tomorrow</h1>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Thu, 2 Jul 2026, 9:20 AM</p>

          <div className="mt-4 flex items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-semibold text-white">
                W
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-800 dark:text-slate-100">William Smith</span>
                <span className="text-slate-400 dark:text-slate-500"> | williamsmith@example.com</span>
              </div>
            </div>
            <div className="text-right text-xs text-slate-400 dark:text-slate-500">
              <p>To: Arham Khan</p>
              <p>Cc: Weblabs Studio</p>
            </div>
          </div>

          <div className="mt-4">
            <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              Attachments (3)
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <div className="mt-2 flex flex-wrap gap-2">
              {attachments.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-800"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded ${a.color}`}>
                    <AttachmentIcon type={a.icon} />
                  </span>
                  <span className="text-slate-700 dark:text-slate-200">{a.name}</span>
                  <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-medium text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                    {a.size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>
              Hi, let&apos;s have a meeting tomorrow to discuss the project. I&apos;ve been reviewing the
              project details and have some ideas I&apos;d like to share. It&apos;s crucial that we align on
              our next steps to ensure the project&apos;s success.
            </p>
            <p>
              Please come prepared with any questions or insights you may have. Looking forward to our
              meeting!
            </p>
            <p>Best regards, William</p>
          </div>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800">
            <svg className="h-4 w-4 flex-shrink-0 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 14 4 9 9 4" />
              <path d="M20 20v-7a4 4 0 00-4-4H4" />
            </svg>
            <span className="flex-1 truncate text-sm text-slate-400 dark:text-slate-500">Reply William Smith...</span>
            <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
            <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
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
