const fs = require("fs");
const path = require("path");
const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds
} = require("@firebase/rules-unit-testing");

const ROOT = path.join(__dirname, "..");
const ADMIN_EMAIL = "gntdment@gmail.com";
let env;

function token(email, verified = true){
  return { email, email_verified: verified };
}

(async () => {
  const emu = process.env.FIRESTORE_EMULATOR_HOST;
  const storageEmu = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  if(!emu || !storageEmu) throw new Error("Faltan los emuladores. Corre la prueba con firebase emulators:exec.");
  const [fsHost, fsPort] = emu.split(":");
  const [stHost, stPort] = storageEmu.split(":");
  delete process.env.FIRESTORE_EMULATOR_HOST;
  delete process.env.FIREBASE_STORAGE_EMULATOR_HOST;

  env = await initializeTestEnvironment({
    projectId: "outgo-rules-test",
    firestore: {
      rules: fs.readFileSync(path.join(ROOT, "firestore.rules"), "utf8"),
      host: fsHost,
      port: Number(fsPort)
    },
    storage: {
      rules: fs.readFileSync(path.join(ROOT, "storage.rules"), "utf8"),
      host: stHost,
      port: Number(stPort)
    }
  });

  async function seed(docPath, fields){
    const url = `http://${fsHost}:${fsPort}/v1/projects/outgo-rules-test/databases/(default)/documents/${docPath}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: { Authorization: "Bearer owner", "Content-Type": "application/json" },
      body: JSON.stringify({ fields })
    });
    if(!res.ok) throw new Error("No se pudo sembrar " + docPath + ": " + res.status + " " + await res.text());
  }
  const str = (v) => ({ stringValue: v });
  const num = (v) => ({ integerValue: String(v) });
  const bool = (v) => ({ booleanValue: v });
  await seed("users/alice/tickets/t1", { date: str("2026-10-01"), amount: num(10), store: str("OXXO") });
  await seed("userProfiles/alice", { email: str("alice@example.com"), rfc: str("AAAA010101AAA") });
  await seed("userProfiles/bob", { email: str("bob@example.com") });
  await seed("banners/1", { enabled: bool(false), title: str("Espacio 1") });
  await seed("customStores/oxxo", { name: str("OXXO"), category: str("Conveniencia/Tiendita") });

  const alice = env.authenticatedContext("alice", token("alice@example.com")).firestore();
  const bob = env.authenticatedContext("bob", token("bob@example.com")).firestore();
  const admin = env.authenticatedContext("diego", token(ADMIN_EMAIL)).firestore();
  const anon = env.unauthenticatedContext().firestore();
  const unverified = env.authenticatedContext("diego2", token(ADMIN_EMAIL, false)).firestore();

  await assertSucceeds(alice.doc("users/alice/tickets/t1").get());
  await assertSucceeds(alice.doc("users/alice/tickets/t2").set({ date: "2026-10-02", amount: 20 }));
  await assertSucceeds(alice.doc("userProfiles/alice").get());
  await assertSucceeds(alice.doc("userProfiles/alice").set({ rfc: "GODE800101AA1" }, { merge: true }));
  await assertSucceeds(alice.doc("userProfiles/alice").delete());

  await assertFails(bob.doc("users/alice/tickets/t1").get());
  await assertFails(bob.doc("users/alice/tickets/t2").set({ amount: 1 }));
  await assertFails(bob.doc("users/alice/tickets/t2").delete());
  await assertFails(bob.doc("userProfiles/alice").get());
  await assertFails(bob.doc("userProfiles/alice").set({ rfc: "HACK" }, { merge: true }));
  await assertFails(bob.collection("userProfiles").get());
  await assertFails(bob.collectionGroup("tickets").get());

  await assertFails(anon.doc("users/alice/tickets/t1").get());
  await assertFails(anon.doc("userProfiles/alice").get());
  await assertFails(anon.doc("banners/1").get());
  await assertFails(anon.collection("customStores").get());
  await assertFails(anon.doc("banners/1").set({ enabled: true }));

  await assertSucceeds(alice.doc("banners/1").get());
  await assertSucceeds(alice.doc("banners/6").get());
  await assertSucceeds(alice.collection("customStores").get());
  await assertFails(alice.doc("banners/2").set({ enabled: true, title: "no" }));
  await assertFails(alice.doc("customStores/nuevo").set({ name: "X", category: "Otros" }));

  await assertSucceeds(admin.doc("banners/1").set({ enabled: true, title: "Anuncio", bgImage: "data:image/png,x" }));
  await assertSucceeds(admin.collection("userProfiles").get());
  await assertSucceeds(admin.collectionGroup("tickets").get());
  await assertSucceeds(admin.doc("customStores/nuevo").set({ name: "Local", category: "Otros" }));
  await assertFails(unverified.doc("banners/3").set({ enabled: true }));

  const aliceStorage = env.authenticatedContext("alice", token("alice@example.com")).storage();
  const adminStorage = env.authenticatedContext("diego", token(ADMIN_EMAIL)).storage();
  const anonStorage = env.unauthenticatedContext().storage();
  await assertFails(aliceStorage.ref("fotos/a.jpg").putString("hola"));
  await assertFails(adminStorage.ref("fotos/a.jpg").putString("hola"));
  await assertFails(anonStorage.ref("fotos/a.jpg").getDownloadURL());

  console.log("Reglas OK: dueño sí, otro usuario no, sin sesión no, admin sí gestiona banners, carrusel con sesión sí.");
  await env.cleanup();
})().catch(async (err) => {
  console.error(err);
  if (env) await env.cleanup();
  process.exit(1);
});
