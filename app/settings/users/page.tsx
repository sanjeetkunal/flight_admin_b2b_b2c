"use client"

import { useState } from "react"

type PageDef = { key: string; label: string }
type ModuleDef = { key: string; label: string; badge: string; pages: PageDef[] }

const MODULES: ModuleDef[] = [
  {
    key: "flights", label: "Flights", badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    pages: [
      { key: "all", label: "All Bookings" },
      { key: "pending-pnr", label: "Pending PNR Requests" },
      { key: "issue-ticket", label: "Issue Ticket" },
      { key: "pnr-update", label: "Flight PNR Update" },
      { key: "reissue", label: "Reissue Requests" },
      { key: "refund-request", label: "Refund Requests" },
      { key: "commission-master", label: "Commission Master" },
      { key: "misc-service-charge", label: "Misc Service Charge" },
    ],
  },
  {
    key: "railway", label: "Railway", badge: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
    pages: [
      { key: "all", label: "All Bookings" },
      { key: "pending-pnr", label: "Pending PNR Requests" },
      { key: "issue-ticket", label: "Issue Ticket" },
      { key: "pnr-update", label: "Train PNR Update" },
      { key: "reissue", label: "Reissue Request" },
      { key: "reissue-in-process", label: "Reissue In Process" },
      { key: "refund-request", label: "Refund Request" },
      { key: "refund-in-process", label: "Refund In Process" },
      { key: "commission-master", label: "Commission Master" },
      { key: "misc-service-charge", label: "Misc Service Charge" },
    ],
  },
  { key: "bus", label: "Bus", badge: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400", pages: [{ key: "all", label: "All Bookings" }] },
  { key: "hotel", label: "Hotel", badge: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400", pages: [{ key: "all", label: "All Bookings" }] },
  { key: "holiday", label: "Holiday", badge: "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400", pages: [{ key: "all", label: "All Bookings" }] },
  { key: "utility", label: "Utility", badge: "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400", pages: [{ key: "all", label: "All Bookings" }] },
  {
    key: "reports", label: "Reports", badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    pages: [
      { key: "overview", label: "Reports Overview" },
      { key: "ledger", label: "Ledger Report" },
    ],
  },
  {
    key: "agents", label: "B2B Agents", badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    pages: [
      { key: "all", label: "All Agents" },
      { key: "emulate", label: "Emulate Agent" },
      { key: "credit-upload", label: "Credit Upload" },
      { key: "credit", label: "Credit Management" },
    ],
  },
]

type ModulePermissions = Record<string, Record<string, boolean>>

type Role = {
  id: string
  name: string
  badge: string
  dot: string
  protected?: boolean
  permissions: ModulePermissions
}

function emptyPermissions(): ModulePermissions {
  return Object.fromEntries(MODULES.map((m) => [m.key, Object.fromEntries(m.pages.map((p) => [p.key, false]))]))
}

function fullPermissions(): ModulePermissions {
  return Object.fromEntries(MODULES.map((m) => [m.key, Object.fromEntries(m.pages.map((p) => [p.key, true]))]))
}

function grantModules(...moduleKeys: string[]): ModulePermissions {
  const perms = emptyPermissions()
  moduleKeys.forEach((key) => {
    if (perms[key]) Object.keys(perms[key]).forEach((pageKey) => { perms[key][pageKey] = true })
  })
  return perms
}

function isModuleFull(permissions: ModulePermissions, moduleKey: string) {
  const group = MODULES.find((m) => m.key === moduleKey)
  if (!group) return false
  return group.pages.every((p) => permissions[moduleKey]?.[p.key])
}

function isModulePartial(permissions: ModulePermissions, moduleKey: string) {
  const group = MODULES.find((m) => m.key === moduleKey)
  if (!group) return false
  const values = group.pages.map((p) => !!permissions[moduleKey]?.[p.key])
  return values.some(Boolean) && !values.every(Boolean)
}

function isModuleAny(permissions: ModulePermissions, moduleKey: string) {
  return isModuleFull(permissions, moduleKey) || isModulePartial(permissions, moduleKey)
}

const initialRoles: Role[] = [
  { id: "super-admin", name: "Super Admin", badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", protected: true, permissions: fullPermissions() },
  { id: "operations", name: "Operations", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", permissions: grantModules("flights", "railway", "bus") },
  { id: "sales", name: "Sales", badge: "bg-pink-100 text-pink-700", dot: "bg-pink-500", permissions: grantModules("hotel", "holiday") },
  { id: "accounts", name: "Accounts", badge: "bg-teal-100 text-teal-700", dot: "bg-teal-500", permissions: grantModules("utility", "reports") },
]

type UserRow = {
  id: string
  name: string
  email: string
  roleId: string
  status: "Active" | "Inactive"
  lastLogin: string
}

const initialUsers: UserRow[] = [
  { id: "U001", name: "Admin", email: "info@primerouteholidays.com", roleId: "super-admin", status: "Active", lastLogin: "30 Jun, 14:22" },
  { id: "U002", name: "Rahul Mehta", email: "rahul@primerouteholidays.com", roleId: "operations", status: "Active", lastLogin: "30 Jun, 12:10" },
  { id: "U003", name: "Pooja Sharma", email: "pooja@primerouteholidays.com", roleId: "sales", status: "Active", lastLogin: "29 Jun, 18:45" },
  { id: "U004", name: "Sanjay Kumar", email: "sanjay@primerouteholidays.com", roleId: "accounts", status: "Inactive", lastLogin: "28 Jun, 09:30" },
]

const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
const labelCls = "mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"

const roleColorPresets = [
  { badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400", dot: "bg-indigo-500" },
  { badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", dot: "bg-blue-500" },
  { badge: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400", dot: "bg-green-500" },
  { badge: "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400", dot: "bg-orange-500" },
  { badge: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400", dot: "bg-purple-500" },
  { badge: "bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400", dot: "bg-pink-500" },
  { badge: "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400", dot: "bg-teal-500" },
  { badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", dot: "bg-amber-500" },
]

let userSeq = initialUsers.length
let roleSeq = initialRoles.length

function emptyUserForm(): Omit<UserRow, "id"> {
  return { name: "", email: "", roleId: initialRoles[1]?.id ?? "operations", status: "Active", lastLogin: "—" }
}

function emptyRoleForm(): Omit<Role, "id"> {
  return { name: "", badge: roleColorPresets[1].badge, dot: roleColorPresets[1].dot, permissions: emptyPermissions() }
}

export default function UsersRolesSettingsPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [users, setUsers] = useState<UserRow[]>(initialUsers)
  const [search, setSearch] = useState("")
  const [toast, setToast] = useState<string | null>(null)

  const [editingUser, setEditingUser] = useState<UserRow | null>(null)
  const [userForm, setUserForm] = useState<Omit<UserRow, "id"> | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)

  const [showAddRole, setShowAddRole] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [roleForm, setRoleForm] = useState<Omit<Role, "id">>(emptyRoleForm())
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  function roleOf(roleId: string) {
    return roles.find((r) => r.id === roleId)
  }

  function moduleLabelsFor(role: Role | undefined) {
    if (!role) return []
    return MODULES.filter((m) => isModuleAny(role.permissions, m.key)).map((m) => m.label)
  }

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase()
    return q === "" || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })

  function openAddUser() {
    setUserForm(emptyUserForm())
    setShowAddUser(true)
  }

  function openEditUser(u: UserRow) {
    setEditingUser(u)
    setUserForm({ name: u.name, email: u.email, roleId: u.roleId, status: u.status, lastLogin: u.lastLogin })
  }

  function closeUserModal() {
    setShowAddUser(false)
    setEditingUser(null)
    setUserForm(null)
  }

  function saveUser() {
    if (!userForm || !userForm.name.trim() || !userForm.email.trim()) return
    if (editingUser) {
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...userForm } : u)))
      showToast(`${userForm.name} updated`)
    } else {
      userSeq += 1
      setUsers((prev) => [...prev, { id: `U${String(userSeq).padStart(3, "0")}`, ...userForm }])
      showToast(`${userForm.name} added`)
    }
    closeUserModal()
  }

  function removeUser(u: UserRow) {
    setUsers((prev) => prev.filter((x) => x.id !== u.id))
    showToast(`${u.name} removed`)
  }

  function toggleUserStatus(u: UserRow) {
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)))
  }

  function toggleModuleBulk(roleId: string, moduleKey: string) {
    setRoles((prev) => prev.map((r) => {
      if (r.id !== roleId || r.protected) return r
      const group = MODULES.find((m) => m.key === moduleKey)!
      const makeFull = !isModuleFull(r.permissions, moduleKey)
      const updated: Record<string, boolean> = Object.fromEntries(group.pages.map((p): [string, boolean] => [p.key, makeFull]))
      return { ...r, permissions: { ...r.permissions, [moduleKey]: updated } }
    }))
  }

  function toggleFormModuleAll(moduleKey: string) {
    const group = MODULES.find((m) => m.key === moduleKey)!
    const makeFull = !isModuleFull(roleForm.permissions, moduleKey)
    const updated: Record<string, boolean> = Object.fromEntries(group.pages.map((p): [string, boolean] => [p.key, makeFull]))
    setRoleForm({ ...roleForm, permissions: { ...roleForm.permissions, [moduleKey]: updated } })
  }

  function toggleFormPage(moduleKey: string, pageKey: string) {
    setRoleForm({
      ...roleForm,
      permissions: {
        ...roleForm.permissions,
        [moduleKey]: { ...roleForm.permissions[moduleKey], [pageKey]: !roleForm.permissions[moduleKey]?.[pageKey] },
      },
    })
  }

  function openAddRole() {
    setEditingRole(null)
    setRoleForm(emptyRoleForm())
    setExpandedModule(null)
    setShowAddRole(true)
  }

  function openEditRole(role: Role) {
    const { id, ...form } = role
    setEditingRole(role)
    setRoleForm(form)
    setExpandedModule(null)
    setShowAddRole(true)
  }

  function closeRoleModal() {
    setShowAddRole(false)
    setEditingRole(null)
  }

  function saveRole() {
    if (!roleForm.name.trim()) return
    if (editingRole) {
      setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? { ...r, ...roleForm } : r)))
      showToast(`${roleForm.name} role updated`)
    } else {
      roleSeq += 1
      setRoles((prev) => [...prev, { id: `role-${roleSeq}`, ...roleForm }])
      showToast(`${roleForm.name} role created`)
    }
    closeRoleModal()
  }

  function removeRole(role: Role) {
    if (role.protected) return
    if (users.some((u) => u.roleId === role.id)) {
      showToast(`Reassign users before removing ${role.name}`)
      return
    }
    setRoles((prev) => prev.filter((r) => r.id !== role.id))
    showToast(`${role.name} role removed`)
  }

  const stats = [
    { label: "Total Users", value: users.length, color: "text-slate-800 bg-slate-50 border-slate-100" },
    { label: "Active Users", value: users.filter((u) => u.status === "Active").length, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Roles Defined", value: roles.length, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { label: "Full Module Access", value: roles.filter((r) => MODULES.every((m) => isModuleFull(r.permissions, m.key))).length, color: "text-violet-600 bg-violet-50 border-violet-100" },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
            <p className="text-xs font-medium opacity-70">{s.label}</p>
            <p className="mt-1 text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Admin Users */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Admin Users</h3>
            <p className="mt-0.5 text-xs text-slate-400">Manage who can access the admin panel and what role they carry</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 sm:w-56 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
            <button onClick={openAddUser} className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add User
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Name</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Role</th>
                <th className="px-6 py-3 text-left font-medium">Module Access</th>
                <th className="px-6 py-3 text-left font-medium">Last Login</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const role = roleOf(u.roleId)
                const modLabels = moduleLabelsFor(role)
                const shown = modLabels.slice(0, 2)
                const extra = modLabels.length - shown.length
                return (
                  <tr key={u.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-100">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{u.email}</td>
                    <td className="px-6 py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${role?.badge ?? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>{role?.name ?? "—"}</span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-600 dark:text-slate-300">
                      {modLabels.length === MODULES.length ? (
                        <span className="text-slate-500 dark:text-slate-400">All Modules</span>
                      ) : modLabels.length === 0 ? (
                        <span className="text-slate-400">None</span>
                      ) : (
                        <span>
                          {shown.join(", ")}
                          {extra > 0 && <span className="text-slate-400"> +{extra} more</span>}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">{u.lastLogin}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleUserStatus(u)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${u.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"}`}
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditUser(u)} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                        {!role?.protected && <button onClick={() => removeUser(u)} className="text-xs text-red-400 hover:text-red-600">Remove</button>}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-400">No users match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions Matrix */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Role Permissions</h3>
            <p className="mt-0.5 text-xs text-slate-400">Control which modules each role can access. Super Admin always has full access.</p>
          </div>
          <button onClick={openAddRole} className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-indigo-200 px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Role
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-3 text-left font-medium">Role</th>
                {MODULES.map((m) => (
                  <th key={m.key} className="px-3 py-3 text-center font-medium">{m.label}</th>
                ))}
                <th className="px-6 py-3 text-left font-medium">Users</th>
                <th className="px-6 py-3 text-left font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {roles.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${r.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${r.dot}`} />
                      {r.name}
                    </span>
                  </td>
                  {MODULES.map((m) => (
                    <td key={m.key} className="px-3 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isModuleFull(r.permissions, m.key)}
                        ref={(el) => { if (el) el.indeterminate = isModulePartial(r.permissions, m.key) }}
                        disabled={r.protected}
                        onChange={() => toggleModuleBulk(r.id, m.key)}
                        title="Tick to grant all pages, untick to revoke all. Use Edit for page-level control."
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600 disabled:opacity-50"
                      />
                    </td>
                  ))}
                  <td className="px-6 py-3 text-xs text-slate-500 dark:text-slate-400">{users.filter((u) => u.roleId === r.id).length}</td>
                  <td className="px-6 py-3 text-right">
                    {!r.protected && (
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => openEditRole(r)} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">Edit</button>
                        <button onClick={() => removeRole(r)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-6 py-4">
          <button onClick={() => showToast("Role permissions saved")} className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">Save Permissions</button>
        </div>
      </div>

      {/* Add / Edit User modal */}
      {(showAddUser || editingUser) && userForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" onClick={closeUserModal}>
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{editingUser ? `Edit User · ${editingUser.name}` : "Add User"}</h3>
                <p className="text-xs text-slate-400">{editingUser ? "Update details, role and status" : "Invite a new admin panel user"}</p>
              </div>
              <button onClick={closeUserModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 px-6 py-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelCls}>Full Name</label>
                <input value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Email</label>
                <input value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <select value={userForm.roleId} onChange={(e) => setUserForm({ ...userForm, roleId: e.target.value })} className={inputCls + " bg-white"}>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select value={userForm.status} onChange={(e) => setUserForm({ ...userForm, status: e.target.value as UserRow["status"] })} className={inputCls + " bg-white"}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button onClick={closeUserModal} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={saveUser} className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">{editingUser ? "Save Changes" : "Add User"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Role modal */}
      {showAddRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" onClick={closeRoleModal}>
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{editingRole ? `Edit Role · ${editingRole.name}` : "Add Role"}</h3>
                <p className="text-xs text-slate-400">{editingRole ? "Update the name, color and page-level access for this role" : "Define a name, color and page-level access for the new role"}</p>
              </div>
              <button onClick={closeRoleModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <label className={labelCls}>Role Name</label>
                <input value={roleForm.name} onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })} placeholder="e.g. Support" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Color</label>
                <div className="flex flex-wrap gap-2">
                  {roleColorPresets.map((c) => (
                    <button
                      key={c.badge}
                      type="button"
                      onClick={() => setRoleForm({ ...roleForm, badge: c.badge, dot: c.dot })}
                      className={`h-7 w-7 rounded-full ${c.dot} ${roleForm.dot === c.dot ? "ring-2 ring-offset-2 ring-slate-400" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>Module & Page Access</label>
                <p className="mb-2 -mt-1 text-[11px] text-slate-400">Tick a module to grant every page under it, or expand it to pick individual pages.</p>
                <div className="max-h-72 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 p-1.5 dark:border-slate-700">
                  {MODULES.map((group) => {
                    const full = isModuleFull(roleForm.permissions, group.key)
                    const partial = isModulePartial(roleForm.permissions, group.key)
                    const grantedCount = group.pages.filter((p) => roleForm.permissions[group.key]?.[p.key]).length
                    const isOpen = expandedModule === group.key
                    return (
                      <div key={group.key} className="rounded-lg border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between gap-2 px-3 py-2">
                          <label className="flex cursor-pointer items-center gap-2">
                            <input
                              type="checkbox"
                              checked={full}
                              ref={(el) => { if (el) el.indeterminate = partial }}
                              onChange={() => toggleFormModuleAll(group.key)}
                              className="h-4 w-4 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                            />
                            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${group.badge}`}>{group.label}</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setExpandedModule(isOpen ? null : group.key)}
                            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          >
                            {grantedCount}/{group.pages.length} pages
                            <svg className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                          </button>
                        </div>
                        {isOpen && (
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-slate-100 px-3 py-2 dark:border-slate-800">
                            {group.pages.map((p) => (
                              <label key={p.key} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                                <input
                                  type="checkbox"
                                  checked={!!roleForm.permissions[group.key]?.[p.key]}
                                  onChange={() => toggleFormPage(group.key, p.key)}
                                  className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 accent-indigo-600"
                                />
                                {p.label}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4 dark:border-slate-800">
              <button onClick={closeRoleModal} className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button onClick={saveRole} className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">{editingRole ? "Save Changes" : "Create Role"}</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
