# CHECKLIST D'AUTO-VALIDATION — ARCHITECTURE NEXT.JS (App Router)

## 0. Principes généraux

- [ ] Le code respecte strictement la structure définie dans ARCHITECTURE.md.
- [ ] Chaque fichier a une seule responsabilité claire.
- [ ] Aucun fichier n'intègre à la fois logique métier + UI.
- [ ] Aucun package non listé dans PACKAGES.md n'est ajouté.
- [ ] Le code reste minimaliste : pas d'abstraction ou de complexité inutile.

---

## 1. Structure App Router

- [ ] Toute route (page) doit se trouver dans `app/`.
- [ ] Toute API interne doit être dans `app/api/.../route.ts`.
- [ ] Les composants UI doivent être dans `app/[route]/components/` ou dans `components/`.

---

## 2. séparation Front / Back

- [ ] La logique d’appel Unity Remote Config ne doit JAMAIS être écrite côté page ou composant.
- [ ] Tous les appels Unity passent obligatoirement par `/app/api/unity/route.ts`.
- [ ] Le front ne doit recevoir que des données filtrées, déjà structurées.

---

## 3. Respect du dossier lib/

- [ ] Toute logique Unity doit être dans `lib/unity/` :
  - [ ] `client.ts` pour l’auth et fetch générique
  - [ ] `fetch-config.ts` pour la récupération + extraction
  - [ ] `map-club-to-key.ts` pour le mapping club → clé RC
  - [ ] `types.ts` pour les types
- [ ] Aucune logique Unity ne doit fuiter dans app/, sauf via un fetch à l'API interne.

---

## 4. UI (Shadcn + Tailwind)

- [ ] Tous les styles doivent utiliser Tailwind et/ou les composants Shadcn.
- [ ] Aucun CSS custom ou framework supplémentaire ne doit être ajouté.
- [ ] Les couleurs dynamiques provenant du Remote Config doivent être injectées inline ou via style calculé.

---

## 5. Files & Naming

- [ ] Les fichiers sont nommés de manière explicite (pas de noms génériques comme `utils.ts`).
- [ ] Les dossiers suivent la nomenclature prévue : app/, lib/, public/, styles/.
- [ ] Aucun dossier inutile n’est créé.

---

## 6. Server Components

- [ ] Les pages sont en Server Component par défaut (aucun `"use client"` inutile).
- [ ] Les composants UI qui nécessitent l’interactivité peuvent utiliser `"use client"`, mais uniquement si nécessaire.

---

## 7. Robustesse & Clarté

- [ ] Le typage est strict.
- [ ] La réponse de l’API Unity est validée (idéalement avec zod).
- [ ] Le code est lisible, concis, et documenté si nécessaire.
- [ ] Aucun code mort ou console.log permanent n'apparait dans la version finale.

---

## 8. Conformité Vercel

- [ ] Aucune utilisation de features non supportées par Vercel runtime.
- [ ] Aucun code du côté client ne lit directement process.env.
- [ ] Toutes les variables d’environnement sont chargées uniquement côté serveur.

---

## 9. Respect du principe KISS

- [ ] Simple < Complex : si une solution simple suffit, elle doit être privilégiée.
- [ ] Pas d'abstractions prématurées.
- [ ] Pas de sur-ingénierie.

---

## 10. Vérification finale du flow

- [ ] `/fcmetz` fonctionne : récupère la bonne clé Remote Config et affiche les liens.
- [ ] `/metzhandball` fonctionne : même comportement.
- [ ] Les valeurs affichées sont exactement celles renvoyées par Unity.
- [ ] Le comportement est identique en local et sur Vercel.
