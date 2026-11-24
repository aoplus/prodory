// Queue for failed enquiries: a D1 table, bound as DB in the Pages project.
// Table (run once, see README):
//   CREATE TABLE IF NOT EXISTS pending_enquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, payload TEXT NOT NULL, mautic_only INTEGER NOT NULL DEFAULT 0);
export async function enqueue(db, entry) {
  await db.prepare('INSERT INTO pending_enquiries (at, payload, mautic_only) VALUES (?, ?, ?)')
    .bind(entry.at, JSON.stringify({ data: entry.data, classification: entry.classification }), entry.mauticOnly ? 1 : 0).run();
}

export async function readAll(db) {
  const { results } = await db.prepare('SELECT id, at, payload, mautic_only FROM pending_enquiries ORDER BY id LIMIT 200').all();
  return results.map((r) => ({ id: r.id, at: r.at, mauticOnly: !!r.mauticOnly, ...JSON.parse(r.payload) }));
}

export async function remove(db, id) {
  await db.prepare('DELETE FROM pending_enquiries WHERE id = ?').bind(id).run();
}
