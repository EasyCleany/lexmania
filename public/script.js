document.querySelector(".cta-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector("input[name='name']")?.value || "";
  const email = form.querySelector("input[name='email']")?.value || "";
  const topic = form.querySelector("select[name='topic']")?.value || "";
  const summary = form.querySelector("textarea[name='summary']")?.value || "";

  if (!name || !email) {
    alert("Bitte Name und E-Mail ausfüllen.");
    return;
  }

  try {
    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, topic, summary })
    });

    if (!response.ok) {
      throw new Error("Intake fehlgeschlagen");
    }

    const data = await response.json();
    alert(
      `Danke ${name}! Referenz: ${data.reference}. Wir melden uns in Kürze zu deinem Thema: ${topic}.`
    );
    form.reset();
  } catch (error) {
    alert(
      `Danke ${name}! Wir melden uns in Kürze zu deinem Thema: ${topic}. (Bestätigung an ${email})`
    );
    form.reset();
  }
});
