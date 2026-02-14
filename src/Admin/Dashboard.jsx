import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterEvent, setFilterEvent] = useState("all");

  const registrations = useQuery(api.registrations.getAllRegistrations);
  const totalCount = useQuery(api.registrations.getRegistrationCount);

  if (!registrations) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl belanosima-regular">Loading...</div>
      </div>
    );
  }

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.admissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterCategory === "all") return matchesSearch;

    let hasEvent = false;
    if (filterCategory === "cultural") {
      hasEvent =
        filterEvent === "all"
          ? reg.culturalEvent1 !== "None" || reg.culturalEvent2 !== "None"
          : reg.culturalEvent1 === filterEvent ||
            reg.culturalEvent2 === filterEvent;
    } else if (filterCategory === "technical") {
      hasEvent =
        filterEvent === "all"
          ? reg.technicalEvent1 !== "None" || reg.technicalEvent2 !== "None"
          : reg.technicalEvent1 === filterEvent ||
            reg.technicalEvent2 === filterEvent;
    } else if (filterCategory === "sports") {
      hasEvent =
        filterEvent === "all"
          ? reg.sportsEvent1 !== "None" || reg.sportsEvent2 !== "None"
          : reg.sportsEvent1 === filterEvent || reg.sportsEvent2 === filterEvent;
    }

    return matchesSearch && hasEvent;
  });

  // Get unique events for filter
  const culturalEvents = [
    ...new Set(
      registrations.flatMap((r) => [r.culturalEvent1, r.culturalEvent2])
    ),
  ].filter((e) => e !== "None");

  const technicalEvents = [
    ...new Set(
      registrations.flatMap((r) => [r.technicalEvent1, r.technicalEvent2])
    ),
  ].filter((e) => e !== "None");

  const sportsEvents = [
    ...new Set(
      registrations.flatMap((r) => [r.sportsEvent1, r.sportsEvent2])
    ),
  ].filter((e) => e !== "None");

  // Stats
  const stats = {
    total: totalCount || 0,
    cultural: registrations.filter(
      (r) => r.culturalEvent1 !== "None" || r.culturalEvent2 !== "None"
    ).length,
    technical: registrations.filter(
      (r) => r.technicalEvent1 !== "None" || r.technicalEvent2 !== "None"
    ).length,
    sports: registrations.filter(
      (r) => r.sportsEvent1 !== "None" || r.sportsEvent2 !== "None"
    ).length,
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Admission ID",
      "Full Name",
      "Gender",
      "Phone",
      "Email",
      "Course",
      "Year",
      "Branch",
      "Cultural Event 1",
      "Cultural Event 2",
      "Technical Event 1",
      "Technical Event 2",
      "Sports Event 1",
      "Sports Event 2",
      "Registered At",
    ];

    const rows = filteredRegistrations.map((reg) => [
      reg.admissionId,
      reg.fullName,
      reg.gender,
      reg.phone,
      reg.email || "",
      reg.course,
      reg.year,
      reg.branch || "",
      reg.culturalEvent1,
      reg.culturalEvent2,
      reg.technicalEvent1,
      reg.technicalEvent2,
      reg.sportsEvent1,
      reg.sportsEvent2,
      new Date(reg.registeredAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `euphoric-2026-registrations-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl belanosima-bold text-white mb-2">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              EUPHORIC
            </span>{" "}
            2026
          </h1>
          <h2 className="text-2xl md:text-3xl text-white/90 belanosima-regular">
            Admin Dashboard
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <p className="text-white/60 text-xs belanosima-regular">
                  Total Registrations
                </p>
                <p className="text-white text-2xl belanosima-bold">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-2xl">
                🎭
              </div>
              <div>
                <p className="text-white/60 text-xs belanosima-regular">
                  Cultural Events
                </p>
                <p className="text-white text-2xl belanosima-bold">
                  {stats.cultural}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                💻
              </div>
              <div>
                <p className="text-white/60 text-xs belanosima-regular">
                  Technical Events
                </p>
                <p className="text-white text-2xl belanosima-bold">
                  {stats.technical}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                ⚽
              </div>
              <div>
                <p className="text-white/60 text-xs belanosima-regular">
                  Sports Events
                </p>
                <p className="text-white text-2xl belanosima-bold">
                  {stats.sports}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, admission ID, or email..."
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-all belanosima-regular"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setFilterEvent("all");
                }}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-all belanosima-regular appearance-none cursor-pointer"
              >
                <option value="all" className="bg-gray-900">
                  All Categories
                </option>
                <option value="cultural" className="bg-gray-900">
                  Cultural
                </option>
                <option value="technical" className="bg-gray-900">
                  Technical
                </option>
                <option value="sports" className="bg-gray-900">
                  Sports
                </option>
              </select>
            </div>

            {/* Event Filter */}
            <div>
              <label className="block text-white/90 belanosima-regular mb-2 text-sm">
                Event
              </label>
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                disabled={filterCategory === "all"}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-all belanosima-regular appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="all" className="bg-gray-900">
                  All Events
                </option>
                {filterCategory === "cultural" &&
                  culturalEvents.map((event) => (
                    <option key={event} value={event} className="bg-gray-900">
                      {event}
                    </option>
                  ))}
                {filterCategory === "technical" &&
                  technicalEvents.map((event) => (
                    <option key={event} value={event} className="bg-gray-900">
                      {event}
                    </option>
                  ))}
                {filterCategory === "sports" &&
                  sportsEvents.map((event) => (
                    <option key={event} value={event} className="bg-gray-900">
                      {event}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Export Button */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-white/60 text-sm belanosima-regular">
              Showing {filteredRegistrations.length} of {stats.total}{" "}
              registrations
            </p>
            <button
              onClick={exportToCSV}
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm belanosima-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export to CSV
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 belanosima-bold uppercase tracking-wider">
                    Admission ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 belanosima-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 belanosima-bold uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 belanosima-bold uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 belanosima-bold uppercase tracking-wider">
                    Events
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/90 belanosima-bold uppercase tracking-wider">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-white/60 belanosima-regular"
                    >
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr
                      key={reg._id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-white belanosima-regular">
                        {reg.admissionId}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-white belanosima-bold">
                          {reg.fullName}
                        </div>
                        <div className="text-xs text-white/60 belanosima-regular">
                          {reg.gender}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-white belanosima-regular">
                          {reg.course}
                        </div>
                        <div className="text-xs text-white/60 belanosima-regular">
                          Year {reg.year}
                          {reg.branch && ` - ${reg.branch}`}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-white belanosima-regular">
                          {reg.phone}
                        </div>
                        {reg.email && (
                          <div className="text-xs text-white/60 belanosima-regular">
                            {reg.email}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {reg.culturalEvent1 !== "None" && (
                            <span className="inline-block px-2 py-1 bg-pink-500/20 border border-pink-500/30 rounded text-xs text-pink-300 belanosima-regular mr-1 mb-1">
                              🎭 {reg.culturalEvent1}
                            </span>
                          )}
                          {reg.culturalEvent2 !== "None" && (
                            <span className="inline-block px-2 py-1 bg-pink-500/20 border border-pink-500/30 rounded text-xs text-pink-300 belanosima-regular mr-1 mb-1">
                              🎭 {reg.culturalEvent2}
                            </span>
                          )}
                          {reg.technicalEvent1 !== "None" && (
                            <span className="inline-block px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-300 belanosima-regular mr-1 mb-1">
                              💻 {reg.technicalEvent1}
                            </span>
                          )}
                          {reg.technicalEvent2 !== "None" && (
                            <span className="inline-block px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-xs text-cyan-300 belanosima-regular mr-1 mb-1">
                              💻 {reg.technicalEvent2}
                            </span>
                          )}
                          {reg.sportsEvent1 !== "None" && (
                            <span className="inline-block px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300 belanosima-regular mr-1 mb-1">
                              ⚽ {reg.sportsEvent1}
                            </span>
                          )}
                          {reg.sportsEvent2 !== "None" && (
                            <span className="inline-block px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300 belanosima-regular mr-1 mb-1">
                              ⚽ {reg.sportsEvent2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/60 belanosima-regular">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(reg.registeredAt).toLocaleTimeString()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
       <div className="text-center mt-6 space-y-1.5">
          <p className="text-white/50 belanosima-regular text-xs">
            © 2026 Euphoric - Sanskar Educational Group
          </p>
          <p className="text-white/40 belanosima-regular text-xs flex items-center justify-center gap-1.5">
            Made with <span className="text-red-400">❤️</span> by{" "}
            <span className="text-white/60">Ujjwal</span>
          </p>
        </div>
      </div>
    </div>
  );
}