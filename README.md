# 💼 CVision

**CVision** este o platformă web care analizează automat cunoștințele, aptitudinile și personalitatea unui candidat, generând un CV personalizat și conectându-l cu angajatorii potriviți.  
Proiect realizat în echipă în cadrul facultății, folosind metodologia **SCRUM**.

---

## 🚀 Scopul Proiectului

Aplicația ajută utilizatorii să:
- își creeze un profil profesional complet (competențe, experiență, interese);
- primească sugestii de joburi potrivite;
- genereze automat un **CV inteligent**;
- comunice direct cu angajatorii interesați.

---

## 🧠 Tehnologii Utilizate

| Rol | Tehnologii |
|-----|-------------|
| Frontend | ⚛️ React, HTML, CSS, JavaScript |
| Backend | 🟢 Node.js, Express |
| Bază de date | 🍃 MongoDB (MongoDB Atlas) |
| Versionare | 🧩 Git & GitHub |
| Metodologie | 🌀 SCRUM |

---

## 🗂️ Structura Proiectului


---

## 👥 Rolurile Echipei

| Rol | Responsabilități |
|-----|------------------|
| 🧭 Project Manager | Coordonare generală, planificare, prioritizare |
| 🧑‍💼 Scrum Master | Monitorizare progres, rezolvarea blocajelor |
| 🧑‍🎨 Designeri (2) | UI/UX, prototipare, stilizare componentelor |
| 🧑‍💻 Developeri (3) | API, baze de date, autentificare, Implementare interfață React |
| 🧩 Analiști (2) | Cerințe funcționale, specificații tehnice |
| 🧪 Testeri (2) | Testare funcțională, bug tracking |
| ➕ Alte roluri | Documentare, prezentare, deploy |

---

## 🌿 Branching Model

Folosim **4 branch-uri principale** pentru organizarea codului:

| Branch | Descriere |
|---------|------------|
| `main` | Versiunea finală, stabilă |
| `dev` | Versiunea de integrare (frontend + backend) |
| `frontend` | Modificări pentru partea React |
| `backend` | Modificări pentru partea Node.js + Express |

### 🔹 Reguli:
- Fiecare developer lucrează **doar în folderul său (`client/` sau `server/`)**.
- Se face `merge` periodic în `dev` pentru testare completă.
- `main` primește doar cod stabil, testat.

---

## ⚙️ Cum Rulezi Aplicația Local

1. Clonează proiectul:
   ```bash
   git clone https://github.com/Zaheudev/CVision.git
   cd CVision
